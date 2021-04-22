import React, { useState } from 'react'
import ReactPayPal from './ReactPayPal'
import { Button, Container, Form } from 'react-bootstrap'

const Paypal = () => {
  const [checkout, setCheckout] = useState(false)
  const [donateAmount, setDonateAmount] = useState(0)
  const [confirmedChekoutAmount, setConfirmedCheckoutAmount] = useState(0)
  const [toggleDonationAmount, setToggleDonationAmount] = useState(null)

  const handleChange = (event) => {
    const newFormData = { ...checkout, [event.target.name]: event.target.value }
    setDonateAmount(newFormData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setConfirmedCheckoutAmount(parseFloat(donateAmount.amount))
    setToggleDonationAmount(1)
    // setCurrentLocation(formData.location)
  }

  console.log('confirmedChekoutAmount>>>>>', confirmedChekoutAmount)

  console.log(donateAmount, setDonateAmount)

  return (
<>

    <div className="App">
      <header className="App-header">
        {(checkout === true)
          ? <div className="payment-div">
            <ReactPayPal
            confirmedChekoutAmount = {confirmedChekoutAmount}
            />
          </div>

          : <div>
            <Container className="paypal-checkout-container">
              <h1>Support our project</h1>
              <p>This website is run by a dedicated team of volunteers! If you would like to support our campaign, please donate below!</p>
              <Form className="select-location-form" onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicLocation">
                  <Form.Control type="text" placeholder="Enter donation amount"
                      className="text-muted"
                      id="location"
                      name="amount"
                      value={setDonateAmount.amount}
                      onChange={handleChange}/>
                </Form.Group>
                {!toggleDonationAmount
                  ? <Button className="donate-button checkout-button" type="submit"> Confirm  Amount?</Button>
                  : <Button className="donate-button checkout-button" type="submit"> Change  Amount?</Button>
                }
              </Form>
              <Button onClick={() => { setCheckout(true) }} className="checkout-button">Checkout with PayPal</Button>

            </Container>
          </div>
        }
      </header>
    </div>
    </>
  )
}

export default Paypal
