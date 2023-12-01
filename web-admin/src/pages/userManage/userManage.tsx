import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Modal, Form, Input, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios'
import { host } from '../../constant'

interface DataType {
  _id: string;
  first_name: string;
  family_name: string;
  email: string;
  password: string;
  identity: string;
}

type FieldType = {
  first_name: string;
  family_name: string;
  email: string;
  password: string;
  identity: string;
};

const { Option } = Select;

const UserManemail: React.FC = () => {

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (_, record) => <div>{record.first_name + ' ' + record.family_name}</div>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Identity',
      dataIndex: 'identity',
      key: 'identity',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a onClick={() => {
            handleDelete(record._id)
          }}>Delete</a>
        </Space>
      ),
    },
  ];


  const [data, setData] = useState()

  useEffect(() => {
    fetchDataList()
  }, [])

  const fetchDataList = () => {
    axios.get(host + '/users')
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = (values: any) => {
    axios.post(host + '/users/create', values)
      .then(res => {
        setOpen(false);
        fetchDataList();
      })
      .catch(err => {
        console.log(err)
      })
  };

  const handleDelete = (id: string) => {
    axios.get(host + '/users/' + id + '/delete')
      .then(res => {
        fetchDataList();
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <Button type='primary' onClick={showModal}>Create</Button>
      <Table rowKey="_id" columns={columns} dataSource={data} pagination={false} />

      <Modal
        open={open}
        title="Create"
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: 'Please input first_name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Family Name"
            name="family_name"
            rules={[{ required: true, message: 'Please input family_name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input password!' }]}
          >
            <Input type='password' />
          </Form.Item>
          <Form.Item<FieldType>
            label="Identity"
            name="identity"
            rules={[{ required: true, message: 'Please input identity!' }]}
          >
            <Select
              placeholder="Select author"
              allowClear
            >
              <Option value="user">user</Option>
              <Option value="admin">admin</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
};

export default UserManemail;