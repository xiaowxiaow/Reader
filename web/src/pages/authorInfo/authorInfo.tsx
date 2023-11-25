import React, { useState, useEffect } from 'react'
import './authorInfo.css';
import axios from 'axios'
import Head from '../../components/head/head'
import { AuthorType, BookType } from '../../type/index'
import bookCover from '../../assets/book_cover.png'
import authorImg from '../../assets/author.png'

const AuthorInfo = () => {
  const [author, setAuthor] = useState({} as AuthorType);
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    fetchAuthor()
    fetchBook()
  }, [])

  const fetchAuthor = async () => {
    const id = window.location.hash.split('=')[1]
    const { data } = await axios.get(
      `http://localhost:3001/catalog/author/${id}`
    )
    setAuthor(data)
  }

  const fetchBook = async () => {
    const id = window.location.hash.split('=')[1]
    const { data } = await axios.get(
      `http://localhost:3001/catalog/books`
    )
    setBookList(data.filter((item: BookType) => item.author === id))
  }

  const toBookInfo = (id: any) => {
    window.location.href = `/#/book-info?id=${id}`
  }

  return (
    <div className='page'>
      <Head></Head>
      <div className="author-info page">
        <div className="info">
          <img src={authorImg} alt="" />
          <div>
            <h1>{author.first_name + ' ' + author.family_name}</h1>
            <p className="desc">{author.date_of_death} - {author.date_of_death}</p>
          </div>
        </div>
        <div className="lyric">
          <h2>Book</h2>
          <div className="book-list">
            {
              bookList.map((book: BookType, index) => {
                return (
                  <div className="book" key={index} onClick={() => { toBookInfo(book._id) }}>
                    <img src={bookCover} alt="" />
                    <p className="name">{book.title}</p>
                    <p className="author">{book.author}</p>
                  </div>
                )
              })
            }
          </div>
        </div >
      </div >
    </div>
  )
}
export default AuthorInfo
