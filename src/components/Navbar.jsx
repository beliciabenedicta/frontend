import { NavLink, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <nav className="e-nav">
      <Link to="/" className="e-brand">Embun</Link>
      <div className="e-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/keranjang">
          Keranjang
          {/* Conditional rendering: badge hanya muncul jika keranjang berisi */}
          {totalItems > 0 && <span className="e-badge">{totalItems}</span>}
        </NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
      </div>
    </nav>
  )
}