import moment from 'moment'

export const DateTimeFormat = 'DD/MM/YYYY HH:mm'
export const TimeFormat = 'HH:mm'
export const DateFormat = 'YYYY/MM/DD'

export const FormatDateTimeString = (
  value: string | Date,
  format = DateTimeFormat
) => {
  const mdate =
    typeof value === 'string' ? moment(new Date(value)) : moment(value)
  return mdate.format(format)
}
