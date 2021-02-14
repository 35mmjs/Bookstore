import React, { Fragment, useState, iframe } from 'react'
import moment from 'moment'
import { Table, Badge } from 'antd'
import DescriptionList from '../../common/DescriptionList'

const { Description } = DescriptionList

const Comp = props => {
  const {
    list,
    pagination,
    loading,
    onChange,
  } = props
  const statusMap = ['default', 'success', 'processing', 'error'];
  const status = ['等待下发', '下发成功', '已上线', '异常'];
  const columns = [
    {
      title: '任务ID',
      dataIndex: 'id',
      key:'id',
      width:100,
    }, {
      title: '门店ID',
      dataIndex: 'store_id',
      key: 'store_id',
      sorter: true,
      width: 100,
    }, {
      title: '设备ID',
      dataIndex: 'client_id',
      key:'client_id',
      sorter: true,
      width:100,
    }, {
      title: '任务',
      dataIndex: 'action',
      key:'action',
      sorter: true,
      width:100,
    }, {
      title: '任务说明',
      dataIndex: 'comment',
      key:'comment',
      sorter: true,
      width:150,
    }, {
      title: '任务链接',
      dataIndex: 'app_url',
      key:'app_url',
      sorter: true,
      width:100,
      render(val) {
        return <a href={val}>{val?"下载地址":""}</a>;
      },
    }, {
      title: '自动关机时间',
      dataIndex: 'auto_shutdown_time',
      key:'auto_shutdown_time',
      sorter: true,
      width:100,
    }, {
      title: '任务创建时间',
      dataIndex: 'gmt_create',
      key:'gmt_create',
      width:150,
    }, {
      title: '状态更新时间',
      dataIndex: 'gmt_modify',
      key:'gmt_modify',
      width:150,
    }, {
      title: '截图回馈',
      dataIndex: 'image_url',
      key:'image_url',
      sorter: true,
      width:100,
      render(val) {
        return <a href={val}>{val?"截图地址":""}</a>;
      },
    }, {
      title: '状态',
      dataIndex: 'status',
      sorter: true,
      key:'status',
      width:150,
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    }
  ]
  
  return (
    <div>
      <Table
        columns={columns}
        dataSource={list}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />
    </div>
  )
}

export default Comp
