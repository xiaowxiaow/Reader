import React, { useState, useEffect } from 'react'
import './bookInfo.css';
import axios from 'axios'
import Head from '../../components/head/head'
import { BookType, CommentType, UserType, AuthorType } from '../../type/index'
import bookCover from '../../assets/book_cover.png'
import avatarImg from '../../assets/head.png'

const BookInfo = () => {
  const [book, setBook] = useState({} as BookType);
  const [userInfo, setUserInfo] = useState({} as UserType);
  const [commentList, setCommentList] = useState([]);
  const [text, setText] = useState('');
  const [authorList, setAuthorList] = useState([] as AuthorType[]);

  useEffect(() => {
    fetchCommentList()
    fetchAuthor();
    const uinfo = window.localStorage.getItem('userInfo')
    if (uinfo) {
      const uu = JSON.parse(uinfo)
      setUserInfo(uu)
    }
  }, [])

  const fetchBook = async (authors: AuthorType[]) => {
    const id = window.location.hash.split('=')[1]
    const { data } = await axios.get(
      `http://localhost:3001/catalog/book/${id}`
    )
    let author = authors.find(elem => elem._id === data.author)
    data.authorName = author?.first_name + " " + author?.family_name
    setBook(data)
  }

  const fetchCommentList = async () => {
    const id = window.location.hash.split('=')[1]
    const { data } = await axios.get(
      `http://localhost:3001/catalog/comments`
    )
    setCommentList(data.filter((item: CommentType) => id === item.book))
  }

  const fetchAuthor = async () => {
    const { data } = await axios.get('http://localhost:3001/catalog/authors')
    setAuthorList(data)
    fetchBook(data)
  }

  const handleSubmit = async () => {
    if (!userInfo._id) {
      return
    }
    const id = window.location.hash.split('=')[1]
    await axios.post('http://localhost:3001/catalog/comment/create', {
      book: id,
      content: text,
      score: '5',
      user: userInfo._id
    })
    setText('')
    fetchCommentList()
  }

  return (
    <div className='page'>
      <Head></Head>
      <div className="book-info">
        <div className="info">
          <img src={bookCover} alt="" />
          <div>
            <h1>{book.title}</h1>
            <p>Author: {book.authorName}</p>
            <p>ISBN: {book.isbn}</p>
            <p className="desc">{book.summary}</p>
          </div>
        </div>

        <div className="comment-list">
          <h2>Comment</h2>
          <div className="comment-input">
            <input value={text} type="text" disabled={!userInfo._id} placeholder={userInfo._id ? 'Say something' : 'please log in first'} onInput={({ target }: { target: any }) => { setText(target.value) }} />
            <div className="button" onClick={() => { handleSubmit() }} >Submit</div>
          </div>
          {
            commentList.map((comment: CommentType, index) => {
              return (
                <div className="comment-item" key={index}>
                  <div className="name">
                    <img src={avatarImg} alt="" />
                    <span>{userInfo.first_name} {userInfo.family_name}</span>
                  </div>
                  <div className="content">{comment.content}</div>
                  <div className="time">{Array(Number(comment.score)).fill('★').join('')}</div>
                </div>
              )
            })
          }
        </div >
      </div >
    </div>
  )
}
export default BookInfo