const mockjs = require('mockjs')

// http://mockjs.com/examples.html
const { mock, Random } = mockjs

const data = {
  success: true,
  data: {
    items: [
      {
        id: 15,
        name: '这是一个企业3',
        deleted: 0,
        created_at: '2018-12-03T13:47:10.000Z',
        updated_at: '2018-12-03T13:47:10.000Z',
      },
    ],
  },
}
const genSingleItem = () => {
  return {
    id: Random.increment(),
    name: Random.cword(5),
    deleted: 0,
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

// console.log('aaaaaaaa', JSON.stringify(mockData))
module.exports = mockData
