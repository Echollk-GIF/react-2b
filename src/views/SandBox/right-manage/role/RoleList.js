import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Tree } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import {
  getRoleList,
  deleteRoleById,
  updateRolePermission
} from '../../../../api/role'
import { getPermissionList } from '../../../../api/user'
import { mockDeleteRoleById } from '../../../../api/mock/mock'
const { confirm } = Modal

export default function RoleList () {
  //角色列表
  const [roleList, setRoleList] = useState([])
  //编辑Modal显示/隐藏
  const [isModalOpen, setIsModalOpen] = useState(false)
  //权限列表
  const [permissionList, setPermissionList] = useState([])
  //当前点击的角色的权限列表
  const [currentId, setCurrentId] = useState(0)
  const [currentRights, setCurrentRights] = useState([])

  //编辑Modal
  const handleOk = () => {
    setIsModalOpen(false)
    updateRolePermission(currentId, currentRights).then((res) => {
      console.log(res)
    })
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  //编辑Tree
  const onCheck = (checkedKeys) => {
    setCurrentRights(checkedKeys.checked)
  }

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
          setRoleList(res.data)
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
            onClick={() => {
              setIsModalOpen(true)
              setCurrentRights(item.rights)
              setCurrentId(item.id)
            }}
          >编辑</Button>
          <Button danger onClick={() => { confirmDelete(item) }}>删除</Button>
        </div>
      }
    }
  ]
  useEffect(() => {
    getRoleList().then((res) => {
      setRoleList(res.data)
    })
    getPermissionList().then((res) => {
      setPermissionList(res.data)
    })
  }, [])
  return (
    <div>
      <Table
        dataSource={roleList}
        columns={columns}
        rowKey={(item) => item.id}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: [5, 10],
          defaultPageSize: 5
        }} />
      <Modal title="权限分配" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Tree
          checkable
          checkStrictly
          checkedKeys={currentRights}
          onCheck={onCheck}
          treeData={permissionList}
        />
      </Modal>
    </div>
  )
}
