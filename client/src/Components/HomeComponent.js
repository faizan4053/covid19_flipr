import React, { Component } from 'react';
import CarouseComponent  from './CarouseComponent';
import {Table} from 'reactstrap';
import './style/style.css';
function RenderNotifications({notification}){
    if(notification==null){
        return(<></>);
    }
    else{
        const data=notification.map((noti)=>{
            console.log(noti.title.split(";"));
            if( noti.title.split(";").length>1 || noti.title.length<11 ){
                return(
                    <tr>
                        <th scope="row">N/A</th>
                        <td>{noti.title.replace("&nbsp;", " ")}</td>
                        <td><a href={noti.link}>Link</a> </td>
                    </tr>
                );
            }
            else{
                return(
                    <tr>
                        <th scope="row"><code>{noti.title.split(" ")[0]}</code></th>
                        <td >{noti.title.substring(10)}</td>
                        <td ><a href={noti.link}>Link</a> </td>
                    </tr>
                )
            }
        })
        return(
            <Table borderless hover striped responsive>
                <thead>
                    <tr>
                        <th scope="col">Data</th>
                        <th scope="col">Notification Title</th>
                        <th scope="col"> Link </th>
                    </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
            </Table>
        );
    }
}

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            notification:null
        }
    }
    componentDidMount(){
        fetch('https://api.rootnet.in/covid19-in/notifications')
        .then(response =>{
            // console.log(response.body); 
            return response.json()})
        .then((res)=>{
            if(res!=null){
                this.setState({
                    notification:res.data.notifications,
                    // regional:res.data.contacts.regional
                })
            }
        });
    }
    render(){
        return(
            <div className="container">
                <CarouseComponent />
                <div className=" text-left" >
                    <RenderNotifications notification = {this.state.notification} />
                </div>
            </div>
        )
    }
}
export default Home;
