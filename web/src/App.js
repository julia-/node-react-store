import React, { Component } from 'react'
import './App.css';
import SigninForm from './components/SigninForm'
import { signIn, signOutNow } from './api/auth'
import { listProducts } from './api/products'
import { getDecodedToken } from './api/token'
// import { setToken } from './api/init'

class App extends Component {
  state = {
    decodedToken: getDecodedToken() // Restore the previous signed in data
  }
  onSignIn = ({ email, password }) => {
    console.log('App received', { email, password })
    signIn({ email, password })
      .then(decodedToken => {
        console.log('signed in', decodedToken);
        this.setState({ decodedToken })
      })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  render() {
    const { decodedToken } = this.state
    const signedIn = !!decodedToken

    return (
      <div className="App">
        <h1 className='mb-3'>Yarra</h1>
        <h2 className='mb-3'>Now delivering: Shipping trillions of new products</h2>
        {
          signedIn ? (
            <div>
              <p>Email: { decodedToken.email }</p>
              <p>Signed in at: { new Date(decodedToken.iat * 1000).toISOString() }</p>
              <p>Expires at: { new Date(decodedToken.exp * 1000).toISOString() }</p>
              <button onClick={ this.onSignOut }>
                Sign out
              </button>
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
