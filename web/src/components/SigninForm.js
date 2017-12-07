import React from 'react'

function SigninForm({
  onSignIn
}) {
  return (
    <form
      onSubmit={ (event) => {
        event.preventDefault() // Stops form values added to url
        const form = event.target
        const elements = form.elements
        // Get entered values from fields
        const email = elements.email.value
        const password = elements.password.value
        // Pass information along to the parent component
        onSignIn({ email, password })
      }}
    >
      <label
        className='mb-2'
      >
        { 'Email: '}
        <input
          type='email'
          name='email'
        />
      </label>

      <label
        className='mb-2'
      >
        {'Password: '}
        <input
          type='password'
          name='password'
        />
      </label>
      <button>Sign in</button>
    </form>
  )
}

export default SigninForm