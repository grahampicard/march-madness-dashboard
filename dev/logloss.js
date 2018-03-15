var data = [
  { date: "24-Apr-07", line1: 93.24, line2: 99 },
  { date: "25-Apr-07", line1: 95.35, line2: 98 },
  { date: "26-Apr-07", line1: 98.84, line2: 93 },
  { date: "27-Apr-07", line1: 99.92, line2: 96 },
  { date: "30-Apr-07", line1: 99.8, line2: 95 },
  { date: "1-May-07", line1: 99.47, line2: 93 },
  { date: "2-May-07", line1: 100.39, line2: 94 },
  { date: "3-May-07", line1: 100.4, line2: 95 },
  { date: "4-May-07", line1: 100.81, line2: 97 },
  { date: "7-May-07", line1: 103.92, line2: 98 },
  { date: "8-May-07", line1: 105.06, line2: 98 },
  { date: "9-May-07", line1: 106.88, line2: 99 },
  { date: "10-May-07", line1: 107.34, line2: 100 },
  { date: "11-May-07", line1: 108.74, line2: 101 },
  { date: "14-May-07", line1: 109.36, line2: 102 },
  { date: "15-May-07", line1: 107.52, line2: 101 },
  { date: "16-May-07", line1: 107.34, line2: 103 },
  { date: "17-May-07", line1: 109.44, line2: 102 },
  { date: "18-May-07", line1: 110.02, line2: 101 },
  { date: "21-May-07", line1: 111.98, line2: 102 },
  { date: "22-May-07", line1: 113.54, line2: 102 },
  { date: "23-May-07", line1: 112.89, line2: 103 }
];

// declare dimensions of the object
var svg = d3.select("svg"),
  margin = {top: 20, right: 20, bottom: 30, left: 50},
  legend = {width: 100, height: 200}
  width = +svg.attr("width") - margin.left - margin.right - legend.width,
  height = +svg.attr("height") - margin.top - margin.bottom,
  g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// convert strings to date
var parseTime = d3.timeParse("%d-%b-%y");
data.forEach((datum) => datum.date = parseTime(datum.date))

// create axes objects
var x = d3.scaleTime().rangeRound([0, width]);
var y = d3.scaleLinear().rangeRound([height, 0]);

// scale axes to data... domain takes one array w len of 2. 
x.domain(d3.extent(data, function(d) { return d.date; }))
y.domain([90,150])

g.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .select(".domain")
//  .remove()

g.append("g")
  .call(d3.axisLeft(y))
  .append("text")
  .attr("fill", "#000")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", "0.71em")
  .attr("text-anchor", "end")

Object.keys(data[0]).map(
  function(datum) {
    if (datum != "date") {
      line = d3.line()
        .x(function(d) { return x(d.date)})
        .y(function(d) { return y(d[datum])})

      g.append("path")
        .datum(data)
        .attr("class", datum)
        .attr("data-legend", datum)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 3)
        .attr("d", line)    
        .attr("data-legend",function(d) { return d.name})
    }
  }
)

svg.append("text")
		.attr("transform", "translate(" + (width + margin.left + margin.right) + "," + 200 + ")")
		.attr("dy", ".35em")
		.attr("text-anchor", "start")
		.style("fill", "gray")
		.text("Line 1")
    .on('mouseenter',function(d) { 
      console.log( 'Hover on Line 1');
      svg.selectAll(".line1")
        .transition()
        .duration(400)
        .attr("stroke-width", 8)
    })
    .on('mouseleave',function(d) { 
      svg.selectAll(".line1")
        .transition()
        .duration(400)
        .attr("stroke-width", 3)
    })

svg.append("text")
		.attr("transform", "translate(" + (width + margin.left + margin.right) + "," + 240 + ")")
		.attr("dy", ".35em")
		.attr("text-anchor", "start")
		.style("fill", "gray")
		.text("Line 2")
    .on('mouseenter',function(d) { 
      console.log( 'Hover on Line 2'); 
      svg.selectAll(".line2")
        .transition()
        .duration(400)
        .attr("stroke-width", 8)
    })
    .on('mouseleave',function(d) { 
      svg.selectAll(".line2")
        .transition()
        .duration(400)
        .attr("stroke-width", 3)
    })

