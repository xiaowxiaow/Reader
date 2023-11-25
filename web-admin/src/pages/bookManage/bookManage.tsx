import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Modal, Form, Input, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';

interface DataType {
  _id: string;
  title: string;
  author: string;
  summary: string;
  isbn: string;
  genre: string;
}

type FieldType = {
  title: string;
  author: string;
  summary: string;
  isbn: string;
  genre: string;
};

const { Option } = Select;

const UserManage: React.FC = () => {

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'summary',
      dataIndex: 'summary',
      key: 'summary',
    },
    {
      title: 'isbn',
      dataIndex: 'isbn',
      key: 'isbn',
    },
    {
      title: 'genre',
      dataIndex: 'genre',
      key: 'genre',
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
  const [authors, setAuthors] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    fetchDataList()
    fetchAuthors();
    fetchGenres();
  }, [])

  const fetchDataList = () => {
    axios.get('http://localhost:3001/catalog/books')
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const fetchAuthors = () => {
    axios.get('http://localhost:3001/catalog/authors')
      .then(res => {
        setAuthors(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const fetchGenres = () => {
    axios.get('http://localhost:3001/catalog/genres')
      .then(res => {
        setGenres(res.data)
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
    axios.post('http://localhost:3001/catalog/book/create', values)
      .then(res => {
        setOpen(false);
        fetchDataList();
      })
      .catch(err => {
        console.log(err)
      })
  };

  const handleDelete = (id: string) => {
    axios.get('http://localhost:3001/catalog/book/' + id + '/delete')
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
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Author"
            name="author"
            rules={[{ required: true, message: 'Please input author!' }]}
          >
            <Select
              placeholder="Select author"
              allowClear
            >
              {
                authors.map((author: any) => (
                  <Option key={author._id} value={author._id}>
                    {author.first_name + '' + author.family_name}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            label="Summary"
            name="summary"
            rules={[{ required: true, message: 'Please input summary!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Isbn"
            name="isbn"
            rules={[{ required: true, message: 'Please input isbn!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Genre"
            name="genre"
            rules={[{ required: true, message: 'Please input genre!' }]}
          >
            <Select
              placeholder="Select genre"
              allowClear
            >
              {
                genres.map((genre: any) => (
                  <Option key={genre._id} value={genre._id}>
                    {genre.name}
                  </Option>
                ))
              }
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
}


export default UserManage;