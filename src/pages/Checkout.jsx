import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Checkout.css'

const Checkout = (props) => {
  const { cart, clearCart } = props
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery')
  const [upiId, setUpiId] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  let total = 0
  for (let i = 0; i < cart.length; i++) {
    total = total + (cart[i].price * cart[i].quantity)
  }

  const handleCheckout = (e) => {
    e.preventDefault()
    setError('')
    
    if (name === '') {
      setError('Please fill all details')
    } else if (address === '') {
      setError('Please fill all details')
    } else if (paymentMethod === 'UPI' && upiId === '') {
      setError('Please fill all details')
    } else if (paymentMethod === 'Card Payment' && cardNumber === '') {
      setError('Please fill all details')
    } else if (cart.length === 0) {
      setError('Your cart is empty')
    } else {
      clearCart()
      navigate('/success')
    }
  }

  let errorElement = null
  if (error !== '') {
    errorElement = <p className="error-msg">{error}</p>
  }

  let conditionalPaymentField = null
  if (paymentMethod === 'UPI') {
    conditionalPaymentField = (
      <div className="input-group">
        <p className="input-label">UPI ID</p>
        <input 
          type="text" 
          placeholder="username@bank"
          value={upiId} 
          onChange={(e) => setUpiId(e.target.value)} 
          className="checkout-input"
        />
      </div>
    )
  } else if (paymentMethod === 'Card Payment') {
    conditionalPaymentField = (
      <div className="input-group">
        <p className="input-label">Card Number</p>
        <input 
          type="text" 
          placeholder="1234-5678-9012-3456"
          value={cardNumber} 
          onChange={(e) => setCardNumber(e.target.value)} 
          className="checkout-input"
        />
      </div>
    )
  }

  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <h2 className="checkout-title">Checkout Details</h2>
        <p className="checkout-total">Amount to Pay: ${total.toFixed(2)}</p>
        {errorElement}
        <form onSubmit={handleCheckout}>
          <div className="input-group">
            <p className="input-label">Full Name</p>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="checkout-input"
            />
          </div>
          <div className="input-group">
            <p className="input-label">Shipping Address</p>
            <input 
              type="text" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              className="checkout-input"
            />
          </div>
          
          <div className="input-group">
            <p className="input-label">Payment Method</p>
            <select 
              value={paymentMethod} 
              onChange={(e) => {
                setPaymentMethod(e.target.value)
                setError('') // Clear error on change
              }}
              className="payment-select"
            >
              <option value="Cash On Delivery">Cash On Delivery</option>
              <option value="UPI">UPI</option>
              <option value="Card Payment">Card Payment</option>
            </select>
          </div>

          {conditionalPaymentField}

          <button type="submit" className="place-order-btn">Proceed To Pay</button>
        </form>
      </div>
    </div>
  )
}

export default Checkout
