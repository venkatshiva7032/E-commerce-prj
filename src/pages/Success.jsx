import { Link } from 'react-router-dom'
import './Success.css'

const Success = () => {
  return (
    <div className="success-container">
      <div className="success-box">
        <div className="success-icon">✓</div>
        <h2 className="success-title">Order Placed Successfully!</h2>
        <p className="success-message">Thank you for shopping with ShopEasy.</p>
        <p className="success-message">Your order details and invoice have been sent to your email.</p>
        <Link to="/">
          <button className="back-home-btn">Back to Home</button>
        </Link>
      </div>
    </div>
  )
}

export default Success
