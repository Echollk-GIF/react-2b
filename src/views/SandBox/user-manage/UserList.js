import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Switch } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import {
  getUserList,
  deleteUser,
  updateUserStatus
} from '../../../api/user'
import { getRoleSelesctList } from '../../../api/global'
import NewUserFormModal from './componens/NewUserFormModal'
import EditUserFormModal from './componens/EditUserFormModal'
const { confirm } = Modal
export default function UserList () {
  const [dataSource, setDataSource] = useState([])
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [roleSelectList, setRoleSelectList] = useState([])
  const [currentEditUser, setCurrentEditUser] = useState({})
  //编辑用户(Modal)
  const handleEdit = (item) => {
    setCurrentEditUser(item)
    setIsEditOpen(true)
  }

  //确认删除(Modal)
  const confirmDelete = (item) => {
    confirm({
      title: '您确定要删除吗?',
      icon: <ExclamationCircleFilled />,
      content: '删除后将导致该用户不可用',
      okType: 'danger',
      onOk () {
        deleteUser(item.id)
        getUserList().then((res) => {
          // setDataSource(res.data)
          setDataSource(res)
        })
      },
      onCancel () {
        console.log('Cancel')
      },
    })
  }

  //用户状态Switch改变
  const handleUserStatusChange = (item) => {
    updateUserStatus(item.id, !item.userStatus)
    getUserList().then((res) => {
      // setDataSource(res.data)
      setDataSource(res)
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
      render: (userStatus, item) => {
        return <Switch
          checked={userStatus}
          disabled={item.default}
          onChange={() => { handleUserStatusChange(item) }}></Switch>
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
            style={{ marginRight: '20px' }}
            disabled={item.default}
            onClick={() => { handleEdit(item) }}>编辑</Button>
          <Button
            danger
            disabled={item.default}
            onClick={() => { confirmDelete(item) }}>删除</Button>
        </div>
      }
    }
  ]

  useEffect(() => {
    getUserList().then((res) => {
      // setDataSource(res.data)
      setDataSource(res)
    })
    getRoleSelesctList().then((res) => {
      setRoleSelectList(res)
    })
  }, [])

  return (
    <div>
      <Button
        type='primary'
        onClick={() => { setIsAddOpen(true) }}
        style={{ marginBottom: '10px' }}>添加用户</Button>
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
      <NewUserFormModal
        isAddOpen={isAddOpen}
        setIsAddOpen={setIsAddOpen}
        roleSelectList={roleSelectList}
        setDataSource={setDataSource} />
      <EditUserFormModal
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        roleSelectList={roleSelectList}
        currentEditUser={currentEditUser} />
    </div>
  )
}
