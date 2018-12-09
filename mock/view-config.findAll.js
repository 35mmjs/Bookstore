const mockjs = require('mockjs')

// http://mockjs.com/examples.html
const { Random } = mockjs

const genSingleItem = () => {
  return {
    id: Random.id(),
    type: Random.pick(['瀑布', '排行榜']),
    note: Random.string(),
    content: Random.string(),
    status: Random.pick(['off', 'on']),
    deleted: 0,
    recorder: Random.id(),
    created_at: Random.date(),
    updated_at: Random.date(),
  }
}
const genMulItem = (total) => {
  const array = []
  for (let i = 0; i < total; i++) {
    const item = genSingleItem()
    array.push(item)
  }
  return array
}

const mockData = {
  success: true,
  data: {
    items: genMulItem(10),
  },
}

module.exports = mockData
