#!/usr/bin/env node

// require('babel-register')
const program = require('commander')
const lunar = require('./index').default

function parseDate (date) {
  var len = date.length
  if (len === 2 || len === 4) {
    if (len === 2) date = '20' + date
    let y = parseInt(date)
    if (isNaN(y)) return false
    return new Date(y, 0, 1)
  } else if (len === 5 || len === 6) {
    if (len === 5) date = '0' + date
    let y = parseInt(date.substr(2, 4))
    let m = parseInt(date.substr(0, 2))
    if (isNaN(y) || isNaN(m)) return false
    return new Date(y, m - 1, 1)
  } else if (len === 7 || len === 8) {
    if (len === 7) date = '0' + date
    let y = parseInt(date.substr(4, 4))
    let m = parseInt(date.substr(2, 2))
    let d = parseInt(date.substr(0, 2))
    if (isNaN(y) || isNaN(m) || isNaN(d)) return false
    return new Date(y, m - 1, d)
  } else {
    return false
  }
}

program
  .version('1.0.0')
  .usage('[options] <file ...>')
  .option('-d, --date <date>', 'Show calendar for specific date (ddMMyyyy|MMyyyy|yyyy)', parseDate)
  .option('-y, --year', 'Show year calendar')
  .parse(process.argv)

var opt = { }
if (program.year) opt.mode = 'y'
if (program.date) opt.date = program.date

lunar(opt)
