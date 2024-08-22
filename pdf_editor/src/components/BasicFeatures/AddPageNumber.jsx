import React, { useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DownLoadEditedPDF from './Components/DownLoadEditedPDF';
import UploadFile from './Components/UploadFile';
import AboutFeature from './Components/AboutFeature';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const AddPageNumber = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [newPdf, setNewPdf] = useState(null);
    const [blob, setBlob] = useState(null);

    const handleFileChange = async (e) => {
        if (e.target.files[0].type !== 'application/pdf') {
            toast.error("Only PDFs are allowed");
            return;
        }
        const files = e.target.files;
        setSelectedFiles(files);
    };

    useEffect(() => {
        if (selectedFiles.length > 0) {
            const addPageNumber = async () => {
                try {
                    const fileBuffer = await selectedFiles[0]?.arrayBuffer();
                    const pdfDoc = await PDFDocument.load(fileBuffer);
                    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
                    const pages = pdfDoc.getPages();

                    for (let i = 0; i < pages.length; i++) {
                        const page = pages[i];
                        page.drawText(`${i + 1}`, {
                            x: page.getWidth() - 40,
                            y: 20,
                            size: 10,
                            font: helveticaFont,
                            color: rgb(0, 0, 0),
                        });
                    }

                    const pdfBytes = await pdfDoc.save();
                    setNewPdf(pdfBytes);
                } catch (error) {
                    console.error("Failed to process PDF:", error);
                    toast.error("Failed to process PDF.");
                }
            };
            addPageNumber();
        }
    }, [selectedFiles]);

    useEffect(() => {
        if (newPdf !== null) {
            const blobUrl = URL.createObjectURL(new Blob([newPdf]));
            setBlob(blobUrl);
        }
    }, [newPdf]);

    useEffect(() => {
        return () => {
            if (blob) {
                URL.revokeObjectURL(blob);
            }
        };
    }, [blob]);

    return (
        <div className='w-full pt-4'>
            <ToastContainer />
            <AboutFeature featureHeading={'Add PDF Page Numbers'} featureDescription={'Add page numbers into PDFs with ease. Choose your positions, dimensions, typography.'} />
            
            {selectedFiles.length === 0 &&
                <UploadFile handleFileChange={handleFileChange} multiple={false} />
            }

            {selectedFiles.length > 0 &&
                <div>
                    <div className='gapy-y-10 space-y-3 w-full lg:w-1/2 mx-auto flex-wrap p-3 mt-10 bg-[#f5f5fa] rounded-xl border'>
                        <div className='w-fit mx-auto text-center font-semibold text-lg'>Selected Pdf</div>
                        <div className="cursor-move mx-auto bg-white border-2 shadow-inner animate-pulse border-gray-200 rounded-lg overflow-hidden w-80 h-12 flex place-content-center items-center">
                            <div className="flex space-x-4 h-full w-full">
                                <div className='bg-white border-r-2 border-black px-3 h-full my-auto flex place-content-center items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#eaeaea" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
                                </div>
                                <div className='flex place-content-center items-center pr-4'>
                                    <div className="text-sm font-semibold text-center">{selectedFiles[0]?.name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {blob !== null &&
                <DownLoadEditedPDF blob={blob} />
            }
        </div>
    );
}

export default AddPageNumber;
