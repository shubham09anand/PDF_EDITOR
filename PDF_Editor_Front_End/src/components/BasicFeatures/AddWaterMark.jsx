import React, { useState, useEffect } from 'react';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import ColorPicker from '@rc-component/color-picker';
import '@rc-component/color-picker/assets/index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DownLoadEditedPDF from './Components/DownLoadEditedPDF';
import UploadFile from './Components/UploadFile';
import AboutFeature from './Components/AboutFeature';
import Slider from '@mui/material/Slider';

const AddWaterMark = () => {

     const [selectedFiles, setSelectedFiles] = useState([]);
     const [colorDisplay, setColorDisplay] = useState(false)
     const [color, setColor] = useState('#212529');
     const [watermark, setWatermark] = useState("PDFCollbrator")
     const [isItalic, setIsItalic] = useState(false);
     const [isBold, setIsBold] = useState(false);
     const [isUnderline, setIsUnderline] = useState(false);
     const [font, setFont] = useState(20);
     const [rotation, setRotation] = useState(0);
     const [textOpacity, setTextOpacity] = useState(30);
     const [coordinates, setCoordinates] = useState([]);
     const [blob, setBlob] = useState(null)

     const handleFileChange = async (e) => {
          if (e.target.files[0].type !== 'application/pdf') {
               toast.error("Only PDFs are allowed");
               return;
          }
          const files = e.target.files;
          setSelectedFiles(files);
     };

     const handleColorChange = (newColor) => {
          // Convert Color object to hex string
          setColor(newColor.toHexString());
     };

     const watermarkStyle = {
          fontSize: `${font * 0.7}px`,
          fontWeight: isBold ? 'bold' : 'normal',
          fontStyle: isItalic ? 'italic' : 'normal',
          textDecoration: isUnderline ? 'underline' : 'none',
          opacity: textOpacity / 100,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          whiteSpace: 'nowrap',
          color: color,
     };

     useEffect(() => {
          if (selectedFiles.length === 1) {
               const addWaterMark = async () => {
                    const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

                    // Use the state values for the watermark text, font size, etc.
                    const watermarkText = watermark; // from state
                    const fontSize = font; // from state
                    const opacity = textOpacity / 100; // from state
                    const rotationDegrees = rotation; // from state
                    const rotationRadians = degreesToRadians(rotationDegrees);

                    // Convert color from hex to RGB
                    const hexToRgb = (hex) => {
                         const bigint = parseInt(hex.slice(1), 16);
                         const r = (bigint >> 16) & 255;
                         const g = (bigint >> 8) & 255;
                         const b = bigint & 255;
                         return rgb(r / 255, g / 255, b / 255);
                    };
                    const watermarkColor = hexToRgb(color); // Convert state color to RGB

                    try {
                         // Load the PDF file as an ArrayBuffer
                         const fileBuffer = await selectedFiles[0]?.arrayBuffer();
                         const pdfDoc = await PDFDocument.load(fileBuffer);

                         // Embed the font
                         const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

                         const pages = pdfDoc.getPages();
                         const newCoordinates = [];

                         // Loop over all pages
                         for (const page of pages) {
                              const { width, height } = page.getSize();

                              // Loop to add watermarks diagonally across each page
                              for (let y = 0; y < height; y += 150) {
                                   for (let x = -100; x < width; x += 200) {
                                        // Draw bold watermark text using the state values
                                        page.drawText(watermarkText, {
                                             x: x,
                                             y: y,
                                             size: fontSize,
                                             color: watermarkColor, // Use the converted color
                                             opacity: opacity, // Use state opacity
                                             font: boldFont,
                                             rotate: degrees(rotationDegrees), // Use state rotation
                                        });

                                        // Optionally, add underline if `isUnderline` is true
                                        if (isUnderline) {
                                             const textWidth = boldFont.widthOfTextAtSize(watermarkText, fontSize);
                                             const underlineThickness = 1;  // Thickness of the underline
                                             const startX = x;
                                             const startY = y - 5;  // Adjust Y to position the underline under the text
                                             const endX = x + textWidth;
                                             const endY = y - 5;

                                             // Rotate the start and end points around the text position
                                             const rotatePoint = (px, py) => {
                                                  const dx = px - x;
                                                  const dy = py - y;
                                                  return {
                                                       x: x + dx * Math.cos(rotationRadians) - dy * Math.sin(rotationRadians),
                                                       y: y + dx * Math.sin(rotationRadians) + dy * Math.cos(rotationRadians),
                                                  };
                                             };

                                             const { x: startXRotated, y: startYRotated } = rotatePoint(startX, startY);
                                             const { x: endXRotated, y: endYRotated } = rotatePoint(endX, endY);

                                             page.drawLine({
                                                  start: { x: startXRotated, y: startYRotated },
                                                  end: { x: endXRotated, y: endYRotated },
                                                  thickness: underlineThickness,
                                                  color: watermarkColor, // Use the same color for underline
                                                  opacity: opacity, // Use the same opacity for underline
                                             });
                                        }

                                        // Store the coordinates
                                        newCoordinates.push({ x, y });
                                   }
                              }
                         }

                         // Save the updated PDF document
                         const pdfBytesUpdated = await pdfDoc.save();

                         // Optionally, if you want to create a downloadable link:
                         const blob = new Blob([pdfBytesUpdated], { type: 'application/pdf' });
                         const downloadUrl = URL.createObjectURL(blob);
                         setBlob(downloadUrl); // Update the blob for download
                         setCoordinates(newCoordinates); // Update the coordinates state
                    } catch (error) {
                         console.error("Error adding watermark:", error);
                    }
               };


               addWaterMark();  // Call the function
          }
     }, [selectedFiles, font, color, rotation, textOpacity, isUnderline, isItalic, watermark, coordinates]);  // Dependency array      

     const positions = [];
     const originalWidth = 595;
     const originalHeight = 842;

     const newWidth = 416;
     const newHeight = 589;

     const scaleX = newWidth / originalWidth;
     const scaleY = newHeight / originalHeight;

     const spacingY = 150 * scaleY;
     const spacingX = 200 * scaleX;

     for (let y = 0; y < newHeight; y += spacingY) {
          for (let x = -100 * scaleX; x < newWidth; x += spacingX) {
               positions.push({ x, y });
          }
     }

     return (
          <div className='p-2 w-full'>
               <ToastContainer />

               <AboutFeature featureHeading={'Add Watermark to PDF'} featureDescription={'Easily add custom text or image watermarks to your PDF documents.'} />

               {selectedFiles.length === 0 &&
                    <UploadFile handleFileChange={handleFileChange} multiple={false} />
               }

               {selectedFiles.length !== 0 &&
                    <div className='flex w-full place-content-center select-none mt-4'>
                         <div className='w-3/5'>
                              <div className='overflow-hidden w-[416.5px] h-[589.4px] border-[2px] border-black rounded-md mx-auto bg-white relative z-[50]'>
                                   {positions.map((pos, index) => (
                                        <div key={index} style={{ ...watermarkStyle, position: 'absolute', top: pos.y, left: pos.x, transform: `translate(-50%, -50%) rotate(${rotation}deg)`, }}>
                                             {watermark}
                                        </div>
                                   ))}
                                   <div className='text-5xl opacity-60 font-semibold z-50 bottom-5 right-5 absolute'><span className='font-normal'>A</span>4</div>
                              </div>
                         </div>

                         <div className='w-[40%] flex-col justify-between px-5 border-l-2'>
                              <div className='text-gray-900 text-3xl font-semibold mb-3'>Water Mark Setting</div>

                              <div>
                                   <div className='mb-3'>
                                        <div className='text-gray-900 text-xl font-semibold mb-3'>Watermark Text:</div>
                                        <input disabled={colorDisplay} onChange={(e) => setWatermark(e.target.value)} value={watermark} type="text" className={`border-2 border-gray-800 outline-none rounded-md w-full h-fit py-2 pl-4 placeholder:text-gray-400 ${isItalic ? 'italic' : ''} ${isBold ? 'font-extrabold' : ''} ${isUnderline ? 'underline' : ''}`} placeholder='Water Mark Text' />
                                   </div>

                                   <div className='mb-2'>
                                        <div className='text-gray-900 text-xl font-semibold mb-2'>Text Format:</div>
                                        <div className='flex relative'>
                                             <div onClick={() => isBold ? setIsBold(false) : setIsBold(true)} className={`h-fit w-fit px-2 py-1 font-extrabold mr-4 cursor-pointer hover:bg-slate-200 rounded-md ${isBold ? 'shadow-inner bg-gray-200' : ""}`}>B</div>
                                             <div onClick={() => isItalic ? setIsItalic(false) : setIsItalic(true)} className={`h-fit w-fit px-[10px] py-1 font-bold italic mr-4 cursor-pointer hover:bg-slate-200 rounded-md ${isItalic ? 'shadow-inner bg-gray-200' : ""}`}>I</div>
                                             <div onClick={() => isUnderline ? setIsUnderline(false) : setIsUnderline(true)} className={`h-fit w-fit px-2 py-1 font-bold mr-4 cursor-pointer hover:bg-slate-200 rounded-md underline ${isUnderline ? 'shadow-inner bg-gray-200' : ""}`}>U</div>
                                             {colorDisplay &&

                                                  <div className='absolute -top-60'>
                                                       <ColorPicker color={color} onChangeComplete={handleColorChange} />
                                                  </div>
                                             }
                                             <div onClick={() => colorDisplay ? setColorDisplay(false) : setColorDisplay(true)} className={`h-fit w-fit px-2 py-1 font-bold mr-4 cursor-pointer hover:bg-slate-200 rounded-md text-[${color}] ${colorDisplay ? 'shadow-inner bg-gray-200' : ""}`}>Text Color</div>

                                        </div>
                                   </div>

                                   <div className='mb-2'>
                                        <div className='text-gray-900 text-xl font-semibold mb-1'>Font Size:</div>
                                        <div className='flex space-x-5 place-content-center items-center'>
                                             <Slider value={font} color="primary" aria-label="slider" onChange={(_, newValue) => setFont(newValue)} />
                                             <input type="text" value={font} disabled className='border-2 border-gray-300 text-center rounded-md px-2 py-2 w-12 h-fit outline-none' />
                                        </div>
                                   </div>

                                   <div className='mb-2'>
                                        <div className='text-gray-900 text-xl font-semibold mb-1'>Text Rotation:</div>
                                        <div className='flex space-x-5 place-content-center items-center'>
                                             <Slider min={0} max={360} value={rotation} color="primary" aria-label="slider" onChange={(_, newValue) => setRotation(newValue)} />
                                             <input type="text" value={rotation} disabled className='border-2 border-gray-300 text-center rounded-md px-2 py-2 w-12 h-fit outline-none' />
                                        </div>
                                   </div>

                                   <div className='-mb-4'>
                                        <div className='text-gray-900 text-xl font-semibold mb-1'>Text Opacity:</div>
                                        <div className='flex space-x-5 place-content-center items-center'>
                                             <Slider value={textOpacity} color="primary" aria-label="slider" onChange={(_, newValue) => setTextOpacity(newValue)} />
                                             <input type="text" value={textOpacity} disabled className='border-2 border-gray-300 text-center rounded-md px-2 py-2 w-12 h-fit outline-none' />
                                        </div>
                                   </div>

                                   {blob !== null &&
                                        <DownLoadEditedPDF blob={blob} />
                                   }
                              </div>
                         </div>
                    </div>
               }

          </div>
     )
}

export default AddWaterMark