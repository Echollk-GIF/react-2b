import React, { useState, useEffect } from 'react'
import { Table, Tag, Button } from 'antd'
import { getPermissionList } from '../../../../api/user'
export default function RightList () {
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    getPermissionList().then((res) => {
      setDataSource(res.data)
    })
  }, [])
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'label',
      key: 'label',
      align: 'center',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
      render: (key) => {
        return <Tag color={'orange'}>{key}</Tag>
      }
    },
    {
      title: '操作',
      align: 'center',
      render: () => {
        return <div>
          <Button type='primary' style={{ marginRight: '20px' }}>编辑</Button>
          <Button danger>删除</Button>
        </div>
      }
    }
  ]

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  )
}
