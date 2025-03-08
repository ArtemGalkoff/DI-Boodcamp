import React, { Component } from 'react';

class ColorChanger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteColor: 'blue',
    };
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {

    console.log("in getSnapshotBeforeUpdate");

    return null; 
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true; 
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('After update:', this.state.favoriteColor);
  }

  changeColor = () => {
    this.setState({ favoriteColor: 'red' });
  };

  render() {
    return (
      <div>
        <h1>My favorite color is: {this.state.favoriteColor}</h1>
        <button onClick={this.changeColor}>Change red</button>
      </div>
    );
  }
}

class Child extends Component {
    constructor(props) {
      super(props);
      this.state = {
        show: true,
      };
    }
  
    componentWillUnmount() {
      alert('Header is to be unmounted');
    }
  
    toggleShow = () => {
      this.setState((prevState) => ({ show: !prevState.show }));
    };
  
    render() {
      return (
        <div>
          
          {this.state.show && <header>Hello World</header>}
          <button onClick={this.toggleShow}>Toggle Show</button>
        </div>
      );
    }
  }

export default ColorChanger;
export { Child };