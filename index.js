import getLunarDate, {
  getLunarMonth,
  getGioHoangDao,
  getTietKhi,
  getDayOfWeek,
  getCanChi
} from './lib/lunar'

export default function print (opt = {}) {
  opt = Object.assign({
    mode: 'm',
    date: new Date()
  }, opt)

  var date = opt.date
  var year = date.getFullYear()
  var month = date.getMonth()
  var day = date.getDay()

  console.log(`${day}/${month}/${year}`)

  var day = getLunarDate(day, month, year)
  console.log('Lunar:\n', day)

  var month = getLunarMonth(month, year)
  console.log('Lunar month:\n', month)
}
