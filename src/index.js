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
  var EMPTY_CELL = paddingLeft('', CELL_WIDTH) + '|'
  var UNDER_LINE = '__________|'

  console.log(chalk.bgMagenta.bold(padding(`Tháng ${month} năm ${year}`, TOTAL_WIDTH)))
  if (day) {
    let jd = lunarDate.jd
    let canchi = getCanChi(lunarDate)
    let gioHoangDao = getGioHoangDao(jd)
    console.log('')
    console.log(chalk.bold(padding(`${getDayOfWeek(jd)}, ngày ${day}`, TOTAL_WIDTH)))
    console.log(padding(`Tháng ${lunarDate.month}`, HALF_WIDTH) + padding(`Tháng ${canchi[1]}`, HALF_WIDTH))
    console.log(chalk.red.bold(padding(`Mùng ${lunarDate.day}`, HALF_WIDTH) + padding(`Ngày ${canchi[0]}`, HALF_WIDTH)))
    console.log(padding('', HALF_WIDTH) + padding(`Giờ ${getCanHour0(jd)} Tý`, HALF_WIDTH))
    console.log(padding(`Năm ${canchi[2]}`, HALF_WIDTH) + padding(`Tiết ${getTietKhi(jd)}`, HALF_WIDTH))
    console.log('')
    let curHoangDao = ''
    for (let i = 0, j = gioHoangDao.length - 1; i <= j; i ++) {
      curHoangDao += gioHoangDao[i]
      if (i === 0) {
        curHoangDao = `Giờ hoàng đạo: ${curHoangDao}`
      }
      if (i < j) {
        curHoangDao += ', '
        if (i > 0 && i % 4 === 0) {
          console.log(chalk.bgRed(paddingRight(curHoangDao, TOTAL_WIDTH)))
          curHoangDao = paddingLeft('', 15)
        }
      } else {
        console.log(chalk.bgRed(paddingRight(curHoangDao, TOTAL_WIDTH)))
      }
    }
  }
  console.log(' ______________________________________________________________________________ ')
  console.log('| __________ __________ __________ __________ __________ __________ __________ |')
  console.log('||    CN    |    T2    |    T3    |    T4    |    T5    |    T6    |    T7    ||')
  console.log('||==========|==========|==========|==========|==========|==========|==========||')

  var col = 0
  var solarWeek = ''
  var lunarWeek = ''
  var underLine = ''
  for (let i = 0, len = lunarMonth.length - 1; i <= len; i++) {
    let date = lunarMonth[i]
    let index = getDayOfWeekIndex(date.jd)

    if (solarWeek === '' && col < index) {
      for (; col < index; col++) {
        solarWeek += EMPTY_CELL
        lunarWeek += EMPTY_CELL
        underLine += UNDER_LINE
      }
    }

    let solarDay = i + 1
    let lunarDay = date.day
    if (solarDay === 1 || lunarDay === 1) {
      lunarDay += `/${date.month}`
    }
    let curSolarDay = paddingRight(solarDay, CELL_WIDTH)
    let curLunarDay = paddingLeft(lunarDay, CELL_WIDTH)
    let curLine = UNDER_LINE
    if (col === 0) {
      curSolarDay = chalk.magenta(curSolarDay)
    } else if (col === MAX_COL) {
      curSolarDay = chalk.white(curSolarDay)
    }
    if (day && lunarDate.day === date.day && lunarDate.month === date.month) {
      curSolarDay = chalk.bgRed.bold(curSolarDay)
      curLunarDay = chalk.bgRed.bold.white(curLunarDay)
      curLine = `${chalk.bgRed.bold(curLine.substr(0, CELL_WIDTH))}|`
    } else {
      curLunarDay = chalk.red(curLunarDay)
    }
    solarWeek += `${curSolarDay}|`
    lunarWeek += `${curLunarDay}|`
    underLine += curLine
    col++

    if (i === len && col < MAX_COL) {
      for (; col <= MAX_COL; col++) {
        solarWeek += EMPTY_CELL
        lunarWeek += EMPTY_CELL
        underLine += UNDER_LINE
      }
    }

    if (col > MAX_COL) {
      col = 0

      console.log(`||${solarWeek}|`)
      console.log(`||${lunarWeek}|`)
      console.log(`||${underLine}|`)

      solarWeek = ''
      lunarWeek = ''
      underLine = ''
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
