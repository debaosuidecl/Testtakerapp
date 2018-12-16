import React from 'react'
import {NavLink} from 'react-router-dom'
import {signOut} from '../../store/action/authAction'
import {connect} from 'react-redux'
const SignedInLinks = (props)=> {
    return (
        <ul className={props.isSideNav? 'side-nav':'right hide-on-med-and-down'}>
             <li><NavLink to="/">Dashboard</NavLink></li>
          {// eslint-disable-next-line
          <li><a  onClick={()=> {
                props.onSignOut()
                window.location.reload();
            }} to="/">Log Out</a></li>
          }
         { !props.isSideNav?<li><NavLink to="/" className="btn btn-floating teal lighten-1">{props.profile.Initials}</NavLink></li>: null}
        </ul>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        onSignOut: ()=> dispatch(signOut())
    }
}
const mapStateToProps = state =>{
    return {
            auth: state.firebase.auth,
            profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)