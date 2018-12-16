import React,{PureComponent} from 'react'
import TestQuestionFormat from './testQuestionFormat'
import ScrollTopHOC from '../ScrollTopHOC/ScrollTopHOC'
import {connect} from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import ProgressBar from '../progressBar/progressBar'
import {submitQuestion, verifySubmittedBefore, setTimer} from '../../store/action/questions'
import {Redirect, withRouter} from 'react-router-dom'
import withErrorHandler from '../hoc/WithErrorHandler'
import axios from 'axios'
import objectLen from '../../utilities/utilities'
import moment from 'moment'


class TestTaker extends PureComponent {
    state={
        numberIndex: 1,
        answers: {},
        answeredQuestions: 0,
        time: null

        }
        componentWillMount(){
            this.props.verifySubmittedBefore()
        }
        componentDidMount(){
            this.props.onSetTimer();
            console.log(this.myTimer)
        }
        
        componentWillUnmount(){
            clearTimeout(this.myTimer)
        }

       
       
        onChangedHandler = (e)=> {
            console.log(e)
            let answers = {
              ...this.state.answers,
                [e.target.parentNode.parentNode.parentNode.id]: {
                ...this.state[`${e.target.parentNode.parentNode.parentNode.id}`],
                selectedOption: e.target.value
              }
            }
            //console.log(objectLen(answers), 'lenght of answers object')
            this.setState({
                answeredQuestions: objectLen(answers)
            })
            this.setState({answers})
          }

          onSubmitHandler = (e)=> {
              e.preventDefault();
              const answers = {
                  ...this.state.answers
              }
              clearTimeout(this.myTimer)
              setTimeout(()=>{this.props.onSubmit(answers);}, 1500)

          }
          timeControllerMain= (duration, interval)=> {
            
            this.myTimer = setTimeout(()=>{
                let timer = ()=> {duration = moment.duration(duration - 1000, 'milliseconds');
                let time = `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`
                this.setState({time})
                console.log(time)
            }
                  timer()
              }, 1000)
                
              //console.log('seconds',duration.seconds())
              if((duration.hours()<= 0 && duration.minutes()<= 0 && duration.seconds()<= 0) || duration.seconds()<0 || duration.hours()<0 || duration.minutes()<0){
                clearTimeout(this.myTimer)
                this.myTimer=null;
                const answers = {
                    ...this.state.answers
                }
                setTimeout(()=>{
                    this.props.onSubmit(answers);
                }, 2000 )
               


              }
          }
         
         clearTimer = ()=> {  
                clearTimeout(this.myTimer)
                this.myTimer=null;
                      
        }
       
   
    render(){
      //  const {number, question, A, B, C, D} = this.state.questions;
      const compare = (a,b) =>{
        if (a.number < b.number)
          return -1;
        if (a.number > b.number)
          return 1;
        return 0;
      }
     
      const {questions, staffScores, auth, setUserTimer} = this.props
        let sortedQuestions = questions? questions.sort(compare): null
      
      let toThankYouPage = null
      let submissionConfirmation = null
      if(this.props.redirectPath){
          toThankYouPage = <Redirect to={this.props.redirectPath}/>
      }
      staffScores && staffScores.map(score=> {
        if(score.id === score[auth.uid]){
             submissionConfirmation = true
        }
        return submissionConfirmation
      })
        
        //set Timer
        let end = null
        let diffTime = null
        let duration = null
        let interval = 1000;
       
     
        setUserTimer && setUserTimer.map(timeObject=> {
            if(timeObject.id === auth.uid){
                end = timeObject.endDate
                diffTime = end - new Date()
                duration = moment.duration(diffTime, 'milliseconds');
                
                  this.timeControllerMain(duration, interval)
            }
            return true
        })
           

        const myStyle = {
            
        }
         
        return(
        
         <div className="container" style={{minHeight: 400}}>
            {toThankYouPage}
            
            <div id="timer" className="z-depth-2 black-text teal lighten-1 center ">
                <i style={{marginTop: 20}} className="material-icons large white-text">access_time</i>
                <h5 className="white-text center">{this.state.time && this.state.time? this.state.time: <ProgressBar isNotAbsolute isWhite/>}</h5>
            </div>
            {!sortedQuestions?null:<h4>Answer <strong>ALL</strong> Questions</h4>}
            
            {!sortedQuestions && submissionConfirmation===true?<ProgressBar/>:sortedQuestions && sortedQuestions.map(presentQuestion=> {
                return (
                
                <TestQuestionFormat
                key= {presentQuestion.id}
                onChangeHandler={this.onChangedHandler}
                questionid={presentQuestion.id}
                number = {presentQuestion.number}
                question = {presentQuestion.questions}
                A = {presentQuestion.A} B={presentQuestion.B} C={presentQuestion.C} D={presentQuestion.D}
            />
                )
            })}
            
            {!sortedQuestions? null: <button onClick={this.onSubmitHandler}
             className="submit-test btn-small teal darken-3"
              disabled={this.props.loading || objectLen(sortedQuestions) !== this.state.answeredQuestions }>Submit<span>{this.props.loading?<ProgressBar/>:null}</span></button>}
            
         </div>
        
        )
    }
}

const mapStateToProps = state=> {
         console.log(state)
       return{
        questions: state.firestore.ordered.questions,
        auth: state.firebase.auth,
        loading: state.answers.loading,
        staffScores: state.firestore.ordered['staff-scores'],
        redirectPath: state.answers.redirectPath,
        setUserTimer: state.firestore.ordered['setusertimer']
    }
    
}
const mapDispatchToProps = dispatch=> {
        return{
            onSubmit : (answers)=>dispatch(submitQuestion(answers)),
            verifySubmittedBefore: ()=> dispatch(verifySubmittedBefore()),
            onSetTimer: ()=> dispatch(setTimer())

        }
}

export default ScrollTopHOC(withErrorHandler(withRouter(compose(connect(mapStateToProps, mapDispatchToProps),
firestoreConnect([
    { collection: 'questions' },
    {collection: 'staff-scores'},
    {collection: 'setusertimer'}
])
                    )(TestTaker)), axios))