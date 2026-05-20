import { Link } from 'react-router-dom'
import './ProductCard.css'

const ProductCard = (props) => {
  const { product, addToCart } = props

  const shortDescription = product.description 
    ? (product.description.length > 42 ? product.description.substring(0, 42) + '...' : product.description)
    : 'Premium high-quality item.'

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.thumbnail} alt={product.title} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-short-desc">{shortDescription}</p>
        <div className="product-meta">
          <p className="product-price">${product.price}</p>
          <p className="product-rating">★ {(product.rating || 4.5)}</p>
        </div>
        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="view-btn">View Details</Link>
          <button className="add-btn" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
