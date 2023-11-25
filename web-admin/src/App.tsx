import React, { useState, useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css'

import {
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
// 导入页面组件
import Login from './pages/login/login';
import UserManage from './pages/userManage/userManage';
import AuthorManage from './pages/authorManage/authorManage';
import BookManage from './pages/bookManage/bookManage';
import GenreManage from './pages/genreManage/genreManage';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('User Manage', '/user-manage', <PieChartOutlined />),
  getItem('Author Manage', '/author-manage', <PieChartOutlined />),
  getItem('Book Manage', '/book-manage', <PieChartOutlined />),
  getItem('Genre Manage', '/genre-manage', <PieChartOutlined />),
];

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState({} as any);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleClick = (e: any) => {
    // eslint-disable-next-line no-restricted-globals
    location.href = '/#' + e.key
  }

  useEffect(() => {
    const uinfo = window.localStorage.getItem('userInfo')
    if (uinfo) {
      setUserInfo(JSON.parse(uinfo))
      window.location.href = '/#/user-manage'
    } else if (window.location.hash) {
      window.location.href = '/'
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('userInfo')
    window.location.reload()
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical">
          Book Management
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleClick} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{ textAlign: 'right', paddingRight: 16 }}><a onClick={() => { logout() }}>{userInfo.first_name} {userInfo.family_name}, Logout</a></div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, marginTop: 16 }}>
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/user-manage" element={<UserManage />} />
                <Route path="/author-manage" element={<AuthorManage />} />
                <Route path="/book-manage" element={<BookManage />} />
                <Route path="/genre-manage" element={<GenreManage />} />
              </Routes>
            </Router>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;