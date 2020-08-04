const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

//Use Body parser Middleware

app.use(bodyParser.urlencoded({ extended: false }));

//API Key pk_3bfe9382cab343879a6aea50b6a30e90
//Creat Call_pi function
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_3bfe9382cab343879a6aea50b6a30e90', { json: true }, (err, res, body) => {

        if (err) { console.log(err); }
        //console.log(body);
        if (res.statusCode === 200) {
            //console.log(body);
            finishedAPI(body);
        };
    });
};
//Set Handlebars Middleware

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Set Handlebars Index Get Routs

app.get('/', function (req, res) {
    call_api(function (doneAPI) {
        res.render('home', {
            stock: doneAPI
        });
    });
});
//call_api(function, req.body.stock_ticker)

//Set Handlebars Index Post Routs
app.post('/', function (req, res) {
    call_api(function (doneAPI) {
        //posted_stuff = req.body.stock_ticker;
        res.render('home', {
            stock: doneAPI,
            //posted_stuff: posted_stuff
        });
    }, req.body.stock_ticker);
});

//req.body.stock_ticker


//Creat about page route

app.get('/about.html', function (req, res) {
    res.render('about')
});

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('server listening on Port' + PORT));