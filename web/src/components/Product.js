import React from 'react'

function Product({
  name,
  brandName
}) {
  return (
    <div>
      <h3>{ name }</h3>
      <h4>{ brandName }</h4>
    </div>
  )
}

export default Product