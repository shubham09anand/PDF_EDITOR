import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { PDFDocument } from 'pdf-lib';
import UploadFile from './Components/UploadFile';
import AboutFeature from './Components/AboutFeature';
import 'react-toastify/dist/ReactToastify.css';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

const ImagePDF = () => {
    const [uploadedPdf, setUploadedPdf] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [processStatus, setProcessStatus] = useState(false);

    // Uploading file function
    const handleFileChange = (e) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp", "image/avif"];
        const files = e.target.files;
        let uploadedImagePreviews = [];

        for (let index = 0; index < files.length; index++) {
            if (!allowedTypes.includes(files[index].type)) {
                toast.error("Only images are allowed");
                return;
            } else {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const tempImg = {
                        id: index,  // Using index as id for simplicity
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

    // Function to handle layout change
    const onLayoutChange = (layout) => {
        console.log('Layout changed:', layout);
    };

    // Define breakpoints and cols
    const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
    const cols = { lg: 3, md: 2, sm: 1, xs: 1, xxs: 1 }; // Define the number of columns for each breakpoint

    return (
        <div className='w-full'>
            <ToastContainer />
            <AboutFeature featureHeading={'Image To PDF'} featureDescription={'Convert your images into a single PDF document with ease. Upload multiple images and get them merged into one file.'} />

            {uploadedPdf === null && (
                <UploadFile type={"ImgToPDF"} handleFileChange={handleFileChange} multiple={true} />
            )}

            {/* Responsive Grid Layout for image previews */}
            {imagePreviews.length > 0 && (
                <ResponsiveGridLayout
                    className="layout w-96"
                    layout={imagePreviews.map((img, index) => ({
                        i: img.id.toString(),
                        x: index % 4,
                        y: Math.floor(index / 4),
                        w: 1,
                        h: 1
                    }))}
                    breakpoints={breakpoints}
                    cols={cols}
                    rowHeight={30}
                    onLayoutChange={onLayoutChange}
                >
                    {imagePreviews.map((src) => (
                        <div key={src.id} className='image-wrapper flex w-32 h-40 sm:w-96 sm:h-80'>
                            <img src={src.blob} alt={`uploaded-img-${src.id}`} className='shadow-[1px_1px_10px_gray] w-32 h-40 sm:w-52 sm:h-60 object-scale-down cursor-pointer' />
                            <div className="mt-1 w-32 sm:w-52 truncate font-semibold text-center">{src.name}</div>
                        </div>
                    ))}
                </ResponsiveGridLayout>
            )}
        </div>
    );
};

export default ImagePDF;
