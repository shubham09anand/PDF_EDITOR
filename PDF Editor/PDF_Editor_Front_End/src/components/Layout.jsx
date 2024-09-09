import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
// import Header from './Header';
import PreviousDocs from './CreatePDF/PreviousDocs';

const Layout = () => {

     const [isFocused, setIsFocused] = useState(false);

     const controllDisplay = (value) => {
          setIsFocused(value)
     }

     return (
          <>
               <div className='pt- w-screen'>
                    <Routes>
                         <Route path="/" element={<Home />} />
                         <Route path="/split_pdf" element={<SplitPDF />} />
                         <Route path="/pdf_to_img" element={<PdfToImg />} />
                         <Route path="/delete_pages" element={<DeletePages />} />
                         <Route path="/merge_pdf" element={<MergePdf />} />
                         <Route path="/shuffle_pdf" element={<ShufflePdf />} />
                         <Route path="/word_to_pdf" element={<WordToPdf />} />
                         <Route path="/add_page_number" element={<AddPageNumber />} />
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