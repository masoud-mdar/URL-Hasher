const mongoose = require("mongoose")
const {Schema} = mongoose;


const urlSchema = new Schema({
  url:{type: "string", required: true},
  hash: {type: "string", required: true}
})


const Address = mongoose.model("Address", urlSchema)

module.exports = Address