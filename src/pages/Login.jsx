import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    
    setError('')
    
    if (email === '') {
      setError('Please fill all fields')
    } else if (password === '') {
      setError('Please fill all fields')
    } else {
      const userDetails = {
        email: email,
        password: password
      }

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      }

      const response = await fetch(
        "https://login-and-registration-58by.onrender.com/api/v1/user/login",
        options
      )

      const data = await response.json()
      console.log(data)

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token)
          navigate('/')
        } else if (data.jwtToken) {
          localStorage.setItem("token", data.jwtToken)
          navigate('/')
        } else if (data.accessToken) {
          localStorage.setItem("token", data.accessToken)
          navigate('/')
        } else if (data.data && data.data.token) {
          localStorage.setItem("token", data.data.token)
          navigate('/')
        } else if (data.data && data.data.accessToken) {
          localStorage.setItem("token", data.data.accessToken)
          navigate('/')
        }
      } else {
        if (data.message) {
          setError(data.message)
        } else {
          setError('Invalid credentials')
        }
      }
    }
  }

  let errorElement = null
  if (error !== '') {
    errorElement = <p className="error-msg">{error}</p>
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login to ShopEasy</h2>
        {errorElement}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <p className="input-label">Email</p>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="login-input"
            />
          </div>
          <div className="input-group">
            <p className="input-label">Password</p>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="login-input"
            />
          </div>
          <button type="submit" className="login-submit-btn">Login</button>
        </form>
        <p className="register-redirect-text">
          Don't have an account? <Link to="/register" className="register-link-anchor">Register here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
