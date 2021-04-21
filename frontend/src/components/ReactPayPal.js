/* eslint-disable react/prop-types */
import React, { useState } from 'react'
// import { Container, Form, Button } from 'react-bootstrap'

export default function ReactPayPal ({ confirmedChekoutAmount }) {
  const [paid, setPaid] = useState(false)
  const [error, setError] = useState(null)
  const paypalRef = React.useRef()

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
    return <div>Payment successful.!</div>
  }

  // If any error occurs
  if (error) {
    return <div>Error Occurred in processing payment.! Please try again.</div>
  }

  // Default Render
  return (
    <>

    <div>
      <h4>Total Amount in GBP: £  {confirmedChekoutAmount}</h4>
      <div ref={paypalRef} />
    </div>
    </>
  )
}
