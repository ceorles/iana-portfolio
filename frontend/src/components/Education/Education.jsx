import { MapPin } from 'lucide-react'

import { useFetch } from '../../hooks/useFetch'
import { educationService } from '../../services/educationService'
import { formatYearRange } from '../../utils/formatDate'
import styles from './Education.module.css'

export default function Education() {
  const { data: records, loading } = useFetch(() => educationService.list(), [], [])

  if (loading) return null
  if (!records?.length) return null

  return (
    <div className={styles.wrap}>
      <h3 className={styles.heading}>Education</h3>
      <ol className={styles.timeline}>
        {records.map((record) => (
          <li key={record.id} className={styles.item}>
            <div className={styles.marker} aria-hidden="true" />
            <div className={styles.content}>
              <span className={styles.year}>
                {formatYearRange(record.start_year, record.end_year, record.is_current)}
              </span>
              <h4 className={styles.school}>{record.school_name}</h4>
              <p className={styles.level}>
                {record.program ? `${record.program} · ` : ''}
                {record.level_display}
              </p>
              {record.address && (
                <p className={styles.address}>
                  <MapPin size={14} />
                  {record.maps_url ? (
                    <a href={record.maps_url} target="_blank" rel="noopener noreferrer">
                      {record.address}
                    </a>
                  ) : (
                    <span>{record.address}</span>
                  )}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
