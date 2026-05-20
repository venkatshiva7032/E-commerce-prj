import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './ProductDetails.css'

const ProductDetails = (props) => {
  const { addToCart } = props
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error("Failed to fetch product details:", error)
      } finally {
        setLoading(false)
      }
    }
    getProduct()
  }, [id])

  if (loading) {
    return (
      <div className="loader-container">
        <h2 className="loading-text">Loading Product Details...</h2>
      </div>
    )
  } else if (product === null) {
    return (
      <div className="product-details-container">
        <h2 className="error-msg">Product not found</h2>
        <Link to="/products">
          <button className="back-btn">Back to Catalog</button>
        </Link>
      </div>
    )
  } else {
    return (
      <div className="product-details-container">
        <div className="product-details-card">
          <div className="details-image-section">
            <div className="image-wrapper">
              <img src={product.thumbnail} alt={product.title} className="details-image" />
            </div>
          </div>
          <div className="details-info-section">
            <p className="details-badge">{product.category.toUpperCase()}</p>
            <h2 className="details-title">{product.title}</h2>
            <div className="details-meta">
              <p className="details-rating">★ {(product.rating || 4.5)} Rating</p>
              <p className="details-stock">In Stock ({product.stock || 12} units remaining)</p>
            </div>
            <p className="details-price">${product.price}</p>
            <div className="details-divider"></div>
            <h4 className="section-label">Product Overview</h4>
            <p className="details-description">{product.description}</p>
            <div className="details-divider"></div>
            <div className="details-actions">
              <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                Add to Shopping Cart
              </button>
              <Link to="/products">
                <button className="back-btn">Back to Products</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDetails
