import React from 'react'
import { Form, Input, Select, Modal } from 'antd'
import { getUserList } from '../../../../api/user'
export default function EditUserFormModal (props) {
  const [form] = Form.useForm()
  const { isEditOpen, setIsEditOpen, roleSelectList, setDataSource } = props
  const onCreate = (values) => {
    setIsEditOpen(false)
    getUserList().then((res) => {
      setDataSource(res)
    })
  }
  return (
    <div>
      <Modal
        open={isEditOpen}
        title="编辑用户"
        okText="确定"
        cancelText="取消"
        onCancel={() => { setIsEditOpen(false) }}
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
          name="updateUser"
        ></Form>
      </Modal>
    </div>
  )
}
