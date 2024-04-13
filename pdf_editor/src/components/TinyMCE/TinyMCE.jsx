import React, { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function App() {
     const editorRef = useRef(null);

     useEffect(() => {
          // Check if the editor instance exists before accessing it
          const editor = editorRef.current;
          if (editor) {
              // Programmatically insert a page break at the current cursor position
              editor.execCommand('mceInsertContent', false, '<p><!-- pagebreak --></p>');
          }
      }, [editorRef.current]);
     return (
          <Editor
               apiKey='ty4oa3q7y0zd0df5izlk18b7uohkb1l4m4pw9ir0scnmx2qz'
               init={{
                    skin: 'oxide-dark',
                    selector: 'textarea',
                    menubar: 'insert',
                    plugins: 'pagebreak anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
                    toolbar: 'pagebreak | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image table | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                         { value: 'First.Name', title: 'First Name' },
                         { value: 'Email', title: 'Email' },
                    ],
                    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
               }}
               onInit={(evt, editor) => {
                    // Store the editor instance in the ref
                    editorRef.current = editor;
                    editorRef.current.on('change', (e) => {
                         console.log('The content of the editor has changed.');
                         console.log('The new content is:', e.target.getContent());
                     });
               }}
          />
     );
}
