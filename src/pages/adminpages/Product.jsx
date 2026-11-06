import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useProducts } from "../../utils/ProductContext";

const LIMIT = 6;

// Pemetaan gambar yang disesuaikan persis dengan produk pilihan Anda
const GAMBAR_PRODUK = [
  { cari: "clay mask", file: "/facial-wash.jpg" },
  { cari: "calm toner", file: "/toner.jpg" },
  { cari: "toner", file: "/toner.jpg" },
  { cari: "uv shield", file: "/sunscreen.jpg" },
  { cari: "sunscreen", file: "/sunscreen.jpg" },
  { cari: "barrier restore", file: "/cream.jpg" },
  { cari: "barrier repair", file: "/cream.jpg" },
  { cari: "cream", file: "/cream.jpg" },
  { cari: "pelembap", file: "/cream.jpg" },
  { cari: "vitamin c", file: "/serum.jpg" },
  { cari: "essence", file: "/serum.jpg" },
  { cari: "hydrating glow", file: "/serum.jpg" },
  { cari: "dewy hydra", file: "/serum.jpg" },
  { cari: "serum", file: "/serum.jpg" },
  { cari: "niacinamide", file: "/niacinamide.jpg" },
  { cari: "deep purifying", file: "/facial-wash.jpg" },
  { cari: "embun gentle", file: "/facial-wash.jpg" },
  { cari: "cleansing gel", file: "/facial-wash.jpg" },
  { cari: "facial wash", file: "/facial-wash.jpg" },
  { cari: "cleanser", file: "/facial-wash.jpg" },
];

function getImageSrc(p) {
  const nama = (p.name || "").toLowerCase();
  
  const cocok = GAMBAR_PRODUK.find((g) => nama.includes(g.cari));
  if (cocok) {
    return cocok.file;
  }

  const raw = p.img_url || p.image || p.image_url || p.img || p.gambar;
  if (raw && typeof raw === "string" && !raw.includes(" ")) {
    if (/^(https?:)?\/\//.test(raw) || raw.startsWith("/") || raw.startsWith("data:")) {
      return raw;
    }
    return `/${raw}`;
  }

  return "/cream.jpg";
}

export default function Product() {
  const { getProducts, getCategories, deleteProduct } = useProducts();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [filter, setFilter] = useState({
    category_id: "",
    keyword: "",
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", "list", page, filter],
    queryFn: () => getProducts({ page, limit: LIMIT, ...filter }),
    placeholderData: (prev) => prev,
  });

  const items = data?.data ?? [];
  const lastPage = data?.last_page ?? 1;

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setFilter({
      category_id: categoryId,
      keyword: keywordInput,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah kamu yakin ingin menghapus produk ini?")) {
      return;
    }

    try {
      await deleteProduct.mutateAsync(id);

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      toast.success("Produk berhasil dihapus!");

      if (items.length === 1 && page > 1) {
        setPage(page - 1);
      }
    } catch {
      toast.error("Terjadi kesalahan saat menghapus produk.");
    }
  };

  if (isLoading) return <p className="p-6 text-gray-500">Loading...</p>;

  if (isError) return <p className="p-6 text-red-500">Error loading products.</p>;

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-blue-50 p-6">
      <h1 className="text-2xl font-serif font-bold text-gray-800 mb-6">
        Manajemen Produk
      </h1>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <form
          onSubmit={handleSearch}
          className="flex flex-wrap gap-2 items-center flex-1"
        >
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="border border-gray-200 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="Cari produk..."
            className="border border-gray-200 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 md:w-64"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition"
          >
            Cari
          </button>
        </form>

        <Link
          to="/admin/add-product"
          className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition whitespace-nowrap shadow-sm"
        >
          + Tambah Produk
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-50/50 text-gray-700 text-sm border-b border-gray-100">
              <th className="p-3 font-semibold w-12 text-center">#</th>
              <th className="p-3 font-semibold w-24">Image</th>
              <th className="p-3 font-semibold">Nama</th>
              <th className="p-3 font-semibold">Harga</th>
              <th className="p-3 font-semibold w-20">Stok</th>
              <th className="p-3 font-semibold w-28 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm">
            {items.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-400">
                  Tidak ada produk.
                </td>
              </tr>
            )}

            {items.map((p, index) => {
              const gambar = getImageSrc(p);

              return (
                <tr key={p.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-3 text-center text-gray-500 font-medium">
                    {(page - 1) * LIMIT + index + 1}
                  </td>

                  <td className="p-3">
                    <img
                      src={gambar}
                      alt={p.name}
                      className="w-14 h-14 object-cover rounded-lg border border-gray-100 shadow-sm"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/cream.jpg";
                      }}
                    />
                  </td>

                  <td className="p-3 font-medium text-gray-800">
                    {p.name}
                    <br />
                    <small className="text-blue-500 font-normal">
                      #{p.category?.name || "Skincare"}
                    </small>
                  </td>

                  <td className="p-3 text-gray-700 font-medium">
                    Rp. {Number(p.price).toLocaleString("id-ID")}
                  </td>

                  <td className="p-3 text-gray-700 font-medium">{p.stock}</td>

                  <td className="p-3 text-center space-x-3">
                    <Link
                      to={`/admin/edit-product/${p.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="cursor-pointer text-red-600 hover:text-red-800 font-medium hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="rounded-lg px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium disabled:opacity-40 transition"
        >
          Sebelumnya
        </button>

        {Array.from({ length: lastPage }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setPage(n)}
            className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
              n === page
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {n}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
          disabled={page === lastPage}
          className="rounded-lg px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium disabled:opacity-40 transition shadow-sm"
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
}