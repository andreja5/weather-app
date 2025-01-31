const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utilis/geocode');
const forecast = require('./utilis/forecast');

const app = express();

const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Home page',
    name: 'Andreja'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    name: 'Andreja'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    helpText: 'Pomocna strana',
    name: 'Andreja'
  })
});

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: 'You must provide a address term'
    });
  }

  geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
    
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404',
    error: 'Help article not found...',
    name: 'Andreja'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    title: '404',
    error: 'Page not found...',
    name: 'Andreja'
  })
});

app.listen(port, () => {
  console.log('Server is running at port:' + port + '...');
});