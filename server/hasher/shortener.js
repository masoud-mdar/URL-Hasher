const dns = require("dns")
const mongoose = require("../db/connection")
const Address = require("../db/model")

// Reading and Manipulating our payload

const postHandler = (req,res) => {
    // chacking for http:// or https://
    const regex = /http/
    const regexTwo = /https/
  
    if (!regex.test(req.body.url)) {
      res.json({error:"invalid url"})
  
    } else {
      let addressArr = req.body.url.split("")

      if (regexTwo.test(req.body.url)) {
        adressArr = addressArr.slice(8,addressArr.length)

      } else if (regex.test(req.body.url)){
        adressArr = addressArr.slice(7,addressArr.length)
      }

      const adressStr = adressArr.join("")
  
      dns.lookup(adressStr, function(err, result){
        if (err) {
          console.log("error area 3")
          //console.log(result)
          res.json({error: "invalid URL"})
        } else if (!result) {
          res.json({error: "invalid URL"})
        } else {

          // I replaced the error return to pass the FCC tests and it works! The original error return is this:
          //return res.json({error:"invalid url"})

          // hashing the url to identify it
          let tempArr = adressStr.split(".")
          let tempStr = tempArr.join("")
          tempArr = tempStr.split("")
          const alphStr = "a78mnopqbcdef34012ghijklrxystu/.?vwz569=-"
          const alphArr = alphStr.split("")
          const hashArr = []
    
          tempArr.map(i => {
            hashArr.push(alphArr.indexOf(i))
          })
          const hash = (hashArr.slice(4,hashArr.length).join(""))
              
          Address.findOne({hash: hash}, (err, doc) => {
            if (err) {
              console.log(err)
              res.json({error: "internal server error... please try again later"})
            }
            if (doc){
              // sending the JSON
              res.json({original_url: req.body.url, short_url: doc.hash})
            } else{

              // creating and saving a document to our database
              const page = new Address({url: req.body.url, hash:hash})
              page.save(function(err, page){

                if (err) {
                  console.log(err)
                  res.json({error: "internal server error... please try again later"})
                }
              })
              // sending the JSON
              res.json({original_url: req.body.url, short_url:
              hash})
            }
            
          })
        }

      })
  
    }
}

module.exports = postHandler