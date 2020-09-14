import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import "./style/style.css";
class Footer extends Component {
    render(){
        return(
          <div className="main-footer">
            <div className="footer-middle">
          <div className="container">
          <div className="row">
          <div className="col-12 col-md-6 offset-md-2 mt-md-2 mt-3 mt-md-1">
          <div className="col-12 col-md- text-left ">
                        Number : 0705463491 
                        Toll-free Number : +913459504123 <br></br>
                        Email : covidcare@gmail.com<br></br>
                    </div>
                    </div>         
          <div className="col-12 col-md-4 text-left ">
                         <a href={"http://localhost:3000/home"} >  Home  </a><br></br>
                         <a href={"http://localhost:3000/contactus"} >ContactUs </a><br />
                         <a href={"http://localhost:3000/Hospital"} >Hospital and Beds </a><br />
                         <a href={"http://localhost:3000/GraphComponent"} >Graph(Filter) </a><br />
                         <a href={"http://localhost:3000/DrowGraph"} >Graph(View) </a><br />
                    </div>
                    </div>
                   
                    <div className="">
                            {/* <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a> */}
                            <a className="btn btn-social-icon btn-facebook mr-1" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-linkedin mr-1" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                            <a className="btn btn-social-icon btn-twitter mr-1" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                            {/* <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-"></i></a> */}
                            <a className="btn btn-social-icon " href="mailto:"><i className="fa fa-envelope-o"></i></a>
                        </div>
                   
        
         {/* Footer Bottom */}
         <div></div>
         <div className="footer-bottom">
        <p className="text-xs-center">
            &copy;{new Date().getFullYear()} Covid-19 Website - All Right Reserved
        </p>
         </div>
         
          </div>
          </div>
          </div>         
        );
    }
}
export default Footer;

