/**
 * Created by wenkai.zhang on 01/04/14.
 */

var mongoose = require('mongoose');
var crossfilter = require('crossfilter'),
    d3 = require('d3'),
    dc = require('dc');

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =
    process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        'mongodb://localhost/Flightdb';

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

/* Module Wrap-up
function getdtReserve(ibdate,obdate){
    var query = flights.find({'obDate':obdate,
        'ibDate':ibdate,
        'flights.dtComp':{$in:[/Air France/]}
        //'flights.dtPrice':{$lt:600}
    }).select({'dtReserve':1,'flights.dtPrice':1});
//query.where('flights.dtPrice').lt(600)
    return query.exec(function(err, result) {
        if (!err) {
            //console.log(result)
            return results;
        }
    });
};
*/

var query = flights.find({'obDate':'2014-06-10',
    'ibDate':'2014-06-25',
    'dtReserve':'2014-04-01'
    //'flights.dtComp':{$in:[/Air France/]}
    //'flights.dtPrice':{$lt:600}
});//.select({'dtReserve':1,'flights.dtPrice':1});
//query.where('flights.dtPrice').lt(600)

/*
//demo via http://www.codeproject.com/Articles/693841/Making-Dashboards-with-Dc-js-Part-Using-Crossfil
query.exec(function(err, data) {
    var fcf = crossfilter(data);
    var CompDimension = fcf.dimension(function(f){return f.flights.dtComp});
    var CompFilter = CompDimension.group()//.reduceCount()
    //var CompFilter = CompDimension.filter("/Aeroflot/");
    //print_filter(CompFilter)
    var PriceDimension = fcf.dimension(function(p){return p.flights.dtPrice});
    var PriceFilter = CompDimension.group()

});
function print_filter(filter){
    var f=eval(filter);
    if (typeof(f.length) != "undefined") {}else{}
    if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
    if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
    console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
}
*/


//created 03/04/2014
query.exec(function(err, data) {
    if (!err) {
        d3.json(data, function (flights_data) {
            //Step1: Create the dc.js chart objects & ling to div
            var lineChart = dc.lineChart("#dc-line-chart");
            var rowChart = dc.rowChart("#dc-row-graph");

            //Step2:  Run data through crossfilter
            var fcf = crossfilter(flights_data);
            //Step3:  Create Dimension that we'll need
            var CompFilter = CompDimension.group();
            var PriceDimension = fcf.dimension(function(p){return p.flights.dtPrice});
            var PriceFilter = CompDimension.group();

            //Step4: Create the Visualisations
            lineChart.width(230)
                .height(200)
                .dimension(PriceDimension)
                .group(PriceFilter)
                .x(d3.scale.linear().domain([400, 1500]))
                .valueAccessor(function(d) {
                    return d.value;
                })
                .renderHorizontalGridLines(true)
                .elasticY(true)
                .xAxis().tickFormat(function(v) {return v;});   ;
            rowChart.width(340)
                .height(850)
                .dimension(CompDimension)
                .group(CompFilter)
                .renderLabel(true)
                .colors(["#a60000","#ff0000", "#ff4040","#ff7373","#67e667","#39e639","#00cc00"])
                .colorDomain([0, 0]);
            console.log(CompFilter.top(1)[0].value);
            dc.renderAll();

        });


    };
});



/*
created 02/04/2014
 var query = flights.find({'obDate':'2014-06-10',
 'ibDate':'2014-06-25',
 'flights.dtComp':{$in:[/Air France/]}
 //'flights.dtPrice':{$lt:600}
 }).select({'dtReserve':1,'flights.dtPrice':1});
 //query.where('flights.dtPrice').lt(600)
 query.exec(function(err, result) {
 if (!err) {
 console.log(result)
 }
 });


find({:obDate => '2014-06-10',:ibDate => '2014-06-25',
    "flights.dtComp" => {'$in'=>[/Air France/]}},:fields=>['flights.dtPrice','dtReserve']
).sort({"flights.dtPrice"=>1})
    */