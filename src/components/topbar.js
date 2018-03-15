import React, { Component } from 'react'


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
        {/* 
          <Menu onStateChange={ this.state.isOpen }>
            <NestedSidebar data={ this.props.allGameData }/>
          </Menu>
        */}
      </header>
    )
  }
}

export default Topbar;
