const express = require("express");
const app = express();
// const sleep = require("sleep");
var _http = require('http');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

var _result = '';
var _res = [];

http.listen(3000, function () {
    console.log('Check the Wheek on http://localhost:3000');
});

// Run once, on first time (to init socket)
io.on('connection', function (socket) {
    // Run everytime after the result is generated
    //console.log("outside spin")
    socket.on('spin', function (msg, index) {
        //console.log("Here now!")
        _result = msg;
        console.log("Result: ", _result);
        if(_res[parseInt(index, 10)]) {
            _res[parseInt(index, 10)].status(200).send({ message: _result });
            _res[parseInt(index, 10)] = null;
        }

    });
});

app.get('/spin', (req, res) => {
    _res.push(res)
    io.emit('spin', ''+_res.length-1);
    //console.log("Request generated to spin!") 
    //res.status(200).send({ message: "wheel spun" });
});

app.get('/result', (req, res) => {

    res.status(200).send({ message: _result });
            
});


const delay = (ms) => {
    const startPoint = new Date().getTime()
    while (new Date().getTime() - startPoint <= ms) {}
}


