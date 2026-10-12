import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cart, setCart] = useState([])
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    fetch('http://localhost:5005/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load products')
        }
        return response.json()
      })
      .then((data) => {
        setProducts(
          data.map((product) => ({
            ...product,
            id: product._id || product.id,
            emoji:
              product.category === 'Electronics'
                ? '🎧'
                : product.category === 'Footwear'
                  ? '👟'
                  : product.category === 'Clothing'
                    ? '👕'
                    : '🛍️',
            color: '#e9e6df',
          })),
        )
        setError('')
      })
      .catch(() => {
        setError(
          'Could not load products. Make sure the backend is running on port 5005.',
        )
      })
      .finally(() => setLoading(false))
  }, [])

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...current, { ...product, quantity: 1 }]
    })
  }

  function changeQuantity(id, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const categories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === 'All' || product.category === category
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return (
    <div className="app">
      <div className="announcement">
        NEW SEASON, NEW FINDS — DISCOVER YOUR STYLE
      </div>

      <header className="navbar">
        <a className="logo" href="#home">
          shop<span>sphere.</span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#products">Shop</a>
          <a href="#about">Our Story</a>
        </nav>

        <button
          className="cart-count"
          onClick={() => setCartOpen(!cartOpen)}
        >
          Bag ({cartCount})
        </button>
      </header>

      {cartOpen && (
        <section className="cart-panel">
          <div className="cart-panel-heading">
            <h2>Your Shopping Bag</h2>
            <button onClick={() => setCartOpen(false)}>Close ✕</button>
          </div>

          {cart.length === 0 ? (
            <p>Your bag is empty. Add something you love!</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <span className="cart-item-emoji">{item.emoji}</span>

                  <div className="cart-item-info">
                    <strong>{item.name}</strong>
                    <span>
                      ₹{Number(item.price).toLocaleString('en-IN')}
                    </span>

                    <div className="quantity-controls">
                      <button
                        onClick={() => changeQuantity(item.id, -1)}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => changeQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="remove-item"
                    onClick={() =>
                      setCart((current) =>
                        current.filter(
                          (product) => product.id !== item.id,
                        ),
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="cart-total">
                <strong>Total</strong>
                <strong>
                  ₹{cartTotal.toLocaleString('en-IN')}
                </strong>
              </div>

              <button
                className="checkout-button"
                onClick={() =>
                  alert(
                    'Checkout demo only. Online payment is not connected yet.',
                  )
                }
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </section>
      )}

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">THE EVERYDAY EDIT · 2026</p>

            <h1>
              Find your
              <br />
              everyday <em>essential.</em>
            </h1>

            <p className="hero-description">
              Thoughtfully picked products for the way you live, work and
              play. Good design. Great prices. All in one place.
            </p>

            <a className="shop-button" href="#products">
              Explore collection ↗️
            </a>

            <div className="hero-note">
              ✦ CURATED FOR YOU · MADE FOR EVERYDAY
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-circle"></div>
            <div className="hero-emoji">🛍️</div>
            <div className="floating-tag">
              YOUR NEW
              <br />
              FAVOURITES ✦
            </div>
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE COLLECTION</p>
              <h2>
                Good things, <em>picked for you.</em>
              </h2>
            </div>

            <p className="product-count">
              {loading ? 'Loading...' : `${filteredProducts.length} products`}
            </p>
          </div>

          <div className="shop-tools">
            <div className="filters">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? 'filter active' : 'filter'}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <input
              className="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          {loading && <p>Loading products...</p>}

          {error && <p className="empty">{error}</p>}

          {!loading && !error && (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div
                    className="product-image"
                    style={{ backgroundColor: product.color }}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <span>{product.emoji}</span>
                    )}

                    <button
                      className="quick-add"
                      onClick={() => addToCart(product)}
                    >
                      + Add to bag
                    </button>
                  </div>

                  <p className="product-category">{product.category}</p>
                  <h3>{product.name}</h3>
                  <p className="price">
                    ₹{Number(product.price).toLocaleString('en-IN')}
                  </p>
                </article>
              ))}
            </div>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <p className="empty">
              No products found. Try another search.
            </p>
          )}
        </section>

        <section className="about" id="about">
          <p className="eyebrow">A LITTLE ABOUT US</p>

          <h2>
            Less scrolling.
            <br />
            <em>Better finding.</em>
          </h2>

          <p>
            ShopSphere brings everyday favourites together in one simple
            shopping experience.
          </p>
        </section>
      </main>

      <footer>
        <a className="logo" href="#home">
          shop<span>sphere.</span>
        </a>

        <p>Thoughtful finds. Everyday value.</p>

        <div className="footer-cart">
          Your bag: {cartCount} items · ₹
          {cartTotal.toLocaleString('en-IN')}
        </div>
      </footer>
    </div>
  )
}