import React, { useCallback, useEffect, useState } from 'react';
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useLocation } from 'react-router-dom';
import { saveDoc, getDocumentContent, handleGeneratePdf } from './CreatePDFFunction';
import { ToastContainer, toast } from 'react-toastify';
import ImageResize from 'quill-image-resize-module-react';
import 'react-toastify/dist/ReactToastify.css';
import '../../Style/abc.css'

const TextEditor = () => {

    const userId = "66bcd5b9ad0ff7688f004212";
    const location = useLocation();
    const docId = location.pathname.split("/")[3];
    const [socket, setSocket] = useState(null);
    const [quill, setQuill] = useState(null);
    const [initialLoadComplete, setInitialLoadComplete] = useState(false)

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

                const documentData = documentResponse?.data?.doc?.docContent?.ops

                console.log(documentData)

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

        socket.once("load-document", document => {
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

    const saveDocument = async () => {
        if (quill === null) return;

        const extractedContent = quill.getContents();

        try {
            const response = await saveDoc(docId, "Dummy", userId, extractedContent);
            if (response?.data?.success) {
                toast.success("Document saved successfully!");
            }
        } catch (error) {
            toast.error("Failed to save the document.");
        }
    };

    const genratePDF = async () => {
        if (quill === null) return;
    
        const editorHTML = quill.root.innerHTML;
    
        try {
            await handleGeneratePdf(editorHTML);
        } catch (error) {
            toast.error("Failed to generate PDF.");
        }
    };
    
    return (
        <div>
            <ToastContainer/>
        <div>
            <div id='container' ref={wrapperRef}></div>
        </div>
            <div className="flex gap-4 absolute z-20">
                <div onClick={saveDocument} className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring">Save</div>
                <div onClick={genratePDF} className="px-6 py-2 min-w-[120px] text-center text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">Download</div>
            </div>
        </div>
    );
};

export default TextEditor;