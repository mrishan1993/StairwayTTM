

const async = require("async")
const axios = require("axios")
const CryptoJS = require("crypto-js")
const crypto = require("crypto")
require("dotenv").config()

const apiSecretKey = process.env.FTX_API_SECRET
// BTC, ETH, BNB, XRP, LUNA, ADA, SOL, AVAX, DOT, MATIC
const strategy_one = function () {
    
    async.parallel({
        getBalance: function (callback) { 
            try {
                const url = "https://ftx.us/api/wallet/balances"
                const path = "/api/wallet/balances"
                const timestamp = Date.now()
                const method = "GET"
                const payload = `{timestamp}{method}{url}`
                const hash = CryptoJS.HmacSHA256(payload, process.env.FTX_API_SECRET)
                // var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, "Secret Passphrase");
                // hmac.update(JSON.stringify(timestamp));
                // hmac.update(method);
                // hmac.update(path);
                // var hash = hmac.finalize();
                const hash2 = crypto.createHmac('sha256', process.env.FTX_API_SECRET).update(payload).digest("hex")
                console.log("API KEY ", process.env.FTX_API_KEY)
                axios({
                    method: "get",
                    headers: {
                        "FTXUS-SIGN": CryptoJS.enc.Hex.stringify(hash),
                        // "FTXUS-SIGN": hash2,
                        "FTXUS-KEY": process.env.FTX_API_KEY,
                        "FTXUS-TS": timestamp,
                        "Content-Type": "application/json"
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
            } catch (e) {
                console.log("Exception ", e)
            }
        },
        // getPriceBTC: function (callback) { 
        //     try {
        //         const url = "https://ftx.us/api/markets/BTC/USDT/candles?resolution=60"
        //         const timestamp = Date.now()
        //         const method = "GET"
        //         const payload = `{timestamp}{method}{url}`
        //         const hash = CryptoJS.HmacSHA256(payload, process.env.FTX_API_SECRET)
        //         axios({
        //             method: "get",
        //             headers: {
        //                 "FTXUS-SIGN": CryptoJS.enc.Hex.stringify(hash),
        //                 "FTXUS-KEY": process.env.FTX_API_KEY,
        //                 "FTXUS-TS": timestamp,
        //             },
        //             url: url
        //         })
        //         .then( (response) => {
        //             if (response.data.success) {
        //                 callback(null, response.data.result)
        //             } else {
        //                 // error handling here for the api 
        //                 callback(result.data.error)
        //             }
                    
        //         })
        //         .catch ( (e) => {
        //             console.log("exception in request ", e)
        //         })
        //     } catch (e) {
        //         console.log("Exception ", e)
        //     }
        // },
        // getPriceETH: function (callback) {
        //     try {
        //         const url = "https://ftx.com/api//markets/ETH/USDT/candles?resolution=60"
        //         const timestamp = Date.now()
        //         const method = "GET"
        //         const payload = `{timestamp}{method}{url}`
        //         const hash = CryptoJS.HmacSHA256(payload, process.env.FTX_API_SECRET)
        //         axios.get(url, {
        //             headers: {
        //                 "FTX-SIGN": CryptoJS.enc.Hex.stringify(hash),
        //                 "FTX-KEY": process.env.FTX_API_KEY,
        //                 "FTX-TS": timestamp,
        //             }
        //         })
        //         .then( (response) => {
        //             if (response.data.success) {
        //                 callback(null, response.data.result)
        //             } else {
        //                 // error handling here for the api 
        //                 callback(result.data.error)
        //             }
                    
        //         })
        //         .catch ( (e) => {
        //             console.log("exception in request ", e)
        //         })
        //     } catch (e) {
        //         console.log("Exception ", e)
        //     }
        // }
    }
        , function (err, results) {
            if (!err) {
                console.log("results ", JSON.stringify(results))
            } else {
                console.log("Error ---->", err)
            }
            
    })
}




module.exports = {
    strategy_one
}