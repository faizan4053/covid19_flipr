import React, { Component } from 'react';
import { Switch,Route, Router, Redirect } from 'react-router-dom';
import Contact from './ContactUsComponent';
import Hospital from './HospitalComponent';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import GraphComponent from './GraphComponent';
import DrowGraph from './DrowChart';
class Main extends Component{
    // constructor(props){
    //     super(props);

    // }
    render(){
        return(
            <div >
                <Header />
                <Switch>
                    <Route path='/home' component={Home} />
                    <Route path='/contactus' component={Contact} />
                    <Route path='/Hospital' component={Hospital} />
                    <Route exact path='/GraphComponent' component={GraphComponent} />
                    <Route path='/DrowGraph' component={DrowGraph} />
                    <Redirect to='/home' />
                </Switch>
              

            </div>
        );
    }
}
export default Main;