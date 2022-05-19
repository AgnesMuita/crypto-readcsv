# crypto-readcsv
#### A command line program to return  latest portfolio values for different tokens and portfolio values given the date.
#### By **Agnes Muita**
## Description
This program queries values for different tokens when issued with parameters and without parameters. 
These values are fetched dynamically to ensure system maintainability in the event that more tokens are added.
To obtain the latest portfolio value for each token, the function **matchesToken** gets the item that matches the token, and calculates the total against a currentTotal 
value.
To obtain the latest portfolio value for a token based on date, the function **matchesDate** returns the totals for that date for that particular token. 
To obtain the latest portfolio value based on date and token, the function **matchesToken** and **matchesDate** returns the item that matches the token and date, and calculates the total against the currentTotal 
value.
To obtain the latest portfolio value without parameters,total calculations are done for all tokens in the file.

## Setup/Installation Requirements
Clone the repo
Add transactions.csv to the root directory
Run: 
**npm install**
**node index.js**

## Behavior Driven Development
| Input            | Behaviour                         | Output                        |
| ------------------- | ----------------------------- | ----------------------------- |
| node index.js | returns latest portfolio values for each token | {
  BTC: 1200425.1521679235,
  ETH: 901704.2831248266,
  XRP: 903332.9813728357
} |
| node index.js token=ETH  |returns latest portfolio value given token as parameter | {
  ETH: 901704.2831248266,
} |
| node index.js token=ETH date=2021-09-10  |returns latest portfolio value given token and date as parameters | {
  ETH: 901704.2831248266,
} |
| node index.js date=2021-09-10 | returns latest portfolio value given date as parameter.The date should be provided in YYYY-MM-DD format| {
  BTC: 1200425.1521679235,
  ETH: 901704.2831248266,
  XRP: 903332.9813728357
}|

## Technologies Used
Node.js
## Support and contact details
wamwithamuita@gmail.com

