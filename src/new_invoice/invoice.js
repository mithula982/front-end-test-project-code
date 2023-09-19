import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from '@material-ui/core/Card';
import InvoiceItem from './InvoiceItem';
// import InvoiceModal from './InvoiceModal';
import InputGroup from 'react-bootstrap/InputGroup';
import {  BiArrowBack } from "react-icons/bi";
import { useNavigation, Link} from "react-router-dom";

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currency: '',
      due: '',
      // currentDate: '',
      invoiceNumber: 1,
      dateOfIssue: '',
      billTo: '',
      billToEmail: '',
      billToAddress: '994 Victoria Park Ave Toronto, Ontario, Canada, K0G 1J0',
      billFrom: '',
      billFromEmail: '',
      billFromAddress: 'D-45, 37, Gurgaon, Gurgaon Delhi, India, 122001',
      notes: '',
      tearm:'',
      total: '0.00',
      subTotal: '0.00',
      taxRate: '13',
      taxAmmount: '0.00',
      discountRate: '',
      discountAmmount: '0.00'
    };
    this.state.items = [
      {
        id: 0,
        name: '',
        description: '',
        price: '1.00',
        quantity: 1
      }
    ];
    this.editField = this.editField.bind(this);
  }
  
  componentDidMount(prevProps) {
    this.handleCalculateTotal()
  }
  handleRowDel(items) {
    var index = this.state.items.indexOf(items);
    this.state.items.splice(index, 1);
    this.setState(this.state.items);
    this.handleCalculateTotal();
  };
  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var item = {
      id: id,
      name: '',
      price: '1.00',
      description: '',
      quantity: 1
    }
    this.state.items.push(item);
    this.setState(this.state.items);
    this.handleCalculateTotal();
  }
  handleCalculateTotal() {
    var items = this.state.items;
    var subTotalFun =0;
    
   var sum = items.map(function(item) {
    subTotalFun = subTotalFun+(parseInt(item.quantity)* parseInt(item.price))
      return subTotalFun;
    });

    this.setState({
      subTotal: parseFloat( subTotalFun).toFixed(2)
    }, () => {
      this.setState({
        taxAmmount: parseFloat(parseFloat(subTotalFun) * (this.state.taxRate / 100)).toFixed(2)
      }, () => {
        this.setState({
          discountAmmount: parseFloat(parseFloat(subTotalFun) * (this.state.discountRate / 100)).toFixed(2)
        }, () => {
          this.setState({
            total: ((subTotalFun - this.state.discountAmmount) + parseFloat(this.state.taxAmmount))
          });
        });
      });
    });

  };
  onItemizedItemEdit(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    var items = this.state.items.slice();
    var newItems = items.map(function(items) {
      for (var key in items) {
        if (key === item.name && items.id == item.id) {
          items[key] = item.value;
        }
      }
      return items;
    });
    this.setState({items: newItems});
    this.handleCalculateTotal();
  };
  editField = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.handleCalculateTotal();
  };


  onCurrencyChange = (selectedOption) => {
    this.setState(selectedOption);
  };

  onDueChange = (selectedOption) => {
    this.setState(selectedOption);
  };
  nav = (event) => {
      const navigation = useNavigation();
      navigation.navigate('/newInvoiceDetail', {
        showModal:this.state.isOpen, closeModal:this.closeModal ,info: this.state ,items:this.state.items ,currency:this.state.currency ,subTotal:this.state.subTotal ,taxAmmount:this.state.taxAmmount,discountAmmount:this.state.discountAmmount ,total:this.state.total
      });
  };

  openModal = (event) => {
    event.preventDefault()
    this.handleCalculateTotal()
    this.setState({isOpen: true})
  };
  closeModal = (event) => this.setState({isOpen: false});
  render() {

    return (
    <Form onSubmit={this.openModal}>
      <Row>
      <Row>
            <div className="d-flex flex-row align-items-start justify-content-between mb-1">
              <div class="d-flex flex-column"> 
              <div className="d-flex flex-row align-items-center" style={{padding:'5px 0px 0px 20px', color: '#1160F7', fontSize:'13px'}}>
              <Link to="/">
              < BiArrowBack style={{height: '15px', width: '33px'}} />
              <span className="me-1">Back</span> 
              </Link>
              </div>
              <div className="d-flex flex-row align-items-center" style={{padding:'0px 0px 0px 20px'}}>
                <span className="me-1">New&nbsp;Invoice:&nbsp;</span>
                <Form.Control type="number" value={this.state.invoiceNumber} name={"invoiceNumber"} onChange={(event) => this.editField(event)} min="1" style={{
                    maxWidth: '70px', borderColor:'white'
                  }} required="required"/>   
              </div>
                <div className="d-flex flex-row " style={{padding:'0px 0px 0px 20px', color: 'gray', fontSize:'13px'}}>
                  <span className="me-1">REFERENCE&nbsp;ID: RB242424</span>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center"  style={{padding:'10px 0px 20px 0px'}}>
                <Link to='/newInvoiceDetail' state= {
                            {
                              showModal:this.state.isOpen ,info: this.state ,items:this.state.items ,currency:this.state.currency ,subTotal:this.state.subTotal ,taxAmmount:this.state.taxAmmount,discountAmmount:this.state.discountAmmount ,total:this.state.total, 
                            }
                          }>
              <Button variant="primary" type="submit" className="d-block w-100"  >Share</Button></Link>
            {/* <InvoiceModal showModal={this.state.isOpen} closeModal={this.closeModal} info={this.state} items={this.state.items} currency={this.state.currency} subTotal={this.state.subTotal} taxAmmount={this.state.taxAmmount} discountAmmount={this.state.discountAmmount} total={this.state.total}/> */}
              </div>
            </div>
            <hr className="my-1"/>
            </Row>
        <Col md={8} lg={8} style={{padding:'0px 0px 0px 130px'}}>
          <Card className="p-4 p-xl-3 my-1 my-xl-1" >
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                <Form.Control placeholder={"Customer's email address"} value={this.state.billToEmail} type="email" name="billToEmail" className="my-2" onChange={(event) => this.editField(event)} autoComplete="email" required="required"/>
                <Form.Label >Customer's address</Form.Label>
                <Form.Control placeholder={"Customer's address"} value={this.state.billToAddress} type="text" name="billToAddress" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required" readOnly style={{height:'60px'}}/>
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control placeholder={"Your Email address"} value={this.state.billFromEmail} type="email" name="billFromEmail" className="my-2" onChange={(event) => this.editField(event)} autoComplete="email" required="required"/>
                <Form.Label >Your address</Form.Label>
                <Form.Control placeholder={"Your address"} value={this.state.billFromAddress} type="text" name="billFromAddress" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required" readOnly style={{height:'60px'}}/>
              </Col>
            </Row>
            <InvoiceItem onItemizedItemEdit={this.onItemizedItemEdit.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} currency={this.state.currency} items={this.state.items} subTotal={this.state.subTotal}/>            <Row className="mt-4 justify-content-end">
            </Row>
            <hr className="my-4"/>
           <Form.Group>
           <Form.Label >Message</Form.Label>
            <Row>
            <Form.Control placeholder="Type your message" name="notes" value={this.state.notes} onChange={(event) => this.editField(event)} as="textarea" className="my-2" rows={1} style={{width:'450px'}}/>
            <Form.Select onChange={event => this.onDueChange({due: event.target.value})} className="btn btn-light my-1 " style={{width:'250px'}} aria-label="Change Due">
              <option value="">Due</option>
                <option value="CAD">On Receipt</option>
                <option value="USD">Card</option>
              </Form.Select>
            </Row>
            <Form.Control placeholder={"Terms & Conditions"} value={this.state.tearm} name="tearm" className="my-2" onChange={(event) => this.editField(event)} />
           </Form.Group>
          </Card>
        </Col>
        <Col md={4} lg={4} style={{padding:'0px 100px 0px 30px'}}>
          <div className="sticky-top pt-md-3 pt-xl-2"> 
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select onChange={event => this.onCurrencyChange({currency: event.target.value})} className="btn btn-light my-1 " style={{width:'250px'}} aria-label="Change Currency">
              <option value="">Select Currency</option>
                <option value="CAD">CAD (Canadian Dollar)</option>
                <option value="USD">USD (United States Dollar)</option>
                <option value="GBP">GBP (British Pound Sterling)</option>
                <option value="JPY">JPY (Japanese Yen)</option>
                <option value="AUD">AUD (Australian Dollar)</option>
                <option value="SGD">SGD (Signapore Dollar)</option>
                <option value="CNY">CNY (Chinese Renminbi)</option>
                <option value="BTC">BTC (Bitcoin)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3" style={{width:'350px'}}>
              <Form.Label className="fw-bold">Tax rate:</Form.Label>
              <InputGroup className="my-1">
                <Form.Control name="taxRate" type="number" value={this.state.taxRate}  onChange={(event) => this.editField(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00" style={{width:'50px'}} />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3" style={{width:'350px'}}>
              <Form.Label className="fw-bold">Discount rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control name="discountRate" type="number" value={this.state.discountRate} onChange={(event) => this.editField(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Col lg={8}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:
                  </span>
                  <span>{this.state.currency}&nbsp;
                    {this.state.subTotal}</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small ">({this.state.discountRate || 0}%)</span>
                    {this.state.currency}&nbsp;
                    {this.state.discountAmmount || 0}</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax:
                  </span>
                  <span>
                    <span className="small ">({this.state.taxRate || 0}%)</span>
                    {this.state.currency}&nbsp;
                    {this.state.taxAmmount || 0}</span>
                </div>
                <hr/>
                <div className="d-flex flex-row align-items-start justify-content-between" style={{
                    fontSize: '1.125rem'
                  }}>
                  <span className="fw-bold">Total:
                  </span>
                  <span className="fw-bold">{this.state.currency}&nbsp;
                    {this.state.total || 0}</span>
                </div>
              </Col>
          </div>
        </Col>
      </Row>
    </Form>)
  }
}

export default InvoiceForm;
