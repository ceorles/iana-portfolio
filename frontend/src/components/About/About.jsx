import Education from '../Education/Education'
import Experience from '../Experience/Experience'
import { useFetch } from '../../hooks/useFetch'
import { profileService } from '../../services/profileService'
import styles from './About.module.css'

export default function About() {
  const { data: profiles } = useFetch(() => profileService.list({ is_active: true }), [], [])
  const profile = profiles?.[0]

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <p className="eyebrow">
          <span className="eyebrow-index">01</span>About
        </p>
        <h2 className="section-title">A little about me</h2>
        <p className="section-lead">
          Where I&apos;m from, what I study, and how I got into building software.
        </p>

        <div className={styles.layout}>
          <div className={styles.introCol}>
            <p className={styles.aboutText}>
              {profile?.about ||
                'A student developer focused on building software end to end — from the interface someone clicks on to the logic running behind it.'}
            </p>
          </div>

          <div className={styles.timelineCol}>
            <Education />
            <Experience />
          </div>
        </div>
      </div>
    </section>
  )
}
