import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Switch } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { getUserList } from '../../../api/user'
const { confirm } = Modal
export default function UserList () {
  const [dataSource, setDataSource] = useState([])

  //确认删除(Modal)
  const confirmDelete = (item) => {
    confirm({
      title: '您确定要删除吗?',
      icon: <ExclamationCircleFilled />,
      content: '删除后将导致该用户不可用',
      okType: 'danger',
      onOk () {

      },
      onCancel () {
        console.log('Cancel')
      },
    })
  }

  //页面配置状态改变
  const handleSwitchChange = (item) => {

  }

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
      title: '角色名称',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        return role.roleName
      },
      align: 'center',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      align: 'center'
    },
    {
      title: '用户状态',
      dataIndex: 'userStatus',
      key: 'userStatus',
      render: (userStatus) => {
        return <Switch></Switch>
      },
      align: 'center'
    },
    {
      title: '操作',
      align: 'center',
      render: (item) => {
        return <div>
          <Button
            type='primary'
            style={{ marginRight: '20px' }}>编辑</Button>
          <Button danger onClick={() => { confirmDelete(item) }}>删除</Button>
        </div>
      }
    }
  ]

  useEffect(() => {
    getUserList().then((res) => {
      setDataSource(res.data)
    })
  }, [])

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: [5, 10],
          defaultPageSize: 5
        }} />
    </div>
  )
}
