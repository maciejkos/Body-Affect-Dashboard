/**
 * Created by Maciej on 12/10/2015.
 */

function queueData() {

    queue()
        .defer(d3.csv, 'data/merged7days.csv', parse)
        //.defer(d3.csv,'data/Merge3.csv',parse)
        .await(dataLoaded);
}



queueData();

// ToDO figure out where valence = 0 means real zero and when it means that there was no data!

function dataLoaded(error, data){

    console.log("data");
    console.log(data);
    console.log("error");
    console.log(error);

    for(line in data){
        if (data[line].valence) {
            //console.log(data[line]);
            console.log(data[line].valence);
        }
    }

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
