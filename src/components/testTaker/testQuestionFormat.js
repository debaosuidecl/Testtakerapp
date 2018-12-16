import React,{Component} from 'react'


 class TestQuestionFormat extends Component{
  state = {
  aList : []
  }
  
  render(){
    let form

  form = <form  id={`${this.props.questionid}`}>
          <p>
       <label>
       <input name={`group${this.props.number}`}
        onChange={this.props.onChangeHandler}
          value={this.props.A}
          type="radio" />
          
      <span>{this.props.A}</span>
       </label>
      </p>
      <p>
      <label>
       <input name={`group${this.props.number}`} 
        onChange={this.props.onChangeHandler}
        value={this.props.B}
        type="radio" />
       <span>{this.props.B}</span>
       </label>
      </p>
       <p>
          <label>
            <input name={`group${this.props.number}`} 
        onChange={this.props.onChangeHandler}
        value={this.props.C}
            type="radio"  />
            <span>{this.props.C}</span>
         </label>
        </p>
        <p>
          <label>
           <input name={`group${this.props.number}`} 
        onChange={this.props.onChangeHandler}
        value={this.props.D}
           type="radio" />
           <span>{this.props.D}</span>
         </label>
           </p>
          
            
      </form>

    return (
      <div className="">
       <div className="top-row">
              <p>
                 <span>{this.props.number}. </span> {this.props.question}
              </p>
          </div>
        <div className="row">
          <div className="col s12">
          
          {form}
          
          </div>
        </div>
  
      </div>
  )
  }
} 

export default TestQuestionFormat