/* eslint-disable */
// @ts-ignore
const colorNameList = require('color-name-list')
const nearestColors = require('nearest-color')
const camelCase = require('camelcase')

/**
 * 色に名前をつけるツールになります。
 *
 * 以下のコマンドで実行することができます。
 * $ yarn namingColor -- "#ffffff"
 *
 * # Searching Color Name ....
 *
 * # Search Color Name Result
 * 一致: White
 * 近似: White
 *
 * # Searching Color Name Done!!!
 */

/**
 * 一致する色を検索
 */
function searchMatchColor(targetHex: string) {
  const matchColor = colorNameList.find((color: any) => color.hex === targetHex)
  return matchColor ? matchColor.name : ''
}

/**
 * 似ている色を検索
 */
function searchNearestColor(targetHex: string) {
  const colors = colorNameList.reduce(
    // @ts-ignore
    (o, { name, hex }) => Object.assign(o, { [name]: hex }),
    {}
  )
  const nearest = nearestColors.from(colors)
  const nearestName = nearest(targetHex)

  return nearestName ? nearestName.name : ''
}

/**
 * 結果を出力
 */
function writeResult(kind: string, colorName: string) {
  const name = colorName ? camelCase(colorName) : 'なし'
  console.log(`${kind}: ${colorName}`)
}

/**
 * メイン処理
 */
function main() {
  console.log('\n# Searching Color Name ....\n')

  const targetHex = process.argv[2]
  if (!targetHex) {
    console.error(`
Error: 色が指定されていません
  Command Example:
  $ yarn namingColor -- "#ffffff"
  ** 指定できる色は16進数のカラーコードです
`)
    return
  }

  const matchColorName = searchMatchColor(targetHex)
  const nearestColorName = searchNearestColor(targetHex)

  console.log('\n# Search Color Name Result')
  if (!matchColorName && !nearestColorName) {
    console.log('一致する色はありませんでした。')
  } else {
    writeResult('一致', matchColorName)
    writeResult('近似', nearestColorName)
  }

  console.log('\n# Searching Color Name Done!!!\n')
}

main()
