import { Link } from 'react-router-dom'
import ProductImage from '../../components/ProductImage'
import { useCart } from '../../context/CartContext'
import { formatRupiah } from '../../utils/format'

export default function Cart() {
  const { items, increase, decrease, removeItem, totalPrice } = useCart()

  return (
    <main className="e-main">
      <h2>Keranjang</h2>
      {/* Conditional rendering: keranjang kosong vs berisi */}
      {items.length === 0 ? (
        <div className="e-empty">
          Keranjang masih kosong. <Link to="/">Pilih produk dulu</Link>
        </div>
      ) : (
        <>
          <div className="e-cart-list">
            {items.map(({ product, qty }) => (
              <div className="e-cart-row" key={product.id}>
                <div className="e-cart-pic">
                  <ProductImage product={product} bottleHeight={56} />
                </div>
                <div className="e-cart-info">
                  <b>{product.name}</b>
                  <span className="e-muted">{formatRupiah(product.price)}</span>
                </div>
                <div className="e-qty">
                  <button onClick={() => decrease(product.id)} aria-label="Kurangi">−</button>
                  <span>{qty}</span>
                  <button onClick={() => increase(product.id)} aria-label="Tambah">+</button>
                </div>
                <b>{formatRupiah(product.price * qty)}</b>
                <button className="e-btn e-ghost e-small" onClick={() => removeItem(product.id)}>Hapus</button>
              </div>
            ))}
          </div>
          <div className="e-total">
            <span>Total</span>
            <b>{formatRupiah(totalPrice)}</b>
            <Link className="e-btn" to="/checkout" style={{ color: '#fff' }}>Lanjut ke checkout</Link>
          </div>
        </>
      )}
    </main>
  )
}