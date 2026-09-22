import { X } from 'lucide-react'
import { useState } from 'react'

import styles from './ResourceForm.module.css'

// Note: the parent renders this with `key={record?.id ?? 'new'}` so that
// switching between add/edit or between records remounts the form instead
// of needing an effect to resync local state.
export default function ResourceForm({ config, fieldOptions, record, onCancel, onSubmit }) {
  const [values, setValues] = useState(() => buildInitialValues(config.fields, record))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleChange(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      await onSubmit(toPayload(config.fields, values))
    } catch {
      setError('Could not save. Check the fields and try again.')
      setSaving(false)
    }
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2>{record ? `Edit ${config.title}` : `Add ${config.title}`}</h2>
          <button type="button" className={styles.closeBtn} onClick={onCancel} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {config.fields.map((field) => (
            <FieldInput
              key={field.key}
              field={field}
              value={values[field.key]}
              options={fieldOptions[field.key]}
              onChange={(value) => handleChange(field.key, value)}
            />
          ))}

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button type="button" className="btn btn-outline" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function FieldInput({ field, value, options, onChange }) {
  const commonProps = {
    id: `field-${field.key}`,
    required: field.required,
  }

  switch (field.type) {
    case 'textarea':
      return (
        <FieldWrap field={field}>
          <textarea
            {...commonProps}
            rows={4}
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </FieldWrap>
      )
    case 'number':
      return (
        <FieldWrap field={field}>
          <input
            {...commonProps}
            type="number"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          />
        </FieldWrap>
      )
    case 'date':
      return (
        <FieldWrap field={field}>
          <input
            {...commonProps}
            type="date"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </FieldWrap>
      )
    case 'checkbox':
      return (
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
          />
          {field.label}
        </label>
      )
    case 'select':
      return (
        <FieldWrap field={field}>
          <select
            {...commonProps}
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="" disabled>
              Select…
            </option>
            {(options || field.options || []).map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FieldWrap>
      )
    case 'image':
      return (
        <FieldWrap field={field}>
          {typeof value === 'string' && value && (
            <img src={value} alt="" className={styles.previewImg} />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onChange(e.target.files?.[0] || null)}
          />
        </FieldWrap>
      )
    case 'tags':
      return (
        <FieldWrap field={field}>
          <input
            {...commonProps}
            type="text"
            value={Array.isArray(value) ? value.join(', ') : value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="React, Django, PostgreSQL"
          />
        </FieldWrap>
      )
    default:
      return (
        <FieldWrap field={field}>
          <input
            {...commonProps}
            type="text"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </FieldWrap>
      )
  }
}

function FieldWrap({ field, children }) {
  return (
    <label className={styles.field} htmlFor={`field-${field.key}`}>
      <span>{field.label}</span>
      {children}
    </label>
  )
}

function buildInitialValues(fields, record) {
  const values = {}
  fields.forEach((field) => {
    const raw = record?.[field.key]
    if (field.type === 'checkbox') {
      values[field.key] = Boolean(raw)
    } else if (field.type === 'select') {
      values[field.key] = raw ?? ''
    } else {
      values[field.key] = raw ?? ''
    }
  })
  return values
}

function toPayload(fields, values) {
  const payload = {}
  fields.forEach((field) => {
    const value = values[field.key]

    if (field.type === 'image') {
      if (value instanceof File) payload[field.key] = value
      return
    }
    if (field.type === 'tags') {
      payload[field.key] = String(value || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
      return
    }
    if (field.type === 'number') {
      // Omit rather than send null: several number fields (e.g. "order") are
      // non-nullable with a model default, so an empty input should mean
      // "use the default" on create and "leave unchanged" on update.
      if (value !== '') payload[field.key] = value
      return
    }
    payload[field.key] = value
  })
  return payload
}
