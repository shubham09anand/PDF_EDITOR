import React, { useMemo, useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import ImageAi from "./SupportFiles/ImageAi";
import TextAi from "./SupportFiles/TextAi";
import ContentSupport from "./SupportFiles/ContentSupport";
import ProjectStroage from "./SupportFiles/ProjectStroage";
import TextEditorDashboard from './TextEditorDashboard';
import LoadingPlaneAnimation from '../Animation/LoadingPlaneAnimation';
import Fonts from './Fonts'

const TextEditor = () => {
    const location = useLocation();
    const docId = location.pathname.split("/")[3];
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [socket, setSocket] = useState(null);
    const [display, setDisplay] = useState(0);
    const [pdfGenration, setPdfGenration] = useState(0);
    const [rawHTML, setRawHTML] = useState(null);

    useEffect(() => {
        const s = io("http://localhost:8080");
        setSocket(s);

        return () => {
            s.disconnect();
        };
    }, []);

    // Add custom font configuration
    const config = useMemo(() => ({
        height: 800,
        readonly: false,
        placeholder: 'Type here...',
        spellcheck: true,
        buttons: [
            'source', '|',
            'bold',
            'strikethrough',
            'underline',
            'italic', '|',
            'ul',
            'ol', '|',
            'outdent', 'indent', '|',
            'font',
            'fontsize',
            'brush',
            'paragraph', '|',
            'image',
            'video',
            'table',
            'link', '|',
            'align', 'undo', 'redo', '|',
            'speechRecognize', '|',
            'hr',
            'eraser',
            'copyformat', '|',
            'symbol',
            'fullsize',
            'print',
        ],
        uploader: {
            url: '/upload',
            insertImageAsBase64URI: true,
        },
        controls: {
            font: {
                list: {
                    'Amatic SC, sans-serif': 'Amatic SC',
                    'Assistant, sans-serif': 'Assistant',
                    'Grey Qo, sans-serif': 'Grey Qo',
                    'Mea Culpa, cursive': 'Mea Culpa',
                    'Playwrite CU, sans-serif': 'Playwrite CU',
                    'Roboto, sans-serif': 'Roboto',
                    'Work Sans, sans-serif': 'Work Sans',
                    'Arial, sans-serif': 'Arial',
                    'Georgia, serif': 'Georgia',
                    'Impact, Charcoal, sans-serif': 'Impact',
                    'Tahoma, Geneva, sans-serif': 'Tahoma',
                    'Verdana, Geneva, sans-serif': 'Verdana'
                }
            }
        }
    }), []);

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

        if (quillContainer) {
            console.log("Hello");
            quillContainer.style.display = 'none';
        }
    }, [editor]);

    return (
        <div className='h-screen'>
            <Fonts/>    
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
