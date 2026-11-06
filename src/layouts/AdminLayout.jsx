import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const link = ({ isActive }) =>
    `block px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-100 text-blue-600 font-semibold"
        : "text-gray-600 hover:bg-blue-50"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Header */}
      <header className="bg-white border-b border-blue-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">
            Admin Panel
          </h1>
          <p className="text-gray-500 text-xs">
            Kelola data aplikasi kamu
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-700 text-sm">Halo, Ibel 👋</span>
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            I
          </div>
        </div>
      </header>

      {/* Sidebar + Isi Halaman */}
      <div className="flex flex-1">

        {/* Sidebar */}
        <aside className="w-56 bg-white p-4 space-y-1 border-r border-gray-100">

          <NavLink to="/admin/dashboard" className={link}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/product" className={link}>
            Product
          </NavLink>

          <NavLink to="/admin/about" className={link}>
            About
          </NavLink>

        </aside>

        {/* Isi Halaman / Konten Utama */}
        <main className="flex-1 p-6 bg-gray-50/30">
          <Outlet />
        </main>

      </div>

    </div>
  );
}