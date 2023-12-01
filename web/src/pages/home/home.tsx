import React, { useState, useEffect } from 'react'
import './home.css';
import axios from 'axios'
import Head from '../../components/head/head'
import bookCover from '../../assets/book_cover.png'
import authorImg from '../../assets/author.png'
import { BookType, AuthorType } from '../../type/index'
import { host } from '../../constant'

const Home: React.FC = () => {

  const [newBook, setNewBook] = useState([] as BookType[]);
  const [authorList, setAuthorList] = useState([] as AuthorType[]);

  useEffect(() => {
    fetchAuthor()
  }, [])

  const fetchNewBook = async (authors: AuthorType[]) => {
    const { data } = await axios.get(host + '/catalog/books')

    data.map((item: BookType) => {
      let author = authors.find(elem => elem._id === item.author)
      item.authorName = author?.first_name + " " + author?.family_name
      return item;
    })

    setNewBook(data)
  }

  const fetchAuthor = async () => {
    const { data } = await axios.get(host + '/catalog/authors')
    setAuthorList(data)
    fetchNewBook(data)
  }

  const toInfo = (id: any) => {
    window.location.href = `/#/author-info?id=${id}`
  }

  const toBookInfo = (id: any) => {
    window.location.href = `/#/book-info?id=${id}`
  }

  return (
    <div className="index-page page">
      <Head></Head>
      <div className="left">
        <h2>Book List</h2>
        <div className="book-list">
          {
            newBook.map((book: BookType, index) => {
              return (
                <div className="book" key={index} onClick={() => { toBookInfo(book._id) }}>
                  <img src={bookCover} alt="" />
                  <p className="name">{book.title}</p>
                  <p className="author">{book.authorName}</p>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="author-list">
        <h2>Author List</h2>
        {
          authorList.map((author: AuthorType, index) => {
            return (
              <p key={index} onClick={() => { toInfo(author._id) }}>
                <img src={authorImg} alt="" />
                <span>{author.first_name + ' ' + author.family_name}</span>
              </p>
            )
          })
        }
      </div>
    </div >
  )
}
export default Home