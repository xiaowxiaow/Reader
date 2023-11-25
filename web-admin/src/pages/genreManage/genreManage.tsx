import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Modal, Form, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios'

interface DataType {
  _id: string;
  name: string;
}

type FieldType = {
  name?: string;
  password?: string;
};

const GenreManage: React.FC = () => {

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
    axios.get('http://localhost:3001/catalog/genres')
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
    axios.post('http://localhost:3001/catalog/genre/create', values)
      .then(res => {
        setOpen(false);
        fetchDataList();
      })
      .catch(err => {
        console.log(err)
      })
  };

  const handleDelete = (id: string) => {
    axios.get('http://localhost:3001/catalog/genre/' + id + '/delete')
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
          // initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input name!' }]}
          >
            <Input />
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

export default GenreManage;