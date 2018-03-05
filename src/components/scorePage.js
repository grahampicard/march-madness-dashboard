import React, { Component } from 'react'
//import jsonData from './../data/loglossdata'
import * as d3 from 'd3'


class Scorepage extends Component {

  constructor(props){
    super(props)

    this.state = {
			victor: null
		}

    this.createHist = this.createHist.bind(this)
    this.createLegend = this.createLegend.bind(this)
  }

  componentDidMount() {
    this.setState({
      victor: (this.props.game.strong_score > this.props.game.weak_score) ? true : false
    })
    this.createHist()
    this.createLegend()
  }
  
  componentDidUpdate() {
    d3.select("g").remove()
    this.createHist()
    this.createLegend()
  }
  
  createHist() {
    var newdata = [{"team":"Beauties_and_the_Beast","prob_final":0.9798},{"team":"Black_Mamba","prob_final":0.99999},{"team":"Component","prob_final":0.990139},{"team":"FOURdham_Marchketeers","prob_final":0.974},{"team":"Gambler","prob_final":0.79},{"team":"InMotion","prob_final":0.998599},{"team":"mercury","prob_final":0.918886},{"team":"Never_Blow_3-1","prob_final":0.943086},{"team":"OneBillionDollars","prob_final":0.7438},{"team":"pilarz","prob_final":0.969567},{"team":"SuperDC","prob_final":0.996},{"team":"team_18","prob_final":0.925327},{"team":"team_Four-point shot","prob_final":0.586343},{"team":"Team_Rams","prob_final":0.987698},{"team":"Team_RNG","prob_final":0.558},{"team":"Team_Slam_Dunk","prob_final":0.991816},{"team":"A_Cinderella_Story","prob_final":0.038295}]

    // create local versions of state
    var victor = this.state.victor
    var correct_color = this.props.correct_color
    var incorrect_color = this.props.incorrect_color
    
    // declare dimensions, connect to svg object, create dimensional variables, and add a "g" element
    var containerWidth = d3.select(".score-container")["_groups"][0][0].clientWidth
    var margin = {top: 10, right: 30, bottom: 30, left: 30}
    var svg = d3.select(".prediction-chart")
        svg.attr("width", containerWidth - margin.right - margin.left)
    var width = +svg.attr("width") - margin.left - margin.right
    var height = +svg.attr("height") - margin.top - margin.bottom
    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // scall to the width of the object
    var x = d3.scaleLinear().rangeRound([0, width]);
    
    // create domains and thresholds from data
    var hist = d3.histogram()
        .domain(x.domain())
        .thresholds(x.ticks(10))
    
    var bins = hist(newdata.map(function(d) { return d.prob_final}))
    
    // scale y axis to the length of the data
    var y = d3.scaleLinear()
        .domain([0, d3.max(bins, function(d) { return d.length; })])
        .range([height, 40]);
    
    // take the g object, and select ".bar" css and append data
    var bar = g.selectAll(".bar")
      .data(bins)
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + 0 + ")"; })
    
    // add rectangles
    bar.append("rect")
      .attr("x", 1)
      .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
      .attr("height", function(d) { return height - y(d.length)})
      .attr("transform", function(d) { return "translate(0, " + y(d.length) + ")"})
      .attr("fill", function(d,i) {
        if ((victor & i >= 5) || (!victor & i < 5)) {
          return correct_color
        } else {
          return incorrect_color
        }
      })

    svg.selectAll("labels")
      .data(bins)
      .enter().append("text")
      .attr("transform", function(d) { return "translate(" + (x(d.x0) + 65) + "," + (y(d.length) - 10) + ")"; })
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .style("fill", "gray")
      .text(function(d, i) { 
        if ((i !== bins.length - 1) & d.length > 0) {
          return d.length
        }
      })

    // Add axis
    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(10).tickFormat(d3.format(".0p")))   

  }
  
  createLegend() {
    
    // connect to svg object, create dimensional variables, and add a "g" element
    var svg = d3.select(".legend")
    
    // take the g object, and select ".bar" css and append data

    var data = [{
      "label": "Incorrect",
      "color": this.props.incorrect_color
    },{
      "label": "Correct",
      "color": this.props.correct_color
    }]

    svg.selectAll("circle")
      .data(data)
      .enter().append("circle")
      .attr("cy",12)
      .attr("cx", function(d, i) { return 150 * (i) + 30})
      .attr("r", 8)
      .attr("fill", function(d) { return d.color})
      
    svg.selectAll("labels")
      .data(data)
      .enter().append("text")
      .attr("transform", function(d, i) {return "translate(" + (50 + 150 * (i)) + "," + 12 + ")"})
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .style("fill", "gray")
      .text(function(d) { return d.label})
    
  }

  render() {

    let picHeight = "100px"
    let picWidth = "100px"

    return (
      <div>
        <div className="score-container">
          <div className="logo weak-logo">
            <h2 className={(this.state.victor) ? "loser": "victor"}>The "Underdog"</h2>
            <img src={('./img/' + this.props.game.weak_team_espn + '.png')} 
              alt={this.props.game.weak_team_name} 
              width={picWidth} height={picHeight} 
            />
          </div>
          <div className="logo strong-logo">
            <h2 className={(this.state.victor) ? "victor": "loser"}>The "Favorite"</h2>
            <img className="strong-logo" 
              src={('./img/' + this.props.game.strong_team_espn + '.png')} 
              alt={this.props.game.strong_team_name} 
              width={picWidth} height={picHeight} 
            />
          </div>
          <div className="scoreboard">
            <h2>FINAL</h2>
            <h1>{this.props.game.weak_score} - {this.props.game.strong_score}</h1>
          </div>
          <div className="score-histogram">
            <h2>Prediction Distribution</h2>
            <svg className="legend" height="25" width="275"></svg>
            <svg className="prediction-chart" height="200"></svg>
            <h3>% Likilhood of {this.props.game.strong_team_name} Victory</h3>
          </div>
          {/*<div>
            <p>{ this.props.game.status }</p>
          </div>*/}
        </div>
      </div>
    )
  }
}

export default Scorepage

