import React, { useCallback, useEffect, useState } from 'react';
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useLocation } from 'react-router-dom';
import { saveDoc, getDocumentContent, generatePdf } from './CreatePDFFunction'; // Function for saving document
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TextEditor = () => {
    const location = useLocation();
    const [socket, setSocket] = useState(null);
    const [quill, setQuill] = useState(null);

    const docId = location.pathname.split("/")[3];
    const userId = "66bcd5b9ad0ff7688f004212"; // Your userId here (this can be dynamic)

    useEffect(() => {
        const s = io("http://localhost:3001");
        setSocket(s);

        return () => {
            s.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket === null || quill === null) return;

        const fetchDocument = async () => {
            const documentResponse = await getDocumentContent(docId, userId);

            if (documentResponse?.data) {

                const documentData = documentResponse?.data?.doc?.docContent?.ops

                quill.setContents(documentData);
                quill.enable();
                // toast.success("Document loaded successfully!");
            } else {
                toast.error("Failed to load document content.");
            }
        };

        fetchDocument();

    }, [socket, quill, docId, userId]);

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

    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return;

        wrapper.innerHTML = "";
        const editor = document.createElement("div");
        wrapper.append(editor);
        const q = new Quill(editor, {
            formula: true,
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        });
        q.disable();
        q.setText("Loading...");
        setQuill(q);
    }, []);

    const saveDocument = async () => {
        if (quill === null) return;

        const extractedContent = quill.getContents();

        try {
            await saveDoc(docId, "Dummy", userId, extractedContent);
            toast.success("Document saved successfully!");
        } catch (error) {
            toast.error("Failed to save the document.");
        }
    };

    return (
        <>
            <ToastContainer /> {/* Toast Container to render toasts */}
            <div id='container' ref={wrapperRef}></div>
            <button onClick={saveDocument} className='cursor-pointer active:opacity-75 gap-x-5 flex place-content-center items-center w-fit h-fit px-4 py-2 text-white bg-black font-semibold rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
                <div>Save Document</div>
            </button>
            <button onClick={()=>generatePdf("ql-editor")} className='cursor-pointer active:opacity-75 gap-x-5 flex place-content-center items-center w-fit h-fit px-4 py-2 text-white bg-black font-semibold rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
                <div>Genrate Pdf</div>
            </button>
        </>
    );
};

export default TextEditor;
