import { useState } from 'react'
import SearchBar from '../../components/SearchBar'
import ProductCard from '../../components/ProductCard'
import Bottle from '../../components/Bottle'
import { products, categories } from '../../utils/data'

export default function Dashboard() {
  // useState: kata kunci pencarian dan kategori
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')

  const filtered = products.filter(
    (item) =>
      (category === '' || item.category === category) &&
      item.name.toLowerCase().includes(query.trim().toLowerCase())
  )

  return (
    <>
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
      />

      <header className="e-hero">
        <div>
          <h1>Kulit tenang, langkah sederhana.</h1>
          <p>Skincare harian untuk kulit tropis. Ringan, tanpa pewangi tambahan, cukup lima langkah dari pagi sampai malam.</p>
          <a className="e-btn" href="#produk" style={{ color: '#fff' }}>Belanja sekarang</a>
        </div>
        <div className="e-shelf" aria-hidden="true">
          <Bottle type="pump" color="#9CC7EA" height={190} />
          <Bottle type="dropper" color="#7DB4E6" height={230} />
          <Bottle type="tube" color="#BFDDF5" height={170} />
          <Bottle type="jar" color="#CFE5F7" height={190} />
        </div>
      </header>

      <main className="e-main" id="produk">
        <h2>Produk Pilihan</h2>
        {/* Conditional rendering: hasil kosong vs ada produk */}
        {filtered.length === 0 ? (
          <div className="e-empty">Produk tidak ditemukan. Coba kata kunci lain atau pilih Semua Kategori.</div>
        ) : (
          <div className="e-grid">
            {filtered.map((item) => (
              // props untuk mengirim data produk ke komponen ProductCard
              <ProductCard key={item.id} p={item} />
            ))}
          </div>
        )}
      </main>
    </>
  )
}