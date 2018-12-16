import React, {Component} from 'react';
import {connect} from 'react-redux'
import { signin } from "../../store/action/authAction";
import {Redirect} from 'react-router-dom'

class SignIn extends Component {
    state={
        email: "",
        password: ""
    }

    handleChange = (e)=> {

        this.setState({
            [e.target.id]: e.target.value
        })
    }

    submitHandler = (e)=> {
        e.preventDefault()
        this.props.onSignIn(this.state)
    }
    render() {
        const {authError, auth} = this.props
        let authRedirect = null
        if(auth.uid && this.props.redirectPath){
            authRedirect = <Redirect to={this.props.redirectPath}/>
        }
            let form = (
                <form onSubmit={this.submitHandler} className="signinform white z-depth-1">
                <h3 className="teal-text text-lighten-1 center">Sign In</h3>
                <div className="input-field">
                <i className="material-icons prefix ">email</i>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <i className="material-icons prefix ">vpn_key</i>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={this.handleChange}/>
                </div>
                <div className="input-field center">
                    <button className="btn teal lighten-1 z-depth-0">Login</button>
                </div>
                <div className="red-text center">
                    {authError? <p>{authError.message}</p>: null}
    </div>
            </form>
            )
        return (
            <div className="container">
                {authRedirect}
               {form}
            </div>
        );
    }
}
const mapStateToProps = state=> {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError,
        redirectPath: state.auth.redirectPath

    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (credentials)=> dispatch(signin(credentials))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn)
