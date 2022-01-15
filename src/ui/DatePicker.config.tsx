// modified version from import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns'
// because of https://github.com/react-component/picker/issues/125

import { GenerateConfig } from 'rc-picker/lib/generate'
import {
  addDays,
  addMonths,
  addYears,
  endOfMonth,
  format as formatDate,
  getDate,
  getDay,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getWeek,
  getYear,
  isAfter,
  isValid,
  parse as parseDate,
  setDate,
  setHours,
  setMinutes,
  setMonth,
  setSeconds,
  setYear,
  startOfWeek,
  startOfYear,
} from 'date-fns'

// const dealLocal = (str: string) => {
//   return str.replace(/_/g, '')
// }

const localeParse = (format: string) => {
  return format
    .replace(/Y/g, 'y')
    .replace(/D/g, 'd')
    .replace(/gggg/, 'yyyy')
    .replace(/g/g, 'G')
    .replace(/([Ww])o/g, 'wo')
}

const firstDOW = startOfWeek(new Date())
const firstDOY = startOfYear(new Date())
const shortWeekDaysArray = Array.from(Array(7)).map((e, i) => formatDate(addDays(firstDOW, i), 'EEEEEE'))
const shortMonthsArray = Array.from(Array(12)).map((d, i) => formatDate(addMonths(firstDOY, i), 'MMM'))

const generateConfig: GenerateConfig<Date> = {
  // get
  getNow: () => new Date(),
  getFixedDate: (string: string | number | Date) => new Date(string),
  getEndDate: (date: number | Date) => endOfMonth(date),
  getWeekDay: (date) => getDay(date),
  getYear: (date) => getYear(date),
  getMonth: (date) => getMonth(date),
  getDate: (date) => getDate(date),
  getHour: (date) => getHours(date),
  getMinute: (date) => getMinutes(date),
  getSecond: (date) => getSeconds(date),

  // set
  addYear: (date, diff) => addYears(date, diff),
  addMonth: (date, diff) => addMonths(date, diff),
  addDate: (date, diff) => addDays(date, diff),
  setYear: (date, year) => setYear(date, year),
  setMonth: (date, month) => setMonth(date, month),
  setDate: (date, num) => setDate(date, num),
  setHour: (date, hour) => setHours(date, hour),
  setMinute: (date, minute) => setMinutes(date, minute),
  setSecond: (date, second) => setSeconds(date, second),

  // Compare
  isAfter: (date1, date2) => isAfter(date1, date2),
  isValidate: (date) => isValid(date),

  locale: {
    getWeekFirstDay: () => {
      return 0
    },
    getWeekFirstDate: (locale: any, date: Date) => {
      return startOfWeek(date)
    },
    getShortWeekDays: () => {
      return shortWeekDaysArray
    },
    getShortMonths: () => {
      return shortMonthsArray
    },
    getWeek: (locale, date) => {
      return getWeek(date)
    },
    format: (locale, date, format) => {
      if (!isValid(date)) {
        return 'Invalid date'
      }
      return formatDate(date, localeParse(format))
    },
    parse: (locale, text, formats) => {
      for (let i = 0; i < formats.length; i += 1) {
        const format = localeParse(formats[i])
        const formatText = text
        const date = parseDate(formatText, format, new Date())
        if (isValid(date)) {
          return date
        }
      }
      return null
    },
  },
}

export default generateConfig
