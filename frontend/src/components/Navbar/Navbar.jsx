import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { navLinks } from '../../data/navLinks'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('#home')

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveHref(`#${visible.target.id}`)
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.1, 0.25, 0.5] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  function handleLinkClick(href) {
    setIsOpen(false)
    setActiveHref(href)
  }

  return (
    <>
      <a href="#home" className={styles.brandMark} onClick={() => handleLinkClick('#home')}>
        <span className={styles.brandDot} aria-hidden="true" />
        iana<span className={styles.brandSuffix}>.</span>
      </a>

      <nav className={styles.dock} aria-label="Primary">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`${styles.dockLink} ${activeHref === link.href ? styles.active : ''}`}
            onClick={() => handleLinkClick(link.href)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className={styles.mobileControl}>
        <button
          type="button"
          className={styles.mobileToggle}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav
          className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}
          aria-label="Mobile"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeHref === link.href ? styles.active : ''}
              onClick={() => handleLinkClick(link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
