const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const dns = require("dns")
require("dotenv").config()

const mongoose = require("./db/connection")
const Address = require("./db/model")

const postHandler = require("./hasher/shortener")
const getHandler = require("./hasher/finder")

const PORT = process.env.PORT || 5000

const app = express()

const bodyPMiddleware = bodyParser.urlencoded({extended: false})

app.use(express.json())
app.use(cors())
app.use(bodyPMiddleware)


app.get("/", (req, res) => {
    console.log(mongoose.connection.readyState)
    res.send("Hello !")
})

app.get('/api/hello', function(req, res) {
    res.json({ greeting: 'hello API' });
});
  

// Shortening an URL
  
app.post("/api/shorturl/new", postHandler)
  
//Retrieving a Short URL
  
app.get("/api/shorturl/:param1", getHandler)


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})