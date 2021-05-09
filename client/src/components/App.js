import React, {useState} from "react"
import axios from "axios"
import Hasher from "./Hasher"
import Retriever from "./Retriever"
import Swal from 'sweetalert2';

const BASE_URL = "https://url-hasher.herokuapp.com"

const App = () => {
    const [input, setInput] = useState("")
    const [urlActive, setUrlActive] = useState(true)

    const [isLoading, setIsLoading] = useState(false)



    const handleChange = (Event) => {
        setInput(Event.target.value)
    }

    const handleSubmit = () => {

        let tempArr = input.split("")
        let pureInput = ""
        if (tempArr[tempArr.length-1] === "/") {
            tempArr.pop()
        }
        pureInput = tempArr.join("")

        try {
            setIsLoading(true)
            axios.post(`${BASE_URL}/api/shorturl/new`, {url: pureInput}).then((response) => {

                setIsLoading(false)

                if (response.data.hasOwnProperty("error")){
                    Swal.fire({
                        icon: "error",
                        title: "Oops!",
                        text: response.data.error
                    })
                } else {
        
                    Swal.fire("URL submitted successfully", `Hashed URL: ${response.data.short_url}`, "success").then(
                        (result) => {
                          if (result.isConfirmed || result.isDismissed) {
                          }
                        }
                    )
                }
            })

        } catch (error) {
            if (error.response) {
                Swal.fire({
                  icon: "error",
                  title: "Oops!",
                  text: error.response.data
                })
            }
        }
    }

    const handleRetrieve = () => {
        try {
            setIsLoading(true)
            const param1 = input ? input : "123"
            axios.get(`${BASE_URL}/api/shorturl/${param1}`).then((response) => {

                setIsLoading(false)

                if (response.data.hasOwnProperty("error")){
                    Swal.fire({
                        icon: "error",
                        title: "Oops!",
                        text: response.data.error
                    })
                } else {
        
                    Swal.fire("Original URL successfully found", `Original URL: ${response.data.url}`, "success").then(
                        (result) => {
                          if (result.isConfirmed || result.isDismissed) {
                          }
                        }
                    )
                }
            })

        } catch (error) {
            if (error.response) {
                Swal.fire({
                  icon: "error",
                  title: "Oops!",
                  text: error.response.data
                })
            }
        }
    }

    const changer = () => {
        setInput("")
        setUrlActive(prevUrlActive => !prevUrlActive)
    }

    return(
        <div>

            {!isLoading ? (

                    <div className="container">

                    <h1>URL Hasher</h1>

                    <button className="btn" onClick={changer}>URL/Hash</button>
                    

                    {urlActive ? (

                        <Hasher
                            data={{
                                handleChange: handleChange,
                                handleSubmit: handleSubmit,
                                input: input
                            }}
                        />

                    ) : (

                        <Retriever
                            data={{
                                handleChange: handleChange,
                                handleRetrieve: handleRetrieve,
                                input: input
                            }}
                        />
                    )}

                </div>

            ) : (
                <div className="loading">
                    <h1>Loading...</h1>
                </div>
            )}



        </div>




    )
}



export default App
