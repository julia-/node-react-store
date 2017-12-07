import React, { Component } from 'react';
import './App.css';
import SigninForm from './components/SigninForm'

class App extends Component {
  onSignIn = ({ email, password }) => {
    console.log('App received', { email, password });
  }

  render() {
    return (
      <div className="App">
        <h1 className='mb-3'>Yarra</h1>
        <h2 className='mb-3'>Now delivering: Shipping trillions of new products</h2>
        <SigninForm
          onSignIn={ this.onSignIn }
        />
      </div>
    );
  }
}

export default App;