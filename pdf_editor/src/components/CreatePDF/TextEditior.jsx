import React, { useCallback, useEffect, useState } from 'react';
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useLocation } from 'react-router-dom';
import { saveDoc, getDocumentContent, handleGeneratePdf } from './CreatePDFFunction';
import { ToastContainer, toast } from 'react-toastify';
import TextEditorDashboard from './TextEditorDashboard';
import ImageResize from 'quill-image-resize-module-react';
import 'react-toastify/dist/ReactToastify.css';
import '../../Style/abc.css';

const TextEditor = () => {

    const userId = "66bcd5b9ad0ff7688f004212";
    const location = useLocation();
    const docId = location.pathname.split("/")[3];
    const [socket, setSocket] = useState(null);
    const [quill, setQuill] = useState(null);
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const [content, setContent] = useState(null);
    const [rawHTML, setRawHTML] = useState(null);
    const [docName, setDocName] = useState("")

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'formula'],
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

    useEffect(() => {
        const s = io("http://localhost:3001");
        setSocket(s);

        return () => {
            s.disconnect();
        };
    }, []);

    //getting previous content of document
    useEffect(() => {
        if (socket === null || quill === null || initialLoadComplete) return;

        const fetchDocument = async () => {
            const documentResponse = await getDocumentContent(docId, userId);

            if (documentResponse?.data) {
                setDocName(documentResponse?.data?.doc?.docName)
                const documentData = documentResponse?.data?.doc?.docContent?.ops;
                quill.setContents(documentData);
                quill.enable();
                setInitialLoadComplete(true);
            } else {
                toast.error("Failed to load document content.");
            }
        };

        fetchDocument();

    }, [socket, quill, docId, userId, initialLoadComplete]);

    useEffect(() => {
        if (socket === null || quill === null) return;

        socket.once("load-document", () => {
            quill.enable();
        });

        socket.emit("get-document", docId);
    }, [socket, quill, docId]);

    useEffect(() => {
        if (socket == null || quill === null) return;

        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return;
            socket.emit("send-changes", delta);
        };

        quill.on('text-change', handler);

        return () => {
            quill.off('text-change', handler);
        };
    }, [socket, quill]);

    useEffect(() => {
        if (socket == null || quill === null) return;

        const handler = delta => {
            quill.updateContents(delta);
        };

        socket.on("receive-changes", handler);

        return () => {
            socket.off('receive-changes', handler);
        };
    }, [socket, quill]);

    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return;

        wrapper.innerHTML = "";
        const editor = document.createElement("div");
        wrapper.append(editor);
        Quill.register('modules/imageResize', ImageResize);
        const q = new Quill(editor, {
            modules: {
                toolbar: toolbarOptions,
                imageResize: {
                    parchment: Quill.import('parchment')
                }
            },
            theme: 'snow'
        });
        q.disable();
        q.setText("Loading...");
        setQuill(q);
    }, [userId]);


    useEffect(() => {
        if (quill === null) return;

        const updateContent = () => {
            setContent(quill.getContents());
            const editorHTML = quill.root.innerHTML;
            setRawHTML(editorHTML)
        };

        updateContent();

        // Listen to text-change to update content
        quill.on('text-change', updateContent);

        return () => {
            quill.off('text-change', updateContent);
        };
    }, [quill]);

    return (
        <div>
            <ToastContainer />
            <div className='flex'>
                <TextEditorDashboard data={content} documentContent={rawHTML} documentName={docName} />
                <div id='container' ref={wrapperRef}></div>
            </div>
        </div>
    );
};

export default TextEditor;
