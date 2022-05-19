# crypto-readcsv
#### A command line program to return  latest portfolio values for different tokens on different dates.
#### By **Agnes Muita**
## Description
This program queries values for different tokens when issued with parameters and without parameters. 
These values are fetched dynamically to ensure system maintainability in the event that more tokens are added.

To obtain the latest portfolio value for each token, the function **matchesToken** obtains transactions matching the token, and calculates the latest portfolio values total against a currentTotal value.
To obtain the latest portfolio value for tokens based on date, the function **matchesDate** returns the portfolio value totals on that date for all tokens. 
To obtain the latest portfolio value based on date and token, the functions **matchesToken** and **matchesDate** return the matching token and calculates the total portfolio values for that date against the currentTotal value.
To obtain the latest portfolio value without parameters,total calculations are done for all tokens in the file.
All the portfolio values are calculated based on the token's exchange rate in USD obtained from Cryptocompare. 

## Setup/Installation Requirements
Clone the repo


Add transactions.csv to the root directory


Run: 

**npm install**


**node index.js**

## Behavior Driven Development
| Input            | Behaviour                         | Example Output                        |
| ------------------- | ----------------------------- | ----------------------------- |
| node index.js | returns latest portfolio values for each token | {BTC: 1200425.1521679235,ETH: 901704.2831248266,XRP: 903332.9813728357} |
| node index.js --token=ETH  |returns latest portfolio value given token as parameter | {ETH: 901704.2831248266} |
| node index.js --token=ETH date=YYYY-MM-DD |returns latest portfolio value given token and date as parameters | {ETH: 901704.2831248266} |
| node index.js --date=YYYY-MM-DD| returns latest portfolio value given date as parameter| {BTC: 1200425.1521679235,ETH: 901704.2831248266,XRP: 903332.9813728357}|

## Technologies Used
Node.js
## Support and contact details
wamwithamuita@gmail.com

