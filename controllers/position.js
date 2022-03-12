
const axios = require("axios")
const CryptoJS = require("crypto-js")
require("dotenv").config()


// take the long position 
// will need the token
const takeLongPosition = function (market, size) {
    const url = "https://ftx.com/api/orders"
    const timestamp = Date.now()
    const method = "POST"
    const body = {
        market: market, // change it to the token pair
        side: "buy",
        size: size, // change it to the size of the buy order
        type: "market",
        price: null,

    }
    const bodyString = JSON.stringify(body)
    const payload = `{timestamp}{method}{url}{bodyString}`
    const hash = CryptoJS.HmacSHA256(payload, process.env.FTX_API_SECRET)
    axios({
        method: method,
        headers: {
            "FTX-SIGN": CryptoJS.enc.Hex.stringify(hash),
            "FTX-KEY": process.env.FTX_API_KEY,
            "FTX-TS": timestamp,
        },
        url: url
    })
    .then( (response) => {
        if (response.data.success) {
            callback(null, response.data.result)
        } else {
            // error handling here for the api 
            callback(result.data.error)
        }
        
    })
    .catch ( (e) => {
        console.log("exception in request ", e)
    })
}

const exitLongPosition = function (market, size) {
    const url = "https://ftx.com/api/orders"
    const timestamp = Date.now()
    const method = "POST"
    const body = {
        market: market, // change it to the token pair
        side: "sell",
        size: size, // change it to the size of the buy order
        type: "market",
        price: null,

    }
    const bodyString = JSON.stringify(body)
    const payload = `{timestamp}{method}{url}{bodyString}`
    const hash = CryptoJS.HmacSHA256(payload, process.env.FTX_API_SECRET)
    axios({
        method: method,
        headers: {
            "FTX-SIGN": CryptoJS.enc.Hex.stringify(hash),
            "FTX-KEY": process.env.FTX_API_KEY,
            "FTX-TS": timestamp,
        },
        url: url
    })
    .then( (response) => {
        if (response.data.success) {
            callback(null, response.data.result)
        } else {
            // error handling here for the api 
            callback(result.data.error)
        }
        
    })
    .catch ( (e) => {
        console.log("exception in request ", e)
    })
}

module.exports = {
    takeLongPosition,
    exitLongPosition
}