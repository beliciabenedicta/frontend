const fitur = [
  'Katalog produk skincare dengan pencarian dan filter kategori',
  'Halaman detail produk',
  'Keranjang belanja dengan tambah, kurang, dan hapus barang',
  'Checkout dengan form pemesanan',
  'Dashboard admin untuk mengelola stok produk',
]

const konsep = [
  { nama: 'React Component', lokasi: 'Navbar, ProductCard, SearchBar, Sidebar, Bottle' },
  { nama: 'Passing Props', lokasi: 'Dashboard mengirim data ke ProductCard dan SearchBar' },
  { nama: 'Conditional Rendering', lokasi: 'Badge keranjang, tombol stok habis, halaman checkout' },
  { nama: 'useState', lokasi: 'Pencarian, form checkout, stok di admin' },
  { nama: 'useContext', lokasi: 'CartContext untuk keranjang belanja' },
]

const teknologi = ['React', 'Vite', 'React Router', 'Tailwind CSS']

export default function AboutPage() {
  return (
    <>
      <div className="e-welcome">
        <div>
          <h2>Tentang Embun</h2>
          <p>Prototipe toko skincare dengan tema biru pastel, dibuat untuk tugas pemrograman web.</p>
        </div>
        <div className="e-welcome-num">
          <b>v1.0.0</b>
          <span>versi aplikasi</span>
        </div>
      </div>

      <div className="e-panel">
        <h3>Fitur utama</h3>
        <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 6 }}>
          {fitur.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>

      <div className="e-panel">
        <h3>Konsep React yang diterapkan</h3>
        <div className="e-table-wrap">
          <table className="e-table">
            <thead>
              <tr><th>Konsep</th><th>Dipakai di</th></tr>
            </thead>
            <tbody>
              {konsep.map((k) => (
                <tr key={k.nama}>
                  <td><b>{k.nama}</b></td>
                  <td>{k.lokasi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="e-panel">
        <h3>Teknologi</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {teknologi.map((t) => (
            <span key={t} className="e-pill ok">{t}</span>
          ))}
        </div>
      </div>

      <div className="e-panel">
        <h3>Pembuat</h3>
        <p style={{ margin: 0 }}>Nama kamu di sini</p>
        <p className="e-muted" style={{ margin: 0 }}>Mata kuliah Pemrograman Web | 2026</p>
      </div>
    </>
  )
}