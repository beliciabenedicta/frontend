import { useParams, Link } from 'react-router-dom'
import { products } from '../../utils/data'
import { useCart } from '../../context/CartContext'
import { formatRupiah } from '../../utils/format'
import ProductImage from '../../components/ProductImage'
export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const product = products.find((x) => x.id === Number(id))

  return (
    <main className="e-main">
      {/* Conditional rendering: produk tidak ditemukan */}
      {!product ? (
        <div className="e-empty" style={{ marginTop: 24 }}>
          Produk tidak ditemukan. <Link to="/">Kembali ke beranda</Link>
        </div>
      ) : (
        <div className="e-detail" style={{ marginTop: 24 }}>
          <div className="e-detail-pic">
            <ProductImage product={product} bottleHeight={280} />
          </div>
          <div>
            <span className="e-muted">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="e-price big">{formatRupiah(product.price)}</p>
            <p>{product.description}</p>
            <p className="e-muted">
              {product.stock > 0 ? `Stok tersedia: ${product.stock}` : 'Stok sedang habis'}
            </p>
            <button className="e-btn" disabled={product.stock === 0} onClick={() => addToCart(product)}>
              Tambah ke keranjang
            </button>
          </div>
        </div>
      )}
    </main>
  )
}