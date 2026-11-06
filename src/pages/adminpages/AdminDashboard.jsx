import { Link } from "react-router-dom";
import { useProducts } from "../../utils/ProductContext";

export default function AdminDashboard() {
  const { products, isLoading } = useProducts();

  const totalProduk = products.length;
  const stokHabis = products.filter((p) => Number(p.stock) === 0).length;
  const totalStok = products.reduce((sum, p) => sum + Number(p.stock), 0);

  const stats = [
    { label: "Total Produk", value: totalProduk },
    { label: "Total Stok", value: totalStok },
    { label: "Stok Habis", value: stokHabis },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-serif font-bold text-gray-800">
        Dashboard Admin
      </h1>

      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition hover:shadow-md"
            >
              <p className="text-gray-500 text-sm mb-1">{s.label}</p>
              <p className="text-3xl font-bold text-blue-600">{s.value}</p>
            </div>
          ))}
        </div>
      )}

      <div>
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition"
        >
          Kelola produk &rarr;
        </Link>
      </div>
    </div>
  );
}