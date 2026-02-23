const formatUTCDate = (dateInput: Date | string) => {
  const d = new Date(dateInput)
  const day = d.getUTCDate()
  const month = d.getUTCMonth()
  const year = d.getUTCFullYear()

  return new Date(year, month, day).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    ...(year !== new Date().getFullYear() ? { year: 'numeric' } : {}),
  })
}

export default formatUTCDate
