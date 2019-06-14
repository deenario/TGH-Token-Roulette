const express = require("express");
const app = express();
// const sleep = require("sleep");
var _http = require('http');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

var _result = 'No result';
var _res = [];

http.listen(3000, function () {
    console.log('Check the Wheek on http://localhost:3000');
});

// Run once, on first time (to init socket)
io.on('connection', function (socket) {
    // Run everytime after the result is generated
    socket.on('spin', function (msg) {
        console.log("Here now!")
        _result = msg;
        console.log("Result: ", _result);
        _res[_res.length-1].status(200).send({ message: _result });
        _res = []
    });
});

app.get('/spin', (req, res) => {
    _res.push(res)
    io.emit('spin', '');
    console.log("Request generated to spin!") 

    // res.status(200).send({ message: 'Wheel Spinned' });
});

app.get('/result', (req, res) => {
    
    // if(_result != "No result") {
        // } else {
            //     delay(1000)
            // }
            
    res.status(200).send({ message: _result });
});


const delay = (ms) => {
    const startPoint = new Date().getTime()
    while (new Date().getTime() - startPoint <= ms) {console.log("In delay")}
}


