// Props: query, onQueryChange, category, onCategoryChange, categories
export default function SearchBar({ query, onQueryChange, category, onCategoryChange, categories }) {
  return (
    <div className="e-search">
      <input
        type="search"
        placeholder="Cari produk..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        aria-label="Cari produk"
      />
      <select value={category} onChange={(e) => onCategoryChange(e.target.value)} aria-label="Kategori">
        <option value="">Semua Kategori</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  )
}