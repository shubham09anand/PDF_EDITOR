import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

const UploadPdf = () => {
  const [numPages, setNumPages] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= numPages; i++) {
      pages.push(
        <div className='border-2 border-blue-900 hover:border-blue-800 rounded-md hover:opacity-45 p-2' key={i}>
          <Page width={200} height={200} pageNumber={i} renderTextLayer={false} renderAnnotationLayer={false} />
        </div>
      );
    }
    return pages;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    const pagesParentBoxes = document.querySelectorAll(".react-pdf__Document");
    pagesParentBoxes.forEach((box) => {
      box.className += " gap-5  justify-center flex flex-wrap";
    });
  }, []);

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <div className='h-screen overflow-scroll w-fit border-2'>
        <div className='flex place-content-center items-center w-4/5'>
          {selectedFile && (
            <Document file={selectedFile} onLoadSuccess={onDocumentLoadSuccess}>
              {numPages && renderPages()}
            </Document>
          )}
        </div>
      </div>
    </>
  );
};

export default UploadPdf;
