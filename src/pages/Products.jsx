import { useState, useEffect } from 'react'
//import ClipLoader from "react-spinners/ClipLoader";
import ProductCard from '../components/ProductCard'
import './Products.css'

const Products = (props) => {
  const { addToCart } = props
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch('https://dummyjson.com/products?limit=100')
      const data = await response.json()
      setProducts(data.products)
      setLoading(false)
    }
    getProducts()
  }, [])

  let filteredProducts = products

  if (searchTerm !== '') {
    filteredProducts = filteredProducts.filter((product) => {
      return product.title.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }

  if (category !== 'All') {
    filteredProducts = filteredProducts.filter((product) => {
      if (category === 'Smartphones') {
        return product.category === 'smartphones'
      } else if (category === 'Laptops') {
        return product.category === 'laptops'
      } else if (category === 'Men') {
        if (product.category === 'mens-shirts') {
          return true
        } else if (product.category === 'mens-shoes') {
          return true
        } else if (product.category === 'mens-watches') {
          return true
        } else {
          return false
        }
      } else if (category === 'Women') {
        if (product.category === 'womens-dresses') {
          return true
        } else if (product.category === 'womens-shoes') {
          return true
        } else if (product.category === 'womens-watches') {
          return true
        } else if (product.category === 'womens-bags') {
          return true
        } else if (product.category === 'womens-jewellery') {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    })
  }

  let productsContent
  if (loading) {
    productsContent = (
      <div className="loader-container">
        <h1>Loading...</h1>
      </div>
    )
    // productsContent = (
    //   <div className="loader-container">
    //     <ClipLoader color="#0056b3" size={50} />
    //   </div>
    // )

  } else if (filteredProducts.length === 0) {
    productsContent = <h2 className="no-products">No Products Found</h2>
  } else {
    productsContent = (
      <div className="products-grid">
        {filteredProducts.map((product) => {
          return <ProductCard key={product.id} product={product} addToCart={addToCart} />
        })}
      </div>
    )
  }

  return (
    <div className="products-container">
      <div className="filters-section">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          <option value="All">All Categories</option>
          <option value="Smartphones">Smartphones</option>
          <option value="Laptops">Laptops</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>
      </div>

      {productsContent}
    </div>
  )
}

export default Products
