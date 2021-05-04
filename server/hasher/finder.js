const mongoose = require("../db/connection")
const Address = require("../db/model")

const getHandler = (req, res) => {

  if (req.params){
    const hash = (req.params.param1)

    Address.findOne({hash: hash}, (err, doc) => {
      if (err) {
        res.json({error: "internal server error... please try again later"})
      }
      if (doc) {
        res.json({url: doc.url})
      } else {
        res.json({error: "hash not found"})
      }
    })

  } else{
    res.json({error: "hash not found"})
  }
}

module.exports = getHandler