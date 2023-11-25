export interface BookType {
  _id: string;
  title: string;
  author: string;
  summary: string;
  isbn: string;
  genre: string;

  authorName: string;
}

export interface AuthorType {
  _id: string;
  first_name: string;
  family_name: string;
  date_of_birth: string;
  date_of_death: string;
}

export interface CommentType {
  _id: string;
  book: string;
  content: string;
  score: string;
  user: string;
}

export interface UserType {
  _id: string;
  first_name: string;
  family_name: string;
  email: string;
  password: string;
  identity: string;
}
