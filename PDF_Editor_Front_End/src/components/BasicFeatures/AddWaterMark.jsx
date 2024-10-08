import React, { useState } from 'react';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import ColorPicker from '@rc-component/color-picker';
import '@rc-component/color-picker/assets/index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DownLoadEditedPDF from './Components/DownLoadEditedPDF';
import UploadFile from './Components/UploadFile';
import AboutFeature from './Components/AboutFeature';
import Slider from '@mui/material/Slider';
import LoadingPlaneAnimation from '../Animation/LoadingPlaneAnimation';

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
     const [blob, setBlob] = useState(null);
     const [editDisplay, setEditDisplay] = useState(false);
     const [processStatus, setProcessStatus] = useState(false);

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

     const reupload = () => {
          setSelectedFiles([]);
          setColorDisplay(false);
          setWatermark("")
          setBlob(null)
     }

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

     const addWaterMark = async () => {
          if (selectedFiles.length === 1) {
               setProcessStatus(true);
               const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

               // Use the state values for the watermark text, font size, etc.
               const watermarkText = watermark;
               const fontSize = font;
               const opacity = textOpacity / 100;
               const rotationDegrees = rotation;
               const rotationRadians = degreesToRadians(rotationDegrees);

               // Convert color from hex to RGB
               const hexToRgb = (hex) => {
                    const bigint = parseInt(hex.slice(1), 16);
                    const r = (bigint >> 16) & 255;
                    const g = (bigint >> 8) & 255;
                    const b = bigint & 255;
                    return rgb(r / 255, g / 255, b / 255);
               };
               const watermarkColor = hexToRgb(color);

               try {
                    // Load the PDF file as an ArrayBuffer
                    const fileBuffer = await selectedFiles[0]?.arrayBuffer();
                    const pdfDoc = await PDFDocument.load(fileBuffer);

                    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

                    const pages = pdfDoc.getPages();
                    const newCoordinates = [];

                    // Loop over all pages
                    for (const page of pages) {
                         const { width, height } = page.getSize();

                         // Loop to add watermarks diagonally across each page
                         for (let y = 0; y < height; y += 150) {
                              for (let x = -100; x < width; x += 200) {
                                   page.drawText(watermarkText, {
                                        x: x,
                                        y: y,
                                        size: fontSize,
                                        color: watermarkColor,
                                        opacity: opacity,
                                        font: boldFont,
                                        rotate: degrees(rotationDegrees),
                                   });

                                   // if isUnderline is true
                                   if (isUnderline) {
                                        const textWidth = boldFont.widthOfTextAtSize(watermarkText, fontSize);
                                        const underlineThickness = 1;
                                        const startX = x;
                                        const startY = y - 5;
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
                                             color: watermarkColor,
                                             opacity: opacity,
                                        });
                                   }

                                   newCoordinates.push({ x, y });
                              }
                         }
                    }

                    const pdfBytesUpdated = await pdfDoc.save();

                    // blob of edited pdf
                    const blob = new Blob([pdfBytesUpdated], { type: 'application/pdf' });
                    const downloadUrl = URL.createObjectURL(blob);
                    setBlob(downloadUrl);
                    setProcessStatus(false);
               } catch (error) {
                    toast.error('Error While Adding Water Mark');
               }
               finally {
                    setProcessStatus(false);
               }
          }
     };

     // reset water mark config
     const resetSetting = () => {
          setBlob(null);
     }

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
          <div className='w-full md:pl-5 mb-32'>
               <ToastContainer />

               <AboutFeature featureHeading={'Add Watermark to PDF'} featureDescription={'Easily add custom text or image watermarks to your PDF documents.'} />

               {selectedFiles.length === 0 &&
                    <UploadFile handleFileChange={handleFileChange} multiple={false} />
               }

               {selectedFiles.length !== 0 &&
                    <div className="mx-auto flex h-full w-fit mt-5 md:mb-10 shadow-sm p-2 rounded-lg">
                         <div className="bg-white h-full mr-2 my-auto flex place-content-center items-center">
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

               {selectedFiles.length !== 0 &&
                    <div className='flex relative w-full md:place-content-center select-none md:mt-4'>
                         <div className='w-full lg:w-3/5 relative'>
                              <div className='scale-[80%] sm:scale-100 -translate-y-5 sm:translate-y-10 -translate-x-4 mb:-translate-x-2 lg:translate-x-0 overflow-hidden w-[416.5px] h-[589.4px] border-[2px] border-black rounded-md mx-auto bg-white relative z-[50]'>
                                   {positions.map((pos, index) => (
                                        <div key={index} style={{ ...watermarkStyle, position: 'absolute', top: pos.y, left: pos.x, transform: `translate(-50%, -50%) rotate(${rotation}deg)`, }}>
                                             {watermark}
                                        </div>
                                   ))}
                                   <div className='text-5xl opacity-60 font-semibold z-10 bottom-5 right-5 absolute'><span className='font-normal'>A</span>4</div>
                              </div>
                              <svg onClick={() => setEditDisplay(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 absolute z-50 top-10 right-1 cursor-pointer md:hidden">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                         </div>

                         <div className={`absolute right-0 translate-y-9 z-50 md:block md:static bg-white w-96 md:w-3/4 lg:w-1/3 shadow-[.1px_.1px_2px_#7656f5] rounded-lg flex-col place-content-center justify-between p-5 pt-0 border-gray-900 ${editDisplay ? 'block' : 'hidden'}`}>
                              <div className='flex justify-between w-full'>
                                   <div className='gap-x-5 items-center mb-3'>
                                        <div className='text-gray-900 text-3xl font-semibold'>Water Mark Setting</div>
                                        {blob && <div onClick={resetSetting} className='cursor-pointer text-lg h-fit w-fit bg-gradient-to-tr from-[#3d83ff] via-[#846be6] to-[#7656f5] text-white px-3 rounded-full active:opacity-75'>Reset</div>}
                                   </div>
                                   <svg onClick={() => setEditDisplay(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="rotate-180 size-6 mt-3 cursor-pointer md:hidden">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                   </svg>
                              </div>
                              <div>
                                   <div className='mb-3'>
                                        <div className='text-gray-900 text-xl font-semibold mb-3'>Watermark Text:</div>
                                        <input disabled={colorDisplay || blob} onChange={(e) => setWatermark(e.target.value)} value={watermark} type="text" className={`border-2 border-gray-800 outline-none rounded-md w-full h-fit py-2 pl-4 placeholder:text-gray-400 ${isItalic ? 'italic' : ''} ${isBold ? 'font-extrabold' : ''} ${isUnderline ? 'underline' : ''}`} placeholder='Water Mark Text' />
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
                                             <Slider disabled={blob} max={100} value={font} color="primary" aria-label="slider" onChange={(_, newValue) => setFont(newValue)} />
                                             <input type="text" value={font} disabled className='border-2 border-gray-300 text-center rounded-md px-2 py-2 w-12 h-fit outline-none' />
                                        </div>
                                   </div>

                                   <div className='mb-2'>
                                        <div className='text-gray-900 text-xl font-semibold mb-1'>Text Rotation:</div>
                                        <div className='flex space-x-5 place-content-center items-center'>
                                             <Slider disabled={blob} min={0} max={360} value={rotation} color="primary" aria-label="slider" onChange={(_, newValue) => setRotation(newValue)} />
                                             <input type="text" value={rotation} disabled className='border-2 border-gray-300 text-center rounded-md px-2 py-2 w-12 h-fit outline-none' />
                                        </div>
                                   </div>

                                   <div className='-mb-4'>
                                        <div className='text-gray-900 text-xl font-semibold mb-1'>Text Opacity:</div>
                                        <div className='flex space-x-5 place-content-center items-center'>
                                             <Slider disabled={blob} value={textOpacity} color="primary" aria-label="slider" onChange={(_, newValue) => setTextOpacity(newValue)} />
                                             <input type="text" value={textOpacity} disabled className='border-2 border-gray-300 text-center rounded-md px-2 py-2 w-12 h-fit outline-none' />
                                        </div>
                                   </div>

                                   {blob == null &&
                                        <div onClick={addWaterMark} className='select-none bg-gradient-to-tr from-[#3d83ff] via-[#846be6] to-[#7656f5] mx-auto w-fit h-fit px-4 py-2 rounded-xl text-lg uppercase font-semibold text-white tracking-wide cursor-pointer active:opacity-80 mt-6'>Apply Watermark</div>
                                   }

                                   {blob !== null &&
                                        <DownLoadEditedPDF downloadMessage={"Watermark had been added to PDF pages. Now you can download it."} blob={blob} />
                                   }
                              </div>

                         </div>
                    </div>
               }

               {processStatus && blob == null &&
                    <div className='fixed top-0 z-[1000900] w-screen h-screen flex place-content-center items-center backdrop-blur-[2px]'>
                         <LoadingPlaneAnimation processType={'Making Your Shuffled PDF'} />
                    </div>
               }

          </div>
     )
}

export default AddWaterMark