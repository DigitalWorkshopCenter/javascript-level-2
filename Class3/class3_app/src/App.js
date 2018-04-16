import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Content />

        <Footer />           
      </div>
    );
  }
}


class Header extends Component {
  render() {
    return(
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">World! More text</h1>
    </header>
    );
  }
}

class Content extends Component {
  render(){
    return(
      <div>
        <p></p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div><Blog author="Christine" date="2017-01-13" /></div>
        <div><Blog author="Dave" /></div>
    </div>
    );
  }
}

class Footer extends Component {
  render(){
    return(
      <footer className="footer">
        <hr />
       &copy; {new Date().getFullYear()}
      </footer>
    );
  }
}


class Blog extends Component {
  renderPlaceholder() {
    return(
      <div>
        <p>dfkj lkdfskljd f</p>
        <p>ds sfsdf dfdf </p>
        <p>dfkj lkdfskljd f</p>
        <p>ds sfsdf dfdf </p>
        <p>dfkj lkdfskljd f</p>
        <p>ds sfsdf dfdf </p>
        <p>dfkj lkdfskljd f</p>        
        <p>ds sfsdf dfdf </p> 
      </div>
    );
  }

  render(){
    return(
        <div>
          {this.renderPlaceholder()}
          <p>Author: {this.props.author} on {this.props.date}</p>
          <hr />
        </div>
    );
  }
}

export default App;
