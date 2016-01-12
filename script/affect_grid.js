/**
 * Created by Maciej on 12/10/2015.
 */
/*Start by setting up the canvas */
var margin = {t:50,r:100,b:50,l:50};
var width = document.getElementById('plot').clientWidth - margin.r - margin.l,
    height = document.getElementById('plot').clientHeight - margin.t - margin.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','plotArea')
    .attr('transform','translate('+margin.l+','+margin.t+')');

var plot_main = plot.append('g');

var plotBrush = d3.select('.canvas')
    .append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height/4 + margin.t + margin.b)
    .append('g')
    .attr('class','brush')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//Scales
var startDate = new Date(2015,10,26,5),
    endDate = new Date(2015,11,3,14);


var plot_extent = d3.map();


plot_extent.set(
    'current_extent', [startDate,endDate]
);
extent_init = plot_extent.get('current_extent');

var scaleX = d3.scale.linear().range([0, width]).domain([0, 100]),
    scaleY = d3.scale.linear().range([height,0]).domain([0, 100]);
//var x2 = d3.time.scale().range([0, width]),
//    y2 = d3.scale.linear().range([(height/4), 0]);
//x2.domain(extent_init);
//y2.domain([0, 140]);
//
//var brush = d3.svg.brush()
//    .x(x2)
//    .on('brushend', brushListener);
//var colorScale = d3.scale.quantize()

var colorScale = d3.scale.linear()
    .domain([0, 100])
    .range(["blue", "red"]); //whitish (0) to red(100)

var axisXhour = d3.svg.axis()
    .scale(scaleX)
    .orient('bottom');
    //.ticks(d3.time.hour)
    //.ticks(d3.time.hour, 2)
    //.tickFormat(d3.time.format('%H-%M'))

var axisY = d3.svg.axis()
    .orient('right')
    .tickSize(width);
axisY.scale(scaleY);

var colorScaleBrush = d3.scale.linear()
    .domain([0, 100])
    .range(["blue", "black"]);

plot.append('g').attr('class','axis axis-x-hour')
    .attr('transform','translate(0,'+height/2+')')
    .style({ 'stroke': 'Black', 'fill': 'none', 'stroke-width': '2px'})
    .call(axisXhour);
plot.append('g').attr('class','axis axis-y')
    .style({ 'stroke': 'Black', 'fill': 'none', 'stroke-width': '2px'})
    .call(axisY);
plot.select('.axis-x-hour')
    .selectAll('text');

//TODO: Line generator
// this results in a function we can use later
//var lineGenerator = d3.svg.line()
//    .x(function(d){return scaleX(d.date)})
//    .y(function(d){return scaleY(d.hr)});
//
////TODO: Area generator
//// this results in a function we can use later
//var areaGenerator = d3.svg.area()
//    .x(function(d){ return scaleX(d.date)}) // location on the axis
//    .y0(height)                             //bottom of the bar
//    .y1(function(d){ return scaleY(d.hr)})//top of the bar
//    .interpolate('basis');

//Import data with queue
function queueData() {

    queue()
        //.defer(d3.csv, 'data/merged7daysSinglePoints.csv', parse)
        .defer(d3.csv, 'data/merged7days.csv', parse)
        //.defer(d3.csv,'data/Merge3.csv',parse)
        .await(dataLoaded);
}



queueData();

function dataLoaded(error, heartRate){

    dataset = heartRate;
    draw(heartRate);
    //drawBrush(heartRate);

}

function draw(_data) {
    //console.log(data);
    //console.log("start", start);
    //console.log("end", end);
    //start = start || startDate;
    //end = end || endDate;
//console.log(start,end)
    extent = plot_extent.get('current_extent');

    start = extent[0];
    end = extent[1];

    console.log(_data);
    //scaleY.domain([0, 168])
    //scaleX.domain(extent);

    //plot.select('.axis-x-hour')
    //    .attr('transform','translate(0,'+height/2+')')
    //    .call(axisXhour);

    var nodes = plot_main.selectAll('.circles-data-point').data(_data, function (d) {
        return d.date;
    });

    //enter
    var node_enter = nodes.enter().append('circle').attr('class', 'circles-data-point')
        .attr('fill', function (d) {return colorScale(d.hr);})
        .style('fill-opacity', '0.1');

    //exit
    var node_exit = nodes.exit().remove();
    //update
    nodes.attr('cx', function (d) { return scaleX(d.valence) + Math.random()*10 ;})
        .attr('cy', function (d) {return scaleY(d.activation) + Math.random()*10;})
        .attr('r', '2');
}

function drawBrush(data) {
    //console.log("drawing brush!");
    plotBrush.selectAll('.brush-circles-data-point')
        //.data(data.filter(function(d){
        //        return (d.hr >start && d.hr <end);
        //return (d.hr >75 && d.hr <90);
        //}
        //))
        .data(data)
        .enter()
        //.append('circle').attr('class', 'coffee-data-point data-point')
        .append('circle').attr('class', 'brush-data-points')
        .attr('fill', function (d) {
            return colorScaleBrush(d.valence);
        })
        .style('fill-opacity', '0.5')
        .attr('cx', function (d) {
            //console.log(d.date);
            return x2(d.date);
        })

        .attr('cy', function (d) {
            return y2(d.hr);
        })
        .attr('r', 3);
    // Create and translate the brush container group
    plotBrush.append('g')
        .attr('class', 'brush');
    //.attr('transform', function () {
    //    var dx = margin.l, dy = margin.t;
    //    return 'translate(' + [dx, dy] + ')';
    //});


    var gBrush = plotBrush.select('g.brush').call(brush);
    gBrush.selectAll('rect')
        .attr('height', height);
}

function brushListener() {
    //console.log("Brushing!!!");
    //console.log(brush.extent())
    var localData = dataset;
    var start = brush.extent()[0],
        end = brush.extent()[1];

    //console.log(start,end)
    _start = d3.time.format('%Y-%m-%dT%H:%M:%S%Z')(start);
    _end = d3.time.format('%Y-%m-%dT%H:%M:%S%Z')(end);
    __start = new Date(_start);
    __end = new Date(_end);
    console.log(__start,__end);
    plot_extent.set('current_extent', [__start,__end]);

    data___ = dataset.filter(function(d){
        return new Date(d3.time.format('%Y-%m-%dT%H:%M:%S%Z')(d.date)) > start &&  new Date(d3.time.format('%Y-%m-%dT%H:%M:%S%Z')(d.date)) < end ;
    });

    draw(data___);
}
//function updateData() {
//    //newStartDate = new Date(2015,10,29,10);
//    //scaleX.domain([newStartDate], endDate);
//    //plot.select('axis axis-x-hour').call(scaleX);
//    // Get the data again
//    d3.tsv("data/data-alt.tsv", function(error, data) {
//        data.forEach(function(d) {
//            d.date = parseDate(d.date);
//            d.close = +d.close;
//        });
//
//        // Scale the range of the data again
//        x.domain(d3.extent(data, function(d) { return d.date; }));
//        y.domain([0, d3.max(data, function(d) { return d.close; })]);
//
//        // Select the section we want to apply our changes to
//        var svg = d3.select("body").transition();
//
//        // Make the changes
//        svg.select(".line")   // change the line
//            .duration(750)
//            .attr("d", valueline(data));
//        svg.select(".x.axis") // change the x axis
//            .duration(750)
//            .call(xAxis);
//        svg.select(".y.axis") // change the y axis
//            .duration(750)
//            .call(yAxis);
//
//    });
//}

function parse(d){

    //console.log(d);
    //console.log(d.Form_start_date);
    //string.split('/')
    var _date = [d.Form_start_date.split('/')];
    var _time = [d.Form_start_time.split(':')];
    //var forDate = _date + "," + _time;
    var forDate = _date.concat(_time);
    //console.log(forDate[1][0]);
    var finalDate = new Date(forDate[0][2], (forDate[0][0]-1), forDate[0][1],  forDate[1][0], forDate[1][1]);
    //var finalDate =  Date(year, month, day, hours, minutes, seconds, milliseconds)
    //console.log(finalDate);

    return {
        date: finalDate,
        //time: d.Form_start_time,
        //hr: +d.heart-rate,
        hr: +d.heart_rate,
        activation: +d.general_emotion,
        valence: +d.emotion_valence,
        gsr: +d.gsr*1000000,
        //temp: +d.skin-temp
        temp: +d.skin_temp
        //    item: d.ItemName
        //    //item: d.ItemName,
        //    //item: d.ItemName,
        //    //year: +d.Year,
        //    //value: +d.Value
    }
}

//function filterData(data, criterion, lower, upper){
//// filters data based on criterion and its lower and upper bounds
//                //    var _properties = []
//                //    for(var name in data[0]) {
//                //        //console.log(name);
//                //        properties.push(name);
//                //        //var value = data[0][name];
//                //        //console.log(value);
//                //    }
//                //    //console.log(data);
//    return function(d){
//       console.log(d);
//    }
