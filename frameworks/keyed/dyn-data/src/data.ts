let ID = 1

function _random(max: number) {
  return Math.round(Math.random() * 1000) % max
}

export function buildData(count = 1000) {
  const adjectives = [
    'pretty',
    'large',
    'big',
    'small',
    'tall',
    'short',
    'long',
    'handsome',
    'plain',
    'quaint',
    'clean',
    'elegant',
    'easy',
    'angry',
    'crazy',
    'helpful',
    'mushy',
    'odd',
    'unsightly',
    'adorable',
    'important',
    'inexpensive',
    'cheap',
    'expensive',
    'fancy'
  ]
  const colours = [
    'red',
    'yellow',
    'blue',
    'green',
    'pink',
    'brown',
    'purple',
    'brown',
    'white',
    'black',
    'orange'
  ]
  const nouns = [
    'table',
    'chair',
    'house',
    'bbq',
    'desk',
    'car',
    'pony',
    'cookie',
    'sandwich',
    'burger',
    'pizza',
    'mouse',
    'keyboard'
  ]
  const data: Item[] = []
  for (let i = 0; i < count; i++)
    data.push({
      id: ID++,
      label:
        adjectives[_random(adjectives.length)] +
        ' ' +
        colours[_random(colours.length)] +
        ' ' +
        nouns[_random(nouns.length)]
    })
  return data
}

export const MOCK_COUNT = 5
export const MOCK_PAGE_SIZE = 1000

export interface Item {
  id: number;
  label: string
}
export const datas = Array(MOCK_COUNT).fill(1).map(() => buildData(MOCK_PAGE_SIZE))

export function changeIndex(cb: () => number) {
  return new Promise((r) => {
    setTimeout(() => {
      const index = cb()
      console.log('推送第', index + 1, '组数据')
      if (index + 1 < MOCK_COUNT) {
        r(changeIndex(cb))
      }
      r(null)
    }, 1000);
  })
}
