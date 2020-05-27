import camelCase from 'camelcase'
const rgb2hex = require('rgb2hex')
const chalk = require('chalk')

import { validateColorCode } from '../validate'
import { searchMatchColor, searchNearestColor } from '../colorName'

const chalks = {
  Error: chalk.hex('#f00'),
  ErrorMessage: chalk.hex('#f99'),
  Line: chalk.hex('#39d462').bold('-----------------------------------------'),
  Success: chalk.hex('#39d462')('Success'),
  Named: chalk.hex('#55dcfa').bold,
}

const _outputError = () => {
  console.log(`
${chalks.Error('Error')}: ${chalks.ErrorMessage(
    'カラーコードの形式が間違っています。'
  )}

  指定できる形式は以下になります。
  - #fff, #ffffff
  - rgb(0, 0, 0)
  - rgba(20, 20, 30, 0.1)
`)
}

const _output = (matched: string, nearest: string) => {
  const m = camelCase(matched || 'none')
  const n = camelCase(nearest || 'none')
  console.log(`
${chalks.Line}
  ${chalks.Success}: naming run success !!!
${chalks.Line}
  一致: ${chalks.Named(m)}
  近似: ${chalks.Named(n)}
${chalks.Line}
    `)
}

/**
 * run command
 */
const run = (code: string) => {
  const isValid = validateColorCode(code)

  if (!isValid) {
    _outputError()
    return
  }

  // rgb形式をfex形式に統一する
  const normalizedCode = rgb2hex(code).hex

  const matched = searchMatchColor(normalizedCode)
  const nearest = searchNearestColor(normalizedCode)

  _output(matched, nearest)
}

export default run
