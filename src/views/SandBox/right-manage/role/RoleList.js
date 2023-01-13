import React, { useState, useEffect } from 'react'
import { Table, Button, Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import {
  getRoleList,
  deleteRoleById
} from '../../../../api/role'
import { mockDeleteRoleById } from '../../../../api/mock/mock'
const { confirm } = Modal

export default function RoleList () {
  const [dataSource, setDataSource] = useState([])

  //确认删除(Modal)
  const confirmDelete = (item) => {
    confirm({
      title: '您确定要删除吗?',
      icon: <ExclamationCircleFilled />,
      content: '',
      okType: 'danger',
      onOk () {
        deleteRoleById(item.id).then((res) => {
          console.log(res)
        })
        mockDeleteRoleById(item.id, 'delete').then((res) => {
          setDataSource(res.data)
        })
      },
      onCancel () {
        console.log('Cancel')
      },
    })
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
      dataIndex: 'roleName',
      key: 'roleName',
      align: 'center'
    },
    {
      title: '操作',
      align: 'center',
      render: (item) => {
        return <div>
          <Button
            type='primary'
            style={{ marginRight: '20px' }}
          >编辑</Button>
          <Button danger onClick={() => { confirmDelete(item) }}>删除</Button>
        </div>
      }
    }
  ]
  useEffect(() => {
    getRoleList().then((res) => {
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
