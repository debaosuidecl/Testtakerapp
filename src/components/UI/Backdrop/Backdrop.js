import React from 'react';
import classes from './Backdrop.module.css'
const backdropClasses = [classes.Backdrop, classes.withSideNav]
const backdrop = props => (
    props.show ? <div className={props.withSideNav? backdropClasses.join(' '): classes.Backdrop} onClick ={props.clicked}> </div>: null
);



export default backdrop;