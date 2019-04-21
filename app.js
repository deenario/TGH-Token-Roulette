const express = require("express");
const sleep = require("sleep");
const app = express();
var _http = require('http');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

var _result = 'No result';

http.listen(3000, function () {
    console.log('Check the Wheek on http://localhost:3000');
});

io.on('connection', function (socket) {
    socket.on('spin', function (msg) {
        _result = msg;
        console.log(_result);
    });
});

app.get('/spin', (req, res) => {
    io.emit('spin', '');
    res.status(200).send({ message: 'Wheel Spinned' });
});

app.get('/result', (req, res) => {
    res.status(200).send({ message: _result });
});
