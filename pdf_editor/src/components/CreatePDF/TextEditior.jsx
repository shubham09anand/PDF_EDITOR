import React, { useCallback, useEffect, useState } from 'react';
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import "../../Style/abc.css";
import ImageResize from 'quill-image-resize-module-react';
import { io } from 'socket.io-client';
import { useLocation, useParams } from 'react-router-dom';
import TextEditorDashboard from './TextEditorDashboard';
import { getDocumentContent } from './CreatePDFFunction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TextEditor = ({ controllDisplay }) => {

     const location = useLocation();

     const [words, setWords] = useState();
     const [socket, setSocket] = useState(null);
     const [quill, setQuill] = useState(null);
     const [docContent, setDocContent] = useState(null)
     const [display, setDisplay] = useState(0)
     const { id: documentId } = useParams();

     const cuurPath = location.pathname.split("/");
     const docID = cuurPath[cuurPath.length - 1];
     const userId = "6608f032efa3e1a31913d0f3"

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
               ['link', 'image'],
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
          q.enable(true);
          setQuill(q);
          q.setContents(docContent);
     }, []);

     const getQuillContent = () => {
          if (!socket || !quill) return null;
          const delta = quill.getContents();
          return delta;
     }

     useEffect(() => {
          if (docID === null) return
          if (docContent === null) {
               getDocumentContent(docID, userId)
                    .then((res) => {
                         setDocContent(res.data?.doc?.docContent?.ops)
                    })
                    .catch((error) => {
                         console.log(error)
                         toast.error(`Failed To Fetch Data`);
                    });
          }
     }, [quill])

     console.log(docContent);

     return (
          <>
               <ToastContainer />
               <div className='flex'>
                    <div className='absolute bottom-0 w-full'>
                         <TextEditorDashboard controllDisplay={controllDisplay} getQuillContent={getQuillContent} />
                    </div>
                    {/* <div className='pt-0 w-[94%] absolute right-0 '>
                         <div id='container' ref={wrapperRef} className='h-screen rounded-2xl'></div>
                    </div> */}
               </div>
          </>
     );
}
export default TextEditor; 
