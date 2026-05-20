import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import heroImg from '../assets/ecommerce_hero.png'
import './Home.css'

const Home = (props) => {
  const { addToCart } = props
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=9')
        const data = await response.json()
        setProducts(data.products || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchHomeProducts()
  }, [])

  const featuredProducts = products.slice(0, 3)
  const trendingProducts = products.slice(3, 6)
  const bestOffers = products.slice(6, 9)

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to ShopEasy</h1>
          <p className="hero-desc">
            Discover premium gadgets, apparel, and luxury accessories at unbeatable prices.
          </p>
          <Link to="/products">
            <button className="hero-btn">Shop Now</button>
          </Link>
        </div>
        <div className="hero-image-container">
          <img src={heroImg} alt="ShopEasy Premium Catalog" className="hero-img" />
        </div>
      </div>

      {/* Products Sections */}
      {loading ? (
        <div className="home-loader">
          <h2 className="home-loader-title">Loading featured offers...</h2>
        </div>
      ) : (
        <div className="home-product-sections">
          
          {/* Section A: Featured Products */}
          <div className="home-section-wrapper">
            <div className="section-header">
              <h2 className="section-title">Featured Products</h2>
              <div className="section-divider"></div>
              <p className="section-desc">Exclusive limited-time savings on our top-rated arrivals.</p>
            </div>
            <div className="products-row">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
          </div>

          {/* Section B: Trending Products */}
          <div className="home-section-wrapper">
            <div className="section-header">
              <h2 className="section-title">Trending Products</h2>
              <div className="section-divider"></div>
              <p className="section-desc">Customer favorites that define the standard of excellence.</p>
            </div>
            <div className="products-row">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
          </div>

          {/* Section C: Offers Section */}
          <div className="home-section-wrapper">
            <div className="offers-banner">
              <h2 className="offers-banner-title">Exclusive Offers & Discounts!</h2>
              <p className="offers-banner-desc">Get special price cuts on these top-rated items. Valid this week only.</p>
            </div>
            <div className="products-row">
              {bestOffers.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default Home
