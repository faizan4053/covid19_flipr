import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Jumbotron, Table } from 'reactstrap';
import './style/style.css';
// import { CONTACTS } from '../share/contacts';

function RenderPrimaryContact({pCon}){
    var tollfree="number-tollfree";
    if(pCon==null) return(<></>);
    else{
        return(
            <Jumbotron className="container">
                {/* <div> {JSON.stringify(pCon)}</div> */}
                <h4 className="text-left" > Primary Contacts</h4>
                <div className="row">
                    <div className="col-12 col-md-4 text-left ">
                        Number : <a href={`tel:${pCon.number}`} >{pCon.number}</a><br />
                        Toll-free Number : <Link href={`tel:${pCon.number-tollfree}`} >{pCon.number-tollfree}</Link><br/>
                        Email : <a href={`mailto:${pCon.email}`} >{pCon.email}</a>
                    </div>
                    <div className="col-12 col-md-6 offset-md-2 mt-md-2 mt-3 mt-md-1">
                        <div className="text-center">
                            {/* <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a> */}
                            <a className="btn btn-social-icon btn-facebook mr-1" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-linkedin mr-1" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                            <a className="btn btn-social-icon btn-twitter mr-1" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                            {/* <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-"></i></a> */}
                            <a className="btn btn-social-icon " href="mailto:"><i className="fa fa-envelope-o"></i></a>
                        </div>
                                <div> Media Links:</div>
                                {pCon.media.map((m)=>{
                                    return(
                                        <span key={m}>
                                            <Link href={m}>Link</Link>
                                        </span>
                                    );
                                })}
                        
                    </div>
                    
                </div>

            </Jumbotron>
        );

    }
}

function RenderRagional({regional}){
    var number =1;
    if(regional==null){
        return(<></>);
    }
    else{
        return(
            <Table borderless hover striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>State</th>
                    <th> Helpline Number</th>
                </tr>
            </thead>
            <tbody>
            {regional.map((reg)=>{
                return(
                    <tr key={reg}>
                        <th scope="row">{number++}</th>
                        <td>{reg.loc}</td>
                        <td className=""><a className="text-left" href={"tel:"+reg.number} >{reg.number}</a></td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
        )
    }
}

class Contact extends Component{
    constructor(props){
        super(props);
        this.state={
            contacts:null,
            regional:null
        };
    }
    componentDidMount(){
        fetch('https://api.rootnet.in/covid19-in/contacts')
        .then(response =>{
            console.log(response.body); 
            return response.json()})
        .then((res)=>{
            if(res!=null){
                this.setState({
                    contacts:res.data.contacts.primary,
                    regional:res.data.contacts.regional
                })
            }
        });

    }
    
    render(){
        return(
            <div className="container">
                <Breadcrumb className="row">
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>ContactUs</BreadcrumbItem>
                    <BreadcrumbItem><Link to="/hospital">Hospital's DashBoard</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/GraphComponent">Graph</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/DrowGraph">Draw Graph</Link></BreadcrumbItem>
                </Breadcrumb>
                <div className="row">
                    <RenderPrimaryContact pCon={this.state.contacts} />
                </div>
                <div className="row">
                    {/* <h4 className="ml-3">Regional Wise</h4> */}
                    <RenderRagional regional={this.state.regional} />
                </div>
            </div>
        )
    }
}
export default Contact;