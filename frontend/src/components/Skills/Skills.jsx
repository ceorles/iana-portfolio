import { useFetch } from '../../hooks/useFetch'
import { skillProfileService } from '../../services/skillProfileService'
import { getContentIcon } from '../../utils/icons'
import styles from './Skills.module.css'

export default function Skills() {
  const { data: skillProfiles, loading } = useFetch(() => skillProfileService.list(), [], [])

  return (
    <section id="skills" className={`section ${styles.skills}`}>
      <div className="container">
        <p className="eyebrow">
          <span className="eyebrow-index">03</span>Skills
        </p>
        <h2 className="section-title">Where my strengths are</h2>
        <p className="section-lead">
          A self-assessed look at where I currently stand — always a work in progress.
        </p>

        {!loading && !skillProfiles?.length && (
          <p className={styles.empty}>Skills will be listed here soon.</p>
        )}

        <div className={styles.sheet}>
          {skillProfiles?.map((entry) => {
            const skill = entry.skill_detail
            const Icon = getContentIcon(skill?.icon_name)
            return (
              <div key={entry.id} className={styles.row}>
                <div className={styles.rowTop}>
                  <span className={styles.iconWrap}>
                    <Icon size={16} />
                  </span>
                  <span className={styles.name}>{skill?.name}</span>
                  {skill?.category_display && (
                    <span className="tag">{skill.category_display}</span>
                  )}
                  <span className={styles.value}>{entry.proficiency}</span>
                </div>
                <div className={styles.barTrack} aria-hidden="true">
                  <div className={styles.barFill} style={{ width: `${entry.proficiency}%` }} />
                </div>
                {entry.summary && <p className={styles.summary}>{entry.summary}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
