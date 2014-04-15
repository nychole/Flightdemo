/********************************************************
*														*
* 	dj.js example using Yelp Kaggle Test Dataset		*
* 	Eamonn O'Loughlin 9th May 2013 						*
*														*
********************************************************/
// Modified By Wenkai 11/04/2014
/********************************************************
*														*
* 	Step0: Load data from json file						*
*														*
********************************************************/
d3.json("data/testRecords.json", function (data) {
    //data = JSON.parse(data);
    //alert('process starts...' + data);
    var ndx = crossfilter(data);

    var parseDate = d3.time.format("%Y-%m-%d").parse;

    data.forEach(function(d) {
        d.dtReserve = parseDate(d.dtReserve);
    });

    function print_filter(filter){
        var f=eval(filter);
        if (typeof(f.length) != "undefined") {}else{}
        if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
        if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
        //console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
        alert(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
    }

    //print_filter("data");
    var priceDim = ndx.dimension(function(d) {return d.flights.dtPrice;});
// x-axis
    var dateDim = ndx.dimension(function(d) {return d.dtReserve;});
// y-axis
    var lowprices = priceDim.bottom(Infinity);
    //print_filter("lowprices");

    var prices = dateDim.group().reduce(
        function (p, v) {
            p.values.push(+v.flights.dtPrice);
            if (p.max < +v.flights.dtPrice) {
                p.max = +v.flights.dtPrice;
            }
            return p;
        },
        function () {
            return { max: 0, values: new Array() };
        }
    );

    /*
    function reduceAddAvg(attr) {
        return function(p,v) {
            ++p.count
            p.sum += v[attr];
            p.avg = p.sum/p.count;
            return p;
        };
    }
    function reduceRemoveAvg(attr) {
        return function(p,v) {
            --p.count
            p.sum -= v[attr];
            p.avg = p.sum/p.count;
            return p;
        };
    }
    function reduceInitAvg() {
        return {count:0, sum:0, avg:0};
    }
    var prices = dateDim.group().reduce(reduceAddAvg("flights.dtPrice"), reduceRemoveAvg("flights.dtPrice"), reduceInitAvg);
*/
    print_filter("prices");
    var minPrice = priceDim.bottom(1)[0].dtReserve;
    var maxPrice = priceDim.top(1)[0].dtReserve;


    var hitslineChart  = dc.lineChart("#chart-line-hitsperday");

// We set the charts dimension (x-axis), group (y-axis), and range
    hitslineChart
        .width(500).height(200)
        .dimension(dateDim)
        .group(prices)
        .x(d3.time.scale().domain([minPrice,maxPrice]))

    var datatable = dc.dataTable("#dc-data-table");
    datatable
        .dimension(dateDim)
        //.group(function(d) {return d.Year;})
        // dynamic columns creation using an array of closures
        .columns([
            function(d) {return d.dtReserve; },
            function(d) {return d.ibDate;},
            function(d) {return d.obDate;},
            function(d) {return d.flights.dtComp;},
            function(d) {return d.flights.dtPrice;}
        ]);

    dc.renderAll();

});
