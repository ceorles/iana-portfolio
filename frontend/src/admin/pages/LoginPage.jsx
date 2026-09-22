import { Loader2, Lock } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/useAuth'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to="/admin" replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(form.username, form.password)
      navigate('/admin')
    } catch {
      setError('Invalid username or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.iconWrap}>
          <Lock size={20} />
        </div>
        <h1 className={styles.title}>iana. admin</h1>
        <p className={styles.subtitle}>Sign in to manage portfolio content.</p>

        <label className={styles.field}>
          <span>Username</span>
          <input
            type="text"
            required
            autoFocus
            value={form.username}
            onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
          />
        </label>

        <label className={styles.field}>
          <span>Password</span>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          />
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <Loader2 size={16} className={styles.spin} /> : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
