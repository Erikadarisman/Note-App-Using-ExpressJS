require('dotenv/config');
const express = require('express');
const app = express();
const port = process.env.PORT||3000;
const bodyParser = require('body-parser');
const routes = require('./routes');

//cors
const cors = require('cors');

var whitelist = ['http://192.168.100.55', 'http://192.168.100.77']

var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
        callback(new Error('Not allowed by CORS'))
        }
    }
}

// app.use(cors(corsOptions));

//middleware
app.use(
    function logOriginalUrl (req, res, next){
        console.log('----------');
        console.log('Request URL: ', req.originalUrl);
        console.log('request Type: ', req.method);
        console.log('port ', port);
        next();
    }
)

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());

routes(app);

app.listen(port);
console.log(`Listening on port ${port}!`);
