import React, { Component } from 'react';
import { APP_NAME } from '../constants';

class Count extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  clickHandler = () => this.setState(({ count }) => ({ count: count + 1 }));

  render() {
    const { count } = this.state;
    return (
      <>
        <h1>{APP_NAME}</h1>
        <div>{`The button has been clicked ${count} times.`}</div>
        <button className="primary center" type="button" label="click this" onClick={this.clickHandler}>Click this</button>
      </>
    );
  }
}

export default Count;
