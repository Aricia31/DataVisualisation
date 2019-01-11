var parseDate = d3.timeParse("%Y"); // year (2010)

var width = 470;  // width x-axis
var height = 500; // height y-axis

var svg = d3.select("body").append("svg").attr("width", "100%").attr("height", "100%"); // add svg to body with width and height

// http://bl.ocks.org/d3noob/a22c42db65eb00d4e369
var tooltip = d3.select("body").append("div").style("opacity", 0).style("position", "absolute");  // text top-left (first graphic)
var tooltip2 = d3.select("body").append("div").style("opacity", 0).style("position", "absolute"); // text top-left (second graphic)

d3.csv("aboard.csv")  // csv-file
    .row(function(d) {
      return {
        date: parseDate(d.date),  // year (2010)
        passengersPercAboard: Number(d.passengersPercAboard), // number
        crewPercAboard: Number(d.crewPercAboard), // number
        passengers: Number(d.passengers), // number
        crew: Number(d.crew)  // number
      };
    })
    .get(function(error, data) {
      var max = d3.max(data, function(d) { return d.passengersPercAboard; });  // return highest % of passengers from aboard.csv
      var min = d3.min(data, function(d) { return d.crewPercAboard; }); // return smallest % of crew from aboard.csv
      var minDate = d3.min(data, function(d) { return d.date; }); // return smallest date
      var maxDate = d3.max(data, function(d) { return d.date; }); // return highest date

      var y = d3.scaleLinear()
            .domain([min,max]) // 0 - max passengersPercAboard
            .range([height,0]); // length of the y-axis

      var x = d3.scaleTime()
            .domain([minDate, maxDate]) // smallest date - highest date
            .range([0, width]); // length of the x-axis

//  https://stackoverflow.com/questions/18474620/d3-js-tickformat-adding-a-sign-without-multiplying-by-100
    var yAxis = d3.axisLeft(y).tickFormat(function(d) { return d + "%"; }).tickPadding(10).tickSize(10);  // y-axis
    var xAxis = d3.axisBottom(x).tickPadding(10).tickSize(10);  // x-axis

    var margin = {top:95 , right:0 , bottom:0 , left:89};

    // Group all the elements

    var chartGroup = svg.append("g").attr("transform", "translate("+margin.left+","+margin.top+")");  // translate the graphic to position (89,95)

        chartGroup.append("g")
                  .attr("class", "x axis")
                  .call(xAxis)  // draw x-axis
                  .attr("transform", "translate(0, "+height+")")  // translate x-axis to (0,500)
                  .append("text") // http://bl.ocks.org/Caged/6476579
                    .attr("transform", "rotate(0)") // rotate text
                    .attr("y", "0.85em")  // move up and down
                    .attr("x", width + 25) // move right and left
                    .text("Year");  // text bottom-right of the x-axis

         chartGroup.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)  // draw y-axis
                  .append("text") //http://bl.ocks.org/Caged/6476579
                    .attr("transform", "rotate(0)") // rotate text
                    .attr("x", "0em") // move right and left
                    .attr("y", "-1em") // move up and down
                    .text("Aboard");  // text top-left of the y-axis

    var circle = chartGroup.selectAll("circle")  //select all circles
                    .data(data); // find them? add them to the data

        circle.enter().append("circle") // didn't find them, add a circle
                      .attr("cx", function(d) { return x(d.date); } ) // middle of the circle
                      .attr("cy", function(d) { return y(d.passengersPercAboard); })  // middle of the circle
                      .attr("r", 10)  // radius
                      .attr("fill", "#006064")  // color
                      .on("mouseover", function(d) {  // when hover on the circle
                              tooltip.style("opacity", 1)
                              .style("left", 65+"px")
                              .style("top", 30+"px")
                              tooltip.html("Passengers: "+d.passengers) // Passengers: 1276
                      });

        circle.enter().append("circle") // didn't find them, add a circle
                      .attr("cx", function(d) { return x(d.date); } ) // middle of the circle
                      .attr("cy", function(d) { return y(d.crewPercAboard); })  // middle of the circle
                      .attr("r", 10)  // radius
                      .attr("fill", "#00CED1")  // color
                      .on("mouseover", function(d) {  // when hover on the circle
                              tooltip.style("opacity", "1")
                              .style("left", 65+"px")
                              .style("top", 30+"px")
                              tooltip.html("Crew: "+d.crew) // Crew: 163
                      });
    });


d3.csv("crash.csv") // csv-file
    .row(function(d) {
      return {
        date: parseDate(d.date), // year (2010)
        passengersPerc: Number(d.passengersPerc), // number
        crewPerc: Number(d.crewPerc),  // number
        passengers: Number(d.passengers), // number
        crew: Number(d.crew)  // number
      };
    })
    .get(function(error, data) {
      var max = d3.max(data, function(d) { return d.passengersPerc; });  // return highest % of passengers from crash.csv
      var min = d3.min(data, function(d) { return d.crewPerc; }); // return smallest % of crew from crash.csv
      var minDate = d3.min(data, function(d) { return d.date; }); // return smallest date
      var maxDate = d3.max(data, function(d) { return d.date; }); // return highest date

      var y = d3.scaleLinear()
            .domain([min,max]) // 0 - max passengersPerc
            .range([height,0]); // length of the y-axis

      var x = d3.scaleTime()
            .domain([minDate, maxDate]) // smallest date - highest date
            .range([0, width]); // length of the x-axis

//  https://stackoverflow.com/questions/18474620/d3-js-tickformat-adding-a-sign-without-multiplying-by-100
    var yAxis = d3.axisLeft(y).tickFormat(function(d) { return d + "%"; }).tickPadding(10).tickSize(10); // y-axis
    var xAxis = d3.axisBottom(x).tickPadding(10).tickSize(10);  //x-axis

    var margin = {top:95 , right:0 , bottom:0 , left:702};

    // Group all the elements

    var chartGroup = svg.append("g").attr("transform", "translate("+margin.left+","+margin.top+")");  // translate the graphic to position (702,95)

        chartGroup.append("g")
                  .attr("class", "x axis")
                  .call(xAxis)  //draw x-axis
                  .attr("transform", "translate(0, "+height+")")  // translate x-axis to (0,500)
                  .append("text") // http://bl.ocks.org/Caged/6476579
                    .attr("transform", "rotate(0)") // rotate text
                    .attr("y", "0.85em")  // move up and down
                    .attr("x", width + 25) // move right and left
                    .text("Year");  // text bottom-right of the x-axis

        chartGroup.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)  //draw y-axis
                  .append("text") //http://bl.ocks.org/Caged/6476579
                    .attr("transform", "rotate(0)") // rotate text
                    .attr("x", "0em") // move right and left
                    .attr("y", "-1em") // move up and down
                    .text("Crash fatalities");  // text bottom-right of the x-axis

    var circle = chartGroup.selectAll("circle")  //select all circles
              .data(data); // find them? add them to the data

              circle.enter().append("circle") // didn't find them, add a circle
                          .attr("cx", function(d) { return x(d.date); } ) // middle of the circle
                          .attr("cy", function(d) { return y(d.passengersPerc); })  // middle of the circle
                          .attr("r", 10)  // radius
                          .attr("fill", "#006064")  // color
                          .on("mouseover", function(d) {  // when hover on the circle
                                    tooltip2.style("opacity", 1)
                                    .style("left", 643+"px")
                                    .style("top", 30+"px")
                                    tooltip2.html("Passengers: "+d.passengers)  // Passengers: 978
                          })

              circle.enter().append("circle") // didn't find them, add a circle
                          .attr("cx", function(d) { return x(d.date); } ) // middle of the circle
                          .attr("cy", function(d) { return y(d.crewPerc); })  // middle of the circle
                          .attr("r", 10)  // radius
                          .attr("fill", "#00CED1")  // color
                          .on("mouseover", function(d) {  // when hover on the circle
                                    tooltip2.style("opacity", 1)
                                    .style("left", 643+"px")
                                    .style("top", 30+"px")
                                    tooltip2.html("Crew: "+d.crew)  // Crew: 116
                          });
    });
