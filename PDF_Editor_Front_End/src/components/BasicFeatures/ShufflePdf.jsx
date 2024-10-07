import React, { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PDFDocument } from 'pdf-lib';
import LoadingPages from '../Animation/LoadingPages';
import AboutFeature from './Components/AboutFeature';
import UploadFile from './Components/UploadFile';
import DownLoadEditedPDF from './Components/DownLoadEditedPDF';
import LoadingPlaneAnimation from '../Animation/LoadingPlaneAnimation';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ShufflePdf = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [pageOrder, setPageOrder] = useState([]);
  const [blob, setBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processStatus, setProcessStatus] = useState(false)

  const handleFileChange = async (e) => {
    if (e.target.files[0].type !== 'application/pdf') {
      toast.error("Only PDFs are allowed");
      return;
    }
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setLoading(true);
  };

  useEffect(() => {
    if (selectedFiles.length > 0) {
      handleConversion();
    }
    // eslint-disable-next-line
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
    setPageOrder(convertedImages.map((_, index) => index));
    setLoading(false);
  };

  const handleDragStart = (index) => {
    setPageOrder((prevOrder) => {
      const newOrder = [...prevOrder];
      newOrder.draggedIndex = index;
      return newOrder;
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData('text/plain');
    const newPageOrder = [...pageOrder];
    const draggedPage = newPageOrder.splice(draggedIndex, 1)[0];
    newPageOrder.splice(index, 0, draggedPage);
    setPageOrder(newPageOrder);
  };

  const handleDragEnd = () => {
    setPageOrder((prevOrder) => {
      const newOrder = [...prevOrder];
      delete newOrder.draggedIndex;
      return newOrder;
    });
  };

  const generatePDF = async () => {
    try {
      setProcessStatus(true);

      const pdfDoc = await PDFDocument.create();

      for (const index of pageOrder) {
        const file = selectedFiles[0];
        const pageUrl = URL.createObjectURL(file);
        const existingPdfBytes = await fetch(pageUrl).then(res => res.arrayBuffer());
        const existingPdfDoc = await PDFDocument.load(existingPdfBytes);
        const [page] = await pdfDoc.copyPages(existingPdfDoc, [index]);
        pdfDoc.addPage(page);
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setBlob(url);
      setProcessStatus(false);
    } catch (error) {
      toast.error("Error Shuffling PDF");
    }
  };

  const reupload = () =>{
    setSelectedFiles([]);
    setPageOrder([]);
    setImages([]);
    setBlob(null);
    setProcessStatus(false);
  }

  return (
    <div className='w-full'>
      <ToastContainer />

      <AboutFeature featureHeading={'Organize PDF'} featureDescription={"Sort, add, and delete PDF pages. Drag and drop the page thumbnails and sort them in our PDF organizer."} />

      {loading && images.length === 0 && <LoadingPages />}

      {selectedFiles.length !== 0 &&
        <div className="shadow-lg mx-auto flex h-full w-fit mt-5 md:mb-5 p-2 rounded-lg">
          <div className="h-full mr-2 my-auto flex place-content-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-file-pdf size-6" viewBox="0 0 16 16">
              <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
              <path d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.244.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 5.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z" />
            </svg>
          </div>
          <div className='select-none flex place-content-center items-center pr-4'>
            <div className="text-sm truncate font-semibold text- max-w-48 overflow-x-scroll example">{selectedFiles[0]?.name}</div>
          </div>
          <div onClick={reupload} className="bg-white md:bg-transparent cursor-pointer hover:opacity-75 active:opacity-50 border-l-2 border-black px-3 h-full my-auto flex place-content-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strok-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </div>
        </div>
      }

      {selectedFiles.length === 0 && (
        <UploadFile handleFileChange={handleFileChange} multiple={false} />
      )}

      {images.length > 0 && (
        <div className='flex mx-auto flex-wrap p-2 w-fit lg:gap-2 place-content-center'>
          {pageOrder.map((index) => (
            <div key={index} draggable onDragStart={(e) => { e.dataTransfer.setData('text/plain', index); handleDragStart(index); }} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, index)} onDragEnd={handleDragEnd} className='p-2 m-3 w-fit h-fit rounded-md border-red-500 hover:shadow-xl'>
              <div className='w-fit mx-auto'>
                <img className='shadow-[1px_1px_4px_gray] w-32 h-40 sm:w-52 sm:h-60 cursor-move' src={images[index]} alt={`Page ${index + 1}`} />
                <div className='text-center text-sm text-gray-500'>Page {index + 1}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pageOrder.length > 0 && (

        <div onClick={generatePDF} className='mb-5 select-none flex gap-x-3 w-fit px-4 py-2 bg-gradient-to-tr from-[#3d83ff] via-[#846be6] to-[#7656f5]  text-white rounded-md mx-auto cursor-pointer'>
          <div className='flex gap-x-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <div className='font-thin text-3xl -mt-1'>Reorder The Pages</div>
        </div>

      )}

      {processStatus && blob == null &&
        <div className='fixed top-0 z-30 w-screen h-screen flex place-content-center items-center backdrop-blur-[2px]'>
          <LoadingPlaneAnimation processType={'Making Your Shuffled PDF'} />
        </div>
      }

      {blob && (
        <DownLoadEditedPDF blob={blob} />
      )}
    </div>
  );
};

export default ShufflePdf;
