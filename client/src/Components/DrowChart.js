import React, {Component} from 'react';
import  { Bar , Line} from 'react-chartjs-2';
import './style/style.css';
import { Link } from 'react-router-dom';
import {StyleSheet } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button, Form, FormGroup, Input, Label,Breadcrumb, BreadcrumbItem  } from 'reactstrap';
const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  }
const style =StyleSheet.create({
    page:{
        flexDirection:'row',
        backgroundColor:'#E4E4E4'
    },
    sections:{
        margin:10,
        padding:10,
        flexGrow:1
    }
})
class DrowGraph extends Component{
    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'png', 30, 50);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
          })
        ;
      }
    sendMail=(e)=>{

    }
    render(){
        const chartData={
            labels :['fdsd','dfdf','dfd','dfs','dfss'],
            datasets:[
                {
                    label: 'Graph Chart',
                    // backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    fill:false,
                    lineTension:0,
                    pointRadius:5,
                    data:[1,8,3,18,5]
                },{
                    label: 'Graph Chart',
                    // backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    lineTension:0,
                    pointRadius:5,
                    fill:false,
                    data:[1,8,3,18,5]
                }
            ]
        }
        return(<>
            
            {/* <PDFViewer> */}
            <div id="divToPrint">
                <Bar  
                    data={chartData}    
                >
                </Bar>
                <Line data={data}></Line>
            </div>
            <div className="container mt-3">
                
                <Form className=" " onSubmit={(e)=>this.sendMail(e)}>
                    <FormGroup>
                    <Button onClick={this.printDocument} className="right">Print</Button>
                    </FormGroup>
                    <FormGroup row>
                        <Input type="email" id='mail' className="col-6 col-md-5 ml-3 ml-md-0" placeholder="Enter Email Id"></Input>
                        <Label htmlFor="mail" className="col-2" ></Label><Button type="submit">Mail Me</Button>
                    </FormGroup>
                    
                </Form>
            </div>
            

        </>);
    }
}
export default DrowGraph;