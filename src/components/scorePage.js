import React, { Component } from 'react'
import histogramData from './../data/histogramData'
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
  
  componentWillMount() {
    this.setState({
      victor:
        (this.props.game.strong_score > this.props.game.weak_score) 
          ? true : false,
      underdogStatus: 
        (this.props.game.status === "Final") ? 
          ((this.props.game.strong_score > this.props.game.weak_score) ? 
            "loser": "victor") : 
          "pending",
      favoriteStatus:
        (this.props.game.status === "Final") ? 
          ((this.props.game.strong_score > this.props.game.weak_score) ? 
            "victor": "loser") : 
          "pending",
    })
  }


  componentDidMount() {
    if (this.props.game.status === "Final") {
      this.createHist()
      this.createLegend()  
    }
  }
  
  componentDidUpdate() {
    d3.selectAll("g").remove()
    d3.selectAll(".bar-labels").remove()
    
    this.state = {
      victor:
          (this.props.game.strong_score > this.props.game.weak_score) 
            ? true : false,
        underdogStatus: 
          (this.props.game.status === "Final") ? 
            ((this.props.game.strong_score > this.props.game.weak_score) ? 
              "loser": "victor") : 
            "pending",
        favoriteStatus:
          (this.props.game.status === "Final") ? 
            ((this.props.game.strong_score > this.props.game.weak_score) ? 
              "victor": "loser") : 
            "pending",
    }
    
    if (this.props.game.status === "Final") {
      console.log(this.props.game)
      
      this.createHist()
      this.createLegend()  
    }
  }
  
  createHist() {

    var gameHist = histogramData[this.props.game.slot]

    // create local versions of state
    var victor = this.state.victor
    var correct_color = this.props.correct_color
    var incorrect_color = this.props.incorrect_color
    
    // declare dimensions, connect to svg object, create dimensional variables, and add a "g" element
    var containerWidth = d3.select(".score-container")["_groups"][0][0].clientWidth
    var margin = {top: 70, right: 30, bottom: 30, left: 30}
    var svg = d3.select(".prediction-chart")
        svg.attr("width", containerWidth - margin.right - margin.left)
    var width = +svg.attr("width") - margin.left - margin.right
    var height = +svg.attr("height") - margin.top - margin.bottom
    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // scall to the width of the object
    var x = d3.scaleLinear().rangeRound([20, width - 20]);
    var bins = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []      
    ]

    bins.map(function(x,i) {
      x["x0"] = .1 * i
      x["x1"] = .1 * i + .1
    })

    gameHist.map(function(game) {
      if ((game.prob_final >= 0) & (game.prob_final < 1)) {
        bins[Math.floor(game["prob_final"] * 10)].push(game)
      }
      if (game.prob_final === 1) {
        bins[9].push(game)
      }
      return
    })

    // scale y axis to the length of the data
    var y = d3.scaleLinear()
        .domain([0, d3.max(bins, function(d) { return d.length; })])
        .range([height, 40]);

    // tooltips
    var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)

    // take the g object, and select ".bar" css and append data
    var bar = g.selectAll(".bar")
      .data(bins)
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) {
          return "translate(" + x(d.x0) + "," + 0 + ")"
        })

    // add rectangles
    bar.append("rect")
      .attr("x", 1)
      .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
      .attr("height", function(d) { return height - y(d.length)})
      .attr("transform", function(d) { 
        return "translate(0, " + y(d.length) + ")"
      })
      .attr("fill", function(d,i) {
        if ((victor & i >= 5) || (!victor & i < 5)) {
          return correct_color
        } else {
          return incorrect_color
        }
      })
      .on("mouseover", function(d) { 
        var xPosition = x(d.x0)
        var yPosition = y(d.length)

        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html("<span><b>Teams:</b></span></br>" + d.map((x) => x.team).join("<br/>"))
          .style("left", (d3.event.pageX - 28) + "px")
          .style("top", (d3.event.pageY - 28) + "px")
      })
      .on("mouseout", function(d) {
        div.transition()
          .duration(10)
          .style("opacity", 0)
      })


    // add labels
    svg.selectAll("labels")
      .data(bins)
      .enter().append("text")
      .attr("transform", function(d) { 
        return "translate(" + (x(d.x0) + 65) + "," + (y(d.length) + margin.top - 15) + ")";
      })
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .style("fill", "gray")
      .text(function(d, i) { 
        if (d.length > 0) {
          return d.length
        }
      })
      .attr("class", "bar-labels")

    // Add axis
    g.append("g")
      .attr("class", "axis-histogram")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(10).tickFormat(d3.format(".0p")))   
      .attr("style", "font-size:14pt")
  }
  
  createLegend() {
    
    // connect to svg object, create dimensional variables, and add a "g" element
    var svg = d3.select(".legend")
    
    // take the g object, and select ".bar" css and append data

    var data = [
      {
        "label": "Incorrect",
        "color": this.props.incorrect_color
      },
      {
      "label": "Correct",
      "color": this.props.correct_color
      }
    ]
    
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
      .attr("transform", function(d, i) {
        return "translate(" + (50 + 150 * (i)) + "," + 12 + ")"
      })
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .style("fill", "gray")
      .text(function(d) { return d.label})    
  }

  render() {

    let picHeight = "100px"
    let picWidth = "100px"

    return (
      <div className="score-container">
        <div className="logo weak-logo">
          <h3 className="team-name-type">
            Underdog
          </h3>
          <h2 className="team-name" >
            {this.props.game.weak_team_name}
          </h2>            
          <img 
            src={ ('./img/' + this.props.game.weak_team_espn + '.png') } 
            alt={ this.props.game.weak_team_name } 
            width={ picWidth } 
            height={ picHeight } 
          />
        </div>
        <div className="logo strong-logo">
          <h3 className="team-name-type">
            Favorite
          </h3>
          <h2 className="team-name" >
            {this.props.game.strong_team_name}
          </h2>                        
          <img
            className="strong-logo" 
            src={ ('./img/' + this.props.game.strong_team_espn + '.png') }
            alt={ this.props.game.strong_team_name }
            width={ picWidth } height={ picHeight }
          />
        </div>
        <div className="scoreboard">
          <h2>{ this.props.game.status }</h2>
          <h1>
            { this.props.game.weak_score } - { this.props.game.strong_score }
          </h1>
        </div>
        <div 
          className="score-histogram" 
          style={(this.props.game.status === "Final") ?
            {display: "inherit"} : {display: "none"}}
        >
          <h2>Prediction Distribution</h2>
          <h3>Hover to see teams</h3>
          <svg className="legend" height="25" width="275"></svg>
          <svg className="prediction-chart" height="300"></svg>
          <h3>% Likilhood of {this.props.game.strong_team_name} Victory</h3>
        </div>
      </div>
    )
  }
}

export default Scorepage
