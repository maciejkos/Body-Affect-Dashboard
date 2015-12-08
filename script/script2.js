/*Start by setting up the canvas */
var margin = {t:50,r:100,b:50,l:50};
var width = document.getElementById('plot').clientWidth - margin.r - margin.l,
    height = document.getElementById('plot').clientHeight - margin.t - margin.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','canvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//Scales
var startDate = new Date(2015,10,26,5),
    endDate = new Date(2015,11,3,14);
var scaleX = d3.time.scale().domain([startDate,endDate]).range([0,width]),
    scaleY = d3.scale.linear().domain([10,140]).range([height,0]);
//var colorScale = d3.scale.quantize()
var colorScale = d3.scale.linear()
    .domain([0, 100])
    .range(["#FFD3D3", "#f90000"]); //whitish (0) to red(100)
    //.range(["#c21500", "#ffc500"]); //yellow (0) to red(100)

//Axis
var axisX = d3.svg.axis()
    .orient('bottom')
    .scale(scaleX)
    .tickSize(5)
    .ticks(d3.time.day)
    .tickFormat(d3.time.format('%m/%d'));

var axisXhour = d3.svg.axis()
    .orient('bottom')
    .scale(scaleX)
    .tickSize(5)
    //.ticks(d3.time.hour)
    .ticks(d3.time.hour, 2)
    //.tickValues([8,10,12,14,16,18,19,20,22]);

    .tickFormat(d3.time.format('%H-%M'));
    //.tickSize(5)
    //.ticks(d3.time.week)
    //.tickFormat(d3.time.format('%Y-%m-%d'));
    //
    //.tickFormat( d3.format('d') ); //https://github.com/mbostock/d3/wiki/Formatting
var axisY = d3.svg.axis()
    .orient('right')
    .tickSize(width)
    .scale(scaleY);

//Draw axes
plot.append('g').attr('class','axis axis-x-day')
    .attr('transform','translate(0,'+height+')')
    .call(axisX);
plot.append('g').attr('class','axis axis-x-hour')
    .attr('transform','translate(0,'+height+')')
    .call(axisXhour);
plot.append('g').attr('class','axis axis-y')
    .call(axisY);
plot.select('.axis-x-day')
    .selectAll('text')
    .attr('transform','rotate(90)translate(-100,0)');
plot.select('.axis-x-hour')
    .selectAll('text')
    .attr('transform','rotate(90)translate(-60,0)');

//// Filters
//var stock = document.getElementById('stock').value;
//var start = document.getElementById('start').value;
//var end = document.getElementById('end').value;

//TODO: Line generator
// this results in a function we can use later
var lineGenerator = d3.svg.line()
    .x(function(d){return scaleX(d.date)})
    .y(function(d){return scaleY(d.hr)});

//TODO: Area generator
// this results in a function we can use later
var areaGenerator = d3.svg.area()
    .x(function(d){ return scaleX(d.date)}) // location on the axis
    .y0(height)                             //bottom of the bar
    .y1(function(d){ return scaleY(d.hr)})//top of the bar
    .interpolate('basis');

//Import data with queue
queue()
    .defer(d3.csv,'data/merged7days.csv',parse)
    //.defer(d3.csv,'data/Merge3.csv',parse)
    //.defer(d3.csv,'data/fao_coffee_world_1963_2013.csv',parse)
    //.defer(d3.csv,'data/fao_tea_world_1963_2013.csv',parse)
    .await(dataLoaded);

function dataLoaded(error, heartRate){
//function dataLoaded(error, coffee, tea){
//    console.log(heartRate.time);
//    var forDate = heartRate.date;
//    console.log(forDate);
    //string.split('/')
    //console.log(heartRate);
    //var maxHR = d3.max(pop);
    //scaleR.domain([0,maxPop]);

    draw(heartRate);
    //console.log(heartRate[0].hr);

    //plot.selectAll('.circles-data-point')
    //    .data(coffee)
    //    .enter() // elements
    //    .append('circle').attr('class', 'coffee-data-point data-point')
    //    .attr('cx', function(d){
    //        return scaleX(d.year);
    //    })
    //    .attr('cy', function(d){
    //        return scaleY(d.value);
    //    })
    //    .attr('r', 3)

    //plot.selectAll('.big-circles-data-point')
    //    .data(tea)
    //    .enter() // elements
    //    .append('circle').attr('class', 'tea-data-point data-point')
    //    .attr('cx', function(d){
    //        return scaleX(d.year);
    //    })
    //    .attr('cy', function(d){
    //        return scaleY(d.value);
    //    })
    //    .attr('r', 7);
    // HOW to create a path?
    // unlike in appending all data points to many circles, with path we only append 1 array to 1 path element

    //plot.append('path')
    //    .attr('class', 'data-line coffee-data-line')
    //    .datum(coffee)
    //    .attr('d',lineGenerator) // this is geometry of the path
        //.attr('d',d3.svg.line(function(d)
        //    {return scaleX(d.year), scaleY(d.value)})) // this is geometry of the path
        //
        //.x(function(d){return scaleX(d.year)})
        //.y(function(d){return scaleY(d.value)})
        //
        //

    //plot.append('path')
    //    .attr('class', 'data-line coffee-data-line')
    //    //.datum(coffee)
    //    .data(heartRate)
    //    .attr('d',lineGenerator) // this is geometry of the path
    //    .attr('d',d3.svg.line(function(d)
    //        {return scaleX(d.date), scaleY(d.hr)})) // this is geometry of the path
    //
    //    .x(function(d){return scaleX(d.year)})
    //    .y(function(d){return scaleY(d.value)});

    //plot.append('path')
    //    .attr('class', 'data-line tea-data-line')
    //    .datum(tea)
    //    //.attr('d',...) // this is geometry of the path
}

function updateData(heartRate) {

    ////var stock = document.getElementById('stock').value;
    var start = parseInt(document.getElementById('start').value);
    var end = parseInt(document.getElementById('end').value);
    //console.log(end);
    //heartRate.filter(function(d){
    //    //return (d.hr >start && d.hr <end);
    //    return (d.hr >75 && d.hr <90);});
    draw(heartRate, start, end);
}

function draw(data, start, end) {
    //console.log(data);
    //console.log(end);
    plot.selectAll('.circles-data-point')
        //.data(data.filter(function(d){
        //        return (d.hr >start && d.hr <end);
                //return (d.hr >75 && d.hr <90);
            //}
        //))
        .data(data)
        .enter()
        //.append('circle').attr('class', 'coffee-data-point data-point')
        .append('circle').attr('class', 'data-points')
        .attr('fill', function(d){
            return colorScale(d.valence);
        })
        .style('fill-opacity', '0.5')
        .attr('cx', function (d) {
            //console.log(d.date);
            return scaleX(d.date); })

        .attr('cy', function(d){
                    return scaleY(d.hr);})
        .attr('r', 3)

        //.filter(function(d) { return d.hr < 50 })
        //.style("fill", "none")
    ;

}
    //plot.selectAll('.circles-data-point')
    //    .data(data)
    //    .enter() // elements
    //    .append('circle').attr('class', 'coffee-data-point data-point')
    //    .attr('cx', function(d){
    //        return scaleX(d.year);
    //    })
    //    .attr('cy', function(d){
    //        return scaleY(d.value);
    //    })
    //    .attr('r', 3);

    //plot.append('path')
    //    .attr('class', 'data-line coffee-data-line')
    //    //.datum(coffee)
    //    .data(heartRate)
    //    .attr('d',lineGenerator) // this is geometry of the path
    //    .attr('d',d3.svg.line(function(d)
    //        {return scaleX(d.date), scaleY(d.hr)})) // this is geometry of the path
    //
    //    .x(function(d){return scaleX(d.year)})
    //    .y(function(d){return scaleY(d.value)});

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
