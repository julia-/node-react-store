import decodeJWT from 'jwt-decode'

const key = 'userToken'

export function rememberToken(token) {
  if (token) {
    // Remember the token
    localStorage.setItem(key, token)
  } else {
    // Clear the remembered token (e.g. sign out)
    localStorage.removeItem(key)
  }
}

export function getValidToken() {
  const token = localStorage.getItem(key)
  try {
    const decodedToken = decodeJWT(token)
    const now = Date.now() / 1000 // convert milliseconds to seconds
    //Check if token has expired
    if (now > decodedToken.exp) {
      return null
    }
    // Valid token
    return token
  }
  catch (error) {
    // Invalid token
    return token
  }
}

export function getDecodedToken() {
  // try {
  //   return decodeJWT(getValidToken())
  // } catch (error) {
  //   return null
  // }
  const validToken = getValidToken()
  if (validToken) {
    return decodeJWT(validToken)
  } else {
    return null
  }
}