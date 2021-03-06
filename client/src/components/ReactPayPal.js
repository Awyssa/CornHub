/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function ReactPayPal ({ confirmedChekoutAmount }) {
  const [paid, setPaid] = useState(false)
  const [error, setError] = useState(null)
  const paypalRef = React.useRef()
  const history = useHistory()
  console.log('confirmed-checkout amout on the paypal form page', confirmedChekoutAmount)

  // To show PayPal buttons once the component loads
  React.useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: 'Your description',
                amount: {
                  currency_code: 'GBP',
                  value: confirmedChekoutAmount
                }
              }
            ]
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture()
          setPaid(true)
          console.log(order)
        },
        onError: (err) => {
          setError(err)
          console.error(err)
        }
      })
      .render(paypalRef.current)
  }, [])

  // If the payment has been made
  if (paid) {
    return (
    <Container className="paypal-checkout-container">
     <h2>Payment successful!</h2>
     <h4>Click the button below to take you to the homepage!</h4>
      <Button className="auth-button" onClick={() => history.push('/home')}>Back to home page?</Button>
    </Container>
    )
  }

  // If any error occurs
  if (error) {
    return <div>Error Occurred in processing payment.! Please try again.</div>
  }

  // Default Render
  return (
    <>

    <Container className="paypal-checkout-container">
      <h4>Total Amount in GBP: £  {confirmedChekoutAmount}</h4>
      <div ref={paypalRef} />
    </Container>
    </>
  )
}
