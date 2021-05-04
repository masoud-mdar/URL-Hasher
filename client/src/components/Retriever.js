import React from "react"

const Retriever = (props) => {
    return (
        <div className="sub-container">
            <input onChange={props.data.handleChange} value={props.data.input} placeholder="Enter a hashed URL..." className="input"></input>
            <button onClick={props.data.handleRetrieve} className="btn btn1">submit</button>
        </div>
    )
}

export default Retriever