import { Award, ExternalLink } from 'lucide-react'

import { useFetch } from '../../hooks/useFetch'
import { certificationService } from '../../services/certificationService'
import { formatMonthYear } from '../../utils/formatDate'
import styles from './Certifications.module.css'

export default function Certifications() {
  const { data: certifications, loading } = useFetch(() => certificationService.list(), [], [])

  if (loading) return null

  return (
    <section id="certifications" className={`section ${styles.certifications}`}>
      <div className="container">
        <p className="eyebrow">
          <span className="eyebrow-index">05</span>Certifications
        </p>
        <h2 className="section-title">Credentials</h2>
        <p className="section-lead">Badges and certificates earned along the way.</p>

        {certifications?.length ? (
          <div className={styles.grid}>
            {certifications.map((cert) => (
              <article key={cert.id} className={styles.card}>
                <div className={styles.iconWrap}>
                  <Award size={20} />
                </div>
                <h3 className={styles.title}>{cert.title}</h3>
                {cert.issuer && <p className={styles.issuer}>{cert.issuer}</p>}
                {cert.issue_date && (
                  <p className={styles.date}>{formatMonthYear(cert.issue_date)}</p>
                )}
                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    View credential <ExternalLink size={13} />
                  </a>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <Award size={20} />
            <p>No certifications listed yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}
