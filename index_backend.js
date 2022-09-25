//koristim express - node.js framework
//korisitim cors
//korisitim dotenv, kako bi ga moga korisiti u backendu
//korisitim axios, kako bi moga poslat get request
//korisitim nodemon - automatski restartira aplikaciju kad se promini nes u fileu

const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

//u package.json napravia script "start:backend": "nodemon index_backend.js"
//i prominia npm start u npm run start:frontend
//za runat triba npm run start:backend, za svaku koju sam definiram triba ubacit "run"


app.use(cors())//da nema ovoga nebi moga ucitat podatke(od apia) sa stranice

//get - method, '/' - path(= 8000), req - request, res - response
app.get('/', (req, res) => {
    res.json('hi')
});


//sad u frontendu samo posjetim ovu stranicu za dobit podatke koje vraca api, nemoram zvat api u frontendu
//za otvorit ovu stranicu samo u browser upisat localhost:8000/news, ali prije toga npm run start:backend
app.get('/news', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://crypto-news15.p.rapidapi.com/news',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,//radi jer sam require dotenv
          'X-RapidAPI-Host': 'crypto-news15.p.rapidapi.com'
        }
      };
      
      axios.request(options).then((response) => {
          res.json(response.data);
      }).catch((error) => {
          console.error(error);
      });
});


app.get('/convert', (req, res) => {
    //u req u query se nalaze parametri
    //console.log(req)

    const from_currency = req.query.from_currency;
    const to_currency = req.query.to_currency;

    //console.log("from "+from_currency)
    //console.log("to "+to_currency)

    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {from_currency: from_currency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: to_currency},
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,//obavezno stavit REACT_APP_ na pocetak naziva apiKey-a
          'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'     //obavezno stavit .env u gitignore kako se apiKey ne bi uploada na github -> ovaj nacin je ok za osobne projekte ali inace se radi backend
        }
      };
      
      axios.request(options).then((response) => {
          //console.log(response.data);
          res.json(response.data);
      }).catch( (error) => {
          console.error(error);
      });
});

app.listen(PORT, () => console.log('Server is running on port ' + PORT))
//16:37