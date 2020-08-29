const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

const geocode =  require('./utils/geocode');
const forecast =  require('./utils/forecast');

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Rajpal'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rajpal'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        forecast: 'weather is cloudy',
        location: 'Gr Noda, UP'
    });
});

app.get('/weather', (req, res) => {
    res.render('index');
});

app.get('/forecast', (req, res) => {
    if (!req.query.address){
        return res.send({error: 'address must be provided'});
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send(error);
        }
        forecast(latitude, longitude, (error, forecastdata) =>{
                if( error) {
                    return res.send(error);
                }
                const forecast = `It is currently ${forecastdata.temperature} degrees out. and feel like ${forecastdata.feelslike}. There is ${forecastdata.precip}% chance of raining today`
                res.send({
                    forecast: forecast,
                    location: location,
                    address: req.query.address
                });
        });     
    })
});

app.get('/product', (req, res) => {
    if (!req.query.search){
       return res.send({error: 'Your must provide a search term.'});
    }
    const products = [{product: 'hi'}]
    res.send(products);
});

app.get('*', (req, res) => {
    res.send('Error 404! Page Not Found');
});


app.listen(3000, () => {
    console.log('server is up on port 3000');
});
