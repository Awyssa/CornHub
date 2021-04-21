import React, { useState } from 'react'
import ReactPayPal from './ReactPayPal'

const Paypal = () => {
  const [checkout, setCheckout] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        {(checkout === true)
          ? <div className="payment-div">
            <ReactPayPal />
          </div>

          : <div>
            <h1>React-PayPal</h1>
            <button onClick={() => { setCheckout(true) }} className="checkout-button">Checkout</button>
          </div>
        }
      </header>
    </div>
  )
}

export default Paypal
