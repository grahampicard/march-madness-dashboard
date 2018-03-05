import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'


class BarChart extends Component {
  constructor(props){
    super(props)
    this.createLogloss = this.createLogloss.bind(this)
  }

  componentDidMount() {
    this.createLogloss()
  }

  componentDidUpdate() {
    this.createLogloss()
  }

  createLogloss() {
    const node = this.node
    const dataMax = max(this.props.data)
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]])

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr('x', (d,i) => i * 25)
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 25)
  }

  render() {
    return <svg ref={node => this.node = node}
    width={500} height={500}>
    </svg>
  }
}

export default BarChart



/*
// Dimensions
var margin = {top: 20, right: 80, bottom: 30, left: 50},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// Parsing
var parseDate = d3.time.format("%Y%m%d").parse;

// Scales
var x = d3.time.scale()
.range([0, width]);

var y = d3.scale.linear()
.range([height, 0]);



var color = d3.scale.category10();

// Generate Axes
var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom");

var yAxis = d3.svg.axis()
.scale(y)
.orient("left");


// Generate line
var line = d3.svg.line()
.interpolate("basis")
.x(function(d) { return x(d.date); })
.y(function(d) { return y(d.temperature); });

var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

d3.csv("logloss.csv", function(error,data) {
if(error) console.log("Error: data not loaded!")

data.forEach(function(d) {
d.date = parseDate(d.date.toString());
});

var cities = color.domain().map(function(name) {
return {
name: name,
values: data.map(function(d) {
return {date: d.date, temperature: +d[name]};
})
};
});

x.domain(d3.extent(data, function(d) { return d.date; }));

y.domain([
d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
]);

svg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis);

svg.append("g")
.attr("class", "y axis")
.call(yAxis)
.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 6)
.attr("dy", ".71em")
.style("text-anchor", "end")
.text("Temperature (ºF)");

var city = svg.selectAll(".city")
.data(cities)
.enter().append("g")
.attr("class", "city")
.attr('id', function(d) { return d.name.replace(' ',''); });

city.append("path")
.attr("class", "line")
.attr("d", function(d) { return line(d.values); })
.style("stroke", function(d) { return color(d.name); });

city.append("text")
.datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
.attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
.attr("x", 3)
.attr("dy", ".35em")
.text(function(d) { return d.name; })
.on('mouseenter',function(d) { 
console.log( 'here',d); 
svg.selectAll('#'+d.name.replace(' ','') + ' path').style('stroke','red');
})
.on('mouseleave',function(d) { 
console.log( 'here',d); 
svg.selectAll('#'+d.name.replace(' ','') + ' path').style('stroke',color(d.name));
});
})

*/