export const getTimeAgo = (isoDate: string) => {
  const now = new Date()
  const past = new Date(isoDate)
  const diffMs = now.getTime() - past.getTime()
  const diffSec = Math.floor(diffMs / 1000)

  if (diffSec < 5) return 'только что'
  if (diffSec < 60) return `${diffSec} сек. назад`

  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `${diffMin} мин. назад`

  const diffHrs = Math.floor(diffMin / 60)
  if (diffHrs < 24) return `${diffHrs} ч. назад`

  return past.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
