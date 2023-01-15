import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Modal, Popover, Switch } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import {
  getPermissionList,
  deletePermissionById,
  updatePermissionById
} from '../../../../api/right'
const { confirm } = Modal
export default function RightList () {
  const [dataSource, setDataSource] = useState([])

  //确认删除(Modal)
  const confirmDelete = (item) => {
    confirm({
      title: '您确定要删除吗?',
      icon: <ExclamationCircleFilled />,
      content: '删除后将导致该权限不可用',
      okType: 'danger',
      onOk () {
        deletePermissionById(item.id)
        getPermissionList().then((res) => {
          setDataSource(res)
        })
      },
      onCancel () {
        console.log('Cancel')
      },
    })
  }

  //页面配置状态改变
  const handleSwitchChange = (item) => {
    let newPagePermission = !item.pagepermission === true ? 1 : 0
    updatePermissionById(item.id, newPagePermission)
    getPermissionList().then((res) => {
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
      title: '权限名称',
      dataIndex: 'title',
      key: 'title',
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
      render: (item) => {
        return <div>
          <Popover
            title="页面配置"
            content={
              <div style={{ textAlign: 'center' }}>
                <Switch
                  checked={item.pagepermission}
                  onChange={() => { handleSwitchChange(item) }} />
              </div>
            }
            trigger={item.pagepermission === undefined ? '' : 'click'}>
            <Button
              type='primary'
              style={{ marginRight: '20px' }}
              disabled={item.pagepermission === undefined}>编辑</Button>
          </Popover>
          <Button danger onClick={() => { confirmDelete(item) }}>删除</Button>
        </div>
      }
    }
  ]

  useEffect(() => {
    getPermissionList().then((res) => {
      // setDataSource(res.data)
      setDataSource(res)
    })
  }, [])

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: [5, 10],
          defaultPageSize: 5
        }} />
    </div>
  )
}
