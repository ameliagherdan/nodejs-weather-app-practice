const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

let apiKey = 'e37188fb979b7a0e7759dc3176a5c271';


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Eroare, incearca din nou'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Eroare, incearca din nou'});
      } else {
        let gradeCelsius = Math.round(weather.main.temp);
        let weatherText = `Acum sunt ${gradeCelsius} grade celsius in ${weather.name}! Umiditatea este ${weather.main.humidity}%!`;

        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})