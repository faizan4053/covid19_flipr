import Axios from 'axios';
import React ,{ Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import DrowGraph from './DrowChart';
import './style/style.css'

class GraphComponent extends Component{
    constructor(props){
        super(props);
        this.state ={
            ste:'',
            age:'',
            gender:'',
            dateStart:'',
            dateEnd:'',
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
            ageGroup:[
                '0-9',
                '10-19',
                '20-29',
                '30-39',
                '40-49',
                '50-59',
                '60-69',
                '70 and above'
            ],
            touch:{
                state:false,
                age:false,
                gender:false,
                date:false
            }
        }
        this.getData =this.getData.bind(this);
        this.dataFilter=this.dataFilter.bind(this);
    }
     dataFilter(e){
        e.preventDefault();
        console.log("Function called")
        var data={
            state:this.state.ste,
            state_present:this.state.touch.state,
            age:this.state.age,
            age_present:this.state.touch.age,
            gender:this.state.gender,
            start_date:this.state.dateStart,
            end_date:this.state.dateEnd,
            date_present:this.state.touch.date
        }
         Axios.post('http://localhost:4000/filter_parameters',data)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
        console.log('entry');
         this.componentDidMount();
       // this.getData();

       console.log('exit');
        
    }
    componentDidMount(){
        fetch('http://localhost:4000/graph_parameters')
        .then(res=>res.json())
        .then(customers => this.setState({customers},()=>console.log('customers fetched..',customers)));
        // this.dataFilter();
    }
    getData(){
        fetch('http://localhost:4000/graph_parameters')
        .then(res=>res.json())
        .then(customers => this.setState({customers},()=>console.log('customers fetched..',customers)));
        // this.dataFilter();
    }
    render(){
        return(
            <div className="modal-body mt-3 " >
                <div className="row ">
                    <div className=" col-sm-12 col-md-5">
                        {/* <img width="200" height="200"/> */}
                        <DrowGraph />
                    </div>
                    <div className="col-sm-12 col-md-6 text-left ml-md-4 ">
                        <Form  onSubmit={(e)=>this.dataFilter(e)} className="abc">
                            <FormGroup row >
                                <Label htmlFor="state" md={3}>State: </Label>
                                <Col md={6}>
                                    <Input type="select" id="state" value={this.state.ste} onChange={(e)=>this.setState({ ste:e.target.value,touch:{...this.state.touch,state:true}})}>
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
                                <Label htmlFor="age" md={3}>Age Group: </Label>
                                <Col md={2}>
                                    <Input type="select" id="age" value={this.state.age} onChange={(e)=>this.setState({ age:e.target.value,touch:{...this.state.touch,age:true}})}  >
                                        <option disabled selected></option>
                                        {this.state.ageGroup.map((st)=>{
                                            return(
                                                <option key={st} value={st}>{st}</option>
                                            );
                                        })}
                                    </Input>
                                </Col>

                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="gender" md={3}>Gender: </Label>
                                <Col md={2}>
                                    <Input type="select" id="gender" value={this.state.gender} onChange={(e)=>this.setState({gender:e.target.value,touch:{...this.state.touch,gender:true}})}>
                                        <option disabled selected></option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                        <option value="NA">NA</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="date" md={3}>Date Range: </Label>
                                <Col md={4}>
                                    <Input type="date" id='stratData' value={this.state.dateStart} onChange={(e)=>this.setState({ dateStart:e.target.value,touch:{...this.state.touch,date:true} })}></Input>
                                </Col>
                                <Col md={4}>
                                    <Input type="date" id='endData' value={this.state.dateEnd} onChange={(e)=>this.setState({ dateEnd:e.target.value,touch:{...this.state.touch, date:true} })}></Input>
                                </Col>
                            </FormGroup>
                            <Button type="submit">Submit</Button>
                        </Form> 
                    </div>                  
                </div>

            </div>
        );
    }
}
export default GraphComponent;
