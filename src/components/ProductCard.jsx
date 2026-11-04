import { Link } from 'react-router-dom'
import ProductImage from './ProductImage'
import { useCart } from '../context/CartContext'
import { formatRupiah } from '../utils/format'

// Props: p (data produk)
export default function ProductCard({ p }) {
  const { addToCart } = useCart()

  return (
    <article className="e-card">
      <div className="e-pic">
        <ProductImage product={p} bottleHeight={150} />
      </div>
      <div className="e-body">
        <span className="e-muted">{p.category}</span>
        <h3>{p.name}</h3>
        <p className="e-price">{formatRupiah(p.price)}</p>
        <div className="e-row">
          <Link to={`/produk/${p.id}`}>Lihat Detail</Link>
          {/* Conditional rendering: tombol berubah jika stok habis */}
          {p.stock === 0 ? (
            <button className="e-btn e-small" disabled>Stok habis</button>
          ) : (
            <button className="e-btn e-small" onClick={() => addToCart(p)}>Add to Cart</button>
          )}
        </div>
      </div>
    </article>
  )
}