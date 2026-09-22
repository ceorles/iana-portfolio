import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import ResourceForm from './ResourceForm'
import styles from './ResourceManager.module.css'

export default function ResourceManager({ config }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingRecord, setEditingRecord] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [fieldOptions, setFieldOptions] = useState({})

  useEffect(() => {
    loadRecords()
    loadFieldOptions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config])

  async function loadRecords() {
    setLoading(true)
    setError('')
    try {
      const data = await config.service.list()
      setRecords(data)
    } catch {
      setError('Could not load this data.')
    } finally {
      setLoading(false)
    }
  }

  async function loadFieldOptions() {
    const dynamicFields = config.fields.filter((field) => field.optionsLoader)
    if (!dynamicFields.length) return
    const entries = await Promise.all(
      dynamicFields.map(async (field) => [field.key, await field.optionsLoader()])
    )
    setFieldOptions(Object.fromEntries(entries))
  }

  function openCreateForm() {
    setEditingRecord(null)
    setIsFormOpen(true)
  }

  function openEditForm(record) {
    setEditingRecord(record)
    setIsFormOpen(true)
  }

  async function handleSubmit(payload) {
    if (editingRecord) {
      await config.service.update(editingRecord.id, payload)
    } else {
      await config.service.create(payload)
    }
    setIsFormOpen(false)
    setEditingRecord(null)
    loadRecords()
  }

  async function handleDelete(record) {
    const label = record.title || record.name || record.school_name || record.full_name || `#${record.id}`
    if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) return
    await config.service.remove(record.id)
    loadRecords()
  }

  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>{config.title}</h1>
          {config.description && <p className={styles.description}>{config.description}</p>}
        </div>
        <button type="button" className="btn btn-primary" onClick={openCreateForm}>
          <Plus size={16} /> Add
        </button>
      </div>

      {loading && <p className={styles.state}>Loading…</p>}
      {error && <p className={styles.stateError}>{error}</p>}

      {!loading && !error && (
        records.length ? (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {config.columns.map((col) => (
                    <th key={col.key}>{col.label}</th>
                  ))}
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    {config.columns.map((col) => (
                      <td key={col.key}>{formatCell(record[col.key], col.type)}</td>
                    ))}
                    <td className={styles.actionsCell}>
                      <button
                        type="button"
                        className={styles.iconBtn}
                        onClick={() => openEditForm(record)}
                        aria-label="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        className={`${styles.iconBtn} ${styles.danger}`}
                        onClick={() => handleDelete(record)}
                        aria-label="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={styles.state}>No records yet. Click Add to create the first one.</p>
        )
      )}

      {isFormOpen && (
        <ResourceForm
          key={editingRecord?.id ?? 'new'}
          config={config}
          fieldOptions={fieldOptions}
          record={editingRecord}
          onCancel={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

function formatCell(value, type) {
  if (type === 'boolean') return value ? 'Yes' : 'No'
  if (Array.isArray(value)) return value.join(', ')
  if (value === null || value === undefined || value === '') return '—'
  return String(value)
}
