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
var scaleX = d3.scale.linear().domain([1960,2015]).range([0,width]),
    scaleY = d3.scale.linear().domain([0,11000000]).range([height,0]);

//Axis
var axisX = d3.svg.axis()
    .orient('bottom')
    .scale(scaleX)
    .tickFormat( d3.format('d') ); //https://github.com/mbostock/d3/wiki/Formatting
var axisY = d3.svg.axis()
    .orient('right')
    .tickSize(width)
    .scale(scaleY);

//Draw axes
plot.append('g').attr('class','axis axis-x')
    .attr('transform','translate(0,'+height+')')
    .call(axisX);
plot.append('g').attr('class','axis axis-y')
    .call(axisY);

//TODO: Line generator
// this results in a function we can use later
var lineGenerator = d3.svg.line()
    .x(function(d){return scaleX(d.year)})
    .y(function(d){return scaleY(d.value)})

//TODO: Area generator
// this results in a function we can use later
var areaGenerator = d3.svg.area()
    .x(function(d){ return scaleX(d.year)}) // location on the axis
    .y0(height)                             //bottom of the bar
    .y1(function(d){ return scaleY(d.value)})//top of the bar
    .interpolate('basis');

//Import data with queue
queue()
    .defer(d3.csv,'data/fao_coffee_world_1963_2013.csv',parse)
    .defer(d3.csv,'data/fao_tea_world_1963_2013.csv',parse)
    .await(dataLoaded);

function dataLoaded(error, coffee, tea){
    console.log(coffee);
    console.log(tea);

    plot.selectAll('.circles-data-point')
        .data(coffee)
        .enter() // elements
        .append('circle').attr('class', 'coffee-data-point data-point')
        .attr('cx', function(d){
            return scaleX(d.year);
        })
        .attr('cy', function(d){
            return scaleY(d.value);
        })
        .attr('r', 3)

    plot.selectAll('.big-circles-data-point')
        .data(tea)
        .enter() // elements
        .append('circle').attr('class', 'tea-data-point data-point')
        .attr('cx', function(d){
            return scaleX(d.year);
        })
        .attr('cy', function(d){
            return scaleY(d.value);
        })
        .attr('r', 7);
    // HOW to create a path?
    // unlike in appending all data points to many circles, with path we only append 1 array to 1 path element

    plot.append('path')
        .attr('class', 'data-line coffee-data-line')
        .datum(coffee)
        .attr('d',lineGenerator) // this is geometry of the path
        //.attr('d',d3.svg.line(function(d)
        //    {return scaleX(d.year), scaleY(d.value)})) // this is geometry of the path
        //
        //.x(function(d){return scaleX(d.year)})
        //.y(function(d){return scaleY(d.value)})

    plot.append('path')
        .attr('class', 'data-line tea-data-line')
        .datum(tea)
        //.attr('d',...) // this is geometry of the path
}



function parse(d){
    return {
        item: d.ItemName,
        year: +d.Year,
        value: +d.Value
    }
}