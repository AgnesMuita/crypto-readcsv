const csv = require('csv-parser')
const fs = require('fs')
const start = Date.now()
const yargs = require("yargs")
const items = []
let BTCportfolioAmount = 0;
let ETHportfolioAmount = 0;
let XRPportfolioAmount = 0;
let BTCvalue;
let ETHvalue;
let XRPvalue;
let inputDate = "24 May 2022";
let timestampDate = Math.floor(new Date(inputDate).getTime()) / 1000;
let timeArray = [];



//obtain exchange rates 
global.fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cc = require('cryptocompare');
const { notStrictEqual } = require("assert");
const { showCompletionScript, array } = require("yargs");
const { time } = require("console");
cc.setApiKey('10c5bbea1ecc63121cf5c8805e48708350cacd20857351d34892f57747dafa7f')
cc.priceMulti(['BTC', 'ETH','XRP'], ['USD'])
        .then(prices => {
        //BTC price
        for (var property in prices.BTC){
          BTCvalue = prices.BTC[property]
        }
        //ETH price
        for (var property in prices.ETH){
          ETHvalue = prices.ETH[property]
        }
        //XRP price
        for (var property in prices.XRP){
          XRPvalue = prices.XRP[property]
        }
        })
        .catch(console.error);

//read csv file data
    fs.createReadStream('transactions.csv', {})
    .pipe(csv())
    .on('data', chunk => {
        //get ETH
        if(chunk.token === "ETH" && chunk.transaction_type === "DEPOSIT"){
            BTCportfolioAmount += parseFloat(chunk.amount)
        }else if(chunk.token === "ETH" && chunk.transaction_type === "WITHDRAWAL"){
            BTCportfolioAmount -= parseFloat(chunk.amount)
        }
        //get BTC
        if(chunk.token === "BTC" && chunk.transaction_type === "DEPOSIT"){
            ETHportfolioAmount += parseFloat(chunk.amount)
        }else if(chunk.token === "BTC" && chunk.transaction_type === "WITHDRAWAL"){
            ETHportfolioAmount -= parseFloat(chunk.amount)
        }
        //get XRP
        if(chunk.token === "XRP" && chunk.transaction_type === "DEPOSIT"){
            XRPportfolioAmount += parseFloat(chunk.amount)
        }else if(chunk.token === "XRP" && chunk.transaction_type === "WITHDRAWAL"){
            XRPportfolioAmount -= parseFloat(chunk.amount)
        }

    })
    .on('error', err => {
        console.log(err)
    })
    .on('end', () => {
      //command line arguments
      if(process.argv >= 2 ){
           process.argv.slice(2).forEach(function (token,amount, array) {
            if(token === "token=ETH"){
              amount= BTCportfolioAmount * BTCvalue
              console.log(`BTC portfolio value: ${amount}`);  
            }else if(token === "token=BTC"){
              amount= ETHportfolioAmount * ETHvalue
              console.log(`ETH portfolio value: ${amount}`);
            }else if(token === "token=XRP"){
              amount= XRPportfolioAmount * XRPvalue
              console.log(`XRP portfolio value: ${amount}`);
            }
          });
      }else{     
          console.log(`ETH portfolio value is ${BTCportfolioAmount * BTCvalue} USD`)
          console.log(`BTC portfolio value is ${ETHportfolioAmount * ETHvalue} USD`)
          console.log(`XRP portfolio value is ${XRPportfolioAmount * XRPvalue} USD`)
        }
    

        const now = Date.now()
        const tat = now - start
        console.log(`${tat/1000} seconds`)
        console.log("done")
    })




