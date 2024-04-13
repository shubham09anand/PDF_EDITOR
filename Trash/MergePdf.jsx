import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MergePdf = () => {
  const [numPages, setNumPages] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    if (selectedFile) {
      const renderImages = async () => {
        const images = [];
        for (let i = 1; i <= numPages; i++) {
          const canvas = await getPageAsCanvas(selectedFile, i);
          const imageUrl = await canvasToImageUrl(canvas);
          images.push(imageUrl);
        }
        setImages(images);
      };
      renderImages();
    }
  }, [selectedFile, numPages]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const getPageAsCanvas = async (file, pageNumber) => {
    const pageUrl = URL.createObjectURL(file);
    const pdf = await pdfjs.getDocument(pageUrl).promise;
    const page = await pdf.getPage(pageNumber);
    const scale = 2; // Adjust scale as needed
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const context = canvas.getContext('2d');
    await page.render({ canvasContext: context, viewport }).promise;
    return canvas;
  };

  const canvasToImageUrl = async (canvas) => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    });
  };

  return (
    <>
      <input type="file" accept=".pdf" multiple onChange={handleFileChange} />
      {images.length > 0 && (
        <div>
          {images.map((imageUrl, index) => (
            <div key={index}>
              <img src={imageUrl} alt={`Page ${index + 1}`} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MergePdf;
