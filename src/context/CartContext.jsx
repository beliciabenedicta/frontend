import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // [{ product, qty }]

  const addToCart = (product) =>
    setItems((prev) => {
      const found = prev.find((i) => i.product.id === product.id)
      return found
        ? prev.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { product, qty: 1 }]
    })

  const increase = (id) =>
    setItems((prev) => prev.map((i) => (i.product.id === id ? { ...i, qty: i.qty + 1 } : i)))

  const decrease = (id) =>
    setItems((prev) =>
      prev.map((i) => (i.product.id === id ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0)
    )

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.product.id !== id))
  const clearCart = () => setItems([])

  const totalItems = items.reduce((s, i) => s + i.qty, 0)
  const totalPrice = items.reduce((s, i) => s + i.qty * i.product.price, 0)

  return (
    <CartContext.Provider
      value={{ items, addToCart, increase, decrease, removeItem, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)