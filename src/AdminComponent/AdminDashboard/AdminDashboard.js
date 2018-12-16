import React,{Component} from 'react'
import { connect } from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import ProgressBar from '../../components/progressBar/progressBar'
import {Link} from 'react-router-dom'
import moment from 'moment'


class AdminDashboard extends Component {
    render(){

        const {scores} = this.props
        let scoresDisplay = <ProgressBar isNotAbsolute/>
        scoresDisplay = scores && scores.map((score)=> {
               return <li className="collection-item avatar" key={score.id}>
                    <i className="material-icons blue circle">person</i>
                    <span style={{display: 'block'}} className="title">{score.Name} {score.Surname}</span>
                    <p style= {{display: 'block'}} className="grey-text">{score.Designation}</p>
                    <Link to="/admin-account/RXSA0cAp6Ta2NMcyWJtJJC3CQnj2" className="secondary-content hide-on-small-only">
                        <h6 style={{display: 'inline-block', marginRight: '30px'}}><strong>Score: {score.score}%</strong></h6>
                        <h6 style={{display: 'inline-block', fontSize: '1em', color:'#888'}}><strong>submitted {moment(score.timeSubmitted).fromNow()}</strong></h6>
                    </Link>
                    <div className="hide-on-med-and-up">
                        <h6 className="teal-text text-darken-3">Score: {score.score}%</h6>
                        <h6 className="grey-text">submitted {moment(score.timeSubmitted).fromNow()}</h6>
                    </div>
                    
                </li>
        })
        return(
            <div style={{minHeight: 700}} className="container">
            <h2>Staff Scores</h2>
            <ul className="collection with-header">
                <li className="collection-header"><h3 className="teal-text">Below are the staff Scores</h3></li>
                    {scoresDisplay}
                    { scoresDisplay === undefined || (scoresDisplay && scoresDisplay.length === 0)?
                    <h5 className="container teal-text" style={{padding: '20px'}}>No Score Has Been Submitted</h5>: null}
            </ul>
            </div>
        )
    }
}

const mapStateToProps = state=> {
    return {
        scores: state.firestore.ordered['staff-scores']
    }
}

export default compose(connect(mapStateToProps),
            firestoreConnect([
                {collection: 'staff-scores'}
            ])
    )(AdminDashboard)