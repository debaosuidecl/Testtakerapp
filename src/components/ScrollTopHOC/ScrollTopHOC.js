import React,{Component} from 'react'

const scrollTopHOC = (ScrollComponent)=> {
    return class extends Component{
        componentDidMount(){
            window.scrollTo(0,0);
        }
        render(){
            return <ScrollComponent/>
        }
    }
       
}

export default scrollTopHOC