import React, { Component } from 'react'
import { Route } from 'react-router-dom'

//style
import './App.css'

//components
import Topbar from './components/topbar'
import Mainpage from './components/mainPage'
import Scorepage from './components/scorePage'
import Sidebar from './components/sidebar'

//json
import gameData from './data/newGames'


class App extends Component {

  render() {
    return (
      <div className="App">
        <Topbar />
        <div className="main">
          <div className="content">
            <Route exact path='/' component={ Mainpage } key="home"/>
            <Route
              path="/:id"
              key=":id"
              render={
                function(id) {
                  var matchgame

                  gameData.map(function(date) {  
                    var curgame
                    curgame = date["games"].find(
                      (x) => x.slot === id.match.params.id
                    )
                    
                    if (typeof(curgame) === "undefined") {
                      return null
                    }
                  
                    if (typeof(curgame) === "object") {
                      matchgame = curgame
                      return null
                    }

                    return null
                  })

                  return (
                    <div>
                      <Scorepage
                        game={ matchgame } 
                        correct_color="#90c2e7"
                        incorrect_color="#c9c9c9"
                      />
                    </div>
                  )
                }
              }
            />
          </div>
          <div className="side-bar">
            <Sidebar data={ gameData } />
          </div>
        </div>
      </div>
    )
  }
}

export default App
