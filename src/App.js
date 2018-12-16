import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter, Route, Switch, Redirect, Link} from 'react-router-dom'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import Footer from './components/Footer/Footer'
import TestTaker from './components/testTaker/testTaker'
import { connect } from 'react-redux'
import {signOut} from './store/action/authAction'
import ProgressBar from './components/progressBar/progressBar'
import ThankYouPage from './components/ThankYouPage/ThankYouPage'
import AdminAuth from './AdminComponent/AdminAuth/AdminAuth'
import AdminDashboard from './AdminComponent/AdminDashboard/AdminDashboard'


class App extends Component {
  componentDidMount(){
    if(this.props.auth.uid){
      setTimeout(()=> {
        this.props.onSignOut()
        window.location.reload();
    }, 1000000)
    }

    
    
  }
  
  render() {
    let routes = (
          <Switch>
                <Route path="/admin/signin" exact component={AdminAuth}/>
                <Route path="/signin" exact component={SignIn}/>
                <Route path="/signup" component={SignUp}/>
                <Redirect exact from="/" to="/signin"/>
                <Redirect  from='/users/:id' to= '/signin'/>
                <Redirect exact from= "/admin-account/:id" to="/admin/signin"/>
                <Redirect exact from= "/testtaker/:id" to="/signin"/>
                <Redirect exact from= "/thank-you-page/:id" to="/signin"/>

                
                <Route render={()=> {
                  return <p>Error opening page</p>
                }}/>
               
          </Switch>
         
    )
      if(this.props.auth.uid && this.props.auth.uid!=="vFI7RWNR5BYsvH0mnazhsJ5dfB32"){
        routes = <Switch>
          
          <Route path={`/users/${this.props.auth.uid}`} exact component={Dashboard}/>
          <Route path="/testtaker/:id" exact component={TestTaker}/>
          <Route path="/thank-you-page/:id" exact component={ThankYouPage}/>
          <Redirect to={`/users/${this.props.auth.uid}`}/>
        </Switch>
      }
      else if (this.props.auth.uid === 'vFI7RWNR5BYsvH0mnazhsJ5dfB32'){
        routes = <Switch>
          {this.props.auth.uid?<Route path={`/admin-account/${this.props.auth.uid}`} exact component={AdminDashboard}/>: null}
          <Redirect from="/admin/signin" exact to={`/admin-account/${this.props.auth.uid}`}/>
          <Route render={()=> {return <div className="container" style={{minHeight: 500}}>
             <h3>Hi there Admin! Visit your admin account here</h3>
             <Link to={`/admin-account/${this.props.auth.uid}`}>Admin Account</Link>
             </div>}}/>

          </Switch>
      }
    
  
    return (
      <BrowserRouter >
      <div className="App">
        <Navbar/>
        {this.props.loading?<ProgressBar/>: null}
        {routes}
        <Footer/>
  </div>
      </BrowserRouter>
      
    );
  }
}
const mapStateToProps = (state)=> {
    return{
      auth: state.firebase.auth,
      loading: state.auth.loading
    }
}
const mapDispatchToProps = dispatch => {
  return{
    onSignOut: ()=> dispatch(signOut())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
