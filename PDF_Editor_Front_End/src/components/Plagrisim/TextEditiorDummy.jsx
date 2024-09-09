import React, { useCallback, useEffect, useState } from 'react';
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import ImageResize from 'quill-image-resize-module-react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import TextEditiorOptions from '../CreatePDF/TextEditiorOptions';
import { getContent } from '../CreatePDF/CreatePDFFunction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TextEditorDummy = ({ isFocused, controllDisplay }) => {

     // const [supportDisplay, setSupportDisplay] = useState(3);
     const [words, setWords] = useState();
     const [socket, setSocket] = useState(null);
     const [quill, setQuill] = useState(null);
     const [docContent, setDocContent] = useState("null")
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
                         }
                    }
               });
          q.enable(true);
          q.setContents([
               { insert: 'Hello ' },
               { insert: 'World!', attributes: { bold: true } },
               { insert: '\n' },
             ]);
           
          setQuill(q);
     }, []);

     const getContent = () =>{
          if (quill === null) {
               return
          }

          console.log(quill.getContents())
     }
     return (
          <>
               <ToastContainer />
               <div className='text-xl font-semibold' onClick={getContent}>Get</div>
               <div className='p-5 pt-0 w-full h-full'>
                    <div id='container' ref={wrapperRef} className='h-screen rounded-2xl'></div>
               </div>
          </>
     );
}
export default TextEditorDummy;