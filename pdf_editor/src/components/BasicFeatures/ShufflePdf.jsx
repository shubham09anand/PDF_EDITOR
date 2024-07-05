import React, { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingPages from '../Animation/LoadingPages';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ShufflePdf = () => {

  const [status, setStatus] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [pageShuffle, setPageShuffle] = useState([]);
  const [blob, setBlog] = useState(null);


  const handleFileChange = async (e) => {
    if (e.target.files[0].type !== 'application/pdf') {
      toast.error("Only PDF are allowed")
      return;
    }
    const files = (e.target.files);
    setSelectedFiles(files);
  };

  useEffect(() => {
    handleConversion();
  }, [selectedFiles]);

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
    <div className='w-full'>
      <ToastContainer/>
      <div className='text-center space-y-3 pt-4'>
        <div className='text-4xl lg:text-5xl font-bold'>Organize PDF</div>
        <div className='text-xl lg:text-2xl font-medium px-4'>Sort, add and delete PDF pages. Drag and drop the page thumbnails and sort them in our PDF organizer.</div>
      </div>

      {selectedFiles.length === 0 && (
        <div className="mt-10 mx-auto flex items-center justify-center w-1/3 bg-[#e5322d] rounded-lg cursor-pointer">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 rounded-lg cursor-pointer">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth=".5" stroke="black" className="w-12 h-12 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
              </svg>
              <p className="mb-2 text-4xl text-white"><span className="font-semibold">Click to upload Pdf</span></p>
              <p className="text-base text-white">Uplaod Your Pdfs</p>
            </div>
            <input id="dropzone-file" type="file" multiple className="hidden" onChange={handleFileChange} onClick={() => setStatus(true)} />
          </label>
        </div>
      )}
      {status && selectedFiles.length > 0 && images.length === 0 && <LoadingPages />}

      {images.length > 0 && (
        <div className='flex mx-auto flex-wrap p-2 w-fit lg:ga place-content-center'>
          {images.map((imageUrl, index) => (
            <div
              key={index}
              draggable={true}

              className={`p-2 m-3 w-fit h-fit rounded-md border-red-500 hover:shadow-xl ${pageShuffle.includes(index) ? 'opacity-40' : ''}`}
            >
              <div className='w-fit mx-auto'>
                <img draggable={true} className='shadow-[1px_1px_4px_gray] w-32 h-40 sm:w-52 sm:h-60 cursor-move' src={imageUrl} alt={`Page ${index + 1}`} />
                <div className='text-center text-sm text-gray-500'>Page {index + 1}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pageShuffle.length > 0 && (<div className='px-4 py-2 bg-red-600 text-white w-fit h-fit rounded-lg'>Remove pages</div>)}

      <div>
        {blob && (
          <div className='mt-20 mx-auto w-fit items-center text-center place-content-center'>
            <a href={blob} download={`deleted.pdf`} className='flex items-center bg-[#e5322d] w-fit mt-5 text-white font-semibold text-2xl px-6 py-2 rounded-md active:opacity-70 mx-auto'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth=".5" stroke="black" className="w-12 h-12 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
              </svg>
              <div>Download Modifed PDF</div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShufflePdf;