const express = require('express');
const app = express();
const port = process.env.PORT || 3099;
const bodyParser = require('body-parser');

//cors
const routes = require('./routes');
const cors = require('cors');

var whitelist = ['http://192.168.100.55', 'http://192.168.100.77', 'localhost']

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

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());

routes(app, corsOptions);

app.listen(port);
console.log(`Listening on port ${port}!`);
