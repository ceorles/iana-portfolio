import { Briefcase } from 'lucide-react'

import { useFetch } from '../../hooks/useFetch'
import { experienceService } from '../../services/experienceService'
import { formatDateRange } from '../../utils/formatDate'
import styles from './Experience.module.css'

export default function Experience() {
  const { data: records, loading } = useFetch(() => experienceService.list(), [], [])

  if (loading) return null

  return (
    <div className={styles.wrap}>
      <h3 className={styles.heading}>Experience</h3>

      {records?.length ? (
        <ul className={styles.list}>
          {records.map((record) => (
            <li key={record.id} className={styles.item}>
              <span className={styles.range}>
                {formatDateRange(record.start_date, record.end_date, record.is_current)}
              </span>
              <h4 className={styles.role}>{record.role_title}</h4>
              <p className={styles.org}>
                {record.organization}
                {record.location ? ` · ${record.location}` : ''}
              </p>
              {record.description && <p className={styles.desc}>{record.description}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <Briefcase size={20} />
          <p>No professional experience listed yet.</p>
        </div>
      )}
    </div>
  )
}
