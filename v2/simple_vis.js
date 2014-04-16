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
    function print_filter(filter){
        var f=eval(filter);
        if (typeof(f.length) != "undefined") {}else{}
        if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
        if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
        //console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
        alert(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
    }

    var ndx = crossfilter(data);

    var parseDate = d3.time.format("%Y-%m-%d").parse;

    data.forEach(function(d) {
        d.dtReserve = parseDate(d.dtReserve);
    });

// x-axis
    var dateDim = ndx.dimension(function(d) {return d.dtReserve;});
// y-axis
    //var lowprices = priceDim.bottom(Infinity);
    //print_filter("lowprices");
    // var prices = dateDim.group().reduceSum(function(d) {return d.flights.dtPrice;}); // edit as of 14/04/2014

    //solution 1
    /*
    reduceAdd = function(p, v) {
        v.flights.dtPrice.forEach(function(item){
            if (item <= lowest)
                p.minval = lowest;
                lowest = p.minval;
        })
        return p;
    };
    reduceRemove = function(p,v){

    };
    reduceInitial = function(p,v) {
        return {lowest:0, newObj = []}
    };
    var prices = dateDim.group().reduce(reduceAdd,reduceRemove,reduceInitial);
*/
/*
    var prices = dateDim.group().reduce(
    function reduceAdd(p, v) {
        if (v.flights.dtPrice <= p.min())
            p.candidates.unshift(v.flights.dtPrice);
        if (v.flights.dtPrice >= p.max())
            p.candidates.push(v.flights.dtPrice);
        return p;
    },
    function reduceRemove(p, v) {
        var index = p.candidates.indexOf(v.flights.dtPrice);
        if (index >= 0)
            p.candidates.splice(index, 1);
        return p;
    },
    function reduceInitial() {
        return {
            candidates: [],
            max: function() {
                return (candidates.length > 0) ? candidates[candidate.length - 1] : null;
            },
            min: function() {
                return (candidates.length > 0) ? candidates[0] : null;
            }
        };
    });
*/

    // solution 2
        function add(p, v) {
            p.values.unshift(+v.flights.dtPrice);
            if (p.max > +v.flights.dtPrice) {
                p.max = +v.flights.dtPrice;
            }
            return p;
        }
        function remove(p, v) {
            var index = p.values.indexOf(+v.flights.dtPrice);
            if (index >= 0) {
                p.values.splice(index, 1);
                p.values.sort(function (a, b) { return a - b });
            }
            if (p.values.length > 0) {
                p.max = p.values[p.values.length - 1];
            } else {
                p.max = 0;
            }
            return p;
        }
        function init() {
            return { max: 999, values: new Array() };
        }
    var prices = dateDim.group().reduce(add,null,init);

    /*
    //solution 3
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

    //print_filter("prices");

    var minDate = dateDim.bottom(1)[0].dtReserve;
    var maxDate = dateDim.top(1)[0].dtReserve;


// We set the charts dimension (x-axis), group (y-axis), and range
    var lineChart  = dc.lineChart("#chart-line-hitsperday");
    lineChart
        .width(500).height(200)
        .dimension(dateDim)
        .group(prices)
        .x(d3.time.scale().domain([minDate,maxDate]))
        .y(d3.scale.linear().domain([0, 1000]))
        .valueAccessor(function (d) {
            return d.value.max;
        })
        .renderHorizontalGridLines(true)
        .elasticY(true)
        .yAxis().tickFormat(d3.format("d"))


    var CompDim = ndx.dimension(function(d) {return d.flights.dtComp;});
    var Companies = CompDim.group();
    //print_filter(Companies)
    var rowChart = dc.rowChart("#dc-row-graph");;
    rowChart.width(340)
        .height(850)
        .dimension(CompDim)
        .group(Companies)
        .renderLabel(true)
        .colors(["#a60000","#ff0000", "#ff4040","#ff7373","#67e667","#39e639","#00cc00"])
        .colorDomain([0, 0])
        .renderlet(function (chart) {
            datatable.filter(chart.filter());
        })
        .on("filtered", function (chart) {
            dc.events.trigger(function () {
                datatable.filter(chart.filter());
            });
        });

    // Data Table
    var datatable = dc.dataTable("#dc-data-table");
    datatable
        .dimension(dateDim)
        .group(function(d) { d.flights.dtComp;//return "List of all Selected Businesses"
        })
        .size(100)
        //.group(function(d) {return d.Year;})
        // dynamic columns creation using an array of closures
        .columns([
            function(d) {return d.dtReserve.getDate() + "/" + (d.dtReserve.getMonth() + 1) + "/" + d.dtReserve.getFullYear(); },
            function(d) {return d.obDate;},
            function(d) {return d.ibDate;},
            function(d) {return d.flights.dtComp;},
            function(d) {return d.flights.dtPrice;},
            function(d) {return d.flights.dtHours;},
            function(d) {return d.flights.dtTrans;},
        ])
        .sortBy(function(d){ return d.flights.dtPrice;});

    dc.renderAll();

});
