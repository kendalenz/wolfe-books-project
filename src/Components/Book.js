import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Book = () => {
  const { books } = useSelector((state) => state);
  const { id } = useParams();

  const book = books.find((book) => book.id === id);

  if (!book) return <h1>...loading</h1>;

  return <ul>{book.title}</ul>;
};

export default Book;
