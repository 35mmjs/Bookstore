const mockjs = require('mockjs')
// http://mockjs.com/examples.html
const { mock, Random } = mockjs

const genSingleContent = () => {
  return {
    banner: {
      src: Random.image('200x100'),
    },
    books: [{
      title: Random.string(),
      price: Random.integer(),
    }],
  }
}

const genSingleItem = () => {
  return {
    id: Random.id(),
    type: Random.pick(['轮播', '排行']),
    note: Random.string(),
    content: genSingleContent(),
    deleted: 0,
    created_at: Random.date(),
    updated_at: Random.date(),
  }
}
const mockData = {
  success: true,
  data: {
    ...genSingleItem(),
  },
}

module.exports = mockData
