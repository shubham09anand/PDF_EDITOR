import React, { useState } from 'react';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfPreview = () => {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = (e.target.files);
    setSelectedFiles(files);
    console.log(e.target.files)
  };

  const convertToImage = async (file) => {
    const numPages = await getNumPages(file);
    const images = [];
    for (let i = 1; i <= numPages; i++) {
      const imageUrl = await getPageAsImage(file, i);
      images.push(imageUrl);
    }
    return images;
  };

  const getNumPages = async (file) => {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onload = function () {
        const typedArray = new Uint8Array(this.result);
        pdfjs.getDocument({ data: typedArray }).promise.then((pdf) => {
          resolve(pdf.numPages);
        });
      };
      fileReader.onerror = reject;
      fileReader.readAsArrayBuffer(file);
    });
  };

  const getPageAsImage = async (file, pageNumber) => {
    const pageUrl = URL.createObjectURL(file);
    const pdf = await pdfjs.getDocument(pageUrl).promise;
    const page = await pdf.getPage(pageNumber);
    const scale = 2;
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const context = canvas.getContext('2d');
    await page.render({ canvasContext: context, viewport }).promise;
    const imageUrl = canvas.toDataURL();
    return imageUrl;
  };

  const handleConversion = async () => {
    const convertedImages = [];
    for (const file of selectedFiles) {
      const images = await convertToImage(file);
      convertedImages.push(...images);
    }
    setImages(convertedImages);
  };

  return (
    <>
      <input type="file" accept=".pdf" multiple onChange={handleFileChange} />
      <button onClick={handleConversion} className='w-fit h-fit bg-black text-white font-semibold rounded-md mt-2 active:opacity-55 px-4 py-3'>Convert to Images</button>
      {images.length > 0 ? (
        <div className='flex flex-wrap gap-10'>
          {images.map((imageUrl, index) => (
            <div key={index}>
              <img draggable={true} className='border-2 rounded-md border-red-700 hover:shadow-[1px_1px_10px_black] p-2 border-dashed w-28 h-40 cursor-move' src={imageUrl} alt={`Page ${index + 1}`} />
            </div>
          ))}
        </div>
      ) : <>Select a file</>}
    </>
  );
};

export default PdfPreview;