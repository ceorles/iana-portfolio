import { motion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'

import { useFetch } from '../../hooks/useFetch'
import { profileService } from '../../services/profileService'
import { socialLinkService } from '../../services/socialLinkService'
import { getSocialIcon } from '../../utils/icons'
import styles from './Hero.module.css'

export default function Hero() {
  const { data: profiles } = useFetch(() => profileService.list({ is_active: true }), [], [])
  const { data: socialLinks } = useFetch(() => socialLinkService.list(), [], [])

  const profile = profiles?.[0]
  const initials = getInitials(profile?.display_name || profile?.full_name)

  const metaStats = [
    { label: 'Based in', value: profile?.location || 'Lucena City, Philippines' },
    { label: 'Studying', value: profile?.school || 'BSIT' },
    { label: 'Focus', value: 'Dev · Design · Media' },
  ]

  return (
    <section id="home" className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className={styles.kicker}>Portfolio — {new Date().getFullYear()}</p>
          <h1 className={styles.heading}>
            <span className={styles.headingLine}>Hi, I&apos;m</span>
            <span className={styles.headingName}>
              {profile?.display_name || 'Joanne'}
              <span className={styles.headingBracket} aria-hidden="true" />
            </span>
          </h1>
          <p className={styles.intro}>
            {profile?.intro ||
              'IT student who builds web and desktop software, with an eye for photography, design, and video editing.'}
          </p>

          <div className={styles.actions}>
            <a href="#projects" className="btn btn-primary">
              View my work <ArrowDown size={16} />
            </a>
            <a href="#contact" className="btn btn-outline">
              Get in touch <Mail size={16} />
            </a>
          </div>

          {socialLinks?.length > 0 && (
            <ul className={styles.socialRow}>
              {socialLinks.filter((link) => link.is_active).map((link) => {
                const Icon = getSocialIcon(link.platform)
                const hasUrl = Boolean(link.url)
                return (
                  <li key={link.id}>
                    {hasUrl ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label || link.platform}
                        className={styles.socialLink}
                      >
                        {Icon ? <Icon size={16} /> : link.platform}
                      </a>
                    ) : (
                      <span
                        className={`${styles.socialLink} ${styles.socialLinkDisabled}`}
                        title="Link coming soon"
                        aria-hidden="true"
                      >
                        {Icon ? <Icon size={16} /> : link.platform}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </motion.div>

        <motion.div
          className={styles.portraitWrap}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <div className={`${styles.portraitFrame} ${profile?.photo ? styles.hasPhoto : ''}`}>
            {profile?.photo ? (
              <img src={profile.photo} alt={profile.display_name || profile.full_name} />
            ) : (
              <div className={styles.portraitPlaceholder} aria-hidden="true">
                <span>{initials}</span>
              </div>
            )}
            <span className={`${styles.tick} ${styles.tickTl}`} aria-hidden="true" />
            <span className={`${styles.tick} ${styles.tickTr}`} aria-hidden="true" />
            <span className={`${styles.tick} ${styles.tickBl}`} aria-hidden="true" />
            <span className={`${styles.tick} ${styles.tickBr}`} aria-hidden="true" />
          </div>
          <span className={styles.portraitLabel}>{profile?.title || 'IT Student'}</span>
        </motion.div>
      </div>

      <div className={styles.metaStrip}>
        <div className="container">
          <ul className={styles.metaList}>
            {metaStats.map((stat) => (
              <li key={stat.label}>
                <span className={styles.metaLabel}>{stat.label}</span>
                <span className={styles.metaValue}>{stat.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function getInitials(name) {
  if (!name) return 'J'
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}
