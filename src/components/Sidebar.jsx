import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="e-side">
      <div className="e-brand">Embun Admin</div>
      <NavLink to="/admin" end>Dashboard</NavLink>
      <NavLink to="/admin/about">About</NavLink>
      <NavLink to="/" className="e-store">Lihat toko</NavLink>
    </aside>
  )
}