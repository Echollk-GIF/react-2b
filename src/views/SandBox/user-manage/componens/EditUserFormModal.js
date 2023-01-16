import React, { useEffect } from 'react'
import { Form, Input, Select, Modal } from 'antd'
import { getUserList } from '../../../../api/user'
export default function EditUserFormModal (props) {
  const [form] = Form.useForm()
  const { currentEditUser, isEditOpen, setIsEditOpen, roleSelectList, setDataSource } = props
  const onEdit = (values) => {
    setIsEditOpen(false)
    getUserList().then((res) => {
      setDataSource(res)
    })
  }
  useEffect(() => {
    form.setFieldsValue({ ...currentEditUser })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEditUser])
  return (
    <div>
      <Modal
        open={isEditOpen}
        title="编辑用户"
        okText="确定"
        cancelText="取消"
        forceRender={true}
        onCancel={() => { setIsEditOpen(false) }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields()
              onEdit(values)
            })
            .catch((info) => {
              console.log('Validate Failed:', info)
            })
        }}
      >
        <Form
          form={form}
          // layout="vertical"
          name="EditUser"
          initialValues={{ ...currentEditUser }}
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
