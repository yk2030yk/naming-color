const chalk = require('chalk')

const LogTypes = ['Success', 'Result'] as const

type LogType = typeof LogTypes[number]

const log = (logType: LogType, message: string, color = '#fff') => {
  console.log(chalk.hex(color)(`${logType}: ${message}`))
}

const success = (message: string) => {
  log('Success', message, '#00F')
}

const result = (message: string) => {
  log('Result', message, '#00F')
}

export default { success, result }
