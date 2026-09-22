import { ArrowUpRight } from 'lucide-react'

import { useFetch } from '../../hooks/useFetch'
import { serviceOfferingService } from '../../services/serviceOfferingService'
import { getContentIcon } from '../../utils/icons'
import styles from './Services.module.css'

export default function Services() {
  const { data: services, loading } = useFetch(
    () => serviceOfferingService.list({ is_active: true }),
    [],
    []
  )

  return (
    <section id="services" className={`section ${styles.services}`}>
      <div className="container">
        <p className="eyebrow">
          <span className="eyebrow-index">02</span>Services
        </p>
        <h2 className="section-title">What I can help with</h2>
        <p className="section-lead">A mix of technical and creative work I enjoy taking on.</p>

        {!loading && !services?.length && (
          <p className={styles.empty}>Services will be listed here soon.</p>
        )}

        <ul className={styles.list}>
          {services?.map((service, index) => {
            const Icon = getContentIcon(service.icon_name)
            return (
              <li key={service.id} className={styles.row}>
                <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.iconWrap}>
                  <Icon size={19} />
                </span>
                <div className={styles.rowBody}>
                  <h3 className={styles.title}>{service.title}</h3>
                  <p className={styles.desc}>{service.description}</p>
                </div>
                <ArrowUpRight size={18} className={styles.rowArrow} aria-hidden="true" />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
