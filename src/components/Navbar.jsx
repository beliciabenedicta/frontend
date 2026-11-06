import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { count } = useCart();
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <nav className="bg-[#3b82f6] px-8 py-4 flex justify-end items-center text-white shadow-md">
      {!isAdmin && (
        <div className="flex items-center space-x-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `hover:text-blue-200 transition ${
                isActive ? "text-white font-semibold underline underline-offset-4" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex items-center gap-1 hover:text-blue-200 transition ${
                isActive ? "text-white font-semibold underline underline-offset-4" : ""
              }`
            }
          >
            <span>Keranjang</span>
            {count > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-1">
                {count}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              `hover:text-blue-200 transition ${
                isActive ? "text-white font-semibold underline underline-offset-4" : ""
              }`
            }
          >
            Checkout
          </NavLink>
        </div>
      )}
    </nav>
  );
}