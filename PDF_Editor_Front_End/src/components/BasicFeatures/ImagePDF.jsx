import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { ToastContainer, toast } from 'react-toastify';
import UploadFile from './Components/UploadFile';
import DownLoadEditedPDF from './Components/DownLoadEditedPDF';
import AboutFeature from './Components/AboutFeature';
import LoadingPlaneAnimation from '../Animation/LoadingPlaneAnimation';
import 'react-toastify/dist/ReactToastify.css';

const ImagePDF = () => {

    const [imagePreviews, setImagePreviews] = useState([]);
    const [draggedImageIndex, setDraggedImageIndex] = useState(null);
    const [blob, setBlob] = useState(null);
    const [processStatus, setProcessStatus] = useState(false)

    // Uploading file function
    const handleFileChange = (e) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
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

    // s etImagePreviews(imagePreviews.filter((_,i) => i !== index))
    const handleRemoveImage = (index) => {
        setImagePreviews(
            [...imagePreviews.slice(0, index),
            ...imagePreviews.slice(index + 1)]
        )
    }

    const generatePDF = async () => {

        setProcessStatus(true);

        try {
            const pdfDoc = await PDFDocument.create();

            const A4_WIDTH = 595;
            const A4_HEIGHT = 842;
            const padding = 20;

            for (let index = 0; index < imagePreviews.length; index++) {
                const image = imagePreviews[index];

                const response = await fetch(image.blob);
                const imageBytes = await response.arrayBuffer();

                let embeddedImage;
                if (image.blob.includes('image/jpeg') || image.blob.includes('image/jpg')) {
                    try {
                        embeddedImage = await pdfDoc.embedJpg(imageBytes); // Embed JPEG
                    } catch (error) {
                        console.error('Error embedding JPEG:', error);
                    }
                } else {
                    try {
                        embeddedImage = await pdfDoc.embedPng(imageBytes); // Embed PNG
                    } catch (error) {
                        console.error('Error embedding PNG:', error);
                    }
                }

                if (embeddedImage) {
                    const { width, height } = embeddedImage.scale(1);
                    const scale = Math.min((A4_WIDTH - 2 * padding) / width, (A4_HEIGHT - 2 * padding) / height); // Subtract padding from both sides
                    const newWidth = width * scale;
                    const newHeight = height * scale;

                    const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);

                    // Draw the image with the padding
                    page.drawImage(embeddedImage, {
                        x: (A4_WIDTH - newWidth) / 2,
                        y: (A4_HEIGHT - newHeight) / 2,
                        width: newWidth,
                        height: newHeight
                    });
                } else {
                    console.error('Failed to embed image at index', index + 1);
                }
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            setBlob(url); // Set the generated blob to state
        } catch (error) {
            toast.info("Someting Wnet Wrong")
        } finally {
            setProcessStatus(false)
        }
    };

    const restart = () => {
        setImagePreviews([]);
        setBlob(null);
        setDraggedImageIndex(null);
    }

    return (
        <div className='w-full'>
            <ToastContainer />
            <AboutFeature featureHeading={'Image To PDF'} featureDescription={'Convert your images into a single PDF document with ease. Upload multiple images and get them merged into one file.'} />

            {imagePreviews.length === 0 && (
                <UploadFile type={"ImgToPDF"} handleFileChange={handleFileChange} multiple={true} />
            )}

            {imagePreviews.length > 0 && (
                <div onClick={restart} className='mx-auto w-fit h-fit py-1 px-20 shadow-inner rounded-lg active:bg-gray-200 bg-gray-100 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </div>
            )}

            {imagePreviews.length > 0 && (
                <div className='text-lg text-gray-500 mt-4 text-center'>Drag and Drop by holding the photos to shuffle their page number.</div>
            )}

            <div className='flex gap-1 flex-wrap w-full place-content-center items-center p-5 pb-0'>
                {imagePreviews.length > 0 && imagePreviews.map((src, index) => (
                    <div className='m-5 relative' key={index} draggable onDragStart={() => handleDragStart(index)} onDragOver={handleDragOver} onDrop={() => handleDrop(index)} style={{ cursor: 'grab' }}>
                        <div onClick={() => handleRemoveImage(index)} className='absolute -top-3 -right-3 z-10 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="size-6 bg-black rounded-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <img src={src?.blob} alt={`uploaded-img-${index}`} className='shadow-[1px_1px_10px_gray] w-32 h-40 sm:w-52 object-scale-down sm:h-60' />
                        <div className='text-xl font-thin text-center'>{index + 1}</div>
                    </div>
                ))}
            </div>

            {imagePreviews.length > 0 &&
                (
                    <div className='bg-gradient-to-tr relative from-[#3d83ff] via-[#846be6] to-[#7656f5] rounded-xl cursor-pointer w-fit mt-5 text-white font-semibold text-2xl px-6 py-2 active:opacity-70 mx-auto' onClick={generatePDF}>Genrate Pdf</div>
                )
            }

            {imagePreviews.length > 0 && processStatus &&
                (
                    <div className='fixed top-0 z-20 w-screen h-screen flex place-content-center items-center backdrop-blur-[2px]'>
                        <LoadingPlaneAnimation processType={'Making Your Shuffled PDF'} />
                    </div>
                )
            }

            {blob && (
                <DownLoadEditedPDF downloadMessage={"Your images has been merged into a single PDF. Now you can download it."} blob={blob} />
            )}

        </div>
    );
};

export default ImagePDF;