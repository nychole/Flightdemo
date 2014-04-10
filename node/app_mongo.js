/**
 * Created by wenkai.zhang on 01/04/14.
 */

var mongoose = require('mongoose');
var http = require ('http');

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =
    process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        'mongodb://localhost/test';
var theport = process.env.PORT || 5000;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});

var flySchema = new mongoose.Schema({
        flights: {
            dtPrice:Number,
            dtComp:String,
            dtHours:Number,
            dtTrans:Number
        },
        obDate:String,
        ibDate:String,
        dtReserve:String
    },
    {collection : 'parpek'}
);

var flights = mongoose.model('parpek',flySchema);

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    createWebpage(req, res);
}).listen(theport);


function createWebpage (req, res) {
    // Let's find all the documents
    flights.find({}).exec(function(err, result) {
        if (!err) {
            res.write(html1 + JSON.stringify(result, undefined, 2) +  html2 + result.length + html3);
            // Let's see if there are any senior citizens (older than 64) with the last name Doe using the query constructor
            var query = flights.find({'obDate' : '2014-06-10'}); // (ok in this example, it's all entries)
            //query.where('age').gt(64);
            query.exec(function(err, result) {
                if (!err) {
                    res.end(html4 + JSON.stringify(result, undefined, 2) + html5 + result.length + html6);
                } else {
                    res.end('Error in second query. ' + err)
                }
            });
        } else {
            res.end('Error in first query. ' + err)
        };
    });
}

console.log('http server will be listening on port %d', theport);
console.log('CTRL+C to exit');

// The rudimentary HTML content in three pieces.
var html1 = '<title> hello-mongoose: MongoLab MongoDB Mongoose Node.js Demo on Heroku </title> \
<head> \
<style> body {color: #394a5f; font-family: sans-serif} </style> \
</head> \
<body> \
<h1> hello-mongoose: MongoLab MongoDB Mongoose Node.js Demo on Heroku </h1> \
See the <a href="https://devcenter.heroku.com/articles/nodejs-mongoose">supporting article on the Dev Center</a> to learn more about data modeling with Mongoose. \
<br\> \
<br\> \
<br\> <h2> All Documents in MonogoDB database </h2> <pre><code> ';
var html2 = '</code></pre> <br\> <i>';
var html3 = ' documents. </i> <br\> <br\>';
var html4 = '<h2> Queried (name.last = "Doe", age >64) Documents in MonogoDB database </h2> <pre><code> ';
var html5 = '</code></pre> <br\> <i>';
var html6 = ' documents. </i> <br\> <br\> \
<br\> <br\> <center><i> Demo code available at <a href="http://github.com/mongolab/hello-mongoose">github.com</a> </i></center>';

