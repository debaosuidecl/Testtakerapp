import React from 'react'
import {Link} from 'react-router-dom'
const card = (props)=> {
    return (
        <div className="card">
            <div className="card-image">
                <img src={props.image} alt="pic1"/>
                <Link to="/" className="halfway-fab btn-floating pulse teal">
                <i className="material-icons">details</i>
                </Link>
            </div>
            <div className="card-content">
            <span className="card-title center">{props.title}</span>
                                    <p>{props.detail}</p>
            </div>
            <div className="card-action center">
            <button onClick={props.clicked} className="btn-small  teal lighten-3"> {props.action}</button>
        </div>
        </div>

    )
}

export default card