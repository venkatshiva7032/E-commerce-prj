import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = (props) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="navbar">
      <div className="navbar-brand">
        <h2 className="navbar-brand-title">
          <Link to="/" className="navbar-brand-link">ShopEasy</Link>
        </h2>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/products" className="navbar-link">Products</Link>
        
        {token ? (
          <div className="navbar-auth-group">
            <Link to="/cart" className="cart-link">
              Cart <p className="cart-badge">{props.cartCount}</p>
            </Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="navbar-auth-group">
            <Link to="/login" className="login-link">Login</Link>
            <Link to="/register" className="register-link">Register</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
