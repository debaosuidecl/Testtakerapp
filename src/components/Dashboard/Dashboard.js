import React,{Component} from 'react'
import Card from '../Card/Card'
import Pen from '../images/pen.jpeg'
import instructions from '../images/instructions.jpg'
import {compose} from 'redux'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import ProgressBar from '../progressBar/progressBar'
import {updateRedirectPath, verifySubmittedBefore, setTimer} from '../../store/action/questions'
import {firestoreConnect} from 'react-redux-firebase'
import Modal from '../UI/Modal/Modal'
import {Link} from 'react-router-dom'

class Dashboard extends Component {
    
    state={ 
        cards: {
            testCard: {
                actionLocation: `/testtaker/${this.props.auth.uid}`,
                action: 'Start Test',
                image: Pen,
                title: 'Take the test',
                detail: 'This test will test your ability to Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis odio quibusdam nisi doloribus totam quos sit libero ad atque at'
            },
            instructionCard: {
                actionLocation: "/",
                action: 'View Instructions',
                image: instructions,
                title: 'View Test Instructions',
                detail: 'View Mandatory Test Instructions that will enable you answer follow the right steps in answering and navigation of questions'
            },
            
         },
        showModal: false
    }
    componentWillMount(){

    }
    componentDidMount(){

        this.props.verifySubmittedBefore()
        this.props.refreshRedirectPath()
    }

    onClickedHandler= ()=> {
        this.setState((prevState)=> {
            return{
                showModal: !prevState.showModal
            }
        })
    }

    render(){
        const {scores, auth} = this.props;
        const {Name, Surname, Designation} = this.props.profile;
        let authRedirect = null
        if(!this.props.auth.uid){
            authRedirect= <Redirect to="/signin"/>
        }
        const card = Object.keys(this.state.cards).map(key=>{
            const {title, detail, image, action, actionLocation} = this.state.cards[key]
            return (
                <div key={key} className="col s12 m6">
                            <Card title={title}
                             detail={detail}
                             image={image}
                             action={action} 
                             actionLocation={actionLocation}
                             clicked={action==='View Instructions'?null:this.onClickedHandler}
                              />
                </div>
            )
        })

        let modalContent = (<div className="container row">
            <h4 className="center col s12 teal-text">Click the Button Below to begin your evalution</h4>
            <p className="red-text">**Please do note that your evaluation will be timed**</p>
            <a onClick={()=> {
                       this.props.history.push(`/testtaker/${auth.uid}`)
                      // this.props.onSetTimer()
                   }} className="teal btn-small center col s12">Start Test</a> 

            </div>)
        console.log(scores)
        scores && scores.map(score=> {
            if(score.id === auth.uid){
                modalContent =  (
                <div className=" container row">
                     <h4 className="center col s12 teal-text">Your test is already taken</h4>
                     <Link to={`/thank-you-page/${auth.uid}`} className="teal btn-small center col s12">View Score</Link>
                   
                </div>
                    )
            } 
            return modalContent
        })
        return(
            <div style={{minHeight:'700px'}} className="container">
            {authRedirect}
                    {!Name && !Surname && !Designation? <ProgressBar isNotAbsolute/>: <div>
                    <h5 className="center">Welcome to the NEMSA Engineering Staff Assessment Engineer {Name} {Surname} ({Designation})</h5>
                        <div className="row card-row">
                            {card}
                        </div>
                    <Modal show={this.state.showModal} clicked={this.onClickedHandler}>
                        {/* <h5 className="teal-text">This is the Modal</h5> */}
                        <div className="center">{modalContent}</div>
                    </Modal>
                    </div>}
                
            </div>
        )
    }
}

const mapStateToProps = state=> {
    console.log(state);
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        scores: state.firestore.ordered['staff-scores'], //is an array sha

    }
}
const mapDispatchToProps = dispatch => {
    return {
        refreshRedirectPath: ()=> dispatch(updateRedirectPath()),
        verifySubmittedBefore: ()=> dispatch(verifySubmittedBefore()),
        onSetTimer: ()=> dispatch(setTimer())
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps),
        firestoreConnect([
            {collection: 'staff-scores'}
        ])

            )(Dashboard)