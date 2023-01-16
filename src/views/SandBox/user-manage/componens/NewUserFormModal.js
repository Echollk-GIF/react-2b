import React from 'react'
import { Form, Input, Select, Modal } from 'antd'
import { addUser, getUserList } from '../../../../api/user'
export default function NewUserFormModal (props) {
  const [form] = Form.useForm()
  const { isAddOpen, setIsAddOpen, roleSelectList, setDataSource } = props
  const onCreate = (values) => {
    addUser(values)
    setIsAddOpen(false)
    getUserList().then((res) => {
      setDataSource(res)
    })
  }
  return (
    <div>
      <Modal
        open={isAddOpen}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onCancel={() => { setIsAddOpen(false) }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields()
              onCreate(values)
            })
            .catch((info) => {
              console.log('Validate Failed:', info)
            })
        }}
      >
        <Form
          form={form}
          // layout="vertical"
          name="addUser"
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="用户名"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="roleId"
            label="角色"
            rules={[
              {
                required: true,
                message: '请选择角色!',
              },
            ]}
          >
            <Select>
              {roleSelectList.map((item) => {
                return <Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
