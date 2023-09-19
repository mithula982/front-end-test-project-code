import React from 'react';
import logo from '../images/logo.png';
import '../first_page/first_page.css';
import Button from '@material-ui/core/Button';
import '../App';
import {useNavigate} from "react-router-dom";

function FirstPage() {
    const navigate = useNavigate();

  const navigateToContacts = () => {
    // 👇️ navigate to /contacts
    navigate('/newInvoice');
  };
    return (
        <div>
        <img src={logo} alt="cur" class="center" style={{width:"250px", height:"100px"}}
        />
        <section class="textSection">
            <h2 class="textDec">Invoice request from Sarah Thompson</h2>
            <h2 class="textDec">(Reference ID: RB242424)</h2>
        </section>
       <section class="buttonSection">
       <Button onClick={navigateToContacts} variant="contained" class="button" >Create an Invoice</Button>
       </section>
      </div>
    );
  }
  
  export default FirstPage;