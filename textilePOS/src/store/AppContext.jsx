import { useState } from 'react'
import { AppContext } from './AppContextContext.jsx'

function getStoredCart() {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]')
  } catch {
    return []
  }
}

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    return null
  }
}

export function AppContextProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [cart, setCart] = useState(getStoredCart)
  const [user, setUser] = useState(getStoredUser)

  function persistCart(nextCart) {
    const actualCart = typeof nextCart === 'function' ? nextCart(cart) : nextCart
    setCart(actualCart)
    localStorage.setItem('cart', JSON.stringify(actualCart))
  }

  function addToCart(product) {
    persistCart((prev) => {
      const existing = prev.find((item) => item.sku === product.sku)
      if (existing) {
        return prev.map((item) =>
          item.sku === product.sku
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function updateCartItem(sku, quantity) {
    persistCart((prev) =>
      prev
        .map((item) => (item.sku === sku ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  function removeFromCart(sku) {
    persistCart((prev) => prev.filter((item) => item.sku !== sku))
  }

  function clearCart() {
    persistCart([])
  }

  function login(userData, token) {
    localStorage.setItem('authToken', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  function logout() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        cart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
