import { Button, Form, Input, Modal, notification, Space } from 'antd';
import { useEffect, useState } from 'react';
import { addUser, editUser, IPagition, User } from '../../service/api';
import './index.css';
interface IFormCRUDProps {
  title: string;
  visible: boolean;
  onCancel: () => void;
  data?: User;
  isEdit: boolean;
  getDataUser:(payload:IPagition)=>void;
}
const FormCRUD = (props: IFormCRUDProps) => {
  const { title, visible, onCancel, data, isEdit ,getDataUser } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFinish = (values: User) => {
    if (isEdit) {
      return handleEditUser(values);
    }

    return handleAddUser(values);
  };

  const handleEditUser = async (values: User) => {
    setIsLoading(true);
    const payload:User = {
        id:data?.id,
        ...values
    }
    const result = await editUser(payload);
    const { status } = result;
    if (status === 200) {
      onCancel()
      setIsLoading(false);
      form.resetFields();
      getDataUser({limit:5,page:1})
      notification.success({message:'Edit user success',placement:'topRight'})
    } else {
      setIsLoading(false);
      notification.success({message:'Edit user failed',placement:'topRight'})
    }
  };

  const handleAddUser = async(values: User) => {
    setIsLoading(true);
  
    const result = await addUser(values);
    const { status } = result;
    if (status === 200) {
      onCancel()
      setIsLoading(false);
      form.resetFields();
      getDataUser({limit:5,page:1})
      notification.success({message:'Add user success',placement:'topRight'})
    } else {
      setIsLoading(false);
      notification.success({message:'Add user failed',placement:'topRight'})
    }
  };

  useEffect(()=>{
    if(data) return form.setFieldsValue(data);
  },[data,form])

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Space key="action">
          <Button type="primary" size="large" loading={isLoading} onClick={() => form.submit()}>
            {isEdit ? 'Save' : 'Create'}
          </Button>
          <Button disabled={isLoading} onClick={onCancel} size="large">
            Cancel
          </Button>
        </Space>,
      ]}
    >
      <Form form={form} initialValues={{ name: '', email: '', position: '' }} onFinish={onFinish} scrollToFirstError layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              whitespace: true,
              message: 'Please input name',
            },
          ]}
        >
          <Input placeholder="Enter employee's name" maxLength={256} size="large" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid email!',
            },
            {
              required: true,
              message: 'Please input email!',
            },
          ]}
        >
          <Input placeholder="Enter employee's email" maxLength={256} size="large" />
        </Form.Item>
        <Form.Item
          name="position"
          label="Position"
          rules={[
            {
              required: true,
              whitespace: true,
              message: 'Please input position',
            },
          ]}
        >
          <Input placeholder="Enter employee's position" maxLength={256} size="large" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormCRUD
