const csv = require('csv-parser')
const fs = require('fs')
const start = Date.now()
const items = []
let portfolioAmount = 0


//obtain exchange rates 
global.fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cc = require('cryptocompare');
const { notStrictEqual } = require("assert");
const { showCompletionScript, array } = require("yargs");
const { time } = require("console");
cc.setApiKey('10c5bbea1ecc63121cf5c8805e48708350cacd20857351d34892f57747dafa7f')
 
cc.priceMulti(['BTC', 'ETH','XRP'], ['USD'])
.then(prices => {
  // console.log(prices)
})
.catch(console.error)

//read csv file data
fs.createReadStream('transactions.csv', {})
    .pipe(csv())
    .on('data', chunk => {
        //get ethereum
        if(chunk.token === "ETH" && chunk.transaction_type === "DEPOSIT"){
            portfolioAmount += parseFloat(chunk.amount)
        }else if(chunk.token === "ETH" && chunk.transaction_type === "WITHDRAWAL"){
            portfolioAmount -= parseFloat(chunk.amount)
        }
        //get BTC
        if(chunk.token === "BTC" && chunk.transaction_type === "DEPOSIT"){
            portfolioAmount += parseFloat(chunk.amount)
        }else if(chunk.token === "BTC" && chunk.transaction_type === "WITHDRAWAL"){
            portfolioAmount -= parseFloat(chunk.amount)
        }
        //get XRP
        if(chunk.token === "XRP" && chunk.transaction_type === "DEPOSIT"){
            portfolioAmount += parseFloat(chunk.amount)
        }else if(chunk.token === "XRP" && chunk.transaction_type === "WITHDRAWAL"){
            portfolioAmount -= parseFloat(chunk.amount)
        }

    })
    .on('error', err => {
        console.log(err)
    })
    .on('end', () => {
        console.log(`ETH portfolio value is ${portfolioAmount}`)
        const now = Date.now()
        const tat = now - start
        console.log(`${tat/1000} seconds`)
        console.log("done")
    })
