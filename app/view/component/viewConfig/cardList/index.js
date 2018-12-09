import React from 'react'
import { Card } from 'antd'

const SingleCard = () => {
  return (
    <Card
      title="Card title"
      extra={<a href="#">More</a>}
      style={{ width: 300 }}
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  )
}

export default class Index extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <SingleCard />
    )
  }
}

