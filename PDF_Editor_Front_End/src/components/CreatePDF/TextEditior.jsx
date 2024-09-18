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
import ImageAi from './SupportFiles/ImageAi';


const TextEditor = () => {
    const location = useLocation();
    const docId = location.pathname.split("/")[3];
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [socket, setSocket] = useState(null);
    const [display, setDisplay] = useState(0);
    const [pdfGenration, setPdfGenration] = useState(0);
    const [rawHTML, setRawHTML] = useState(null);
    const [buttonInfo, setButtonInfo] = useState(false);
    const [editorHeight, setEditorHeight] = useState(null);

    console.log(rawHTML)
    
    useEffect(() => {
        const s = io(process.env.REACT_APP_API_URL_SOCKET_NETWORK);
        // const s = io("http://localhost:8080");
        setSocket(s);

        return () => {
            s.disconnect();
        };
    }, []);

    // eslint-disable-next-line 
    const config = useMemo(() => TextEditorOption(editorHeight, buttonInfo), [buttonInfo,editorHeight]);

    useEffect(() => {
        if (!socket) return;
        // Join the room for the specific document
        socket.emit("join-room", docId);

        // Load initial document content
        socket.once("load-document", (data) => {
            setContent(data);
            setRawHTML(data); // Initialize raw HTML content
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
        const quillContainerResize = document.querySelector('.jodit-editor__resize');
        const joditPagePadding = document.querySelector('.jodit-wysiwyg');
        const joditWorkplaces = document.querySelectorAll('.jodit-workplace'); // Changed to querySelectorAll
        const joditContainer = document.querySelector('.jodit-container');
        const textEditorOption = document.getElementById('textEditorOption');
        const joditStatusBar = document.querySelector('.jodit-status-bar-link');
        const viewportHeight = window.innerHeight;
    
        if (textEditorOption) {
            const elementHeight = textEditorOption.getBoundingClientRect().height;
            const heightDifference = viewportHeight - elementHeight;
            setEditorHeight(heightDifference);
        }
    
        if (quillContainerResize) {
            quillContainerResize.style.display = 'none';
        }
    
        if (joditPagePadding) {
            joditPagePadding.style.border = '0px';
        }
    
        if (joditWorkplaces.length > 0) {
            joditWorkplaces.forEach(workplace => {
                workplace.style.padding = '20px'; // Loop through each workplace and apply padding
            });
        }
    
        if (joditContainer) {
            joditContainer.classList.remove('jodit-container');
        }
    
        if (joditStatusBar) {
            joditStatusBar.style.display = 'none';
        }
    
    }, [buttonInfo, editor]);
    

    useEffect(() => {
        const handleButtonClick = () => {
            setButtonInfo(true);
        };

        const quillKnowButton = document.getElementsByClassName('jodit-ui-group__Know-Options')[0];

        if (quillKnowButton) {
            quillKnowButton.addEventListener('click', handleButtonClick);
        }

        return () => {
            if (quillKnowButton) {
                quillKnowButton.removeEventListener('click', handleButtonClick);
            }
        };
    }, [editor, buttonInfo]);

    return (
        <div className='mt-3 h-screen flex flex-col justify-between'>
            {/* {editorHeight} */}
            <Fonts />
            {pdfGenration === null &&
                <div className='absolute z-40 backdrop-blur-[2px] w-screen h-screen top-0'>
                    <div className='h-full w-full flex-col flex place-content-center items-center mx-auto z-20'>
                        <LoadingPlaneAnimation />
                        <div className='text-lg font-semibold -mt-40'>Generating Your PDF...</div>
                    </div>
                </div>}
            <div className=''>
                <JoditEditor className={`${display === 0 ? 'block' : 'hidden'}`} ref={editor} value={content} config={config} onChange={handleContentChange} />
                <div className={`w-full h-full ${display === 1 ? 'block' : 'hidden'}`}><ImageAi editorHeight={editorHeight} /></div>
                <div className={`w-full h-full ${display === 2 ? 'block' : 'hidden'}`}><TextAi editorHeight={editorHeight} /></div>
                <div className={`w-full h-full ${display === 3 ? 'block' : 'hidden'}`}><ContentSupport editorHeight={editorHeight} /></div>
                <div className={`w-full h-full ${display === 4 ? 'block' : 'hidden'}`}><ProjectStroage editorHeight={editorHeight} /></div>
            </div>
            <TextEditorDashboard pdfGenrationStatus={setPdfGenration} display={display} setDisplay={setDisplay} data={content} documentContent={rawHTML} />
        </div>
    );
};

export default TextEditor;
