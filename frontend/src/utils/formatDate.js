export function formatYearRange(startYear, endYear, isCurrent) {
  if (isCurrent) return `${startYear} – Present`
  if (!endYear) return `${startYear}`
  return `${startYear} – ${endYear}`
}

const MONTH_YEAR = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' })

export function formatMonthYear(dateString) {
  if (!dateString) return ''
  return MONTH_YEAR.format(new Date(dateString))
}

export function formatDateRange(startDate, endDate, isCurrent) {
  const start = formatMonthYear(startDate)
  if (isCurrent) return `${start} – Present`
  if (!endDate) return start
  return `${start} – ${formatMonthYear(endDate)}`
}
