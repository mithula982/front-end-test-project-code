import * as React from 'react';
import FirstPage from "./first_page/first_page";
import InvoiceModal from './new_invoice/InvoiceModal';
import {
  BrowserRouter,
  // Switch,
  Routes,
  Route
  // Redirect,
} from "react-router-dom";
import NewInvoice from './new_invoice/invoice';

function RoutePage() {
    return (
        < BrowserRouter>
        <Routes>
          <Route index paht="/" element={<FirstPage/>} />
          <Route path="/newInvoice" element={<NewInvoice/>} />
          <Route path="/newInvoiceDetail" element={<InvoiceModal/>} />
        </Routes>
      </ BrowserRouter>
      );
  }
  
  export default RoutePage;