import React, { useState } from 'react'
import ReactPayPal from './ReactPayPal'
import { Button, Container, Form } from 'react-bootstrap'

const Paypal = () => {
  const [checkout, setCheckout] = useState(false)
  const [donateAmount, setDonateAmount] = useState(null)
  const [confirmedChekoutAmount, setConfirmedCheckoutAmount] = useState(null)

  const handleChange = (event) => {
    const newFormData = { ...checkout, [event.target.name]: event.target.value }
    setDonateAmount(newFormData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setConfirmedCheckoutAmount(parseFloat(donateAmount.amount))
    // setCurrentLocation(formData.location)
  }

  console.log('confirmedChekoutAmount>>>>>', confirmedChekoutAmount)

  console.log(donateAmount, setDonateAmount)

  return (
<>
<Container className="weather-button-container">
    <Form className="select-location-form" onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicLocation">
        <Form.Control type="text" placeholder="Enter location"
            className="text-muted"
            id="location"
            name="amount"
            value={setDonateAmount.amount}
            onChange={handleChange}/>
      </Form.Group>
      <Button className="donate-button checkout-button" type="submit"> Confirm Donation Amount?</Button>
      </Form>
      </Container>
    <div className="App">
      <header className="App-header">
        {(checkout === true)
          ? <div className="payment-div">
            <ReactPayPal
            confirmedChekoutAmount = {confirmedChekoutAmount}
            />
          </div>

          : <div>
            <h1>Support our project</h1>
            <p>This website is run by a dedicated team of volunteers! If you would like to support our campaign, please donate below!</p>
            <Button onClick={() => { setCheckout(true) }} className="checkout-button">Checkout</Button>
          </div>
        }
      </header>
    </div>
    </>
  )
}

export default Paypal
