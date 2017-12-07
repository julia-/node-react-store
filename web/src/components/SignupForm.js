import React from 'react'

function SignupForm({
  onSignUp
}) {
  return (
    <form
      onSubmit={ (event) => {
        event.preventDefault()
        const form = event.target
        const elements = form.elements
        const firstName = elements.firstName.value
        const lastName = elements.lastName.value
        const email = elements.email.value
        const password = elements.password.value
        onSignUp({ firstName, lastName, email, password })
      }}
      >
      <label
        className='mb-2'
      >
        { 'First name' }
        <input
          type='text'
          name='firstName'
        />
      </label>
      <label
        className='mb-2'
      >
        { 'Last name' }
        <input
          type='text'
          name='lastName'
        />
      </label>
      <label
        className='mb-2'
      >
        { 'Email' }
        <input
          type='email'
          name='email'
        />
      </label>
      <label
        className='mb-2'
      >
        { 'Password' }
        <input
          type='password'
          name='password'
        />
      </label>
      <button>
        Sign up
      </button>
    </form>
  )
}

export default SignupForm