import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Success from './pages/Success'
import ProtectedRoute from './routes/ProtectedRoute'

const App = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      return JSON.parse(savedCart)
    }
    return []
  })

  useEffect(() => {
    document.title = 'ShopEasy'
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    let newCart = [...cart]
    let found = false
    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].id === product.id) {
        newCart[i].quantity = newCart[i].quantity + 1
        found = true
      }
    }
    if (found === false) {
      product.quantity = 1
      newCart.push(product)
    }
    setCart(newCart)
  }

  const removeFromCart = (productId) => {
    let newCart = cart.filter((item) => item.id !== productId)
    setCart(newCart)
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <BrowserRouter>
      <Navbar cartCount={cart.length} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/products" 
            element={
              <ProtectedRoute>
                <Products addToCart={addToCart} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProtectedRoute>
                <ProductDetails addToCart={addToCart} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart cart={cart} removeFromCart={removeFromCart} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout cart={cart} clearCart={clearCart} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/success" 
            element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
