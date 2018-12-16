import React from 'react'
 
class OtherComponent extends React.Component {
  render () {
    let myStyle
     myStyle = this.props.isNotAbsolute?null: {position: `absolute`,
     
                                                        top: 70,
                                                      color: this.props.isWhite? 'white': 'teal'
                                                      }
     
    return (
        <div style={myStyle} className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
  }
}

export default OtherComponent