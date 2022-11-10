import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../../store';

const CreateBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    price: 0.0,
    imageUrl: '',
  });

  const onChange = (ev) => {
    setBook({ ...book, [ev.target.name]: ev.target.value });
  };

  const create = (ev) => {
    ev.preventDefault();
    dispatch(createBook(book, navigate));
  };

  return (
    <div>
      <form onSubmit={create}>
        <div>
          <label>Title</label>
          <input
            placeholder="title"
            name="title"
            value={book.title}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Author</label>
          <input
            placeholder="author"
            name="author"
            value={book.author}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Genre</label>
          <input
            placeholder="genre"
            name="genre"
            value={book.genre}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            placeholder="$$"
            name="price"
            value={book.price}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            placeholder="image link"
            name="imageUrl"
            value={book.imageUrl}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={book.description}
            onChange={onChange}
          ></textarea>
        </div>
        <button>Add Book to Store!</button>
      </form>
    </div>
  );
};

export default CreateBook;
