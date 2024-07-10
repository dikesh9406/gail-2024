import React from 'react';
import './Footer.css';
import { useNavigate, Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className='footer'>
      <section className='footer-top'>
        <div className='social-networks'>
          <span>Get connected with us on social networks:</span>
          <div className='social-icons'>
            <a href='https://www.facebook.com/GAILIndia/' target='_blank' className='social-icon'><i className='fab fa-facebook-f'></i></a>
            <a href='https://x.com/gailindia?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor&mx=2' target='_blank' className='social-icon'><i className='fab fa-twitter'></i></a>
            <a href='https://www.gailonline.com/' className='social-icon'><i target='_blank'className='fab fa-google'></i></a>
            <a href='https://www.instagram.com/gailindia/?hl=en' className='social-icon'><i target='_blank'className='fab fa-instagram'></i></a>
            <a href='https://in.linkedin.com/company/gail-india-limited' className='social-icon'><i target='_blank'className='fab fa-linkedin'></i></a>
            {/* <a href='#' className='social-icon'><i className='fab fa-github'></i></a> */}
          </div>
        </div>
      </section>

      <section className='footer-main'>
        <div className='container'>
          <div className='row'>
            {/* <div className='col'>
              <h6 className='footer-title'>GAIL (India) Limited</h6>
              <p>GAIL Limited is an Indian state-owned energy corporation with primary interests in the trade, transmission and production distribution of natural gas. GAIL also has interests in the exploration and production solar and wind power, telecom and telemetry services and electricity generation.</p>
            </div> */}
            <div className='col'>
              <h6 className='footer-title'>Collaboration</h6>
              <p><a href='https://www.gailonline.com/' target='_blank' className='footer-link'>GAIL (India) Limited</a></p>

              <p><a href='https://www.iitkgp.ac.in/' target='_blank' className='footer-link'>IIT Kharagpur</a></p>
              <p><a href='' className='footer-link'>Prof. Aurobinda Routray</a></p>
            
              <p><a href='#' className='footer-link'>T. P. Yuvraj (DGM)</a></p>
                     
          
         
            </div>
            <div className='col'>
              <h6 className='footer-title'>Useful links</h6>
             
              <p> <Link className='footer-link' to="/">Dashboard</Link></p>
              <p> <Link className='footer-link' to="/profile">Profile</Link></p>
              

              <p> <Link className='footer-link' to="/about-us">About Us</Link></p>

              <p> <Link className='footer-link' to="/help">Help Section</Link></p>
            </div>
            <div className='col'>
              <h6 className='footer-title'>Contact</h6>
              <p><i className='fas fa-home'></i>Jubilee Tower B-35 & 36</p>
              <p><i className='fas fa-envelope'></i> gail2@gmail.com</p>
              <p><i className='fas fa-phone'></i> 0120-2446400</p>
              <p><i className='fas fa-print'></i> 4862400</p>
            </div>
          </div>
        </div>
      </section>

      <div className='footer-bottom'>
        <p>© 2021 Copyright: <a href='https://example.com' className='footer-link'>cgf.iitkgp.ac.in</a></p>
      </div>
    </footer>
  );
};

export default Footer;
