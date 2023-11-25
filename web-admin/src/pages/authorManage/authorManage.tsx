import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Modal, Form, Input, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios'

interface DataType {
  _id: string;
  first_name: string;
  family_name: string;
  date_of_birth: string;
  date_of_death: boolean;
}

type FieldType = {
  first_name: string;
  family_name: string;
  date_of_birth: string;
  date_of_death: boolean;
};


const UserManage: React.FC = () => {

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
      title: 'Birth',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
    },
    {
      title: 'Death',
      dataIndex: 'date_of_death',
      key: 'date_of_death',
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
    axios.get('http://localhost:3001/catalog/authors')
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
    axios.post('http://localhost:3001/catalog/author/create', values)
      .then(res => {
        setOpen(false);
        fetchDataList();
      })
      .catch(err => {
        console.log(err)
      })
  };

  const handleDelete = (id: string) => {
    axios.get('http://localhost:3001/catalog/author/' + id + '/delete')
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
            label="Date of birth"
            name="date_of_birth"
            rules={[{ required: true, message: 'Please input date_of_birth!' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item<FieldType>
            label="Date of death"
            name="date_of_death"
            rules={[{ required: true, message: 'Please input date_of_death!' }]}
          >
            <DatePicker />
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

export default UserManage;