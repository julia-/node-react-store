import React, { Component } from 'react'
import './App.css';
import SigninForm from './components/SigninForm'
import { signIn } from './api/auth'
import { listProducts } from './api/products'
// import { setToken } from './api/init'

class App extends Component {
  state = {
    decodedToken: null
  }
  onSignIn = ({ email, password }) => {
    console.log('App received', { email, password })
    signIn({ email, password })
      .then(decodedToken => {
        console.log('signed in', decodedToken);
        this.setState({ decodedToken })
      })
  }

  render() {
    const { decodedToken } = this.state

    return (
      <div className="App">
        <h1 className='mb-3'>Yarra</h1>
        <h2 className='mb-3'>Now delivering: Shipping trillions of new products</h2>
        {
          !!decodedToken ? (
            <div>
              <p>Email: { decodedToken.email }</p>
              <p>Signed in at: { new Date(decodedToken.iat * 1000).toISOString() }</p>
              <p>Expires at: { new Date(decodedToken.exp * 1000).toISOString() }</p>
            </div>
          ) : (
            <SigninForm
              onSignIn={ this.onSignIn }
            />
          )
        }
      </div>
    )
  }

  // When this app first appears on the screen
  componentDidMount() {
    listProducts()
      .then(products => {
        console.log(products);
      })
      .catch(error => {
        console.error('error loading products', error)
      })
  }
}

export default App
