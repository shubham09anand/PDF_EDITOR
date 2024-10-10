import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

import Home from './Home';
import TextEditior from './CreatePDF/TextEditior';
import SplitPDF from "./BasicFeatures/SplitPDF";
import PdfToImg from './BasicFeatures/PdfToImg';
import DeletePages from './BasicFeatures/DeletePages';
import MergePdf from './BasicFeatures/MergePdf';
import ShufflePdf from './BasicFeatures/ShufflePdf';
import WordToPdf from './BasicFeatures/WordToPdf';
import AddPageNumber from './BasicFeatures/AddPageNumber';
import PreviousDocs from './CreatePDF/PreviousDocs';
import AddWaterMark from './BasicFeatures/AddWaterMark';
import ImagePDF from './BasicFeatures/ImagePDF';
import Header from './Header';

const Layout = () => {

     const [isFocused, setIsFocused] = useState(false);

     const controllDisplay = (value) => {
          setIsFocused(value)
     }

     const location = useLocation();
     const { pathname } = location;

     const useDocumentTitle = (title) => {
          useEffect(() => {
               document.title = title;
          }, [title]);
     };

     const titleMap = {
          '/': 'Home - PDFCollbrator',
          '/split_pdf': 'Split PDF - PDFCollbrator',
          '/pdf_to_img': 'PDF to Image - PDFCollbrator',
          '/img_to_pdf': 'Image to PDF - PDFCollbrator',
          '/delete_pages': 'Delete Pages - PDFCollbrator',
          '/merge_pdf': 'Merge PDF - PDFCollbrator',
          '/shuffle_pdf': 'Shuffle PDF - PDFCollbrator',
          '/word_to_pdf': 'Word to PDF - PDFCollbrator',
          '/add_page_number': 'Add Page Numbers - PDFCollbrator',
          '/add_water_mark': 'Add Watermark - PDFCollbrator',
          '/create_pdf': 'Previous Documents - PDFCollbrator',
          '/create_doc': 'Create Document - PDFCollbrator',
          '/create_doc/document/:id': 'Document Editor - PDFCollbrator',
     };

     let title = titleMap[pathname] || 'Default Title';


     useDocumentTitle(title);

     return (
          <>
               <Header/>
               <div className='w-screen pt-10'>
                    <Routes>
                         <Route path="/" element={<Home />} />
                         <Route path="/split_pdf" element={<SplitPDF />} />
                         <Route path="/pdf_to_img" element={<PdfToImg />} />
                         <Route path="/img_to_pdf" element={<ImagePDF />} />
                         <Route path="/delete_pages" element={<DeletePages />} />
                         <Route path="/merge_pdf" element={<MergePdf />} />
                         <Route path="/shuffle_pdf" element={<ShufflePdf />} />
                         <Route path="/word_to_pdf" element={<WordToPdf />} />
                         <Route path="/add_page_number" element={<AddPageNumber />} />
                         <Route path="/add_water_mark" element={<AddWaterMark />} />
                         <Route path="/create_pdf" element={<PreviousDocs />} />
                         <Route path="/create_doc/">
                              <Route path="/create_doc/" element={<Navigate replace to={`/create_doc/document/${uuidv4()}`} />} />
                         </Route>
                         <Route path="/create_doc/document/:id" element={<TextEditior isFocused={isFocused} controllDisplay={controllDisplay} />} />
                    </Routes>
               </div>
          </>
     )
}

export default Layout