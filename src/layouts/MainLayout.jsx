import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer className="e-footer">© 2026 Embun Skincare | Version 1.0</footer>
    </>
  )
}