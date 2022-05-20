const csv = require('csv-parser')
const fs = require('fs')
const start = Date.now()
const args = require("yargs")(process.argv.slice(2)).argv;
const totals = {};
const moment = require('moment');
let tokenPrice;
let eachtoken;


//read this from args
const date = args.date
const token = args.token 

//obtain exchange rates 
global.fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cc = require('cryptocompare');
cc.setApiKey('10c5bbea1ecc63121cf5c8805e48708350cacd20857351d34892f57747dafa7f')
// if(token){
//   cc.priceMulti([token], ['USD'])  
//     .then(prices => {
//         for (var property in prices[token]){
//           tokenPrice = prices[token][property]
//         }
//         })
//     .catch(console.error);
// }
// else{
//     cc.priceMulti([eachtoken], ['USD'])  
//     .then(prices => {
//         for (var property in prices[eachtoken]){
//           tokenPrice1 = prices[eachtoken][property]
//           console.log(tokenPrice1)
//         }
//         })
//     .catch(console.error);
// }

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
      //the item does not match a given date and token
    }
}
function portfolioValueBasedOnDate(item, date){
    const eachtoken = item.token
    const currentTotal = currentTokenTotal(eachtoken);
    if(matchesDate(item,date) && item.transaction_type ==='DEPOSIT'){
      totals[token] = currentTotal + parseFloat(item.amount)
    }else if(matchesDate(item,date) && item.transaction_type ==='WITHDRAWAL'){
      totals[token] = currentTotal - parseFloat(item.amount)
    }
    else{
      //item does not match given date
    }
}
function portfolioValueBasedOnToken(item, token){
    const currentTotal = currentTokenTotal(token)
    if(matchesToken(item,token) && item.transaction_type ==='DEPOSIT'){
      totals[token] = currentTotal + parseFloat(item.amount)
    }else if(matchesToken(item,token) && item.transaction_type ==='WITHDRAWAL'){
      totals[token] = currentTotal - parseFloat(item.amount)
    }
    else{
      //item does not match given token
    }
}
function portfolioValueWithoutParameters(item) {
    const token = item.token
    const currentTotal = currentTokenTotal(token)
    if (item.transaction_type === 'DEPOSIT') {
        totals[token] = currentTotal + parseFloat(item.amount)
    } else if (item.transaction_type === 'WITHDRAWAL') {
        totals[token] = currentTotal - parseFloat(item.amount)
    } else {
        // The item does not match known ts type
    }
}

//read csv file data
  fs.createReadStream('transactions.csv', {})
  .pipe(csv())
  .on('data', item => {
    
    if(date && token){
      portfolioValueBasedOnDateAndToken(item, date,token)
    }else if(date){
      portfolioValueBasedOnDate(item, date)
    }else if(token){
      portfolioValueBasedOnToken(item,token)
    }else {
      portfolioValueWithoutParameters(item)
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
    const itemDate = moment.unix(item.timestamp).format('YYYY-MM-DD')
    return itemDate === date
}

//match item with given token
function matchesToken(item, token){
  return item.token === token;
}


