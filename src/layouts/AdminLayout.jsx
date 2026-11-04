import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function AdminLayout() {
  const name = 'ibel'

  return (
    <div className="e-admin">
      <Sidebar />
      <div className="e-admin-main">
        <div className="e-top">
          <div>
            <h1>Embun Admin</h1>
            <p className="e-muted">Kelola penjualan skincare kamu</p>
          </div>
          <div className="e-me">
            Halo, {name}
            <span className="e-avatar">{name[0].toUpperCase()}</span>
          </div>
        </div>
        <div className="e-content">
          <Outlet />
        </div>
        <footer className="e-admin-foot">© 2026 Embun Admin — v1.0.0</footer>
      </div>
    </div>
  )
}