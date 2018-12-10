import React from 'react'
import dva, { connect } from 'dva'
import dynamic from 'dva/dynamic'
import './index.less'
import TableList from './tableList'
import Filter from './filter'
import model from './model'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'viewConfig/findAll',
      payload: {},
    })
  }
  render() {
    const { list } = this.props
    return (
      <div>
        <div>View Config</div>
        <div>
          <Filter />
          <TableList data={list} />
        </div>
      </div>
    )
  }
}
const app = dva()
const App = connect(({ viewConfig }) => ({
  ...viewConfig,
}))(Index)
app.model(model)

app.router(() => <App />)
const Demo = app.start()

export default Demo
