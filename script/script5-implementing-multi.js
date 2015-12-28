/*Start by setting up the canvas */
var margin = {t: 50, r: 100, b: 50, l: 50};
var width = document.getElementById('plot').clientWidth - margin.r - margin.l,
    height = document.getElementById('plot').clientHeight - margin.t - margin.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width', width + margin.r + margin.l)
    .attr('height', height + margin.t + margin.b)
    .append('g')
    .attr('class', 'plotArea')
    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');

var plot_main = plot.append('g');

var plotBrush = d3.select('.canvas2')
    .append('svg')
    .attr('width', width + margin.r + margin.l)
    .attr('height', height / 4 + margin.t + margin.b)
    .append('g')
    .attr('class', 'brush')
    .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');

//Scales
var startDate = new Date(2015, 10, 26, 5),
    endDate = new Date(2015, 11, 3, 14);


var plot_extent = d3.map();
var plot_yVar = d3.map();


plot_extent.set(
    'current_extent', [startDate, endDate]
);
extent_init = plot_extent.get('current_extent');

// Set up scales

var scaleX = d3.time.scale().domain(extent_init).range([0, width]),
    scaleY = d3.scale.linear().range([height, 0]).domain([0, 168]),
    x2 = d3.time.scale().range([0, width]),
    y2 = d3.scale.linear().range([(height / 4), 0]),
    colorScale = d3.scale.linear().domain([0, 168]).range(["blue", "red"]),
// Siqi - I tried with a white mid-point as you suggested but it does not look good
//colorScale = d3.scale.linear().domain([0, 89, 168]).range(["blue", "white", "red"]),
    radiusScale = d3.scale.linear().domain([1, 168]).range([1, 10]);

x2.domain(extent_init);
y2.domain([0, 140]);
var brush = d3.svg.brush()
    .x(x2)
    .on('brushend', brushListener);


//Axis
var axisX = d3.svg.axis()
    .orient('bottom')
    .scale(scaleX)
    .innerTickSize(-height)
    //.tickSize(5)
    .ticks(d3.time.day)
    .tickFormat(d3.time.format('%a %m/%d'));

var axisXhour = d3.svg.axis()
    .scale(scaleX)
    .orient('bottom')
    .tickFormat(d3.time.format('%H-%M'));

var axisY = d3.svg.axis()
    .orient('right')
    .tickSize(width)
axisY.scale(scaleY);

var colorScaleBrush = d3.scale.linear()
    .domain([0, 100])
    .range(["blue", "red"]);

//Draw axes
plot.append('g').attr('class', 'axis axis-x-day')
    .attr('transform', 'translate(0,' + height + ')')
    .call(axisX);
plot.append('g').attr('class', 'axis axis-x-hour')
    .attr('transform', 'translate(0,' + height + ')')
    .call(axisXhour);
plot.append('g').attr('class', 'axis axis-y')
    .call(axisY);

// Main plot variables
// change y variable for plot
var plot_yVar = d3.map();
plot_yVar.set('current_yVar', ['hr']);
yVar_init = plot_yVar.get('current_yVar');

d3.selectAll('.y-axis_').on('click', function () {
    var type = d3.select(this).attr('id');
    if (type == "heart_rate") {
        plot_yVar.set('current_yVar', ['hr']);
        draw(dataset);
    }
    if (type == "skin_temp") {
        plot_yVar.set('current_yVar', ['temp']);
        draw(dataset);
    }
    if (type == "steps") {
        plot_yVar.set('current_yVar', ['steps']);
        draw(dataset);
    }
    if (type == "intensity") {
        plot_yVar.set('current_yVar', ['activation']);
        draw(dataset);
    }
    if (type == "gsr") {
        plot_yVar.set('current_yVar', ['gsr']);
        draw(dataset);
    }
    if (type == "valence") {
        plot_yVar.set('current_yVar', ['valence']);
        draw(dataset);
    }
    if (type == "calories") {
        plot_yVar.set('current_yVar', ['calories']);
        draw(dataset);
    }
    if (type == "anxiety") {
        plot_yVar.set('current_yVar', ['anxiety_2']);
        draw(dataset);
    }
    if (type == "fear") {
        plot_yVar.set('current_yVar', ['fear']);
        draw(dataset);
    }
    if (type == "envy") {
        plot_yVar.set('current_yVar', ['envy']);
        draw(dataset);
    }
    if (type == "anticipation") {
        plot_yVar.set('current_yVar', ['anticipation']);
        draw(dataset);
    }
    if (type == "love") {
        plot_yVar.set('current_yVar', ['love']);
        draw(dataset);
    }
    if (type == "anger") {
        plot_yVar.set('current_yVar', ['anger']);
        draw(dataset);
    }
    if (type == "sadness") {
        plot_yVar.set('current_yVar', ['sadness']);
        draw(dataset);
    }
    if (type == "excitement") {
        plot_yVar.set('current_yVar', ['excitement']);
        draw(dataset);
    }
    if (type == "frustration") {
        plot_yVar.set('current_yVar', ['frustration']);
        draw(dataset);
    }
    if (type == "energy") {
        plot_yVar.set('current_yVar', ['energy']);
        draw(dataset);
    }
    if (type == "hunger") {
        plot_yVar.set('current_yVar', ['hunger']);
        draw(dataset);
    }


});

// change color variable for plot
var plotColorVar = d3.map();
plotColorVar.set('current_plotColorVar', ['hr']);
plotColorVar_init = plotColorVar.get('current_plotColorVar');

d3.selectAll('.color_').on('click', function () {
    var type = d3.select(this).attr('id');
    if (type == "heart_rate") {
        plotColorVar.set('current_plotColorVar', ['hr']);
        draw(dataset);
    }
    if (type == "skin_temp") {
        plotColorVar.set('current_plotColorVar', ['temp']);
        draw(dataset);
    }
    if (type == "gsr") {
        plotColorVar.set('current_plotColorVar', ['gsr']);
        draw(dataset);
    }
    if (type == "steps") {
        plotColorVar.set('current_plotColorVar', ['steps']);
        draw(dataset);
    }
    if (type == "intensity") {
        plotColorVar.set('current_plotColorVar', ['activation']);
        draw(dataset);
    }
    if (type == "valence") {
        plotColorVar.set('current_plotColorVar', ['valence']);
        draw(dataset);
    }
    if (type == "calories") {
        plotColorVar.set('current_plotColorVar', ['calories']);
        draw(dataset);
    }
    if (type == "anxiety") {
        plotColorVar.set('current_plotColorVar', ['anxiety_2']);
        draw(dataset);
    }
    if (type == "fear") {
        plotColorVar.set('current_plotColorVar', ['fear']);
        draw(dataset);
    }
    if (type == "envy") {
        plotColorVar.set('current_plotColorVar', ['envy']);
        draw(dataset);
    }
    if (type == "anticipation") {
        plotColorVar.set('current_plotColorVar', ['anticipation']);
        draw(dataset);
    }
    if (type == "love") {
        plotColorVar.set('current_plotColorVar', ['love']);
        draw(dataset);
    }
    if (type == "anger") {
        plotColorVar.set('current_plotColorVar', ['anger']);
        draw(dataset);
    }
    if (type == "sadness") {
        plotColorVar.set('current_plotColorVar', ['sadness']);
        draw(dataset);
    }
    if (type == "excitement") {
        plotColorVar.set('current_plotColorVar', ['excitement']);
        draw(dataset);
    }
    if (type == "frustration") {
        plotColorVar.set('current_plotColorVar', ['frustration']);
        draw(dataset);
    }
    if (type == "energy") {
        plotColorVar.set('current_plotColorVar', ['energy']);
        draw(dataset);
    }
    if (type == "hunger") {
        plotColorVar.set('current_plotColorVar', ['hunger']);
        draw(dataset);
    }


});

// change radius variable for plot
var plotRadiusVar = d3.map();
plotRadiusVar_init = plotRadiusVar.get('current_plotRadiusVar');
plotRadiusVar.set('current_plotRadiusVar', ['hr']);

d3.selectAll('.radius').on('click', function () {
    var selected = $("#radius_main option:selected");
    console.log("selected");
    console.log(selected);
    //console.log("radius");
    //console.log(this);
    var type = d3.select(selected).attr('option');
    //var type = d3.select(this).attr('option:value');
    console.log(type);
    if (type == "heart_rate") {
        plotRadiusVar.set('current_plotRadiusVar', ['hr']);
        draw(dataset);
    }
    if (type == "skin_temp") {
        plotRadiusVar.set('current_plotRadiusVar', ['temp']);
        draw(dataset);
    }
    if (type == "gsr") {
        plotRadiusVar.set('current_plotRadiusVar', ['gsr']);
        draw(dataset);
    }
    if (type == "steps") {
        plotRadiusVar.set('current_plotRadiusVar', ['steps']);
        draw(dataset);
    }
    if (type == "intensity") {
        plotRadiusVar.set('current_plotRadiusVar', ['activation']);
        draw(dataset);
    }
    if (type == "valence") {
        plotRadiusVar.set('current_plotRadiusVar', ['valence']);
        draw(dataset);
    }
    if (type == "calories") {
        plotRadiusVar.set('current_plotRadiusVar', ['calories']);
        draw(dataset);
    }
    if (type == "anxiety") {
        plotRadiusVar.set('current_plotRadiusVar', ['anxiety_2']);
        draw(dataset);
    }
    if (type == "fear") {
        plotRadiusVar.set('current_plotRadiusVar', ['fear']);
        draw(dataset);
    }
    if (type == "envy") {
        plotRadiusVar.set('current_plotRadiusVar', ['envy']);
        draw(dataset);
    }
    if (type == "anticipation") {
        plotRadiusVar.set('current_plotRadiusVar', ['anticipation']);
        draw(dataset);
    }
    if (type == "love") {
        plotRadiusVar.set('current_plotRadiusVar', ['love']);
        draw(dataset);
    }
    if (type == "anger") {
        plotRadiusVar.set('current_plotRadiusVar', ['anger']);
        draw(dataset);
    }
    if (type == "sadness") {
        plotRadiusVar.set('current_plotRadiusVar', ['sadness']);
        draw(dataset);
    }
    if (type == "excitement") {
        plotRadiusVar.set('current_plotRadiusVar', ['excitement']);
        draw(dataset);
    }
    if (type == "frustration") {
        plotRadiusVar.set('current_plotRadiusVar', ['frustration']);
        draw(dataset);
    }
    if (type == "energy") {
        plotRadiusVar.set('current_plotRadiusVar', ['energy']);
        draw(dataset);
    }
    if (type == "hunger") {
        plotRadiusVar.set('current_plotRadiusVar', ['hunger']);
        draw(dataset);
    }


});

///// Secondary plot (brush) variables
// change y variable for brush
var brushyVar = d3.map();
brushyVar.set('current_brush_yVar', ['hr']);
brushyVar_init = brushyVar.get('current_brush_yVar');

d3.selectAll('.y-axis').on('click', function () {
    var type = d3.select(this).attr('id');
    if (type == "_heart_rate") {
        brushyVar.set('current_brush_yVar', ['hr']);
        drawBrush(dataset);
    }
    if (type == "_skin_temp") {
        brushyVar.set('current_brush_yVar', ['temp']);
        drawBrush(dataset);
    }
    if (type == "_steps") {
        brushyVar.set('current_brush_yVar', ['steps']);
        drawBrush(dataset);
    }
    if (type == "_intensity") {
        brushyVar.set('current_brush_yVar', ['activation']);
        drawBrush(dataset);
    }
    if (type == "_gsr") {
        brushyVar.set('current_brush_yVar', ['gsr']);
        drawBrush(dataset);
    }
    if (type == "_valence") {
        brushyVar.set('current_brush_yVar', ['valence']);
        drawBrush(dataset);
    }
    if (type == "_calories") {
        brushyVar.set('current_brush_yVar', ['calories']);
        drawBrush(dataset);
    }
    if (type == "_anxiety") {
        brushyVar.set('current_brush_yVar', ['anxiety_2']);
        drawBrush(dataset);
    }
    if (type == "_fear") {
        brushyVar.set('current_brush_yVar', ['fear']);
        drawBrush(dataset);
    }
    if (type == "_envy") {
        brushyVar.set('current_brush_yVar', ['envy']);
        drawBrush(dataset);
    }
    if (type == "_anticipation") {
        brushyVar.set('current_brush_yVar', ['anticipation']);
        drawBrush(dataset);
    }
    if (type == "_love") {
        brushyVar.set('current_brush_yVar', ['love']);
        drawBrush(dataset);
    }
    if (type == "_anger") {
        brushyVar.set('current_brush_yVar', ['anger']);
        drawBrush(dataset);
    }
    if (type == "_sadness") {
        brushyVar.set('current_brush_yVar', ['sadness']);
        drawBrush(dataset);
    }
    if (type == "_excitement") {
        brushyVar.set('current_brush_yVar', ['excitement']);
        drawBrush(dataset);
    }
    if (type == "_frustration") {
        brushyVar.set('current_brush_yVar', ['frustration']);
        drawBrush(dataset);
    }
    if (type == "_energy") {
        brushyVar.set('current_brush_yVar', ['energy']);
        drawBrush(dataset);
    }
    if (type == "_hunger") {
        brushyVar.set('current_brush_yVar', ['hunger']);
        drawBrush(dataset);
    }


});

// change color variable for brush
var brushColorVar = d3.map();
brushColorVar.set('current_brushColorVar', ['hr']);
brushColorVar_init = brushColorVar.get('current_brushColorVar');

d3.selectAll('.color').on('click', function () {
    var type = d3.select(this).attr('id');
    if (type == "_heart_rate") {
        brushColorVar.set('current_brushColorVar', ['hr']);
        drawBrush(dataset);
    }
    if (type == "_skin_temp") {
        brushColorVar.set('current_brushColorVar', ['temp']);
        drawBrush(dataset);
    }
    if (type == "_gsr") {
        brushColorVar.set('current_brushColorVar', ['gsr']);
        drawBrush(dataset);
    }
    if (type == "_steps") {
        brushColorVar.set('current_brushColorVar', ['steps']);
        drawBrush(dataset);
    }
    if (type == "_intensity") {
        brushColorVar.set('current_brushColorVar', ['activation']);
        drawBrush(dataset);
    }
    if (type == "_valence") {
        brushColorVar.set('current_brushColorVar', ['valence']);
        drawBrush(dataset);
    }
    if (type == "_calories") {
        brushColorVar.set('current_brushColorVar', ['calories']);
        drawBrush(dataset);
    }
    if (type == "_anxiety") {
        brushColorVar.set('current_brushColorVar', ['anxiety_2']);
        drawBrush(dataset);
    }
    if (type == "_fear") {
        brushColorVar.set('current_brushColorVar', ['fear']);
        drawBrush(dataset);
    }
    if (type == "_envy") {
        brushColorVar.set('current_brushColorVar', ['envy']);
        drawBrush(dataset);
    }
    if (type == "_anticipation") {
        brushColorVar.set('current_brushColorVar', ['anticipation']);
        drawBrush(dataset);
    }
    if (type == "_love") {
        brushColorVar.set('current_brushColorVar', ['love']);
        drawBrush(dataset);
    }
    if (type == "_anger") {
        brushColorVar.set('current_brushColorVar', ['anger']);
        drawBrush(dataset);
    }
    if (type == "_sadness") {
        brushColorVar.set('current_brushColorVar', ['sadness']);
        drawBrush(dataset);
    }
    if (type == "_excitement") {
        brushColorVar.set('current_brushColorVar', ['excitement']);
        drawBrush(dataset);
    }
    if (type == "_frustration") {
        brushColorVar.set('current_brushColorVar', ['frustration']);
        drawBrush(dataset);
    }
    if (type == "_energy") {
        brushColorVar.set('current_brushColorVar', ['energy']);
        drawBrush(dataset);
    }
    if (type == "_hunger") {
        brushColorVar.set('current_brushColorVar', ['hunger']);
        drawBrush(dataset);
    }


});

// change radius variable for brush
var brushRadiusVar = d3.map();
brushRadiusVar.set('current_brushRadiusVar', ['hr']);
brushRadiusVar_init = brushRadiusVar.get('current_brushRadiusVar');


d3.selectAll('.size').on('click', function () {

    var type = d3.select(this).attr('id');
    if (type == "_heart_rate") {

        brushRadiusVar.set('current_brushRadiusVar', ['hr']);
        drawBrush(dataset);
    }
    if (type == "_skin_temp") {
        brushRadiusVar.set('current_brushRadiusVar', ['temp']);
        drawBrush(dataset);
    }
    if (type == "_gsr") {
        brushRadiusVar.set('current_brushRadiusVar', ['gsr']);
        drawBrush(dataset);
    }
    if (type == "_steps") {
        brushRadiusVar.set('current_brushRadiusVar', ['steps']);
        drawBrush(dataset);
    }
    if (type == "_intensity") {
        brushRadiusVar.set('current_brushRadiusVar', ['activation']);
        drawBrush(dataset);
    }
    if (type == "_valence") {
        brushRadiusVar.set('current_brushRadiusVar', ['valence']);
        drawBrush(dataset);
    }
    if (type == "_calories") {
        brushRadiusVar.set('current_brushRadiusVar', ['calories']);
        drawBrush(dataset);
    }
    if (type == "_anxiety") {
        brushRadiusVar.set('current_brushRadiusVar', ['anxiety_2']);
        drawBrush(dataset);
    }
    if (type == "_fear") {
        brushRadiusVar.set('current_brushRadiusVar', ['fear']);
        drawBrush(dataset);
    }
    if (type == "_envy") {
        brushRadiusVar.set('current_brushRadiusVar', ['envy']);
        drawBrush(dataset);
    }
    if (type == "_anticipation") {
        brushRadiusVar.set('current_brushRadiusVar', ['anticipation']);
        drawBrush(dataset);
    }
    if (type == "_love") {
        brushRadiusVar.set('current_brushRadiusVar', ['love']);
        drawBrush(dataset);
    }
    if (type == "_anger") {
        brushRadiusVar.set('current_brushRadiusVar', ['anger']);
        drawBrush(dataset);
    }
    if (type == "_sadness") {
        brushRadiusVar.set('current_brushRadiusVar', ['sadness']);
        drawBrush(dataset);
    }
    if (type == "_excitement") {
        brushRadiusVar.set('current_brushRadiusVar', ['excitement']);
        drawBrush(dataset);
    }
    if (type == "_frustration") {
        brushRadiusVar.set('current_brushRadiusVar', ['frustration']);
        drawBrush(dataset);
    }
    if (type == "_energy") {
        brushRadiusVar.set('current_brushRadiusVar', ['energy']);
        drawBrush(dataset);
    }
    if (type == "_hunger") {
        brushRadiusVar.set('current_brushRadiusVar', ['hunger']);
        drawBrush(dataset);
    }


});

//Import data with queue
function queueData() {

    queue()
    //.defer(d3.csv, 'data/merged7daysSinglePoints.csv', parse)
        .defer(d3.csv, 'data/merged7days.csv', parse)
        //.defer(d3.csv,'data/Merge3.csv',parse)
        .await(dataLoaded);
}

queueData();

function dataLoaded(error, heartRate) {

    dataset = heartRate; // do not remove
    draw(heartRate);
    drawBrush(heartRate);
}

function draw(_data) {
    // Let's get start and end data of data from brush
    extent = plot_extent.get('current_extent');
    start = extent[0]
    end = extent[1]

    // What variables am I plotting?
    yVar = plot_yVar.get('current_yVar');
    ColorVar = plotColorVar.get('current_plotColorVar');
    RadiusVar = plotRadiusVar.get('current_plotRadiusVar');

    // Maxes of my variables for scales
    yVarMax = d3.max(_data, function (d) {
        return d[yVar];
    });
    ColorVarMax = d3.max(_data, function (d) {
        return d[ColorVar];
    });
    //ColorVarMed = d3.median(_data, function(d) { return d[ColorVar]; });
    RadiusVarMax = d3.max(_data, function (d) {
        return d[RadiusVar];
    });

    // Here I hard code the lower bound of the domain to ignore 0 values which result from
    // faulty readings of hr, temp. Otherwise I would use d3.min
    var varMin = {"hr": 40, "temp": 65, "gsr": 0, "calories": 0, "steps": 0};

    function lookupMin(variable) {
        if (variable in varMin) {
            return varMin[variable]
        } else {
            return 0;
        }
    };

    scaleY.domain([lookupMin(yVar), yVarMax]);
    colorScale.domain([lookupMin(ColorVar), ColorVarMax]);
    //colorScale.domain([0, ColorVarMed, ColorVarMax]);
    radiusScale.domain[(lookupMin(RadiusVar), RadiusVarMax)];
    scaleX.domain(extent);

    plot.select('.axis-x-day')
        .call(axisX);

    plot.select('.axis-x-hour')
        .call(axisXhour);

    plot.select('.axis-x-hour')
        .selectAll('text')
        .attr('transform', 'rotate(90)')
        .attr('transform', 'translate(0,10)');

    plot.select('.axis-y')
        .call(axisY);


    // Here I am plotting dark lines to indicate nights
    // This seems terribly inefficient to plot so many lines
    // I should fix it at some point
    var nightLines = plot_main.selectAll('.nightLaneLines').data(_data, function (d) {
        return d.date;
    });

    var lines_enter = nightLines.enter().append('line').attr('class', 'nightLaneLines');
    var lines_exit = nightLines.exit().remove();

    nightLines
        .attr('x1', function (d) {
            return scaleX(d.date)
        })
        .attr('y1', function (d) {
            time = moment(d.date, '%ddd %MMM %D %YYYY %H:%mm:%S%Z');

            if (time.hour() > 7 && time.hour() < 23) {
                return 0;
            } else {
                return height;
            }
        })
        //.attr('y1', height)
        .attr('x2', function (d) {
            return scaleX(d.date)
        })
        .attr('y2', 0)
        .attr('stroke', "#EBEBEB")

        .attr('stroke-width', '1');

    var nodes = plot_main.selectAll('.circles-data-point').data(_data, function (d) {
        return d.date;
    });

    //enter
    var node_enter = nodes.enter().append('circle').attr('class', 'circles-data-point')
        .style('fill-opacity', '0.5');

    //exit
    var node_exit = nodes.exit().remove();

    // transitions
    nodes
        .attr('fill', function (d) {
            return colorScale(d[ColorVar]);
        })
        .attr('location', function (d) {
            return d.location;
        })
        .transition().duration(200).attr('cx', function (d) {
            return scaleX(d.date);
        })

        .attr('cy', function (d) {
            return scaleY(d[yVar]);
        })

        .attr('r', function (d) {
            return radiusScale(d[RadiusVar]);
        });

    node_enter
        .on('mouseover', function (d, i) {
            //console.log("over");
            d3.select(this)
                .style('stroke', "black")
                .style('stroke-width', 1);
        })

        .on("mouseenter", function (d) {
            var dateParser = d3.time.format('%a %m/%d %H:%M');
            var tooltip = d3.select(".custom-tooltip");
            tooltip.transition().style("opacity", 1);
            tooltip.select("#hr").html(d.hr);
            tooltip.select("#skin_temp").html(d.temp);
            tooltip.select("#steps").html(d.steps);
            tooltip.select("#intensity").html(d.activation);
            tooltip.select("#valence").html(d.valence);
            tooltip.select("#calories").html(d.calories);
            tooltip.select("#anxiety").html(d.anxiety_2);
            tooltip.select("#fear").html(d.fear);
            tooltip.select("#envy").html(d.envy);
            tooltip.select("#anticipation").html(d.anticipation);
            tooltip.select("#love").html(d.love);
            tooltip.select("#anger").html(d.anger);
            tooltip.select("#sadness").html(d.sadness);
            tooltip.select("#excitement").html(d.excitement);
            tooltip.select("#frustration").html(d.frustration);
            tooltip.select("#energy").html(d.energy);
            tooltip.select("#hunger").html(d.hunger);
            tooltip.select("#activity").html(d.activation);
            tooltip.select("#location").html(d.location);
            tooltip.select("#date").html(dateParser(d.date));
        })

        .on("mouseleave", function (d) {
            d3.select(this)
                .style('stroke-width', 0);
            d3.select(".custom-tooltip").transition() //hide data from the tooltip
                .style("opacity", 0);
        })
        .on("mousemove", function (d) {
            d3.select(this).style('opacity', 1);
            var xy = d3.mouse(document.getElementById("plot")); // tooltip to move with mouse movements
            var left = xy[0],
                top = xy[1];

            d3.select(".custom-tooltip")
                .style("left", left - 200 + "px")
                .style("top", top - 300 + "px")
        });

    // >>>> Comment this out to plot other vars on main and secondary plot
    drawBrush(dataset);
}

function drawBrush(data) {
    plotBrush.selectAll('.brush-circles-data-point')
    // Let's get start and end data of data from brush

    // What variables am I plotting?

    // >>>> Uncomment this to plot other vars on main and secondary plot
    //brush_yVar = brushyVar.get('current_brush_yVar');
    //brush_ColorVar = brushColorVar.get('current_brushColorVar');
    //brush_RadiusVar = brushRadiusVar.get('current_brushRadiusVar');

    // >>>> Comment this out to plot other vars on main and secondary plot

    brush_yVar = plot_yVar.get('current_yVar');
    brush_ColorVar = plotColorVar.get('current_plotColorVar');
    brush_RadiusVar = plotRadiusVar.get('current_plotRadiusVar');

    // >>>>

    // Maxes of my variables for scales

    brush_yVarMax = d3.max(data, function (d) {
        return d[brush_yVar];
    });
    brush_ColorVarMax = d3.max(data, function (d) {
        return d[brush_ColorVar];
    });
    brush_RadiusVarMax = d3.max(data, function (d) {
        return d[brush_RadiusVar];
    });

    // Here I hard code the lower bound of the domain to ignore 0 values which result from
    // faulty readings of hr, temp. Otherwise I would use d3.min
    // Ideally, I should filter the earlier
    var varMin = {"hr": 40, "temp": 65, "gsr": 0, "calories": 0, "steps": 0};

    function lookupMin(variable) {
        if (variable in varMin) {
            return varMin[variable]
        } else {
            return 0;
        }
    };

    y2.domain([lookupMin(brush_yVar), brush_yVarMax]);
    colorScale.domain([lookupMin(brush_ColorVar), brush_ColorVarMax]);
    radiusScale.domain[(lookupMin(brush_RadiusVar), brush_RadiusVarMax)];
    scaleX.domain(extent);

    var _nodes = plotBrush.selectAll('.brush-circles-data-point').data(data, function (d) {
        return d.date;
    });

    //enter
    var _node_enter = _nodes.enter().append('circle').attr('class', 'brush-circles-data-point')
        .style('fill-opacity', '0.5');

    //exit
    var _node_exit = _nodes.exit().remove();

    // transitions
    _nodes
        .attr('fill', function (d) {
            return colorScale(d[brush_ColorVar]);
        })
        .attr('location', function (d) {
            return d.location;
        })
        .transition().duration(200).attr('cx', function (d) {
            return x2(d.date);
        })

        .attr('cy', function (d) {
            return y2(d[brush_yVar]);
        })
        //.attr('cy', function (d) {return scaleY(d.hr);})
        //.attr('r', '5');
        .attr('r', function (d) {
            return (radiusScale(d[brush_RadiusVar])) / 2;
        });


    // Create and translate the brush container group
    plotBrush.append('g')
        .attr('class', 'brush');


    var gBrush = plotBrush.select('g.brush').call(brush);
    gBrush.selectAll('rect')
        .attr('height', height);
}

function brushListener() {

    var start = brush.extent()[0],
        end = brush.extent()[1];

    _start = d3.time.format('%Y-%m-%dT%H:%M:%S%Z')(start)
    _end = d3.time.format('%Y-%m-%dT%H:%M:%S%Z')(end)
    __start = new Date(_start)
    __end = new Date(_end)
    plot_extent.set('current_extent', [__start, __end])

    data___ = dataset.filter(function (d) {
        return new Date(d3.time.format('%Y-%m-%dT%H:%M:%S%Z')(d.date)) > start && new Date(d3.time.format('%Y-%m-%dT%H:%M:%S%Z')(d.date)) < end;
    })
    draw(data___);

}

function parse(d) {
    var _date = [d.Form_start_date.split('/')];
    var _time = [d.Form_start_time.split(':')];
    var forDate = _date.concat(_time);
    var finalDate = new Date(forDate[0][2], (forDate[0][0] - 1), forDate[0][1], forDate[1][0], forDate[1][1]);


    return {

        date: finalDate,
        hr: +d.heart_rate,
        activation: +d.general_emotion,
        valence: +d.emotion_valence,
        gsr: +d.gsr * 10,
        temp: +d.skin_temp,
        calories: +d.calories * 10,
        steps: +d.steps,
        anxiety_2: +d.anxiety_2,
        fear: +d.fear,
        envy: +d.Envy,
        trust: +d.Trust,
        disgust: +d.Disgust,
        anticipation: +d.Anticipation,
        joy: +d.Joy,
        love: +d.Love,
        hope: +d.Hope,
        anger: +d.Anger,
        sadness: +d.Sadness,
        excitement: +d.Excitement,
        frustration: +d.Frustration,
        activity: d.what_are_you_doing,
        location: d.location_selfreport,
        energy: +d.energy,
        stimulants: d.Stimulants,
        sugar: d.Sugar,
        pain: d.Pain,
        hunger: +d.hunger

    }
}
