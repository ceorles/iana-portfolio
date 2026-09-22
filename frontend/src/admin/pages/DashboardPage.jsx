import { Eye, Mail, MousePointerClick, Trophy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { analyticsService } from '../../services/analyticsService'
import styles from './DashboardPage.module.css'

export default function DashboardPage() {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    analyticsService
      .summary()
      .then(setSummary)
      .finally(() => setLoading(false))
  }, [])

  const cards = [
    { label: 'Portfolio views', value: summary?.page_views, icon: Eye },
    { label: 'Project clicks', value: summary?.project_clicks, icon: MousePointerClick },
    { label: 'Contact messages', value: summary?.contact_messages, icon: Mail },
    {
      label: 'Popular project',
      value: summary?.popular_project?.project__title || '—',
      icon: Trophy,
      isText: true,
    },
  ]

  return (
    <div>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.description}>A quick look at portfolio activity.</p>

      {loading && <p className={styles.state}>Loading…</p>}

      {!loading && (
        <>
          <div className={styles.grid}>
            {cards.map((card) => (
              <div key={card.label} className={styles.card}>
                <span className={styles.iconWrap}>
                  <card.icon size={18} />
                </span>
                <span className={styles.cardValue}>{card.isText ? card.value : card.value ?? 0}</span>
                <span className={styles.cardLabel}>{card.label}</span>
              </div>
            ))}
          </div>

          {summary?.unread_messages > 0 && (
            <Link to="/admin/contact-messages" className={styles.unreadBanner}>
              You have {summary.unread_messages} unread message
              {summary.unread_messages === 1 ? '' : 's'}.
            </Link>
          )}
        </>
      )}
    </div>
  )
}
