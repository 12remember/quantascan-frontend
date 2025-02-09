# Quantascan - Frontend

Quantascan is an analytics website for the quantum resistant ledger blockchain.

This is the front-end of the website.

The backend and frontend are separated and hosted on Heroku on two different dyno's

- The Backend is based on Django and Scrapy. 
- Data is stored in a Postgresql database
- Frontend is based on Vue

# Getting started

How to run Quantascan - frontend Locally

## Run Quantascan Local
1. Go to map ""/QRL/quantascan-frontend"
2. Open terminal
3. run "npm install"
3. run "npm run dev"
4. Access site in the browser , 127.0.0.1:8080

## Note
All api-calls are done to the Live analytics server (quantascan-backend)

If you want that the front-end uses data from a locally hosted Postgresql database (see readme quantascan-backend)
1. go to map "/QRL/quantascan-frontend/src"
2. Open file "main.js"
3. find code (line 97) 
```python
else {
//axios.defaults.baseURL = 'http://127.0.0.1:8000'
 axios.defaults.baseURL = 'https://analytics.quantascan.io'
 axios.defaults.xsrfCookieName = 'csrftoken'
 axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
}
```
```python
4. change it to:
else {
 axios.defaults.baseURL = 'http://127.0.0.1:8000'
 //axios.defaults.baseURL = 'https://analytics.quantascan.io'
 axios.defaults.xsrfCookieName = 'csrftoken'
 axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
}
```
5. The frontend will now gets it data of the locally running database 



## More information

[Quantascan.io](https://quantascan.io "Quantascan.io")

[The Quantum resistant Ledger](https://www.theqrl.org/ "The QRL homepage")

[Discord Chat](https://discord.gg/RcR9WzX "Discord Chat") @12remember



## License: MIT


