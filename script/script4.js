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
var plot_yVar = d3.map();


plot_extent.set(
    'current_extent', [startDate,endDate]
);
extent_init = plot_extent.get('current_extent');

var scaleX = d3.time.scale().domain(extent_init).range([0,width]),
    scaleY = d3.scale.linear().range([height,0]).domain([0, 168]),
    x2 = d3.time.scale().range([0, width]),
    y2 = d3.scale.linear().range([(height/4), 0]),
    colorScale = d3.scale.linear().domain([0, 168]).range(["blue", "red"]),
   // Siqi - I tried with a white mid-point as you suggested but it does not look good
    //colorScale = d3.scale.linear().domain([0, 89, 168]).range(["blue", "white", "red"]),
    radiusScale = d3.scale.linear().domain([1, 168]).range([1,10]);
//whitish (0) to red(100)
//.range(["#FFD3D3", "#f90000"]); //whitish (0) to red(100)
//.range(["#c21500", "#ffc500"]); //yellow (0) to red(100)


x2.domain(extent_init);
y2.domain([0, 140]);
var brush = d3.svg.brush()
    .x(x2)
    .on('brushend', brushListener);
//var colorScale = d3.scale.quantize()

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
    //.ticks(d3.time.hour)
    //.ticks(d3.time.hour, 2)
    .tickFormat(d3.time.format('%H-%M'));
//.tickSize(5)
//.ticks(d3.time.week)
//.tickFormat(d3.time.format('%Y-%m-%d'));
//
//.tickFormat( d3.format('d') ); //https://github.com/mbostock/d3/wiki/Formatting
var axisY = d3.svg.axis()
    .orient('right')
    .tickSize(width)
axisY.scale(scaleY);

var colorScaleBrush = d3.scale.linear()
    .domain([0, 100])
    .range(["blue", "red"]);


plot.append('g').attr('class','axis axis-x-day')
    .attr('transform','translate(0,'+height+')')
    .call(axisX);
plot.append('g').attr('class','axis axis-x-hour')
    .attr('transform','translate(0,'+height+')')
    .call(axisXhour);
plot.append('g').attr('class','axis axis-y')
    .call(axisY);
//plot.select('.axis-x-hour')
//    .selectAll('text');
    //.attr('transform','rotate(90)translate(-60,0)');
//Draw axes


//var brush = d3.svg.brush()
//    .x(x2)
//    .on("brush", brushed);

//function brushed() {
//    console.log("BRUSHED!!!!!");
//    x.domain(brush.empty() ? x2.domain() : brush.extent());
//    focus.select(".area").attr("d", area);
//    focus.select(".x.axis").call(xAxis);
//}

////TODO: Line generator
//// this results in a function we can use later
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

// change yVar for plot
var plot_yVar = d3.map();
plot_yVar.set('current_yVar', ['hr']);
yVar_init = plot_yVar.get('current_yVar');


d3.selectAll('.y-axis').on('click',function(){
    console.log('clicked the y!!!');
    var type = d3.select(this).attr('id');
    if (type=="heart_rate"){
        plot_yVar.set('current_yVar', ['hr']);
        draw(dataset);
    }if(type=="skin_temp"){
        plot_yVar.set('current_yVar', ['temp']);
        draw(dataset);
    }if(type=="steps"){
        plot_yVar.set('current_yVar', ['steps']);
        draw(dataset);
    }if(type=="intensity"){
        plot_yVar.set('current_yVar', ['activation']);
        draw(dataset);
    }if(type=="valence"){
        plot_yVar.set('current_yVar', ['valence']);
        draw(dataset);
    }if(type=="calories"){
        plot_yVar.set('current_yVar', ['calories']);
        draw(dataset);
    }if(type=="anxiety"){
        plot_yVar.set('current_yVar', ['anxiety_2']);
        draw(dataset);
    }if(type=="fear"){
        plot_yVar.set('current_yVar', ['fear']);
        draw(dataset);
    }if(type=="envy"){
        plot_yVar.set('current_yVar', ['envy']);
        draw(dataset);
    }if(type=="anticipation"){
        plot_yVar.set('current_yVar', ['anticipation']);
        draw(dataset);
    }if(type=="love"){
        plot_yVar.set('current_yVar', ['love']);
        draw(dataset);
    }if(type=="anger"){
        plot_yVar.set('current_yVar', ['anger']);
        draw(dataset);
    }if(type=="sadness"){
        plot_yVar.set('current_yVar', ['sadness']);
        draw(dataset);
    }if(type=="excitement"){
        plot_yVar.set('current_yVar', ['excitement']);
        draw(dataset);
    }if(type=="frustration"){
        plot_yVar.set('current_yVar', ['frustration']);
        draw(dataset);
    }if(type=="energy"){
        plot_yVar.set('current_yVar', ['energy']);
        draw(dataset);
    }if(type=="hunger"){
        plot_yVar.set('current_yVar', ['hunger']);
        draw(dataset);
    }


});

// change color for plot
var plotColorVar = d3.map();
plotColorVar.set('current_plotColorVar', ['hr']);
plotColorVar_init = plotColorVar.get('current_plotColorVar');


d3.selectAll('.color').on('click',function(){
    console.log('clicked the colah!!!');
    var type = d3.select(this).attr('id');
    if (type=="heart_rate"){
        plotColorVar.set('current_plotColorVar', ['hr']);
        draw(dataset);
    }if(type=="skin_temp"){
        plotColorVar.set('current_plotColorVar', ['temp']);
        draw(dataset);
    }if(type=="steps"){
        console.log('clicked the steps!!!');
        plotColorVar.set('current_plotColorVar', ['steps']);
        draw(dataset);
    }if(type=="intensity"){
        plotColorVar.set('current_plotColorVar', ['activation']);
        draw(dataset);
    }if(type=="valence"){
        plotColorVar.set('current_plotColorVar', ['valence']);
        draw(dataset);
    }if(type=="calories"){
        plotColorVar.set('current_plotColorVar', ['calories']);
        draw(dataset);
    }if(type=="anxiety"){
        plotColorVar.set('current_plotColorVar', ['anxiety_2']);
        draw(dataset);
    }if(type=="fear"){
        plotColorVar.set('current_plotColorVar', ['fear']);
        draw(dataset);
    }if(type=="envy"){
        plotColorVar.set('current_plotColorVar', ['envy']);
        draw(dataset);
    }if(type=="anticipation"){
        plotColorVar.set('current_plotColorVar', ['anticipation']);
        draw(dataset);
    }if(type=="love"){
        plotColorVar.set('current_plotColorVar', ['love']);
        draw(dataset);
    }if(type=="anger"){
        plotColorVar.set('current_plotColorVar', ['anger']);
        draw(dataset);
    }if(type=="sadness"){
        plotColorVar.set('current_plotColorVar', ['sadness']);
        draw(dataset);
    }if(type=="excitement"){
        plotColorVar.set('current_plotColorVar', ['excitement']);
        draw(dataset);
    }if(type=="frustration"){
        plotColorVar.set('current_plotColorVar', ['frustration']);
        draw(dataset);
    }if(type=="energy"){
        plotColorVar.set('current_plotColorVar', ['energy']);
        draw(dataset);
    }if(type=="hunger"){
        plotColorVar.set('current_plotColorVar', ['hunger']);
        draw(dataset);
    }


});

// change radius for plot
var plotRadiusVar = d3.map();
plotRadiusVar_init = plotRadiusVar.get('current_plotRadiusVar');
plotRadiusVar.set('current_plotRadiusVar', ['hr']);



d3.selectAll('.size').on('click',function(){
    var type = d3.select(this).attr('id');
    if (type=="heart_rate"){
        plotRadiusVar.set('current_plotRadiusVar', ['hr']);
        draw(dataset);
    }if(type=="skin_temp"){
        plotRadiusVar.set('current_plotRadiusVar', ['temp']);
        draw(dataset);
    }if(type=="steps"){
        plotRadiusVar.set('current_plotRadiusVar', ['steps']);
        draw(dataset);
    }if(type=="intensity"){
        plotRadiusVar.set('current_plotRadiusVar', ['activation']);
        draw(dataset);
    }if(type=="valence"){
        plotRadiusVar.set('current_plotRadiusVar', ['valence']);
        draw(dataset);
    }if(type=="calories"){
        plotRadiusVar.set('current_plotRadiusVar', ['calories']);
        draw(dataset);
    }if(type=="anxiety"){
        plotRadiusVar.set('current_plotRadiusVar', ['anxiety_2']);
        draw(dataset);
    }if(type=="fear"){
        plotRadiusVar.set('current_plotRadiusVar', ['fear']);
        draw(dataset);
    }if(type=="envy"){
        plotRadiusVar.set('current_plotRadiusVar', ['envy']);
        draw(dataset);
    }if(type=="anticipation"){
        plotRadiusVar.set('current_plotRadiusVar', ['anticipation']);
        draw(dataset);
    }if(type=="love"){
        plotRadiusVar.set('current_plotRadiusVar', ['love']);
        draw(dataset);
    }if(type=="anger"){
        plotRadiusVar.set('current_plotRadiusVar', ['anger']);
        draw(dataset);
    }if(type=="sadness"){
        plotRadiusVar.set('current_plotRadiusVar', ['sadness']);
        draw(dataset);
    }if(type=="excitement"){
        plotRadiusVar.set('current_plotRadiusVar', ['excitement']);
        draw(dataset);
    }if(type=="frustration"){
        plotRadiusVar.set('current_plotRadiusVar', ['frustration']);
        draw(dataset);
    }if(type=="energy"){
        plotRadiusVar.set('current_plotRadiusVar', ['energy']);
        draw(dataset);
    }if(type=="hunger"){
        plotRadiusVar.set('current_plotRadiusVar', ['hunger']);
        draw(dataset);
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

function dataLoaded(error, heartRate){
//function dataLoaded(error, coffee, tea){
//    console.log(heartRate.time);
//    var forDate = heartRate.date;
//    console.log(forDate);
    //string.split('/')
    //console.log(heartRate);
    //var maxHR = d3.max(pop);
    //scaleR.domain([0,maxPop]);


    dataset = heartRate;
    draw(heartRate);
    drawBrush(heartRate);
    //console.log(heartRate[0].hr);


}



function draw(_data) {
    //console.log(data);
    //console.log("start", start);
    //console.log("end", end);
    //start = start || startDate;
    //end = end || endDate;
//console.log(start,end)


    extent = plot_extent.get('current_extent');

    start = extent[0]
    end = extent[1]

    yVar = plot_yVar.get('current_yVar');
    ColorVar = plotColorVar.get('current_plotColorVar');
    //console.log(yVar);
    RadiusVar = plotRadiusVar.get('current_plotRadiusVar');

    //console.log(_data)
    //_extent = d3.extent(_data,function(d){
    //    return d.hr
    //})
    //console.log(_data)
    yVarMax = d3.max(_data, function(d) { return d[yVar]; });
    ColorVarMax = d3.max(_data, function(d) { return d[ColorVar]; });
    //ColorVarMed = d3.median(_data, function(d) { return d[ColorVar]; });
    RadiusVarMax = d3.max(_data, function(d) { return d[RadiusVar]; });
    //console.log(radiusScale(RadiusVarMax));
    //console.log(ColorVar);
    scaleY.domain([0, yVarMax]);
    colorScale.domain([0, ColorVarMax]);
    //colorScale.domain([0, ColorVarMed, ColorVarMax]);
    radiusScale.domain[(0,RadiusVarMax)];
    scaleX.domain(extent);


    //console.log(start,d3.time.format("%Y-%m-%d")(start))

     //axisXhour
        //.scale(scaleX)
        //.tickSize(5)
        //.ticks(d3.time.hour)
        //.ticks(d3.time.hour, 2)
        //.tickValues([8,10,12,14,16,18,19,20,22]);

        //.tickFormat(d3.time.format('%H-%M'));
    //.tickSize(5)
    //.ticks(d3.time.week)
    //.tickFormat(d3.time.format('%Y-%m-%d'));
    //
    //.tickFormat( d3.format('d') ); //https://github.com/mbostock/d3/wiki/Formatting

        //axisY.scale(scaleY);




    plot.select('.axis-x-day')
        //.attr('transform','translate(0,'+height+')')
        .call(axisX);

    plot.select('.axis-x-hour')
        //.attr('transform','translate(0,'+height+')')
        //.selectAll('text')
        //.attr('transform','rotate(90)translate(0,0)')
        .call(axisXhour);

    plot.select('.axis-x-hour')
        .selectAll('text')
        .attr('transform','rotate(90)')
        .attr('transform','translate(0,10)');
        //.call(axisXhour);

    plot.select('.axis-y')
        //.attr('transform','translate(0,'+height+')')
        .call(axisY);
    //plot.select('.class','axis axis-y')
    //    .call(axisY);
    //plot.select('.axis-x-day')
    //    .selectAll('text')
    //    .attr('transform','rotate(90)translate(-100,0)');
    //plot.select('.axis-x-hour')
    //    .selectAll('text')
    //    .attr('transform','rotate(90)translate(-60,0)');


    var nightLines = plot_main.selectAll('.nightLaneLines').data(_data, function (d) {
            return d.date;
        });

        var lines_enter = nightLines.enter().append('line').attr('class', 'nightLaneLines');

        var lines_exit = nightLines.exit().remove();

            nightLines
                .attr('x1', function(d){
                    return scaleX(d.date)})
                .attr('y1',  function(d){
                    time = moment(d.date, '%ddd %MMM %D %YYYY %H:%mm:%S%Z');

                    if (time.hour() >7 && time.hour() <23 ){
                        return 0;
                    } else { return height;}})
                //.attr('y1', height)
                .attr('x2', function(d){return scaleX(d.date)})
                .attr('y2', 0)
                .attr('stroke', "#EBEBEB")

                .attr('stroke-width', '1');



    var nodes = plot_main.selectAll('.circles-data-point').data(_data, function (d) {
        return d.date;
    });


    //enter
    var node_enter = nodes.enter().append('circle').attr('class', 'circles-data-point')
        //.attr('fill', function (d) {return colorScale(d[ColorVar]);})
        .style('fill-opacity', '0.5');
        //.attr('r', 0);

    //update
    //var node_update = nodes.update().style("color", "red");

    //exit
    var node_exit = nodes.exit().remove();

    // transitions
    nodes
        .attr('fill', function (d) {return colorScale(d[ColorVar]);})
        .attr('location', function (d) { return d.location; })
        .transition().duration(200).attr('cx', function (d) {
            //Thu Nov 26 2015 05:30:00 GMT-0500 (Eastern Standard Time)
            //if (moment(d.date).isAfter(start) && moment(d.date).isBefore(end)){
            //    //if (moment(d.date).isAfter('2015-11-29')) {
            //    //console.log(moment(d.date));
            //
            //    return scaleX(d.date); } else {return scaleX(0);
            //}
        return scaleX(d.date);
        })

        //.attr('cy', function (d) {return scaleY(d.getAttribute(yVar));})
        .attr('cy', function (d) {
            //console.log("DDD>>>", d);
            //return scaleY(d.hr);})
            return scaleY(d[yVar]);})
        //.attr('cy', function (d) {return scaleY(d.hr);})
        //.attr('r', '5');
        .attr('r', function(d){

                //return d[RadiusVar]})
                return radiusScale(d[RadiusVar]);});

        //.attr('r', function(d){
        //    if (d[RadiusVar]*0.1 < 1) {
        //        return 1;
        //    } else {return d[RadiusVar]*0.1 }});

    node_enter
        .on("mouseenter", function(d) {
            var dateParser = d3.time.format('%a %m/%d %H:%M');
            d3.select(this).style('opacity', 1);
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
            //console.log("tooltip!");
         })
        .on("mouseleave", function(d){
            d3.select(".custom-tooltip").transition() //hide data from the tooltip
                .style("opacity",0);
        })
        .on("mousemove", function(d){
            d3.select(this).style('opacity',1);
            var xy = d3.mouse(document.getElementById("plot")); // tooltip to move with mouse movements
            var left = xy[0],
                top = xy[1];
            d3.select(".custom-tooltip")
                .style("left", left+50+ "px")
                .style("top", top +400+ "px")
        });



    //plot.selectAll('.circles-data-point')
    //
    //    .remove()
    //    .data(data)
    //    .enter()
    //
    //    .append('circle').attr('class', 'circles-data-point')
    //    .attr('fill', function (d) {return colorScale(d.valence);})
    //    .style('fill-opacity', '0.5')
    //    .attr('cx', function (d) {
    //        //Thu Nov 26 2015 05:30:00 GMT-0500 (Eastern Standard Time)
    //        if (moment(d.date).isAfter(start) && moment(d.date).isBefore(end)){
    //        //if (moment(d.date).isAfter('2015-11-29')) {
    //            //console.log(moment(d.date));
    //
    //        return scaleX(d.date); } else {return scaleX(0);
    //        }
    //    })
    //
    //    .attr('cy', function (d) {return scaleY(d.hr);})
    //    .attr('r', 3);




   //drawBrush(data);
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
            //return colorScaleBrush(d.valence);
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
    _start = d3.time.format('%Y-%m-%dT%H:%M:%S%Z')(start)
    _end = d3.time.format('%Y-%m-%dT%H:%M:%S%Z')(end)
    __start = new Date(_start)
    __end = new Date(_end)
    console.log(__start,__end)
    plot_extent.set('current_extent', [__start,__end])

    data___ = dataset.filter(function(d){
        return new Date(d3.time.format('%Y-%m-%dT%H:%M:%S%Z')(d.date)) > start &&  new Date(d3.time.format('%Y-%m-%dT%H:%M:%S%Z')(d.date)) < end ;
    })
       //console.log(d3.event.target.extent()[0]);
    //d3.select('.axis-x-day').call(axisX);  // this works and updates axis labels
    //
    //console.log(start)

    //var _start = moment(start).format("YYYY,M,D,H,m");
    //var _end = moment(end).format("YYYY,M,D,H,m");
    //d3.selectAll('.circles-data-point').remove();
    //var brush_selection = d3.selectAll('.circles-data-point');
    draw(data___);
    //scaleX.domain([_start, _end]);
    //d3.selectAll('.axis-x-hour').remove();
    //d3.select('.axis-x-hour').call(axisXhour);


// Filter the items within the brush extent
//    var items = data.filter(function(d) {
//        return (s[0] <= d.date) && (d.date<= s[1]);
//    });


}

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
        temp: +d.skin_temp,
        calories: +d.calories*10,
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

    //    item: d.ItemName
    //    //item: d.ItemName,
    //    //item: d.ItemName,
    //    //year: +d.Year,
    //    //value: +d.Value
    }
}


