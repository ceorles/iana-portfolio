import { CheckCircle2, Loader2, Mail, MapPin, Send } from 'lucide-react'
import { useState } from 'react'

import { useFetch } from '../../hooks/useFetch'
import { contactMessageService } from '../../services/contactMessageService'
import { profileService } from '../../services/profileService'
import { socialLinkService } from '../../services/socialLinkService'
import { getSocialIcon } from '../../utils/icons'
import styles from './Contact.module.css'

const initialForm = { name: '', email: '', message: '' }

export default function Contact() {
  const { data: profiles } = useFetch(() => profileService.list({ is_active: true }), [], [])
  const { data: socialLinks } = useFetch(() => socialLinkService.list(), [], [])
  const profile = profiles?.[0]

  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('sending')
    try {
      await contactMessageService.send(form)
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  const activeSocialLinks = (socialLinks || []).filter((link) => link.is_active && link.url)

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className="container">
        <p className="eyebrow">
          <span className="eyebrow-index">06</span>Contact
        </p>
        <h2 className="section-title">Get in touch</h2>
        <p className="section-lead">
          Happy to talk about a project, a collaboration, or anything you&apos;re working on.
        </p>

        <div className={styles.layout}>
          <div className={styles.infoCol}>
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className={styles.infoCard}>
                <span className={styles.infoLabel}>
                  <Mail size={14} /> Email
                </span>
                <p>{profile.email}</p>
              </a>
            )}

            {profile?.location && (
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>
                  <MapPin size={14} /> Location
                </span>
                <p>{profile.location}</p>
              </div>
            )}

            {activeSocialLinks.length > 0 && (
              <div className={styles.socialBlock}>
                <span className={styles.infoLabel}>Elsewhere</span>
                <ul className={styles.socialList}>
                  {activeSocialLinks.map((link) => {
                    const Icon = getSocialIcon(link.platform)
                    return (
                      <li key={link.id}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {Icon && <Icon size={16} />}
                          {link.label || link.platform_display}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.field}>
              <span>Name</span>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </label>

            <label className={styles.field}>
              <span>Email</span>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </label>

            <label className={styles.field}>
              <span>Message</span>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="What would you like to build?"
              />
            </label>

            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? (
                <>
                  Sending <Loader2 size={16} className={styles.spin} />
                </>
              ) : (
                <>
                  Send message <Send size={16} />
                </>
              )}
            </button>

            {status === 'success' && (
              <p className={styles.success}>
                <CheckCircle2 size={16} /> Message sent — thank you, I&apos;ll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className={styles.error}>
                Something went wrong sending your message. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
