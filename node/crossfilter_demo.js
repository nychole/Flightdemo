/**
 * Created by wenkai.zhang on 31/03/14.
 */

var d3=require('d3')
var crossfilter=require('crossfilter')

var flights = [
    {
        "dtComp":"Aeroflot",
        "dtPrice":584,
        "dtHours":16.08,
        "dtTrans":1,
        "dtReserve":"2014-03-31",
        "obDate":"2014-04-10",
        "ibDate":"2014-04-25"
    },
    {
        "dtComp":"KLM",
        "dtPrice":600,
        "dtHours":12,
        "dtTrans":0,
        "dtReserve":"2014-03-31",
        "obDate":"2014-04-10",
        "ibDate":"2014-04-25"
    },
    {
        "dtComp":"Airchina",
        "dtPrice":500,
        "dtHours":10,
        "dtTrans":0,
        "dtReserve":"2014-03-31",
        "obDate":"2014-04-10",
        "ibDate":"2014-04-25"
    },
    {
        "dtComp":"ANA",
        "dtPrice":700,
        "dtHours":26.08,
        "dtTrans":2,
        "dtReserve":"2014-03-31",
        "obDate":"2014-04-10",
        "ibDate":"2014-04-25"
    }
]

var ymdFormat = d3.time.format("%Y-%m-%d");
flights.forEach(function(f) {
    f.dtReserve = ymdFormat.parse(f.dtReserve);
    f.obDate = ymdFormat.parse(f.obDate);
    f.ibDate = ymdFormat.parse(f.ibDate);
});
// Use the crossfilter force.
var cf = crossfilter(flights);

// Create our dimension by political party.
var byPrice = cf.dimension(function(f) { return f.dtPrice; });

var groupByPrice = byPrice.group();
groupByPrice.top(Infinity).forEach(function(f, i) {
    console.log(f.key + ": " + f.value);
});






/*
{"_id"=>BSON::ObjectId('53392b14872eeb1020002509'), "flights"=>{"dtComp"=>"Conseil conomisez en revenant le jeu avrRetour jour plus tt", "dtPrice"=>469, "dtHours"=>19.42, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb102000250a'), "flights"=>{"dtComp"=>" Aeroflot", "dtPrice"=>584, "dtHours"=>18.25, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb102000250b'), "flights"=>{"dtComp"=>" Aeroflot", "dtPrice"=>699, "dtHours"=>16.08, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb102000250c'), "flights"=>{"dtComp"=>" Aeroflot", "dtPrice"=>699, "dtHours"=>15.08, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb102000250d'), "flights"=>{"dtComp"=>" Aeroflot", "dtPrice"=>699, "dtHours"=>13.83, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb102000250e'), "flights"=>{"dtComp"=>" Aeroflot", "dtPrice"=>699, "dtHours"=>16.25, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb102000250f'), "flights"=>{"dtComp"=>" China Eastern", "dtPrice"=>815, "dtHours"=>15.83, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002510'), "flights"=>{"dtComp"=>" China Eastern", "dtPrice"=>815, "dtHours"=>34.33, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002511'), "flights"=>{"dtComp"=>" Austrian", "dtPrice"=>825, "dtHours"=>31.0, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002512'), "flights"=>{"dtComp"=>" Austrian", "dtPrice"=>825, "dtHours"=>15.83, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002513'), "flights"=>{"dtComp"=>" China Southern Air France KLM", "dtPrice"=>846, "dtHours"=>15.25, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002514'), "flights"=>{"dtComp"=>" China Southern Air France KLM", "dtPrice"=>846, "dtHours"=>13.67, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002515'), "flights"=>{"dtComp"=>" China Southern KLM", "dtPrice"=>846, "dtHours"=>12.83, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002516'), "flights"=>{"dtComp"=>" China Southern KLM", "dtPrice"=>846, "dtHours"=>16.5, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002517'), "flights"=>{"dtComp"=>" China Eastern", "dtPrice"=>855, "dtHours"=>19.33, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002518'), "flights"=>{"dtComp"=>" China Eastern", "dtPrice"=>855, "dtHours"=>13.58, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002519'), "flights"=>{"dtComp"=>" LOT", "dtPrice"=>865, "dtHours"=>33.83, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb102000251a'), "flights"=>{"dtComp"=>" Austrian", "dtPrice"=>875, "dtHours"=>9.92, "dtTrans"=>0}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb102000251b'), "flights"=>{"dtComp"=>" Air France China Eastern", "dtPrice"=>878, "dtHours"=>16.83, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb102000251c'), "flights"=>{"dtComp"=>" Lufthansa", "dtPrice"=>898, "dtHours"=>14.17, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb102000251d'), "flights"=>{"dtComp"=>" Lufthansa", "dtPrice"=>898, "dtHours"=>17.08, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb102000251e'), "flights"=>{"dtComp"=>" LOT", "dtPrice"=>915, "dtHours"=>9.92, "dtTrans"=>0}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb102000251f'), "flights"=>{"dtComp"=>" Air France China Eastern", "dtPrice"=>918, "dtHours"=>16.5, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002520'), "flights"=>{"dtComp"=>" China Southern", "dtPrice"=>919, "dtHours"=>17.75, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002521'), "flights"=>{"dtComp"=>" China Southern", "dtPrice"=>919, "dtHours"=>18.75, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002522'), "flights"=>{"dtComp"=>" China Southern", "dtPrice"=>919, "dtHours"=>16.33, "dtTrans"=>2}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002523'), "flights"=>{"dtComp"=>" LOT British Airways airberlin Air China", "dtPrice"=>928, "dtHours"=>17.25, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002524'), "flights"=>{"dtComp"=>" Lufthansa", "dtPrice"=>951, "dtHours"=>15.83, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002525'), "flights"=>{"dtComp"=>" Lufthansa", "dtPrice"=>951, "dtHours"=>15.08, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002526'), "flights"=>{"dtComp"=>" Lufthansa", "dtPrice"=>951, "dtHours"=>36.92, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002527'), "flights"=>{"dtComp"=>" Azerbaijan", "dtPrice"=>975, "dtHours"=>19.25, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002528'), "flights"=>{"dtComp"=>" British Airways airberlin", "dtPrice"=>983, "dtHours"=>17.58, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002529'), "flights"=>{"dtComp"=>" British Airways", "dtPrice"=>983, "dtHours"=>20.0, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb102000252a'), "flights"=>{"dtComp"=>" British Airways", "dtPrice"=>985, "dtHours"=>16.58, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb102000252b'), "flights"=>{"dtComp"=>" British Airways", "dtPrice"=>985, "dtHours"=>15.25, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb102000252c'), "flights"=>{"dtComp"=>" British Airways", "dtPrice"=>985, "dtHours"=>12.5, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb102000252d'), "flights"=>{"dtComp"=>" Lufthansa", "dtPrice"=>1006, "dtHours"=>30.92, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb102000252e'), "flights"=>{"dtComp"=>" Hainan airberlin", "dtPrice"=>1010, "dtHours"=>20.08, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb102000252f'), "flights"=>{"dtComp"=>" Lufthansa", "dtPrice"=>1071, "dtHours"=>18.75, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002530'), "flights"=>{"dtComp"=>" Lufthansa", "dtPrice"=>1071, "dtHours"=>10.08, "dtTrans"=>0}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002531'), "flights"=>{"dtComp"=>" Air China", "dtPrice"=>1102, "dtHours"=>13.75, "dtTrans"=>2}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002532'), "flights"=>{"dtComp"=>" Lufthansa", "dtPrice"=>1125, "dtHours"=>30.33, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002533'), "flights"=>{"dtComp"=>" Malaysia", "dtPrice"=>1130, "dtHours"=>14.42, "dtTrans"=>2}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002534'), "flights"=>{"dtComp"=>" Lufthansa", "dtPrice"=>1131, "dtHours"=>36.58, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002535'), "flights"=>{"dtComp"=>" Malaysia", "dtPrice"=>1145, "dtHours"=>14.17, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002536'), "flights"=>{"dtComp"=>" Air France Air China", "dtPrice"=>1151, "dtHours"=>19.58, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002537'), "flights"=>{"dtComp"=>" KLM", "dtPrice"=>1166, "dtHours"=>19.0, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002538'), "flights"=>{"dtComp"=>" KLM", "dtPrice"=>1166, "dtHours"=>17.42, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b14872eeb1020002539'), "flights"=>{"dtComp"=>" KLM China Southern", "dtPrice"=>1166, "dtHours"=>16.58, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000253a'), "flights"=>{"dtComp"=>" KLM China Southern", "dtPrice"=>1166, "dtHours"=>15.25, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000253b'), "flights"=>{"dtComp"=>" KLM Air France China Southern", "dtPrice"=>1166, "dtHours"=>14.33, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000253c'), "flights"=>{"dtComp"=>" KLM Air France China Southern", "dtPrice"=>1166, "dtHours"=>12.33, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000253d'), "flights"=>{"dtComp"=>" KLM China Southern", "dtPrice"=>1166, "dtHours"=>18.75, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000253e'), "flights"=>{"dtComp"=>" Vietnam", "dtPrice"=>1185, "dtHours"=>13.5, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000253f'), "flights"=>{"dtComp"=>" Air China Aeroflot", "dtPrice"=>1186, "dtHours"=>18.0, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002540'), "flights"=>{"dtComp"=>" Air China Air France", "dtPrice"=>1188, "dtHours"=>15.67, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002541'), "flights"=>{"dtComp"=>" Air China Air France", "dtPrice"=>1188, "dtHours"=>12.5, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002542'), "flights"=>{"dtComp"=>" Air China Air France", "dtPrice"=>1188, "dtHours"=>12.42, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002543'), "flights"=>{"dtComp"=>" Air China Air France", "dtPrice"=>1190, "dtHours"=>13.67, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002544'), "flights"=>{"dtComp"=>" Air China SAS", "dtPrice"=>1193, "dtHours"=>18.08, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002545'), "flights"=>{"dtComp"=>" Air China Air France", "dtPrice"=>1201, "dtHours"=>15.92, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002546'), "flights"=>{"dtComp"=>" Air China Air France", "dtPrice"=>1201, "dtHours"=>14.92, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002547'), "flights"=>{"dtComp"=>" Air China Air France", "dtPrice"=>1201, "dtHours"=>16.83, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002548'), "flights"=>{"dtComp"=>" Air China Air France", "dtPrice"=>1203, "dtHours"=>13.92, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002549'), "flights"=>{"dtComp"=>" Air China Air France", "dtPrice"=>1203, "dtHours"=>38.08, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000254a'), "flights"=>{"dtComp"=>" Ethiopian", "dtPrice"=>1204, "dtHours"=>17.25, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000254b'), "flights"=>{"dtComp"=>" Air China Lufthansa", "dtPrice"=>1205, "dtHours"=>15.25, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000254c'), "flights"=>{"dtComp"=>" Air China Lufthansa", "dtPrice"=>1205, "dtHours"=>12.08, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000254d'), "flights"=>{"dtComp"=>" Air China Lufthansa", "dtPrice"=>1205, "dtHours"=>15.67, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000254e'), "flights"=>{"dtComp"=>" Air China Air France", "dtPrice"=>1207, "dtHours"=>13.17, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000254f'), "flights"=>{"dtComp"=>" Air China Air France", "dtPrice"=>1207, "dtHours"=>16.25, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002550'), "flights"=>{"dtComp"=>" Air China Air France", "dtPrice"=>1207, "dtHours"=>13.92, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002551'), "flights"=>{"dtComp"=>" Air China Air France", "dtPrice"=>1207, "dtHours"=>12.5, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002552'), "flights"=>{"dtComp"=>" Air China Air France", "dtPrice"=>1207, "dtHours"=>16.83, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002553'), "flights"=>{"dtComp"=>" Air China Lufthansa", "dtPrice"=>1209, "dtHours"=>15.5, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002554'), "flights"=>{"dtComp"=>" Air China Lufthansa", "dtPrice"=>1209, "dtHours"=>14.0, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002555'), "flights"=>{"dtComp"=>" Air China Lufthansa", "dtPrice"=>1209, "dtHours"=>12.58, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002556'), "flights"=>{"dtComp"=>" Air China Lufthansa", "dtPrice"=>1209, "dtHours"=>18.75, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002557'), "flights"=>{"dtComp"=>" Air China Lufthansa", "dtPrice"=>1209, "dtHours"=>15.42, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002558'), "flights"=>{"dtComp"=>" Air China Lufthansa", "dtPrice"=>1209, "dtHours"=>13.92, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002559'), "flights"=>{"dtComp"=>" Air China Lufthansa", "dtPrice"=>1209, "dtHours"=>13.58, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000255a'), "flights"=>{"dtComp"=>" British Airways", "dtPrice"=>1237, "dtHours"=>77.0, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000255b'), "flights"=>{"dtComp"=>" Air Algerie", "dtPrice"=>1278, "dtHours"=>20.67, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000255c'), "flights"=>{"dtComp"=>" ANA", "dtPrice"=>1465, "dtHours"=>22.0, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000255d'), "flights"=>{"dtComp"=>" Lufthansa", "dtPrice"=>1465, "dtHours"=>20.0, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000255e'), "flights"=>{"dtComp"=>" Lufthansa", "dtPrice"=>1465, "dtHours"=>11.83, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000255f'), "flights"=>{"dtComp"=>" Air China Lufthansa", "dtPrice"=>1474, "dtHours"=>18.0, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002560'), "flights"=>{"dtComp"=>" Air China Lufthansa", "dtPrice"=>1474, "dtHours"=>15.17, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002561'), "flights"=>{"dtComp"=>" Air China Air France", "dtPrice"=>1483, "dtHours"=>12.92, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002562'), "flights"=>{"dtComp"=>" Air China Air France", "dtPrice"=>1483, "dtHours"=>22.92, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002563'), "flights"=>{"dtComp"=>" Air China British Airways airberlin Virgin Atlantic", "dtPrice"=>1772, "dtHours"=>21.25, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002564'), "flights"=>{"dtComp"=>" Air China British Airways", "dtPrice"=>1772, "dtHours"=>23.08, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002565'), "flights"=>{"dtComp"=>" EVA Air", "dtPrice"=>1832, "dtHours"=>26.17, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002566'), "flights"=>{"dtComp"=>" EVA Air", "dtPrice"=>1873, "dtHours"=>15.25, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002567'), "flights"=>{"dtComp"=>" Air China British Airways airberlin Virgin Atlantic", "dtPrice"=>2179, "dtHours"=>22.5, "dtTrans"=>2}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002568'), "flights"=>{"dtComp"=>" Gulf Air Thai", "dtPrice"=>2306, "dtHours"=>36.17, "dtTrans"=>2}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb1020002569'), "flights"=>{"dtComp"=>" Gulf Air Thai", "dtPrice"=>2306, "dtHours"=>18.92, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000256a'), "flights"=>{"dtComp"=>" SAS", "dtPrice"=>2380, "dtHours"=>14.58, "dtTrans"=>1}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000256b'), "flights"=>{"dtComp"=>" SAS", "dtPrice"=>2380, "dtHours"=>19.42, "dtTrans"=>2}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
{"_id"=>BSON::ObjectId('53392b15872eeb102000256c'), "flights"=>{"dtComp"=>" Air China British Airways", "dtPrice"=>2407, "dtHours"=>17.75, "dtTrans"=>2}, "dtReserve"=>"2014-03-31", "obDate"=>"2014-04-10", "ibDate"=>"2014-04-25"}
*/