import { LogOut } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

import { navItems } from '../config/navItems'
import { useAuth } from '../context/useAuth'
import styles from './Sidebar.module.css'

export default function Sidebar({ onNavigate }) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/admin/login')
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        iana<span className={styles.brandDot}>.</span>
        <span className={styles.brandTag}>admin</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            onClick={onNavigate}
          >
            <item.icon size={17} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <span className={styles.username}>{user?.username}</span>
        <button type="button" className={styles.logout} onClick={handleLogout}>
          <LogOut size={16} /> Log out
        </button>
      </div>
    </aside>
  )
}
