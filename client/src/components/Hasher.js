import React from "react"


const Hasher = (props) => {

    return (
        <div className="sub-container">
            <input onChange={props.data.handleChange} value={props.data.input} placeholder="Enter a URL to be hashed..." className="input"></input>
            <div>
                <button onClick={props.data.handleSubmit} className="btn btn1">submit</button>
            </div>
            
        </div>
    )
}

export default Hasher