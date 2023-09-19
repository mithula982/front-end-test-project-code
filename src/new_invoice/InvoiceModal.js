import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
// import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiCloudDownload, BiArrowBack } from "react-icons/bi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation,Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Card from '@material-ui/core/Card';

function GenerateInvoice() {
  html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [612, 792]
    });
    pdf.internal.scaleFactor = 1;
    const imgProps= pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('invoice-001.pdf');
  });
}

const  InvoiceModal = (props) => {
  // render() {
    const location = useLocation();
    const propsData = location.state;
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(propsData);
    return(
      <Row>
      <Row>
            <div className="d-flex flex-row align-items-start justify-content-between mb-1">
              <div class="d-flex flex-column"> 
              <div className="d-flex flex-row align-items-center" style={{padding:'5px 0px 0px 20px', color: '#1160F7', fontSize:'13px'}}>
              <Link to='/newInvoice'>
              < BiArrowBack style={{height: '15px', width: '33px'}} />
              <span className="me-1">Back</span> 
              </Link>
              </div>
              <div className="d-flex flex-row align-items-center" style={{padding:'0px 0px 0px 20px'}}>
                <span className="me-1">New Invoice : #{propsData.info.invoiceNumber||''}</span>   
              </div>
                <div className="d-flex flex-row " style={{padding:'0px 0px 0px 20px', color: 'gray', fontSize:'13px'}}>
                  <span className="me-1">REFERENCE&nbsp;ID: RB242424</span>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center"  style={{padding:'10px 0px 20px 0px'}}>
              <Row>
              <Col md={6}>
                <Button variant="primary" className="d-block w-100" onClick={GenerateInvoice}>
                  <BiPaperPlane style={{width: '15px', height: '15px', marginTop: '-3px'}} className="me-2"/>Send 
                </Button>
              </Col>
              <Col md={6}>
                <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={GenerateInvoice}>
                  Download
                </Button>
              </Col>
            </Row>
            {/* <InvoiceModal showModal={this.state.isOpen} closeModal={this.closeModal} info={this.state} items={this.state.items} currency={this.state.currency} subTotal={this.state.subTotal} taxAmmount={this.state.taxAmmount} discountAmmount={this.state.discountAmmount} total={this.state.total}/> */}
              </div>
            </div>
            <hr className="my-1"/>
            </Row>
        <Col md={8} lg={8} style={{padding:'0px 0px 0px 200px'}}>
          <Card className="p-4 p-xl-3 my-1 my-xl-1" >
          <div>
        {/* <Modal show={propsData .showModal} onHide={propsData .closeModal} size="lg" centered> */}
          <div id="invoiceCapture">
            <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
              <div >
                <h4 className="fw-bold my-2">{propsData.info.billFrom||'Invoice'}</h4>
                <h6 className="fw-bold text-secondary mb-1">
                  Invoice No : #{propsData.info.invoiceNumber||''}
                </h6>
              </div>
              <div className="text-end ">
                <h6 className="mt-1 mb-2">Issue&nbsp;Date : 21 June 2023</h6>
                <h6 className="mt-1 mb-2">Due&nbsp;Date : 21 June 2023</h6>
              </div>
            </div>
            <div className="p-4">
              <Row className="mb-4">
                <Col md={4}>
                  <div className="fw-bold">Billed to:</div>
                  <div>{propsData.info.billToEmail||''}</div>
                  <div>Sarah Thompson</div>
                  <div>{propsData.info.billToAddress||''}</div>
                  
                </Col>
                <Col md={4}>
                  <div className="fw-bold">Billed From:</div>
                  <div>{propsData.info.billFromEmail||''}</div>
                  <div>Rajesh Kapoor</div>
                  <div>{propsData.info.billFromAddress||''}</div>
                
                </Col>
              </Row>
              <Table className="mb-0">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th className="text-end">Price</th>
                    <th className="text-end">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {propsData.items.map((item, i) => {
                    return (
                      <tr id={i} key={i}>
                        <td>
                          {item.name}
                        </td>
                        <td style={{width: '70px'}}>
                          {item.quantity}
                        </td>
                        <td className="text-end" style={{width: '100px'}}>{propsData.currency} {item.price}</td>
                        <td className="text-end" style={{width: '100px'}}>{propsData.currency} {item.price * item.quantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Table>
                <tbody>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{width: '100px'}}>SUBTOTAL</td>
                    <td className="text-end" style={{width: '100px'}}>{propsData.currency} {propsData.subTotal}</td>
                  </tr>
                  {propsData.taxAmmount !== 0.00 &&
                    <tr className="text-end">
                      <td></td>
                      <td className="fw-bold" style={{width: '100px'}}>TAX</td>
                      <td className="text-end" style={{width: '100px'}}>{propsData.currency} {propsData.taxAmmount}</td>
                    </tr>
                  }
                  {propsData.discountAmmount !== 0.00 &&
                    <tr className="text-end">
                      <td></td>
                      <td className="fw-bold" style={{width: '100px'}}>DISCOUNT</td>
                      <td className="text-end" style={{width: '100px'}}>{propsData.currency} {propsData.discountAmmount}</td>
                    </tr>
                  }
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{width: '100px'}}>TOTAL</td>
                    <td className="text-end" style={{width: '100px'}}>{propsData.currency} {propsData.total}</td>
                  </tr>
                </tbody>
              </Table>
              <div className=" fw-bold bg-light py-3 px-4 rounded">
              Payment Method
                </div>
                <div className="bg-light py-3 px-4 rounded">
                Account Name Rajesh Kapoor
                </div>
                <div className="bg-light py-3 px-4 rounded">
                Account Number 1234 5678 910
                </div>
                <div className="bg-light py-3 px-4 rounded">
                IFSC Code ICIC12345
                </div>
                <hr/>
                <div className="d-flex flex-row align-items-start justify-content-between" style={{
                    fontSize: '1.125rem'
                  }}>
                </div>
                
              {propsData.info.notes &&
                <div className="fw-bold bg-light py-3 px-4 rounded">
                 Message - {propsData.info.notes}
                </div>}
                {propsData.info.tearm &&
                <div className="fw-bold bg-light py-3 px-4 rounded">
                 Terms & Conditions - {propsData.info.tearm}
                </div>}
            </div>
          </div>
        {/* </Modal> */}
        <hr className="mt-4 mb-3"/>
      </div>
          </Card>
        </Col>
        <Col md={4} lg={4} style={{padding:'0px 100px 0px 30px'}}>
          <div className="sticky-top pt-md-3 pt-xl-2"> 
            <Col lg={8}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Bill to:
                  </span>
                  <span>Sarah Thompson</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Amount:</span>
                    <span >{propsData.currency} {propsData.total}</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">status
                  </span>
                  <span style={{color:'red'}}>Pending</span>
                </div>
                <hr/>
                <div className="d-flex flex-row align-items-start justify-content-between" style={{
                    fontSize: '1.125rem'
                  }}>
                  <span className="fw-bold"> 
                  <Button variant="primary" className="d-block w-120" style={{width:'250px'}} >Send Reminder
                </Button>
                  </span>
                </div>
                
              </Col>

              <div className="sticky-top " style={{padding:"60px 0px 0px 0px"}}> 
            <Col lg={8}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Invoice activity
                  </span>
                </div>
                <hr/>
                <div className="d-flex flex-row align-items-start justify-content-between" style={{
                    fontSize: '1.125rem'
                  }}>
                </div>
                <div >
                  <div>21/06/2023, 20:12:21
                  </div>
                  <div>
                  You sent an invoice of {propsData.currency} {propsData.total} to
                  </div>
                  <div>
                  Sarah Thompson 
                  </div>
                  <div>
                  ({propsData.info.billToEmail||''})
                  </div>
                </div>
              </Col>
          </div>
          </div>
        </Col>
      </Row>




      
    )
  // }
}

export default InvoiceModal;
