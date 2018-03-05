import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'


const sampleData = [
  {
    "name": "West",
    "dates": [
      {
        "date":"2018-03-15",
        "games":[
          {"slot":"R1W1","strong_team_name":"Villanova","weak_team_name":"Mt St Mary's","strong_team":1437,"weak_team":1291,"strong_team_espn":222,"weak_team_espn":116,"strong_score":76,"weak_score":56,"status":"Final","conference":"W","date":"3/15/2017"},
          {"slot":"R1W2","strong_team_name":"Duke","weak_team_name":"Troy","strong_team":1181,"weak_team":1407,"strong_team_espn":150.0,"weak_team_espn":2653.0,"strong_score":87,"weak_score":65,"status":"Final","conference":"W","date":"3/15/2017"}
        ]
      },
      {
        "date":"2018-03-16",
        "games":[
          {"slot":"R1W1","strong_team_name":"Villanova","weak_team_name":"Mt St Mary's","strong_team":1437,"weak_team":1291,"strong_team_espn":222.0,"weak_team_espn":116.0,"strong_score":76,"weak_score":56,"status":"Final","conference":"W","date":"3/15/2017"},
          {"slot":"R1W2","strong_team_name":"Duke","weak_team_name":"Troy","strong_team":1181,"weak_team":1407,"strong_team_espn":150.0,"weak_team_espn":2653.0,"strong_score":87,"weak_score":65,"status":"Final","conference":"W","date":"3/15/2017"}
        ]
      }
    ]
  },
  {
    "name": "East",
    "dates": [
      {
        "date":"2018-03-15",
        "games":[
          {"slot":"R1W1","strong_team_name":"Villanova","weak_team_name":"Mt St Mary's","strong_team":1437,"weak_team":1291,"strong_team_espn":222.0,"weak_team_espn":116.0,"strong_score":76,"weak_score":56,"status":"Final","conference":"W","date":"3/15/2017"},
          {"slot":"R1W2","strong_team_name":"Duke","weak_team_name":"Troy","strong_team":1181,"weak_team":1407,"strong_team_espn":150.0,"weak_team_espn":2653.0,"strong_score":87,"weak_score":65,"status":"Final","conference":"W","date":"3/15/2017"}
        ]
      },
      {
        "date":"2018-03-16",
        "games":[
          {"slot":"R1W1","strong_team_name":"Villanova","weak_team_name":"Mt St Mary's","strong_team":1437,"weak_team":1291,"strong_team_espn":222.0,"weak_team_espn":116.0,"strong_score":76,"weak_score":56,"status":"Final","conference":"W","date":"3/15/2017"},
          {"slot":"R1W2","strong_team_name":"Duke","weak_team_name":"Troy","strong_team":1181,"weak_team":1407,"strong_team_espn":150.0,"weak_team_espn":2653.0,"strong_score":87,"weak_score":65,"status":"Final","conference":"W","date":"3/15/2017"}
        ]
      }
    ]
  }
]


class Date extends Component {

  render() {
    let groupId = "sub-group-1 " + this.props.date.date + this.props.conference

    return (
      <li>
        <input id={groupId} type="checkbox" hidden />
        <label htmlFor={groupId}>
          <span className="fa fa-angle-right"></span>{this.props.date.date}
        </label>
        <ul className="group-list">
          {this.props.date.games.map((game) =>
            <li key={game.slot}>
              <Link to={String.prototype.concat("/",game.slot)}>
                {game.slot}
              </Link>
            </li>
          )}
        </ul>
      </li>
    )
  }
}


class Conference extends Component {

  render() {
    let conf = this.props.conference.name
    let groupId = "group-1 " + conf

    return (
      <li>
        <input id={groupId} type="checkbox" hidden />
        <label htmlFor={groupId}>
          <span className="fa fa-angle-right"></span>
          {this.props.conference.name}
        </label>
        <ul className="group-list">
          {this.props.conference.dates.map((date) =>
            <Date date={date} conference={conf} key={date.date}/>
          )}
        </ul>
      </li>
    )
  }
}


class NestedSidebar extends Component {

  render() {
    return (
      <nav className="nav">
        <ul className="nav__list">
          <li key="home">
            <Link to="/">Home</Link>
          </li>
        {this.props.data.map((conf) =>
          <Conference conference={conf} key={conf.name}/>
        )}
        </ul>
      </nav>
    )
  }
}

class Topbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menuOpen: false
    }
  }

  render() {
    return (
      <header className="top-bar">
        <h1 className="App-title">Fordham March Madness</h1>
        <h1 className="App-title-screen">March Madness</h1>
        <Menu onStateChange={ this.state.isOpen }>
          <NestedSidebar data={sampleData}/>
        </Menu>
      </header>
    )
  }
}

export default Topbar;
