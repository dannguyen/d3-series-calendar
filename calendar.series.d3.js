var my_data = {"Oranges":{"2010-05-01":"1","2012-03-01":"1.2","2012-07-01":"1.3","2012-08-01":"1.4","2012-09-01":"1.5","2012-12-01":"2.1","2013-02-01":"2.2","2013-03-01":"2.3","2013-05-01":"2.6","2013-11-01":"2.9","2013-12-01":"2.10","2014-01-01":"2.12","2014-02-01":"2.14","2014-03-01":"2.18","2014-04-01":"2.23"},"Apples":{"2012-05-01":"1","2012-11-01":"1.5","2013-10-01":"2.1","2014-04-01":"2.2"},"Zucchinis":{"2008-12-01":"1","2009-03-01":"1.2","2009-07-01":"1.3","2009-09-01":"1.4","2009-12-01":"1.5","2010-01-01":"1.6","2010-03-01":"1.7","2010-05-01":"2","2010-09-01":"2.1","2011-12-01":"2.3","2012-07-01":"3","2012-09-01":"3.1","2012-10-01":"3.2","2013-01-01":"3.3","2013-04-01":"3.4","2013-05-01":"3.5","2013-06-01":"3.6","2013-11-01":"3.7","2014-01-01":"3.8"},"Coconuts":{"2011-10-01":"1.2","2011-12-01":"1.3","2012-02-01":"1.6","2012-03-01":"1.7","2012-06-01":"1.8","2012-07-01":"2","2012-08-01":"2.1","2012-12-01":"2.2","2013-02-01":"2.3","2013-04-01":"2.4","2013-06-01":"2.6","2013-08-01":"2.7","2013-09-01":"3","2013-10-01":"3.1","2013-11-01":"3.3","2013-12-01":"3.5","2014-01-01":"3.7","2014-02-01":"3.8","2014-03-01":"3.10","2014-04-01":"3.12"},"Bananas":{"2012-06-01":"1.43","2012-08-01":"1.44","2012-10-01":"1.48","2012-12-01":"1.53","2013-01-01":"1.547","2013-02-01":"1.55","2013-03-01":"1.558","2013-05-01":"1.570","2013-06-01":"2","2013-07-01":"2.1","2013-09-01":"2.2","2014-01-01":"3"}}

var width = 900,
    height = 136,
    calendarDataWidth = 800    ;




// Set date formats
var day = d3.time.format("%w"),
    week = d3.time.format("%U"),
    month = d3.time.format("%m"),
    year = d3.time.format("%Y"),
    dateStrFormat = d3.time.format("%Y-%m-01");


var color = d3.scale.quantize()
    .domain([-.05, .05])
    .range(d3.range(11).map(function(d) { return "q" + d + "-11"; }));



// set variables

var minYear = 2008;
var maxYear = 2014;
var dataKeys = d3.keys(my_data);

var _timeUnit = 12;

// number of years multipled by timeUnit (e.g. 12 months)
var fractionalYearUnits = _timeUnit * (maxYear - minYear + 1);
var verticalUnits = dataKeys.length;


var cellWidth = (calendarDataWidth / (fractionalYearUnits + 1)),
    cellHeight = 20;  //(width / (verticalUnits + 1) );

// Set SVG stuff
var svg = d3.select("#calendar").selectAll("svg")
    .data(d3.range(0, verticalUnits ))
  .enter().append("svg")
    .attr("fill", "none")
    .attr("width", width)
    .attr("height", cellHeight)
    // .attr("class", "RdYlGn")
    .attr("class", "yearRow")
  .append("g")
  // .attr("transform", "translate(" + ((width - calendarDataWidth ) / 2) + "," + (height - cellHeight * verticalUnits - 1) + ")");


  svg.append("text")
    .attr("x", 20)
    .attr("y", 40)
    .text(function(d) {
      var key_name = d3.keys(my_data)[d];
      return key_name;
    });



// var datakeysWithDays = {};
// forEach(key in dataKeys){
//   datakeysWithDays[key] = ;
// }


var yearRows = svg.selectAll(".yearRow");

var timeBox = svg.selectAll(".timebox")
  .data(d3.time.months(new Date(minYear, 0, 1), new Date(maxYear + 1, 0, 1)))
  .enter()
  .append("rect")
  .attr("width", cellWidth)
  .attr("height", cellHeight)
  .attr("stroke", '#ddd')
  .attr("class", function(d, day_box, key_num){
    var month_str = dateStrFormat(d);
    var key = dataKeys[key_num]

    if(d3.keys(my_data[key]).indexOf(month_str) > -1){
      return "timebox";
    }else{
      return 'a';
    }

  })
  .attr("x", function(d) {  return cellWidth * (parseInt(month(d)) + parseInt((year(d) - minYear)) * 12); })
  .datum(dateStrFormat);


svg.selectAll('.timebox').attr("fill", "#ffc");
