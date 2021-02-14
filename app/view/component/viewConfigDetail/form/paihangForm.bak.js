import React, { useState, useEffect } from 'react'
import { Table, Button } from 'antd'
import { findRankingList } from '../service'

const columns = [
  {
    title: '排行名称',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
]

const data = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  })
}

const Paihang = (props) => {
  const { onSubmit } = props
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRowKeys2, setSelectedRowKeys2] = useState([])
  const [mergedKeys, setMergedKeys] = useState({ nav1: [], nav2: [] })

  if (!tableData || tableData.length <= 0) {
    findRankingList().then(res => {
      const items = res && res.length > 0 && res.map((item, index) => {
        return {
          key: index,
          id: item.value,
          name: item.label,
        }
      })
      setTableData(items)
    })
  }
  const onSelectChange = keys => {
    setSelectedRowKeys(keys)
    const selected = []
    keys.forEach(key => {
      selected.push(tableData[key])
    })
    const newMerged = {
      nav1: selected,
      nav2: mergedKeys.nav2,
    }
    setMergedKeys(newMerged)
    onSubmit(newMerged)
  }

  const onSelectChange2 = keys => {
    setSelectedRowKeys2(keys)
    const selected = []
    keys.forEach(key => {
      selected.push(tableData[key])
    })
    const newMerged = {
      nav1: mergedKeys.nav1,
      nav2: selected,
    }
    setMergedKeys(newMerged)
    onSubmit(newMerged)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const rowSelection2 = {
    selectedRowKeys2,
    onChange: onSelectChange2,
  }
  const hasSelected = selectedRowKeys.length > 0

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div>排行一</div>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `已选 ${selectedRowKeys.length} 个排行` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={tableData} />
      <div style={{ marginBottom: 16 }}>
        <div>排行二</div>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `已选 ${selectedRowKeys2.length} 个排行` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection2} columns={columns} dataSource={tableData} />
    </div>
  )
}

export default Paihang
