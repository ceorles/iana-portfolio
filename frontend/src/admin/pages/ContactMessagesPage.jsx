import { Mail, MailOpen, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { contactMessageService } from '../../services/contactMessageService'
import styles from './ContactMessagesPage.module.css'

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    const data = await contactMessageService.list()
    setMessages(data)
    setLoading(false)
  }

  async function toggleRead(message) {
    await contactMessageService.markRead(message.id, !message.is_read)
    load()
  }

  async function handleDelete(message) {
    if (!window.confirm(`Delete the message from "${message.name}"?`)) return
    await contactMessageService.remove(message.id)
    load()
  }

  function toggleExpand(message) {
    setExpandedId((prev) => (prev === message.id ? null : message.id))
    if (!message.is_read) toggleRead(message)
  }

  return (
    <div>
      <h1 className={styles.title}>Contact Messages</h1>
      <p className={styles.description}>Messages submitted through the public contact form.</p>

      {loading && <p className={styles.state}>Loading…</p>}

      {!loading && !messages.length && <p className={styles.state}>No messages yet.</p>}

      {!loading && messages.length > 0 && (
        <ul className={styles.list}>
          {messages.map((message) => (
            <li key={message.id} className={`${styles.item} ${!message.is_read ? styles.unread : ''}`}>
              <button type="button" className={styles.summary} onClick={() => toggleExpand(message)}>
                <span className={styles.statusIcon}>
                  {message.is_read ? <MailOpen size={16} /> : <Mail size={16} />}
                </span>
                <span className={styles.summaryText}>
                  <strong>{message.name}</strong>
                  <span>{message.email}</span>
                </span>
                <span className={styles.date}>
                  {new Date(message.created_at).toLocaleDateString()}
                </span>
              </button>

              {expandedId === message.id && (
                <div className={styles.detail}>
                  <p>{message.message}</p>
                  <div className={styles.detailActions}>
                    <button type="button" className="btn btn-outline" onClick={() => toggleRead(message)}>
                      Mark as {message.is_read ? 'unread' : 'read'}
                    </button>
                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(message)}
                    >
                      <Trash2 size={15} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
