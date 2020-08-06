import React, { Component } from 'react';

class App extends Component {
  state = {
    res: [],
    test: 'test'
  }

  componentDidMount() {
    this.query()
  }

  query = () => {
    // Get hello world
    fetch('/hello')
      .then(res => res.json())
      .then(json => this.setState({ res: json['hello'] }))
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { res } = this.state
    const { test } = this.state
    return (
      <div>
        <div>{res}</div>
        <div>{test}</div>
      </div>
    )
  }
}

export default App;
