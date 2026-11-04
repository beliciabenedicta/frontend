import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { formatRupiah } from '../../utils/format'

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const [form, setForm] = useState({ name: '', address: '', payment: 'Transfer Bank' })
  const [done, setDone] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setDone(true)
    clearCart()
  }

  // Conditional rendering bertingkat: sukses -> kosong -> form
  let content
  if (done) {
    content = (
      <div className="e-success">
        <h2>Pesanan diterima</h2>
        <p>Terima kasih, {form.name}. Pesananmu sedang kami siapkan.</p>
        <Link className="e-btn" to="/" style={{ color: '#fff' }}>Belanja lagi</Link>
      </div>
    )
  } else if (items.length === 0) {
    content = (
      <div className="e-empty">
        Belum ada produk untuk di-checkout. <Link to="/">Pilih produk</Link>
      </div>
    )
  } else {
    content = (
      <div className="e-checkout">
        <form onSubmit={handleSubmit} className="e-form">
          <label>Nama lengkap
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>Alamat pengiriman
            <textarea name="address" value={form.address} onChange={handleChange} rows="3" required />
          </label>
          <label>Metode pembayaran
            <select name="payment" value={form.payment} onChange={handleChange}>
              <option>Transfer Bank</option>
              <option>E-Wallet</option>
              <option>Bayar di Tempat</option>
            </select>
          </label>
          <button className="e-btn" type="submit">Buat pesanan</button>
        </form>
        <aside className="e-summary">
          <h3>Ringkasan</h3>
          {items.map(({ product, qty }) => (
            <div className="e-sum-row" key={product.id}>
              <span>{product.name} × {qty}</span>
              <span>{formatRupiah(product.price * qty)}</span>
            </div>
          ))}
          <div className="e-sum-row"><b>Total</b><b>{formatRupiah(totalPrice)}</b></div>
        </aside>
      </div>
    )
  }

  return (
    <main className="e-main">
      <h2>Checkout</h2>
      {content}
    </main>
  )
}