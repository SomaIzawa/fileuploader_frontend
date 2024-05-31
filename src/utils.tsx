export type Color = 'primary' | 'warningRed'
export type ColorSet = {
  bg: string
  color: string
}
export const getColorSet = (color: Color): ColorSet => {
  switch (color) {
    case 'primary':
      return {
        bg: 'bg-sky-500',
        color: 'text-white',
      }
    case 'warningRed':
      return {
        bg: 'bg-red-600',
        color: 'text-white',
      }
    default:
      return {
        bg: 'bg-sky-500',
        color: 'text-white',
      }
  }
}

export const isoStringToDate = (iso :string): Date => {
  return new Date(iso)
}

export const formatDate = (date: Date): string => {
  console.log(date)
  const padZero = (num: number): string => num.toString().padStart(2, '0')

  const year = date.getFullYear()
  const month = padZero(date.getMonth() + 1) // 月は0から始まるので1を加える
  const day = padZero(date.getDate())
  const hours = padZero(date.getHours())
  const minutes = padZero(date.getMinutes())
  const seconds = padZero(date.getSeconds())

  return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`
}
