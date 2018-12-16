import React from 'react'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {connect} from 'react-redux'


const sideNav = ({auth, showSideNav})=> {
    const myStyle = {
        background: 'teal',
        flexFlow: 'column',
        position: 'fixed',
        height: '100vh',
        minWidth: '300px',
        transform: showSideNav?'translateX(0)':'translateX(-1000px)',
        transition: '.2s all ease'
    }
    let links
    if (auth.uid){
        links =  <SignedInLinks isSideNav/>


    } else{
        links =<SignedOutLinks isSideNav/>

    }
    return (
        <ul style={myStyle} className="sideNav" id="mobile-menu">
        {links}
        </ul>
        

    )
}

const mapStateToProps = state=> {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

export default connect(mapStateToProps)(sideNav)