import React, { useEffect, useState } from 'react';
import { PDFDocument } from 'pdf-lib'
import 'react-toastify/dist/ReactToastify.css';
import UploadFile from '../pdf_editor/src/components/BasicFeatures/Components/UploadFile';
import AboutFeature from '../pdf_editor/src/components/BasicFeatures/Components/AboutFeature';
import { ToastContainer, toast } from 'react-toastify';

const SplitPDF = () => {

    const [uploadedPdf, setUploadedPdf] = useState(null)
    const [pdfTotalPage, setpdfTotalPage] = useState();
    const [pdfCount, setPdfCount] = useState(1);
    const [blob, setBlob] = useState([]);
    const [pageRanges, setPageRanges] = useState([['', '']]);

    // uploading file function
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file.type !== 'application/pdf') {
            toast.error("Only PDF Files are allowed");
            return
        }
        else {
            setUploadedPdf(file);
        }
    }

    // setting max split of pdf
    useEffect(() => {
        if (pdfCount > 10) {
            setPdfCount(1)
        }
    }, [pdfCount])

    //get pdf Total Page count
    const handlePageCount = async () => {
        if (uploadedPdf !== null) {
            try {
                const pdfBuffer = await uploadedPdf.arrayBuffer();
                const orgFile = await PDFDocument.load(pdfBuffer);
                const numPages = orgFile.getPageCount();
                setpdfTotalPage(numPages);
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(() => {
        handlePageCount()
    }, [uploadedPdf, pdfTotalPage])

    // spliting pdf
    const handleSplitPDF = async () => {
        const pdfBuffer = await uploadedPdf.arrayBuffer();
        const orgFile = await PDFDocument.load(pdfBuffer);
        const numPages = orgFile.getPageCount();
        setpdfTotalPage(numPages);
        const blobsArray = [];

        pageRanges.forEach((e) => {
            e.forEach((i) => {
                if (i <= 0 || i > pdfTotalPage || i === null || isNaN(i)) {
                    toast.error("Make Sure ");
                    return
                }
            })
            return
        })

        try {
            for (const [_, e] of pageRanges.entries()) {
                const pdfDoc = await PDFDocument.create();
                for (let i = e[0] - 1; i < e[1]; i++) {
                    const [firstDonorPage] = await pdfDoc.copyPages(orgFile, [i]);
                    // Insert the individual pages in the new PDF
                    pdfDoc.addPage(firstDonorPage);
                }
                const pdf = await pdfDoc.save();
                const blobUrl = URL.createObjectURL(new Blob([pdf]));
                blobsArray.push(blobUrl);
            }
            setBlob(blobsArray)
        } catch (error) {
            alert("Error")
        }
    }

    const handleSplitRangeChange = (index, startOrEnd, value) => {
        const newPageRanges = [...pageRanges];
        newPageRanges[index][startOrEnd] = value;
        setPageRanges(newPageRanges);
    };

    const handlePdfCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setPdfCount(count);
        setPageRanges(Array.from({ length: count }, (_, i) => pageRanges[i] || ['', '']));
    };

    const handleRestartProcess = () => {
        setUploadedPdf(null);
        setPdfCount(1);
        setpdfTotalPage();
        setBlob([]);
        setPageRanges([['', '']]);
    }

    return (
        <div className='w-full'>
            <ToastContainer />

            <AboutFeature featureHeading={'Split PDF Files'} featureDescription={'Split PDFs Into Multiple Fragments. Get a new file without your deleted pages from your original File.'} />

            {uploadedPdf === null && (<UploadFile handleFileChange={handleFileChange} multiple={false} />)}

            {
                uploadedPdf !== null && blob.length === 0 && (
                    <div>
                        <div className='select-none gap-y-10 space-y-3 w-full xl:w-3/5 mx-auto flex-wrap px-0 py-5 sm:py-5 mt-10 bg-[#f5f5fa] rounded-xl border'>
                            <div className="cursor-move mx-auto bg-white border-2 shadow-inner animate-pulse border-gray-200 rounded-lg overflow-hidden w-80 h-12 flex place-content-center items-center">
                                <div className="flex space-x-4 h-full w-full">
                                    <div className='bg-white border-r-2 border-black px-3 h-full my-auto flex place-content-center items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-file-pdf size-8" viewBox="0 0 16 16">
                                            <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
                                            <path d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.244.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 5.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z" />
                                        </svg>
                                    </div>
                                    <div className='flex place-content-center items-center pr-4'>
                                        <div className="text-sm font-semibold text-center">{uploadedPdf?.name}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='text-sm text-center text-black font-semibold'>Total Number of page in PDF {pdfTotalPage}</div>
                            <div>
                                <div className="max-w-80 mb-4 mx-auto">
                                    <label htmlFor="number-input" className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold">Split PDF into</label>
                                    <input
                                        onChange={handlePdfCountChange}
                                        value={pdfCount}
                                        type="number"
                                        id="number-input"
                                        aria-describedby="helper-text-explanation"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none font-semibold block w-full p-2.5"
                                        placeholder="2"
                                        required
                                    />
                                </div>
                                {Array.from({ length: pdfCount }, (_, index) => (
                                    <div key={index} className='overflow-x-scroll example'>
                                        <div key={index} className="mx-auto w-fit mt-3 px-3 space-x-9 lg:space-x-16 flex items-center">
                                            <div className='relative'>
                                                <label htmlFor="number-input" className="block text-sm text-gray-900 dark:text-white font-semibold mb-3">Splitted Pdf</label>
                                                <div className="my-auto h-fit mt-5 py-2 relative cursor-move mx-auto bg-white border-2 shadow-inner animate-pulse border-gray-200 rounded-lg w-80 flex flex-col place-content-center items-center">
                                                    <div className='rounded-full text-center flex place-content-center items-center w-5 h-5 bg-gradient-to-tr from-[#3d83ff] via-[#846be6] to-[#7656f5] text-white absolute z-10 -top-2 -left-2 text-sm animate-bounce'>{index + 1}</div>
                                                    <div className="flex space-x-4 h-full w-full">
                                                        <div className="bg-white border-r-2 border-black px-3 h-full my-auto flex place-content-center items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-file-pdf size-6" viewBox="0 0 16 16">
                                                                <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
                                                                <path d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.244.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 5.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z" />
                                                            </svg>
                                                        </div>
                                                        <div className='flex place-content-center items-center pr-4'>
                                                            <div className="text-sm truncate font-semibold text- max-w-48 overflow-x-scroll">{uploadedPdf?.name && uploadedPdf.name.replace(/\.pdf$/, '') + `_${index + 1}.pdf`}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="number-input" className="block text-sm text-gray-900 dark:text-white font-semibold mb-3">Start Page</label>
                                                <input max={pdfCount} min={0} onChange={(e) => handleSplitRangeChange(index, 0, e.target.value)} value={pageRanges[index][0]} type="text" id="number-input" className="bg-gray-50 border border-gray-300 text-gray-900 min-w-40 max-w-60 text-sm rounded-lg outline-none font-semibold block w-full p-2.5" placeholder="1" required />
                                            </div>
                                            <div>
                                                <label htmlFor="number-input" className="block text-sm text-gray-900 dark:text-white font-semibold mb-3">End Page</label>
                                                <input max={pdfCount} min={0} onChange={(e) => handleSplitRangeChange(index, 1, e.target.value)} value={pageRanges[index][1]} type="text" id="number-input" className="bg-gray-50 border border-gray-300 text-gray-900 min-w-40 max-w-60 text-sm rounded-lg outline-none font-semibold block w-full p-2.5" placeholder="2" required />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div onClick={handleSplitPDF} className='select-none bg-gradient-to-tr from-[#3d83ff] via-[#846be6] to-[#7656f5] mx-auto w-fit h-fit px-4 py-2 rounded-xl text-lg uppercase font-semibold text-white tracking-wide cursor-pointer active:opacity-80 mt-5'>split</div>
                        </div>
                    </div>
                )
            }
            {
                blob.length > 0 &&
                (
                    <div>
                        <div className='w-fit mx-auto flex flex-col place-content-center items-center'>
                            <div className='text-2xl mt-10 uppercase font-semibold tracking-widest mb-4'>Download Splitted Pdf</div>
                            <div className='flex flex-wrap w-full place-content-center'>
                                {Array.from({ length: blob.length }, (_, index) => (
                                    <div key={index} className='bg-gray-100 border-2 mx-4 my-3 sm:my-4 border-gray-300 px-2 space-x-5 flex place-content-center items-center rounded-md w-fit h-fit'>
                                        <div className='flex space-x-3 place-content-center items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-file-pdf size-8" viewBox="0 0 16 16">
                                                <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
                                                <path d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.244.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 5.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z" />
                                            </svg>
                                            <div className='pl-2 mx-auto w-60 truncate h-fit py-2 rounded-md text-xl uppercase font-semibold tracking-wide cursor-pointer active:opacity-80 '> {uploadedPdf?.name && `${index + 1}_${uploadedPdf.name.replace(/\.pdf$/, '')}` + `.pdf`}</div>
                                        </div>
                                        <a href={blob[index]} download={uploadedPdf?.name.replace(/\.pdf$/, '') + `_${index + 1}.pdf`} className='bg-gradient-to-tr from-[#3d83ff] via-[#846be6] to-[#7656f5] h-full rounded-full'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6 p-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                            </svg>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div onClick={handleRestartProcess} className='select-none mt-10 mx-auto cursor-pointer active:opacity-55 bg-gradient-to-tr from-[#3d83ff] via-[#846be6] to-[#7656f5] px-4 py-1 rounded-md uppercase text-white w-fit h-fit'>Restart</div>
                    </div>

                )
            }


        </div>
    );
};

export default SplitPDF;