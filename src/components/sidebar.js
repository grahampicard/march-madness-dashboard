import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';


class Date extends Component {

  render() {
    var groupId = "sub-group-1 " + this.props.data.date

    return (
      <li>
        <input id={groupId} type="checkbox" hidden />
        <label htmlFor={groupId}>
          <span className="fa fa-angle-right"></span>
          {this.props.data.date}
        </label>
        <ul className="group-list">
          { this.props.data.games.map((game) =>
            <li key={ game.slot }>
              <NavLink to={ String.prototype.concat("/",game.slot) }>
                { game.strong_team_name + " (X) vs. " + 
                  game.weak_team_name + " (Y)" }
              </NavLink>
            </li>
          )}
        </ul>
      </li>
    )
  }
}

class Sidebar extends Component {

  render() {
    var sorted = this.props.data
        sorted = sorted.sort(function(a,b) {
          return (a.date > b.date) ? 1: ((b.date > a.date) ? -1 : 0)
        })
  
    return (
      <nav className="nav">
        <ul className="nav__list">
          <li key="home">
            <NavLink to="/">Current Prediction Rankings</NavLink>
          </li>
        { 
          sorted.map((dateObj) =>
            <Date data={dateObj} key={dateObj.date}/>
          )
        }
        </ul>
      </nav>
    )
  }
}

export default Sidebar;
