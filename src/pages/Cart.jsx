import { Link } from 'react-router-dom'
import './Cart.css'

const Cart = (props) => {
  const { cart, removeFromCart } = props

  let total = 0
  for (let i = 0; i < cart.length; i++) {
    total = total + (cart[i].price * cart[i].quantity)
  }

  if (cart.length === 0) {
    return (
      <div className="empty-cart-container">
        <h2 className="empty-cart-title">Your Cart is Empty</h2>
        <Link to="/products">
          <button className="continue-shopping-btn">Continue Shopping</button>
        </Link>
      </div>
    )
  } else {
    return (
      <div className="cart-container">
        <h2 className="cart-title">Shopping Cart</h2>
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => {
              return (
                <div key={item.id} className="cart-item-card">
                  <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-info">
                    <h3 className="cart-item-title">{item.title}</h3>
                    <p className="cart-item-price">Price: ${item.price}</p>
                    <p className="cart-item-qty">Quantity: {item.quantity}</p>
                  </div>
                  <div className="cart-item-action">
                    <p className="item-total">${item.price * item.quantity}</p>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="cart-summary">
            <h3 className="cart-summary-title">Order Summary</h3>
            <div className="summary-row">
              <p className="summary-text">Total Items:</p>
              <p className="summary-text">{cart.length}</p>
            </div>
            <div className="summary-row total-row">
              <p className="total-text">Total Price:</p>
              <p className="total-text">${total.toFixed(2)}</p>
            </div>
            <Link to="/checkout">
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Cart
