import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import ProgressBar from '../progressBar/progressBar'
import {verifySubmittedBefore} from '../../store/action/questions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

class ThankYouPage extends Component{
    componentWillMount(){
        this.props.onVerify();
    }
    render(){
        const {Name, Surname, Designation} = this.props.profile;
        const {yourAnswer, auth} = this.props
        let ThankYouPage = <ProgressBar/>;
        let notYetTakenTest = null
        
        yourAnswer && yourAnswer.map(answer=> {

            if(answer.id === auth.uid){
         ThankYouPage = (
            <div className="container" style={{marginTop: 40, minHeight: 300}}>
                <div className="row">
               {!Name && !Surname && !Designation? <ProgressBar/>: (<div className="col s12">
                     <h4 className="teal-text text-darken-2">Hi there Engineer {Name} {Surname}({Designation})!</h4>
                     {answer && auth.uid?<h4>Your Score is {answer.score}%</h4>: <h4>Not Yet Taken Test! go to homepage and take your test</h4>}
                     <Link to='/'> Homepage</Link>
               </div>)}
             </div>
            
            </div>
                )
            }
            return ThankYouPage 
        })
        setTimeout(()=> {
            ThankYouPage = (<h4 className="teal-text text-darken-2">Error Loading this page, Please Try again later</h4>)
        },100000)
        
       
        return (
            <div className="container" style={{marginTop: 40, minHeight: 300}}>
                {notYetTakenTest}
                <div className="row">
                { ThankYouPage ? ThankYouPage: null }
                </div>
            
            </div>
        )
    }
} 


const mapStateToProps = state=> {
    console.log(state)
    return{
        profile: state.firebase.profile,
        loading: state.answers.loading,
        auth: state.firebase.auth,
        yourAnswer: state.firestore.ordered['staff-scores']
    }
}
const mapDispatchToProps = dispatch=> {
    return{
        onVerify : ()=> dispatch(verifySubmittedBefore())
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
                            { collection: 'staff-scores' }
                     ])

)(ThankYouPage)