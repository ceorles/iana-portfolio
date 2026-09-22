import { useEffect, useState } from 'react'

import { userService } from '../../services/userService'
import styles from './UsersPage.module.css'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userService.list().then((data) => {
      setUsers(data)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <h1 className={styles.title}>Users</h1>
      <p className={styles.description}>
        Staff accounts with access to this dashboard. Manage passwords and new accounts from the
        Django admin.
      </p>

      {loading && <p className={styles.state}>Loading…</p>}

      {!loading && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Superuser</th>
                <th>Last login</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email || '—'}</td>
                  <td>{user.is_superuser ? 'Yes' : 'No'}</td>
                  <td>{user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
