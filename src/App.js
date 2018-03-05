import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Topbar from './components/topbar'
import Mainpage from './components/mainPage'
import Scorepage from './components/scorePage'
import gameData from './data/games'
//import scores from './data/scores'


class App extends Component {

  render() {
    return (
      <div className="App">
        <Topbar data={gameData} />
        <div className="main">
          <Route exact path='/' component={ Mainpage } key="home"/>
          <Route
            path="/:id"
            key=":id"
            render={
              (id) =>
              <Scorepage 
                game={gameData.find((x) => x.slot === id.match.params.id)} 
                correct_color="#90c2e7" 
                incorrect_color="#ced3dc"
              />
            }
          />
        </div>
      </div>
    )
  }
}

export default App
