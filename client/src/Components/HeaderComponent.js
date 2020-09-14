import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import './style/style.css';
class Header extends Component{
    constructor(props){
        super(props);
        this.state={
            isNavOpen:false
        }
        this.togglerNav =this.togglerNav.bind(this);
    }
    togglerNav=()=>{
        this.setState({
            isNavOpen:!this.state.isNavOpen
        })
    }
    render(){
        return(
            <Navbar dark  expand="md">
                <div className="container">
                    <NavbarToggler onClick={this.togglerNav} />
                    <NavbarBrand className="ml-auto " href="/">
                        <h3>COVID-19</h3>
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar className="text-left ml-4 ml-md-1">
                        <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/Hospital'><span className="fa fa-bed fa-lg"></span> Hospital and Beds</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/GraphComponent'><span className="fa fa-line-chart fa-lg"></span> Graph(Filters)</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/DrowGraph'><span className="fa fa-map-o fa-lg"></span>Graph View</NavLink>
                        </NavItem>
                        
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        );
    }
}
export default Header;