import { useEffect, useState } from 'react'
import { fetchProducts } from '../services/api.js'
import { formatCurrency } from '../utils/format.js'
import { useAppContext } from '../store/useAppContext.jsx'

const LOW_STOCK_THRESHOLD = 120

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useAppContext()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))]

  const lowStockProducts = products.filter((product) => product.stock <= LOW_STOCK_THRESHOLD)

  const filteredProducts = products.filter((p) => {
    const matchesCategory = category === 'all' || p.category === category
    const q = search.trim().toLowerCase()
    if (!q) return matchesCategory

    const hay = `${p.sku} ${p.name} ${p.fabric || ''} ${p.color || ''} ${p.material || ''}`.toLowerCase()
    return matchesCategory && hay.includes(q)
  })

  function handleRestock(sku) {
    setProducts((current) =>
      current.map((product) =>
        product.sku === sku ? { ...product, stock: product.stock + 80 } : product,
      ),
    )
  }

  return (
    <section className="page page-products">
      <div className="page-heading">
        <div>
          <h2>Products</h2>
          <p>Manage your inventory and stock levels.</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className="search-box" style={{ width: 260 }}>
            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: '0.65rem 0.9rem', borderRadius: 8, border: '1px solid var(--border)' }}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All categories' : c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>

          <button className="primary-button">Add new product</button>
        </div>
      </div>

      <div className="stock-alert-banner">
        <div>
          <strong>{lowStockProducts.length}</strong> low stock item{lowStockProducts.length === 1 ? '' : 's'}
        </div>
        {lowStockProducts.length > 0 ? (
          <span>Restock these products soon to avoid inventory shortages.</span>
        ) : (
          <span>All product stock levels are healthy.</span>
        )}
      </div>

      {loading ? (
        <div className="page-loading">Loading products...</div>
      ) : (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Name</th>
                <th>Category</th>
                <th>Fabric</th>
                <th>Image</th>
                <th>Color</th>
                <th>Material</th>
                <th>GSM</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const isLow = product.stock <= LOW_STOCK_THRESHOLD
                return (
                  <tr key={product.sku} className={isLow ? 'low-stock-row' : undefined}>
                    <td>{product.sku}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.fabric}</td>
                    <td>
                      {product.image ? (
                        <img src={product.image} alt={product.name} style={{ width: 80, height: 'auto', borderRadius: 8 }} />
                      ) : (
                        '—'
                      )}
                    </td>
                    <td>{product.color}</td>
                    <td>{product.material}</td>
                    <td>{product.gsm}</td>
                    <td>
                      <span className={`stock-pill ${isLow ? 'stock-low' : 'stock-ok'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td>{formatCurrency(product.price)}</td>
                    <td>
                      <div className="product-actions">
                        <button type="button" className="secondary-button" onClick={() => addToCart(product)}>
                          Add to cart
                        </button>
                        <button type="button" className="secondary-button" onClick={() => handleRestock(product.sku)}>
                          Restock
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
