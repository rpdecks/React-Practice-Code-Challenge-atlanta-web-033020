import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  state = {
    sushis: [],
    eaten: [],
    money: 100,
    displayIndex: 0,
  }

  componentDidMount() {
    fetch(API)
    .then(res => res.json())
    .then(sushis => this.setState({ sushis: sushis }))
  }

  chooseFourSushis = () => {
    return this.state.sushis.slice(this.displayIndex, this.displayIndex + 4)
  }

  more = (event) => {
    let newDisplayIndex = this.state.displayIndex + 4

    //bonus
    // if(newDisplayIndex >= this.state.sushis.length){
    //   newDisplayIndex = 0
    // }

    this.setState({
      displayIndex: newDisplayIndex
    })
  }

  eat =(sushi)=> {
    const balance = this.state.money - sushi.price
    if (!this.state.eaten.includes(sushi) && balance >=0 ) {
      this.setState({
        eaten: [...this.state.eaten, sushi],
        money: balance
      })
    }
  }

  render() {
    return (
      <div className="app">
        <SushiContainer 
          sushis={this.chooseFourSushis()}
          eat={this.eat}
          more={this.more}
          eaten={this.state.eaten}
        />
        <Table 
          eaten={this.state.eaten}
          remainingBudget={this.state.money}
        />
      </div>
    );
  }
}

export default App;