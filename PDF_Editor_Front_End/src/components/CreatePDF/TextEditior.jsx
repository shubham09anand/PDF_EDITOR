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
    const [buttonInfo, setButtonInfo] = useState(false)

    useEffect(() => {
        const s = io("http://localhost:8080");
        setSocket(s);

        return () => {
            s.disconnect();
        };
    }, []);

    // Add custom font configuration
    // eslint-disable-next-line 
    const config = useMemo(() => TextEditorOption(), [buttonInfo]);

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
        const quillContainer = document.getElementsByClassName('jodit-status-bar jodit-status-bar_resize-handle_true')[0];
        const quillContainerResize = document.getElementsByClassName('jodit-editor__resize')[0];

        if (quillContainerResize) {
            quillContainerResize.style.display = 'none';
        }

        if (quillContainer) {
            quillContainer.style.display = 'none';
        }
    }, [buttonInfo, editor]);

    useEffect(() => {
        const handleButtonClick = () => {
            setButtonInfo(prevButtonInfo => !prevButtonInfo);
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
        <div className='h-screen'>
            <Fonts />
            {pdfGenration === null &&
                <div className='absolute z-20 backdrop-blur-[2px] w-screen h-screen top-0'>
                    <div className='h-full w-full flex-col flex place-content-center items-center mx-auto z-20'>
                        <LoadingPlaneAnimation />
                        <div className='text-lg font-semibold -mt-40'>Generating Your PDF...</div>
                    </div>
                </div>}
            <div className='h-[90%]'>
                <JoditEditor className={`${display === 0 ? 'block' : 'hidden'}`} ref={editor} value={content} config={config} onChange={handleContentChange} />
                <div className={`w-full h-full ${display === 1 ? 'block' : 'hidden'}`}><ImageAi /></div>
                <div className={`w-full h-full ${display === 2 ? 'block' : 'hidden'}`}><TextAi /></div>
                <div className={`w-full h-full ${display === 3 ? 'block' : 'hidden'}`}><ContentSupport /></div>
                <div className={`w-full h-full ${display === 4 ? 'block' : 'hidden'}`}><ProjectStroage /></div>
            </div>
            <TextEditorDashboard pdfGenrationStatus={setPdfGenration} display={display} setDisplay={setDisplay} data={content} documentContent={rawHTML} />
        </div>
    );
};

export default TextEditor;
