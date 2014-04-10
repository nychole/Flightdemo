/**
 * Created by wenkai.zhang on 03/04/14.
 */
var http = require ('http');

var theport = process.env.PORT || 5000;


http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    createWebpage(req, res);
}).listen(theport);

function createWebpage (req, res) {
            res.write(html);
};

console.log('http server will be listening on port %d', theport);
console.log('CTRL+C to exit');
// The rudimentary HTML content in three pieces.
var html = '<title> hello-mongoose: MongoLab MongoDB Mongoose Node.js Demo on Heroku </title> \
<!DOCTYPE html> \
    <html lang="en"> \
    <head> \
        <meta charset="utf-8"> \
            <script src="javascripts/d3.js" type="text/javascript"></script> \
            <script src="javascripts/crossfilter.js" type="text/javascript"></script> \
            <script src="javascripts/dc.js" type="text/javascript"></script> \
            <script src="javascripts/jquery-1.9.1.min.js" type="text/javascript"></script> \
            <script src="javascripts/bootstrap.min.js" type="text/javascript"></script> \
            <link href="stylesheets/bootstrap.min.css" rel="stylesheet" type="text/css"> \
                <link href="stylesheets/dc.css" rel="stylesheet" type="text/css"> \
                    <script src="mongodb.js" type="text/javascript"></script> \
                </head> \
<body> \
    <div class="container" id="main-container"> \
    <div class="content"> \
        <div class="container" style="font: 10px sans-serif;"> \
            <h3>Visualisation of <a href="http://www.kaggle.com/c/yelp-recruiting">Kaggle Yelp Test Business Data</a> set (using <a href="http://nickqizhu.github.io/dc.js/">dc.js</a>)</h3> \
            <h4>Demo for the <a href="http://www.meetup.com/Dublin-Data-Visualisation/">Dublin Data Visualisation Meetup Group</a></h4> \
            <div class="row-fluid"> \
                <div class="remaining-graphs span8"> \
                    <div class="row-fluid"> \
                        <div class="bubble-graph span12" id="dc-bubble-graph"> \
                            <h4>Average Rating (x-axis), Average Number of Reviews (y-axis), Number of Business" (Size)</h4> \
                        </div> \
                    </div> \
                    <div class="row-fluid"> \
                        <div class="pie-graph span4" id="dc-line-chart"> \
                            <h4>Average Rating in Stars / Number of Reviews (Line)</h4> \
                        </div> \
                    </div> \
                    <!-- /other little graphs go here --> \
                </div> \
                <div class="remaining-graphs span4"> \
                    <div class="row-fluid"> \
                        <div class="row-graph span12" id="dc-row-graph" style="color:black;"> \
                            <h4>Reviews Per City</h4> \
                        </div> \
                    </div> \
                </div> \
            </div> \
        </div> \
    </div> \
    </div> \
</body> \
</html> ';
