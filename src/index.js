import chalk from 'chalk'
import getLunarDate, {
  getLunarMonth,
  getGioHoangDao,
  getTietKhi,
  getDayOfWeekIndex,
  getDayOfWeek,
  getCanChi,
  getCanHour0
} from './lib/lunar'

export default function print (opt = {}) {
  opt = Object.assign({
    mode: 'm',
    date: new Date()
  }, opt)

  var date = opt.date
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  if (opt.mode === 'm') {
    printMonth(year, month, day)
  } else {
    printYear(year, month, day)
  }
}

function printMonth (year, month, day) {
  var lunarDate = getLunarDate(day, month, year)
  var lunarMonth = getLunarMonth(month, year)
  printCalendar(year, month, lunarMonth, day, lunarDate)
}

function printYear (year, month, day) {
  for (let i = 1; i < 13; i++) {
    var lunarMonth = getLunarMonth(i, year)
    printCalendar(year, i, lunarMonth)
  }
}

function printCalendar (year, month, lunarMonth, day, lunarDate) {
  var MAX_COL = 6
  var CELL_WIDTH = 10
  var TOTAL_WIDTH = (MAX_COL + 1) * (CELL_WIDTH + 1) + 2
  var HALF_WIDTH = Math.floor(TOTAL_WIDTH / 2)
  var emptyCell = paddingLeft('', CELL_WIDTH) + '|'

  console.log(padding(`Tháng ${month} năm ${year}`, TOTAL_WIDTH))
  if (day) {
    let jd = lunarDate.jd
    let canchi = getCanChi(lunarDate)
    console.log(`\n${padding(`${getDayOfWeek(jd)}, ngày ${day}`, TOTAL_WIDTH)}`)
    console.log(padding(`Tháng ${lunarDate.month}`, HALF_WIDTH) + padding(`Tháng ${canchi[1]}`, HALF_WIDTH))
    console.log(padding(`Mùng ${lunarDate.day}`, HALF_WIDTH) + padding(`Ngày ${canchi[0]}`, HALF_WIDTH))
    console.log(padding('', HALF_WIDTH) + padding(`Giờ ${getCanHour0(jd)} Tý`, HALF_WIDTH))
    console.log(padding(`Năm ${canchi[2]}`, HALF_WIDTH) + padding(`Tiết ${getTietKhi(jd)}`, HALF_WIDTH))
    console.log(`\nGiờ hoàng đạo: ${getGioHoangDao(jd).join(', ')}`)
  }
  console.log(' ______________________________________________________________________________ ')
  console.log('| __________ __________ __________ __________ __________ __________ __________ |')
  console.log('||    CN    |    T2    |    T3    |    T4    |    T5    |    T6    |    T7    ||')
  console.log('||==========|==========|==========|==========|==========|==========|==========||')

  var col = 0
  var solarWeek = ''
  var lunarWeek = ''
  for (let i = 0, len = lunarMonth.length - 1; i <= len; i++) {
    let date = lunarMonth[i]
    let index = getDayOfWeekIndex(date.jd)

    if (solarWeek === '' && col < index) {
      for (; col < index; col++) {
        solarWeek += emptyCell
        lunarWeek += emptyCell
      }
    }

    let solarDay = i + 1
    let lunarDay = date.day
    if (solarDay === 1 || lunarDay === 1) {
      lunarDay += `/${date.month}`
    }
    solarWeek += `${paddingRight(solarDay, CELL_WIDTH)}|`
    lunarWeek += `${paddingLeft(lunarDay, CELL_WIDTH)}|`
    col++

    if (i === len && col < MAX_COL) {
      for (; col <= MAX_COL; col++) {
        solarWeek += emptyCell
        lunarWeek += emptyCell
      }
    }

    if (col > MAX_COL) {
      col = 0

      console.log(`||${solarWeek}|`)
      console.log(`||${lunarWeek}|`)
      console.log('||__________|__________|__________|__________|__________|__________|__________||')
      solarWeek = ''
      lunarWeek = ''
    }
  }
  console.log('|______________________________________________________________________________|\n')
}

function padding (str, len, by = ' ') {
  var ret = '' + str
  var retLen = ret.length
  var left = Math.floor((len - retLen) / 2)
  var right = len - left - retLen

  ret = paddingLeft('', left, by) + ret + paddingRight('', right, by)

  return ret
}

function paddingLeft (str, len, by = ' ') {
  var ret = '' + str
  for (let i = 0, j = len - ret.length; i < j; i++) {
    ret = by + ret
  }

  return ret
}

function paddingRight (str, len, by = ' ') {
  var ret = '' + str
  for (let i = 0, j = len - ret.length; i < j; i++) {
    ret += by
  }

  return ret
}
