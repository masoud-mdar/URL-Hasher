const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = mongoose