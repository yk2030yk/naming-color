const namer = require('color-namer')

type Name = {
  name: string
  hex: string
  distance: number
}

type Names = {
  roygbiv: Name[]
  basic: Name[]
  html: Name[]
  x11: Name[]
  pantone: Name[]
  ntc: Name[]
}

export const namingColor = (colorCode: string) => {
  const names = namer(colorCode) as Names
  const sortedNames = names.pantone
    .slice()
    .sort((a, b) => a.distance - b.distance)
  const top3Names = sortedNames.slice(0, 2)
  return top3Names
}
