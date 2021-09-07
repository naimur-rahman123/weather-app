const path = require('path');
const express = require('express');
const axios = require('axios').default;
const hbs = require('hbs');
const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './templates/views'));
app.use(express.static(path.join(__dirname, './public')));
hbs.registerPartials(path.join(__dirname, './templates/partials'));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Naimur Rahman',
        message: 'This is the homepage.',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Naimur Rahman',
    });
});

app.get('/weather', (req, res) => {
    const city = req.query.address;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=327631087ba542505a6640f364e5e83b&units=metric`;

    if (!req.query.address) {
        return res.send({
            error: 'An address must be provided.',
        });
    }

    axios
        .get(url)
        .then(response => res.send(response.data))
        .catch(e => ({ error: 'An address must be provided.' }));
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App',
        name: 'Naimur Rahman',
        message: 'Some helpful text for website.',
    });
});

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Naimur Rahman',
        message: 'Page not found',
    });
});

app.listen(port, () => console.log(`Server is running on port ${port}!!!`));
