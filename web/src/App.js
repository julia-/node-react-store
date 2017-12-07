import React, { Component } from 'react'
import './App.css';
import SigninForm from './components/SigninForm'
import SignupForm from './components/SignupForm'
import Product from './components/Product'
import { signUp, signIn, signOutNow } from './api/auth'
import { listProducts } from './api/products'
import { getDecodedToken } from './api/token'
// import { setToken } from './api/init'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    products: null
  }

  componentDidMount() {
    this.displayProducts()
  }

  onSignUp = ({ firstName, lastName, email, password }) => {
    console.log('Received', { firstName, lastName, email, password })
    signUp({ firstName, lastName, email, password })
      .then(decodedToken => {
        console.log('signed in', decodedToken)
        this.setState({ decodedToken })
      })
  }

  displayProducts = () => {
    listProducts()
      .then(products => {
        console.log('Products', products)
        this.setState({ products })
      })
      .catch(error => {
        console.error('Error', error.message)
      })
  }

  onSignIn = ({ email, password }) => {
    console.log('App received', { email, password })
    signIn({ email, password })
      .then(decodedToken => {
        console.log('signed in', decodedToken)
        this.setState({ decodedToken })
      })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  render() {
    const { decodedToken, products } = this.state
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
              <div>
                {
                  !!products &&
                    products.map(product => <Product {...product} />)
                }
              </div>
              <button onClick={ this.onSignOut }>
                Sign out
              </button>
            </div>
          ) : (
            <div>
              <div>
                <h2 className='mb-3'>Sign in</h2>
                <SigninForm onSignIn={ this.onSignIn } />
              </div>
              <div>
                <h2 className='mb-3'>Sign up</h2>
                <SignupForm onSignUp={ this.onSignUp } />
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default App
