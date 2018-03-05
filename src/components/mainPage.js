import React, { Component } from 'react'
import BarChart from './logloss'
import jsonData from './../data/loglossdata'

class Mainpage extends Component {
  
  render() { 
    return (
      <div>
        <p className="App-intro">Test home page</p>
        <BarChart data={jsonData} size={[500,500]} />
      </div>
    )
  }
}

export default Mainpage