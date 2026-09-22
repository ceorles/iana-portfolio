import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Sidebar from './Sidebar'
import styles from './AdminLayout.module.css'

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className={styles.layout}>
      <div className={`${styles.sidebarWrap} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
      </div>

      {isSidebarOpen && (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close sidebar"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={styles.content}>
        <header className={styles.topbar}>
          <button
            type="button"
            className={styles.menuToggle}
            aria-label="Toggle sidebar"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span>Admin Dashboard</span>
        </header>

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
