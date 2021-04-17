import moment from 'moment'

export const formatFullDate = (date: string) : string => {
  return moment(date).format('YYYY-MM-DD hh:mm:ss')
}
