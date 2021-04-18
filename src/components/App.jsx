import React, { Component, Fragment } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  clickHandler = () => this.setState(({ count }) => ({ count: count + 1 }));

  render() {
    const { count } = this.state;
    return (
      <>
        <div>{`The button has been clicked ${count} times.`}</div>
        <button type="button" label="click this" onClick={this.clickHandler}>Click this</button>
      </>
    );
  }
}

export default App;
