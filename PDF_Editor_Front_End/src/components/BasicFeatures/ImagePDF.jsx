import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { ToastContainer, toast } from 'react-toastify';
import UploadFile from './Components/UploadFile';
import AboutFeature from './Components/AboutFeature';
import 'react-toastify/dist/ReactToastify.css';

const ImagePDF = () => {

    const [imagePreviews, setImagePreviews] = useState([]);
    const [draggedImageIndex, setDraggedImageIndex] = useState(null);

    // Uploading file function
    const handleFileChange = (e) => {
        const allowedTypes = ["image/png"];
        const files = e.target.files;
        let uploadedImagePreviews = [];

        for (let index = 0; index < files.length; index++) {
            if (!allowedTypes.includes(files[index].type)) {
                toast.error("Only JPEG and PNG images are allowed");
                return;
            } else {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const tempImg = {
                        name: files[index].name,
                        blob: event.target.result
                    };
                    uploadedImagePreviews.push(tempImg);
                    if (uploadedImagePreviews.length === files.length) {
                        setImagePreviews(uploadedImagePreviews);
                    }
                };
                reader.readAsDataURL(files[index]);
            }
        }
    };

    const handleDragStart = (index) => {
        setDraggedImageIndex(index);
    };

    const handleDrop = (index) => {
        const updatedImages = [...imagePreviews];
        const draggedImage = updatedImages[draggedImageIndex];

        updatedImages.splice(draggedImageIndex, 1);
        updatedImages.splice(index, 0, draggedImage);

        setImagePreviews(updatedImages);
        setDraggedImageIndex(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const generatePDF = async () => {

        const pdfDoc = await PDFDocument.create();

        const A4_WIDTH = 595;
        const A4_HEIGHT = 842;

        for (let index = 0; index < imagePreviews.length; index++) {
            const image = imagePreviews[index];
            const imageBytes = await fetch(image.blob).then(res => res.arrayBuffer());

            let embeddedImage;
            if (image.blob.includes('image/jpeg') || image.blob.includes('image/jpg')) {
                embeddedImage = await pdfDoc.embedJpg(imageBytes);
            } else {
                embeddedImage = await pdfDoc.embedPng(imageBytes);
            }

            const { width, height } = embeddedImage.scale(1);
            const scale = Math.min(A4_WIDTH / width, A4_HEIGHT / height);
            const newWidth = width * scale;
            const newHeight = height * scale;

            const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
            page.drawImage(embeddedImage, {
                x: (A4_WIDTH - newWidth) / 2,
                y: (A4_HEIGHT - newHeight) / 2,
                width: newWidth,
                height: newHeight
            });
        }

        const pdfBytes = await pdfDoc.save();

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'images-to-pdf.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };


    return (
        <div className='w-full'>
            <ToastContainer />
            <AboutFeature featureHeading={'Image To PDF'} featureDescription={'Convert your images into a single PDF document with ease. Upload multiple images and get them merged into one file.'} />

            {imagePreviews.length === 0 && (
                <UploadFile type={"ImgToPDF"} handleFileChange={handleFileChange} multiple={true} />
            )}

            <div className='flex gap-1 flex-wrap w-full place-content-center items-center p-5'>
                {imagePreviews.length > 0 && imagePreviews.map((src, index) => (
                    <div className='m-5' key={index} draggable onDragStart={() => handleDragStart(index)} onDragOver={handleDragOver} onDrop={() => handleDrop(index)} style={{ cursor: 'move' }}>
                        <img src={src?.blob} alt={`uploaded-img-${index}`} className='shadow-[1px_1px_10px_gray] w-32 h-40 sm:w-52 object-scale-down sm:h-60' />
                        <div className="mt-1 w-32 sm:w-52 truncate font-semibold text-center">{src?.name}</div>
                        <div className='text-xl font-thin text-center'>{index}</div>
                    </div>
                ))}
            </div>

            {blob !== null &&
                (<div onClick={generatePDF} className='cursor-pointer mb-4 mx-auto w-fit items-center text-center place-content-center '>
                    <div className='text-gray-800 my-4 mx-auto w-fit text-xl'>Watermark had been added to PDF pages. Now you can download it.</div>
                    <a style={{ textDecoration: "none" }} href={blob} download={`modifiedPDF.pdf`} className='px-5 py-3 space-x-4 flex place-content-center items-center bg-gradient-to-tr from-[#3d83ff] via-[#846be6] to-[#7656f5] w-fit mt-5 text-white font-semibold text-2xl rounded-lg active:opacity-70 mx-auto'>
                        <div className='relative w-fit h-fit'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-file-pdf size-8" viewBox="0 0 16 16">
                                <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
                                <path d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.244.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 5.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="size-4 backdrop-blur-lg rounded-full -right-1 -bottom-1 absolute">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <div className='no-underline'>Download File</div>
                    </a>
                </div>)
            }
        </div>

    );
};

export default ImagePDF;
