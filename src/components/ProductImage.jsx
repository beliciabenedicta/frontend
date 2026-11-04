import Bottle from './Bottle'

// Props: product (data produk), bottleHeight (tinggi botol cadangan)
export default function ProductImage({ product, bottleHeight = 150 }) {
  // Conditional rendering: pakai gambar jika ada, kalau tidak pakai botol SVG
  if (product.image) {
    const src = product.image.startsWith('http')
      ? product.image
      : import.meta.env.BASE_URL + product.image

    return <img className="e-img" src={src} alt={product.name} />
  }
  return <Bottle type={product.type} color={product.color} height={bottleHeight} />
}