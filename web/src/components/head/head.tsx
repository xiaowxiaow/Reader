import React, { useState, useEffect } from 'react'
import './head.css';
import axios from 'axios'
import { UserType } from '../../type';

const Head: React.FC = () => {
  const [userInfo, setUserInfo] = useState({} as UserType);
  const [showDialog, setShowDialog] = useState(false);
  const [email, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const uinfo = window.localStorage.getItem('userInfo')
    if (uinfo) {
      setUserInfo(JSON.parse(uinfo))
    }
  }, [])

  const toHome = () => {
    window.location.href = '/#/'
  }

  const handleLogin = async () => {
    if (email && password) {
      const { data } = await axios.post('http://localhost:3001/users/login', {
        email, password
      })
      setShowDialog(false)
      setUserInfo(data)
      window.localStorage.setItem('userInfo', JSON.stringify(data))
      window.location.reload()
    }
  }

  const logout = () => {
    window.localStorage.removeItem('userInfo')
    window.location.reload()
  }

  return (
    <div className="header">
      <div className="content">
        <div className="logo" onClick={() => { toHome() }} >Book Review Club</div>
        {
          !userInfo._id ? (
            <div className="button" onClick={() => { setShowDialog(true) }}>Login</div>
          ) : (
            <div className='action'>
              <span>{userInfo.email}</span>
              <span onClick={() => { logout() }}>Logout</span>
            </div>
          )
        }
      </div>

      {
        showDialog ? (
          <div className="dialog">
            <h2>Login</h2>
            <div>
              <label>Email:</label>
              <input value={email} type="text" onInput={({ target }: { target: any }) => { setName(target.value) }} />
            </div>
            <div>
              <label>Password:</label>
              <input value={password} type="password" onInput={({ target }: { target: any }) => { setPassword(target.value) }} />
            </div>
            <div className="button" onClick={() => { handleLogin() }}>Login</div>
          </div>
        ) : null
      }

    </div >
  )
}
export default Head