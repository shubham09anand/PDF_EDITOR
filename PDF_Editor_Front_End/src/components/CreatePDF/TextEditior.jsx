import React, { useMemo, useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import TextAi from "./SupportFiles/TextAi";
import ContentSupport from "./SupportFiles/ContentSupport";
import ProjectStroage from "./SupportFiles/ProjectStroage";
import TextEditorDashboard from './TextEditorDashboard';
import LoadingPlaneAnimation from '../Animation/LoadingPlaneAnimation';
import Fonts from './Fonts'
import { TextEditorOption } from './CreatePDFFunction';
import Messaging from './SupportFiles/Messaging';

const TextEditor = () => {
    const location = useLocation();
    const docId = location.pathname.split("/")[3];
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [socket, setSocket] = useState(null);
    const [display, setDisplay] = useState(0);
    const [pdfGenration, setPdfGenration] = useState(0);
    const [rawHTML, setRawHTML] = useState(null);
    const [editorHeight, setEditorHeight] = useState(null);

    useEffect(() => {
        const s = io(process.env.REACT_APP_API_URL_SOCKET_NETWORK);
        // const s = io("http://localhost:8080");
        setSocket(s);

        return () => {
            s.disconnect();
        };
    }, []);

    // eslint-disable-next-line 
    const config = useMemo(() => TextEditorOption(editorHeight), [editorHeight]);

    useEffect(() => {
        if (!socket) return;
        // Join the room for the specific document
        socket.emit("join-room", docId);

        // Load initial document content
        socket.once("load-document", (data) => {
            setContent(data);
            setRawHTML(data);
        });

        socket.emit("get-document", docId);

        socket.on("receive-changes", (newContent) => {
            setContent(newContent);
            setRawHTML(newContent); // Update raw HTML content
        });

        return () => {
            socket.off("receive-changes");
        };
    }, [socket, docId]);

    const handleContentChange = (newContent) => {
        setContent(newContent);
        if (editor.current) {
            setRawHTML(editor.current.value); // Get raw HTML content from the editor
        }
        if (socket) {
            socket.emit("send-changes", newContent);
        }
    };

    useEffect(() => {
        const toolBar = document.getElementsByClassName('jodit-toolbar__box')[0];
        const header = document.getElementById('header');
        
        const viewportHeight = window.innerHeight;
    
        let headerHeight = 0;
        let toolbarHeight = 0;
    
        if (header) {
            headerHeight = header.getBoundingClientRect().height;
        }
    
        if (toolBar) {
            toolbarHeight = toolBar.getBoundingClientRect().height;
        }
    
        const availableHeight = viewportHeight - (headerHeight + toolbarHeight);
        setEditorHeight(availableHeight);   
        
    }, [editor, docId]);
    

    setTimeout(() => {
        const textEditorBar = document.getElementsByClassName('jodit-status-bar jodit-status-bar_resize-handle_true')[0];
        if (textEditorBar !== null) {
            textEditorBar.style.display = 'none';
        }
    }, 5000);

    return (
        <div className='mt-3 flex flex-col justify-between'>
            {/* {editorHeight} */}
            <Fonts />
            {pdfGenration === null &&
                <div className='absolute z-40 backdrop-blur-[2px] w-screen h-screen top-0'>
                    <div className='h-full w-full flex-col flex place-content-center items-center mx-auto z-20'>
                        <LoadingPlaneAnimation />
                        <div className='text-lg font-semibold -mt-40'>Generating Your PDF...</div>
                    </div>
                </div>}
            <>
                <JoditEditor className={`h-40  overflow-hidden ${display === 0 || display === 1 ? 'block' : 'hidden'}`} ref={editor} value={content} config={config} onChange={handleContentChange} />
                <div className={`${display === 1 || display === 1 ? 'block' : 'hidden'}`}><Messaging editorHeight={editorHeight}/></div>
                <div className={`w-full h-full ${display === 2 ? 'block' : 'hidden'}`}><TextAi /></div>
                <div className={`w-full h-full ${display === 3 ? 'block' : 'hidden'}`}><ContentSupport editorHeight={editorHeight} /></div>
                <div className={`w-full h-full ${display === 4 ? 'block' : 'hidden'}`}><ProjectStroage editorHeight={editorHeight}/></div>
            </>
            <TextEditorDashboard pdfGenrationStatus={setPdfGenration} display={display} setDisplay={setDisplay} data={content} documentContent={rawHTML} />
        </div>
    );
};

export default TextEditor;
