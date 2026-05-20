import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Register.css'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    
    setError('')
    
    if (name === '') {
      setError('Please fill all fields')
    } else if (email === '') {
      setError('Please fill all fields')
    } else if (password === '') {
      setError('Please fill all fields')
    } else {
      const userDetails = {
        username: name,
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
        "https://login-and-registration-58by.onrender.com/api/v1/user/register",
        options
      )

      const data = await response.json()
      console.log(data)

      if (response.ok) {
        navigate('/login')
      } else {
        if (data.message) {
          setError(data.message)
        } else {
          setError('Registration failed')
        }
      }
    }
  }

  let errorElement = null
  if (error !== '') {
    errorElement = <p className="error-msg">{error}</p>
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Register for ShopEasy</h2>
        {errorElement}
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <p className="input-label">Name</p>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="register-input"
            />
          </div>
          <div className="input-group">
            <p className="input-label">Email</p>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="register-input"
            />
          </div>
          <div className="input-group">
            <p className="input-label">Password</p>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="register-input"
            />
          </div>
          <button type="submit" className="register-submit-btn">Register</button>
        </form>
        <p className="login-redirect-text">
          Already have an account? <Link to="/login" className="login-link-anchor">Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
