import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'

import { useFetch } from '../../hooks/useFetch'
import { analyticsService } from '../../services/analyticsService'
import { projectService } from '../../services/projectService'
import styles from './Projects.module.css'

export default function Projects() {
  const { data: projects, loading } = useFetch(() => projectService.list(), [], [])

  function handleProjectClick(project) {
    analyticsService.track('project_click', project.id)
  }

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className="container">
        <p className="eyebrow">
          <span className="eyebrow-index">04</span>Projects
        </p>
        <h2 className="section-title">Things I&apos;ve built</h2>
        <p className="section-lead">
          A mix of coursework and personal builds. Sample projects are marked and will be
          replaced with real work over time.
        </p>

        {!loading && !projects?.length && (
          <p className={styles.empty}>Projects will be listed here soon.</p>
        )}

        <div className={styles.list}>
          {projects?.map((project, index) => (
            <article
              key={project.id}
              className={`${styles.row} ${index % 2 === 1 ? styles.rowReverse : ''}`}
            >
              <div className={styles.media}>
                {project.thumbnail ? (
                  <img src={project.thumbnail} alt={project.title} loading="lazy" />
                ) : (
                  <div className={styles.mediaFallback} aria-hidden="true">
                    {project.title.slice(0, 2).toUpperCase()}
                  </div>
                )}
                {project.is_sample && <span className={styles.sampleBadge}>Sample</span>}
              </div>

              <div className={styles.body}>
                <span className={styles.rowIndex}>{String(index + 1).padStart(2, '0')}</span>
                <div className={styles.titleRow}>
                  <h3 className={styles.title}>{project.title}</h3>
                  {project.year && <span className={styles.year}>{project.year}</span>}
                </div>
                <p className={styles.desc}>{project.short_description}</p>

                {project.technologies?.length > 0 && (
                  <ul className={styles.techList}>
                    {project.technologies.map((tech) => (
                      <li key={tech} className="tag">
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}

                <div className={styles.links}>
                  {project.project_url ? (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkBtn}
                      onClick={() => handleProjectClick(project)}
                    >
                      Visit <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span className={styles.noLink}>No live link yet</span>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkBtn}
                    >
                      Code <FaGithub size={14} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
