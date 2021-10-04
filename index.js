// import dependencies
var express = require('express');
var app = express();
var apiRoutes = require('./routes/api');
var rootRoutes = require('./routes/root');
var morgan = require('morgan');


// setup our app (server/middleware) 
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use(morgan('combined'));


// add some endpoints

app.use('/', rootRoutes);
app.use('/api', apiRoutes);

// serve out our app
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening on ", host, port);
});