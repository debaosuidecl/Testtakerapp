import React from 'react'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import SideNav from './SideNav'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import Backdrop from '../UI/Backdrop/Backdrop'

 class Navbar extends React.Component{

    state={
        showSideNav : false
    }

    sideNavHandler = ()=> {
        this.setState(prevState=> {
            return {
                showSideNav: !prevState.showSideNav
            }
        })
    }

    render(){
        let links 
        if (this.props.auth.uid){
            links = <SignedInLinks/>
        } else{
            links = <SignedOutLinks/>
        }
    return (
        <nav style={{position:'fixed', top: 0, zIndex:99}} className="nav-wrapper teal lighten-2">
        <a href="#" onClick={this.sideNavHandler}className="sidenav-trigger" data-target="mobile-menu">
                    <i className="material-icons">menu</i>
                </a>
            <div className="container">
                <div className="brand-logo">
                  <Link to="/">DTester</Link> 
                </div>
                
               {links}
            </div>
            <SideNav showSideNav={this.state.showSideNav}/>
            <Backdrop withSideNav show={this.state.showSideNav} clicked={this.sideNavHandler}/>

        </nav>
    )
    }
}
const mapStateToProps = state=> {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

export default connect(mapStateToProps)(Navbar)