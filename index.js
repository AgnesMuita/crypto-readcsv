const csv = require('csv-parser')
const fs = require('fs')
const start = Date.now()
const yargs = require("yargs")
const totals = {};

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



//read this from args
const date = args.date
const token = args.token 

function currentTokenTotal(token){
    //Ensure we have token total in the totals array  
    if(!totals[token]){
        totals[token] = 0
    }
    return totals[token]
}
function portfolioValueBasedOnDateAndToken(item, date, token){
    const currentTotal = currentTokenTotal(token);
    if(matchesDate(item,date) && matchesToken(item, token) && item.transaction_type==="DEPOSIT"){
        totals[token] = currentTotal + parseFloat(item.amount)
    }else if(matchesDate(item,date) && matchesToken(item, token) && item.transaction_type==="WITHDRAWAL"){
        totals[token] = currentTotal - parseFloat(item.amount)
    }else{
      //the item does not match a given date 
    }
}



//read csv file data
    fs.createReadStream('transactions.csv', {})
    .pipe(csv())
    .on('data', item => {
         if(date && token){
        //calculate totals based on a given date & token
        portfolioValueBasedOnDateAndToken(item, date,token)
      }else if(date){
        //calculate totals based on given date

      }else if(token){
        //calculate totals based on token only 

      }else {
        //calculate totals without parameters

      }
     
    })
    .on('error', err => {
        console.log(err)
    })
    .on('end', () => {
        console.log(totals)
        const now = Date.now()
        const tat = now - start
        console.log(`${tat / 1000} seconds`)
    })


//match item with date
function matchesDate(item,date){
    //convert item date to YYYY-MM-DD string
    const itemDate = moment.unix(item.timestamp).format('YYYY-MM-DD')
    return itemDate === date
}
//match item with given token
function matchesToken(item, token){
  return item.token === token;
}


