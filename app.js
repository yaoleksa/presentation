const express = require('express');
const path = require('path');
const async = require('async');
const port = process.env.PORT || 7000;
const publicPath = path.join(__dirname, './');
const app = express();

function paralell(middlewares){
    return function(req, res, next){
        async.each(middlewares, (mw, cb) => {
            mw(req, res, cb);
        }, next);
    }
}

app.use(express.static(publicPath));
app.use(paralell(express.middlewares));

app.get('/', (req, res) => {
    res.status(200).send(publicPath);
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});