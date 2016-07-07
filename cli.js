#!/usr/bin/env node

require('babel-register')
const program = require('commander')
const lunar = require('./index')
 
program
  .version('1.0.0')
  .option('-d, --date [date]', 'Show calendar for specific date (ddMMyyyy|MMyyyy|yyyy)')
  .option('-y, --year', 'Show year calendar')
  .parse(process.argv)

console.log(program)
