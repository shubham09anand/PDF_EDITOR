import React, { useCallback, useEffect, useState } from 'react';
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import TextEditorDashboard from './TextEditorDashboard';
import ImageResize from 'quill-image-resize-module-react';
import 'react-toastify/dist/ReactToastify.css';
import '../../Style/abc.css';

const TextEditor = () => {
    const location = useLocation();
    const docId = location.pathname.split("/")[3];
    const [socket, setSocket] = useState(null);
    const [quill, setQuill] = useState(null);
    const [content, setContent] = useState(null);
    const [rawHTML, setRawHTML] = useState(null);
    const [joinedUsers, setJoinedUsers] = useState([]);
    const [display, setDisplay] = useState(0);

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
        const s = io("http://localhost:8080");
        setSocket(s);

        return () => {
            s.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket === null || quill === null) return;

        socket.once("load-document", (delta) => {
            quill.setContents(delta);
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
        setQuill(q);
        // eslint-disable-next-line
    }, [docId]);

    useEffect(() => {
        if (quill === null) return;

        const updateContent = () => {
            setContent(quill.getContents());
            const editorHTML = quill.root.innerHTML;
            setRawHTML(editorHTML);
        };

        updateContent();

        // Listen to text-change to update content
        quill.on('text-change', updateContent);

        return () => {
            quill.off('text-change', updateContent);
        };
    }, [quill]);

    useEffect(() => {
        if (quill === null || socket === null) return;

        const handleNewUser = (newUserData) => {
            setJoinedUsers(prevUsers => [...prevUsers, newUserData.name]);
        };

        const handleCurrentUsers = (users) => {
            setJoinedUsers(users);
        };

        const handleUserLeft = (userData) => {
            setJoinedUsers(prevUsers => prevUsers.filter(user => user !== userData.name));
        };

        socket.on('new-user', handleNewUser);
        socket.on('current-users', handleCurrentUsers);
        socket.on('user-left', handleUserLeft);

        return () => {
            socket.off('new-user', handleNewUser);
            socket.off('current-users', handleCurrentUsers);
            socket.off('user-left', handleUserLeft);
        };
    }, [quill, socket]);

    return (
        <>
            <ToastContainer />
            <TextEditorDashboard display={display} setDisplay={setDisplay} data={content} documentContent={rawHTML} />
            <div id='container' className={`${display === 0 ? 'block' : 'hidden'}`} ref={wrapperRef}></div>
        </>
    );
};

export default TextEditor;
