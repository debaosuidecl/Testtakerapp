import React from 'react'
import {Link} from 'react-router-dom'
const footer = (props)=> {
    return (
        <footer className="page-footer grey darken-3">
        <div className="container">
            <div className="row">
                <div className="col s12 l6">
                    <h5>
                        Our Mandate
                    </h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, quis minima eveniet illo sit voluptate debitis
                            corrupti enim, unde dolore fuga alias reprehenderit voluptates quam ipsa minus inventore maxime ea?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, quis minima eveniet illo sit voluptate debitis
                         corrupti enim, unde dolore fuga alias reprehenderit voluptates quam ipsa minus inventore maxime ea?</p>
                              
                </div>
                <div className="col s12 l4 offset-l2">
                    <h5>
                        Connect
                    </h5>
                    <ul>
                        <li><Link to="/" className="grey-text text-lighten-3">Facebook</Link></li>
                        <li><Link to="/" className="grey-text text-lighten-3">Twitter</Link></li>
                        <li><Link to="/" className="grey-text text-lighten-3">Instagram</Link></li>
                        <li><Link to="/" className="grey-text text-lighten-3">LinkedIn</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="footer-copyright grey darken-4">
            <div className="container center-align">
                &copy; 2018 Nigerian Electricity Management Services Agency
            </div>
        </div>
    </footer>

    )
}

export default footer