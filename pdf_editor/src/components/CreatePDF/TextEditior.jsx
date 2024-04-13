import React, { useCallback, useEffect, useState } from 'react';
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import ImageResize from 'quill-image-resize-module-react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import TextEditiorOptions from '../CreatePDF/TextEditiorOptions';
import { getContent } from './CreatePDFFunction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TextEditor = ({ isFocused, controllDisplay }) => {

     // const [supportDisplay, setSupportDisplay] = useState(3);
     const [words, setWords] = useState();
     const [socket, setSocket] = useState(null);
     const [quill, setQuill] = useState(null);
     const [docContent, setDocContent] = useState(null)
     const { id: documentId } = useParams();

     // setSupportDisplay(value);

     const docID = "b49e04af-714c-4ca8-9ccb-77368c4cc3c6";

     useEffect(() => {
          const s = io("http://localhost:3001");
          setSocket(s);

          return () => {
               s.disconnect();
          }
     }, []);


     useEffect(() => {
          if (!socket || !quill || !documentId) {
               return;
          }
          socket.once("load-document", document => {
               quill.setContents(document);
               quill.enable();
          });

          socket.emit('get-document', documentId);
     }, [documentId, quill, socket]);

     useEffect(() => {
          if (!socket || !quill) return;

          const handler = (delta) => {
               quill.updateContents(delta);
          };

          socket.on('receive-changes', handler);

          return () => {
               socket.off('receive-changes', handler);
          };
     }, [socket, quill]);

     useEffect(() => {
          if (!socket || !quill) return;

          const handler = (delta, oldDelta, source) => {
               if (source !== 'user') return;
               socket.emit('send-changes', delta);
               setWords(quill.getText().split(/\s+/).length);
          };

          quill.on('text-change', handler);

          return () => {
               quill.off('text-change', handler);
          };
     }, [socket, quill]);

     const wrapperRef = useCallback(wrapper => {
          const toolbarOptions = [
               ['bold', 'italic', 'underline', 'strike'],
               ['blockquote', 'code-block'],
               ['link', 'image', 'video', 'formula'],

               [{ 'header': 1 }, { 'header': 2 }],
               [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
               [{ 'script': 'sub' }, { 'script': 'super' }],
               [{ 'indent': '-1' }, { 'indent': '+1' }],
               [{ 'direction': 'rtl' }],

               [{ 'size': ['small', false, 'large', 'huge'] }],
               [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

               [{ 'color': [] }, { 'background': [] }],
               [{ 'font': [] }],
               [{ 'align': [] }],

               ['clean']
          ];

          if (!wrapper) return;

          wrapper.innerHTML = "";
          const editor = document.createElement("div");
          wrapper.append(editor);

          Quill.register('modules/imageResize', ImageResize);
          const q = new Quill(
               editor,
               {
                    theme: "snow",
                    modules: {
                         toolbar: toolbarOptions,
                         imageResize: {
                              parchment: Quill.import('parchment')
                              // See optional "config" below
                         }
                    }
               });
          q.enable(false);
          if (docContent) {
               q.setContents(docContent);
           } else {
               // Set "Loading" text with style
               const loadingText = `<p style="font-style: italic; color: #888;">Loading...</p>`;
               q.root.innerHTML = loadingText;
           }
           
          setQuill(q);
     }, []);

     const getQuillContent = () => {
          if (!socket || !quill) return null;

          const delta = quill.getContents();
          const content = delta.ops.map(op => {
               let text = '';
               if (op.insert) {
                    if (typeof op.insert === 'string') {
                         text = op.insert;
                    } else if (typeof op.insert === 'object' && op.insert.image) {
                    }
               }
               return {
                    text: text,
                    attributes: op.attributes || null
               };
          });

          return content;
     }

     useEffect(() => {
          if (quill === null || docID === null) return
          if (docContent === null) {
               getContent(docID)
                    .then((res) => {
                         console.log(res.data.doc[0].docContent[0].text)
                         setDocContent(res.data.doc[0].docContent[0].text)
                         quill.setContents(docContent)
                         toast.success("Document Fetched Succesfully");
                    })
                    .catch(() => {
                         toast.error(`Failed to save document`);
                    });
          }
     },[quill])

     return (
          <>
               <ToastContainer />
               {/* <div onClick={() => { getQuillContent() }}>get Content</div> */}
               <div className='p-5 pt-0 w-full h-full'>
                    <div id='container' ref={wrapperRef} className='h-screen rounded-2xl'></div>
               </div>

               {
                    isFocused &&
                    (
                         <div className='absolute top-24 z-[200] w-full'>
                              <TextEditiorOptions controllDisplay={controllDisplay} getQuillContent={getQuillContent} />
                         </div>
                    )
               }

               {/* {supportDisplay === 1 ? <VidoeCall setDisplay_1={setDisplay} /> : supportDisplay === 2 ? <ProjectStroage setDisplay={setDisplay} /> : supportDisplay === 3 ? <ImageAi setDisplay={setDisplay} /> : supportDisplay === 4 ? <TextAi setDisplay={setDisplay} /> : supportDisplay === 5 ? <ContentSupport setDisplay={setDisplay} /> : null} */}

          </>
     );
}
export default TextEditor;