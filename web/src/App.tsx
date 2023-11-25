import React from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Home from './pages/home/home'
import BookInfo from './pages/bookInfo/bookInfo'
import AuthorInfo from './pages/authorInfo/authorInfo'


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-info" element={<BookInfo />} />
        <Route path="/author-info" element={<AuthorInfo />} />
      </Routes>
    </Router>
  );
};

export default App;