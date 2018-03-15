import React, { Component } from 'react'
import LoglossData from './../data/loglossData'
import * as d3 from 'd3'
require('d3-extended')


var tableData = LoglossData.find((d) => d.date === LoglossData.map((d) => d.date).reduce((a, b) => a > b ? a : b))
    tableData = Object.keys(tableData).map(function (key) {
      return { 
        "team": key,
        "logloss": tableData[key]
      }
    })
    tableData.sort((a,b) => (a.logloss > b.logloss) ? 1 : ((b.logloss > a.logloss) ? -1 : 0))

      // convert strings to date
      var parseTime = d3.timeParse("%Y-%m-%d");
      LoglossData.forEach((datum) => datum.date = parseTime(datum.date))

class Table extends Component {
  
  render() {
    //var groupId = "sub-group-1 " + this.props.data.date

    var data = this.props.tableData

    return (
      <table>
        <tbody>
          <tr>
            <th>Team</th>
            <th>Current Logloss</th>
          </tr>
          {data.map(function(d) {
            if (d.team !== "date") {
              return (
                <tr key={d.team.split(' ').join('-')}
                  className={d.team.split(' ').join('-')} 
                  onMouseEnter={function() { 
                    d3.selectAll("svg ." + d.team.split(' ').join('-'))
                      .moveToFront()
                      .transition()
                      .duration(400)
                      .attr("stroke", () => (d.team === "Class Median") ? "#7c7c7c" : "steelblue" )
                      .attr("stroke-width", 10)

                      if (d.team === "Class Median") {
                        d3.selectAll('.' + d.team.split(' ').join('-'))
                        .style("color", "#7c7c7c")
                        .style("font-weight", "bold")
                      } else {
                        d3.selectAll("." + d.team.split(' ').join('-'))
                        .style("color", "steelblue")
                        .style("font-weight", "bold")
                      }                                

                    
                    return
                    }}
                  onMouseLeave={() => d3.selectAll("." + d.team.split(' ').join('-'))
                    .transition()
                    .duration(400)
                    .attr("stroke", "#70d8b2")
                    .attr("stroke-width", 5)
                    .style("color", "inherit")
                    .style("font-weight", "inherit")}  >
                  <td>{d.team}</td>
                  <td>{Math.round(d.logloss * 100 ) / 100}</td>
                </tr>
              )
            }
          return
          })}
        </tbody>
      </table>
    )
  }
}


class Mainpage extends Component {    
  constructor(props){
    super(props)

    this.createLogloss = this.createLogloss.bind(this)
  }

  componentDidMount() {
    this.createLogloss()
  }

  componnentWillUnmount() {
  }

  createLogloss() {

    // declare dimensions
    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    // create axes objects
    var x = d3.scaleTime().rangeRound([0, width]);
    var y = d3.scaleLinear().rangeRound([height, 0]);
    
    // get values to shift axes appropriately
    var all_keys = LoglossData.map((x) => Object.values(x))
        all_keys.map((x) => x.shift())   
    var all_values = [].concat.apply([], all_keys)

    // scale axes to data... domain takes one array w len of 2. 
    x.domain(d3.extent(LoglossData, function(d) { return d.date; }))
    y.domain(d3.extent(all_values))

    g.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%m-%d")))
     .attr("style", "font-size:10pt")

    g.append("g")
     .attr("class", "axis")
     .call(d3.axisLeft(y))
     .attr("style", "font-size:10pt")
     .append("text")
     .attr("fill", "#585858")
     .attr("transform", "rotate(-90)")
     .attr("y", 6)
     .attr("dy", "0.71em")
     .attr("text-anchor", "end")

     Object.keys(LoglossData[0]).map(
      function(datum) {
        if (datum !== "date") {
          let line = d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d[datum]) })
          
          g.append("path")
           .datum(LoglossData)
           .attr("class", datum.split(' ').join('-'))
           .attr("fill", "none")
           .attr("stroke", () => (datum === "Class Median") ? "#898989" : "#70d8b2")
           .attr("stroke-linejoin", "round")
           .attr("stroke-linecap", "round")
           .attr("stroke-width", 5)
           .attr("d", line)
           .on('mouseenter', function() {
             d3.selectAll("svg ." + datum.split(' ').join('-'))
               .moveToFront()
               .transition()
               .duration(400)
               .attr("stroke", () => (datum === "Class Median") ? "#7c7c7c" : "steelblue")
               .attr("stroke-width", 10)
            if (datum === "Class Median") {
              d3.selectAll('.' + datum.split(' ').join('-'))
              .style("color", "#7c7c7c")
              .style("font-weight", "bold")
            } else {
              d3.selectAll('.' + datum.split(' ').join('-'))
              .style("color", "steelblue")
              .style("font-weight", "bold")
            }
           })
           .on('mouseleave', function() {
              d3.selectAll("." + datum.split(' ').join('-'))
                .transition()
                .duration(400)
                .attr("stroke", "#70d8b2")
                .attr("stroke-width", 5)
                .style("color", "inherit")
                .style("font-weight", "inherit")
           })
        }
      }
    )
  }

  render() { 
    return (
      <div>
        <div className="heading">
          <h1>Current Prediction Rankings</h1>
          <h3>Hover to highlight team</h3>
        </div>
        <div className="logloss">
          <Table tableData={ tableData } />
          <div className="graph">
            <h3>Logloss over Time</h3>
            <svg className="logloss-graph" width="650" height="450"></svg>
          </div>
        </div>
      </div>
    )
  }
}

export default Mainpage
