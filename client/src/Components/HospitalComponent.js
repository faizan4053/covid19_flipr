import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Jumbotron, Table,Dropdown, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import './style/style.css';

// import { CONTACTS } from '../share/contacts';
function RenderPrimary({pCon}){
   
    if(pCon==null) return(<></>);
    else{
        return(
            <Jumbotron className="container">
              <h4 className="text-left" > Hospital and Beds</h4>
                <div className="row">
                    <div className="col-12 col-md-4 text-left ">
                        url :<a href={`tel:${pCon.url}`} >{pCon.url}</a><br />
                        lastUpdated : <a href={`tel:${pCon.lastUpdated}`} >{pCon.lastUpdated}</a><br/>
                        </div>
                    
                    
                </div>
                </Jumbotron>
        );

    }
}


function RenderPr({pCon}){
   
        return(
            <Jumbotron className="container">
              <h4 className="text-left" > Medical Colleges and Beds</h4>
                </Jumbotron>
        );

    
}

function RenderRagional({regional}){
    var number =1;
    if(regional==null){
        return(<></>);
    }
    else{
        return(
            <Table borderless hover striped className="table-responsive">
            <thead>
                <tr>
                    <th>#</th>
                    <th> State Name</th>
                    <th> Rural Hospitals</th>
                    <th>Rural Beds</th>
                    <th> Urban Hospitals</th>
                    <th>Urban Beds</th>
                    <th> Total Hospitals</th>
                    <th> <code>Total Bed </code><code>(State Wise)</code></th>
                </tr>
            </thead>
            <tbody>
            {regional.map((reg)=>{
                return(
                    <tr key={number}>
                        <th scope="row">{number++}</th>
                        <td>{reg.state}</td>
                        <td>{reg.ruralHospitals}</td>
                        <td>{reg.ruralBeds}</td>
                        <td>{reg.urbanHospitals}</td>
                        <td>{reg.urbanBeds}</td>
                        <td>{reg.totalHospitals}</td>
                        <td>{reg.totalBeds}</td>
                        <td className=""><a className="text-left" href={"tel:"+reg.number} >{reg.number}</a></td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
        )
    }
}

function Rendergogo({regional}){
    var number =1;
    
    if(regional==null){
        return(<></>);
    }
    
    else{
        return(
            
            <Table borderless hover striped className="table-responsive">
            <thead>
                <tr >
                    <th className="one-line">#</th>
                    <th>State </th>
                    <th >Name</th>
                    <th>City</th>
                    <th>Ownership</th>
                    <th>AdmissionCapacity</th>
                    <th>HospitalBeds</th>
                </tr>
            </thead>
            <tbody>
            {regional.map((reg)=>{
                return(
                    <tr key={reg.name}>
                        <th scope="row">{number++}</th>
                        <td>{reg.state}</td>
                        <td>{reg.name}</td>
                        <td>{reg.city}</td>
                        <td>{reg.ownership}</td>
                        <td>{reg.admissionCapacity}</td>
                        <td>{reg.hospitalBeds}</td>
                        </tr>
                )
            })}
            </tbody>
        </Table>
        )
    }
}

class Hospital extends Component{
    constructor(props){
        super(props);
        this.state={
            summary:null,
            sources:null,
            regional:null,
            ste:'',
            type:'',
            State:[
                "Andaman and Nicobar Islands",
                "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chandigarh",
                "Chhattisgarh",
                "Dadra and Nagar Haveli",
                "Delhi",
                "Daman & Diu",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jammu and Kashmir",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Ladakh",
                "Lakshadweep",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Puducherry",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telengana",
                "Tripura",
                "Uttarakhand",
                "Uttar Pradesh",
                "West Bengal",
            ],
            types:[
                'Govt.',
                'Society',
                'Trust',
                'University',
                'Govt-Society',
                'Private'
            ],
            touch:{
                state:false,
                type:false
            }          
        };
        this.updateRender=this.updateRender.bind(this);
    }
    updateRender=()=>{
        console.log("HII YSH")
        var ab=this.state.medicalColleges;
        if(this.state.touch.state===true){
            ab=ab.filter((col)=>String(col.state).localeCompare(this.state.ste)===0);
        }
        if(this.state.touch.type===true){
            ab=ab.filter((col)=>(String(col.ownership).localeCompare(this.state.type)===0))
        }
        this.setState({ medicalColleges1:ab})
        console.log(JSON.stringify(ab));
    }
    componentDidMount(){
        fetch('https://api.rootnet.in/covid19-in/hospitals/beds')
        .then(response =>{
            console.log(response.body); 
            return response.json()})
        .then((res)=>{
            if(res!=null){
                this.setState({
                    summary:res.data.summary,
                    sources:res.data.sources[0],
                    regional:res.data.regional
                })
            }
        });
        fetch('https://api.rootnet.in/covid19-in/hospitals/medical-colleges')
        .then(response =>{
            console.log(response.body); 
            return response.json()})
        .then((res)=>{
            if(res!=null){
                this.setState({
                   medicalColleges:res.data.medicalColleges,
                   medicalColleges1:res.data.medicalColleges
                })
            }
        });
        
    }
    
    render(){
        return(
            <div className="container">
                <Breadcrumb className="row">
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/ContactUs">ContactUs</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Hospital's DashBoard</BreadcrumbItem>
                    <BreadcrumbItem><Link to="/GraphComponent">Graph</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/DrowGraph">Draw Graph</Link></BreadcrumbItem>
                </Breadcrumb>
                <div className="row">
                    <RenderPrimary pCon={this.state.sources} />
                </div>
                <div className="row">
                    {/* <h4 className="ml-3">Regional Wise</h4> */}
                    <RenderRagional regional={this.state.regional} />
                </div>
                <br></br>
                <br></br>
                <div className="row">
                    <RenderPr pCon={this.state.sources} />
                </div>
                <Form className="text-left" onChange={(e)=>this.updateRender(e)}>
                    <FormGroup row>
                        <Label htmlFor='state' md={2}>State :</Label>
                        <Col md={4}>
                            <Input type="select" id='state' value="" value={this.state.ste} onChange={(e)=>this.setState({ste:e.target.value,touch:{...this.state.touch,state:true}})}>
                                <option disabled selected></option>
                                {this.state.State.map((st)=>{
                                    return(
                                        <option key={st} value={st}>{st}</option>
                                    );
                                })}
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor='type' md={2}>Type :</Label>
                        <Col md={4}>
                            <Input type="select" id='type' value={this.state.type} onChange={(e)=>this.setState({type:e.target.value,touch:{...this.state.touch,type:true}})}>
                                <option disabled selected ></option>
                                {this.state.types.map((st)=>{
                                    return(
                                        <option key={st} value={st}>{st}</option>
                                    );
                                })}
                            </Input>
                        </Col>
                    </FormGroup> 
                </Form>
                <div className="row">
                    {/* <h4 className="ml-3">Regional Wise</h4> */}
                    <Rendergogo regional={this.state.medicalColleges1} />
                </div>
            </div>
        )
    }
}
export default Hospital;