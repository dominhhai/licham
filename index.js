import getLunarDate, { getLunarMonth } from './lib/lunar'

export default function print () {
  var today = new Date()
  var curYear = today.getFullYear()
  var curMonth = today.getMonth()
  var curDay = today.getDay()

  console.log(`today: ${curYear}/${curMonth}/${curDay}`)

  var day = getLunarDate(curDay, curMonth, curYear)
  console.log('today lunar date:\n', day)

  var month = getLunarMonth(curMonth, curYear)
  console.log('this lunar month:\n', month)
}
