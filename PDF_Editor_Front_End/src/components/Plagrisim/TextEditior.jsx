import React, { useCallback, useEffect, useState } from 'react';
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import "../../Style/abc.css";
import ImageResize from 'quill-image-resize-module-react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const TextEditor = () => {


  // const [supportDisplay, setSupportDisplay] = useState(3);
  const [words, setWords] = useState();
  const [socket, setSocket] = useState(null);
  const [quill, setQuill] = useState(null);
  const [docContent, setDocContent] = useState(null)
  const { id: documentId } = useParams();

  // setSupportDisplay(value);

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
    q.root.innerHTML = (

      `<h2><strong class="ql-size-huge">What is the 12-12-12 decluttering method?&nbsp;</strong></h2><p><span class="ql-size-large">This idea comes from </span><a href="https://www.becomingminimalist.com/14-decluttering-tasks" rel="noopener noreferrer" target="_blank" class="ql-size-large"><u>Joshua Becker of Becoming Minimalist</u></a><span class="ql-size-large">. He has rounded up 14 achievable methods you can use to declutter, and 12-12-12 tops the list. It's simple: Every day, you find 12 things to throw away, 12 things to donate, and 12 things to be put away where they actually go.&nbsp;</span></p><p><span class="ql-size-large">Twelve is a good number to work with. It’s small enough to feel achievable, but big enough to present a bit of a challenge. The first five or so things you throw away will be easy: Find some trash and some broken stuff and toss it. But then keep going, being a little more judicious (or ambitious) so you can hit 12.&nbsp;</span></p><p><span class="ql-size-large">Pre-determining how many items you want to get rid of helps you stay on task and gives you a more concrete goal, which is key if you tend to back off a cleaning project when you start feeling overwhelmed. If you surpass 12 in any category, good for you! But keeping that as the benchmark can give you a little push when you're struggling.</span></p>`

    );
  }, []);

  const getQuillContent = () => {
    if (!socket || !quill) return null;

    const delta = quill.getContents();

    console.log(delta);

    return delta;
  }

  function replaceSpacesWithSpan(htmlString) {

    const randomSpecialCharacter = ['!', '@', '#', '$', '%', '^', '&', '*', '~', '-', '_', '+', '=', '?', '<', '>', '|', '/', ':', ';', '.', ','];

    const rawHTML = document.getElementsByClassName("ql-editor");

    var htmlText = rawHTML[0].innerHTML;

    var tempElement = document.createElement('div');
    tempElement.innerHTML = htmlText;

    var elements = tempElement.querySelectorAll('*');

    elements.forEach(function(element) {
        if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
            var innerText = element.innerText.replace(/\s+/g, function(match) {
                return `<span style="color: rgba(255, 255, 255, 0.01); font-size: 15px;">${randomSpecialCharacter[Math.floor(Math.random() * randomSpecialCharacter.length)]} </span>`;
            });
            element.innerHTML = innerText;
        }
    });
    
    console.log(tempElement.innerHTML);
    return tempElement.innerHTML;
}



  return (
    <>
      <div className='px-5 pt-0 w-full h-full'>
        <span style={{color:"white", size:"10px"  , userSelect:"none", fontSize:"3px"}}>,</span>
        <div onClick={getQuillContent} className='w-fit h-fit mt-2 p-2 rounded-md bg-blue-500 text-white mb-2'>Get Content</div>
        <div onClick={replaceSpacesWithSpan} className='w-fit h-fit mt-2 p-2 rounded-md bg-red-500 text-white mb-2'>Get HTML</div>
        <div id='container' ref={wrapperRef} className='h-96 rounded-2xl'></div>
      </div> 
      <div className='newElement'></div>
    </>


  );
}
export default TextEditor; 