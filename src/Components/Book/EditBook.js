import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editBook } from '../../store';

const EditBook = () => {
  const { books } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const book = books.find((book) => book.id === id);

  const [inputs, setInputs] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    description: book.description,
    price: book.price,
    imageUrl: book.imageUrl,
  });

  if (!book) return <h1>...loading</h1>;

  const onChange = (ev) => {
    setInputs({
      ...inputs,
      [ev.target.name]: ev.target.value,
    });
  };

  const update = (ev) => {
    ev.preventDefault();
    dispatch(editBook({ id: book.id, ...inputs }, navigate));
  };

  return (
    <div id='edit_book_page' style={{ height: '80vh' }}>

      <h1>Edit Book Information</h1>
      <form onSubmit={update}>
        <div>
          <label><strong>Title: </strong></label>
          <input name="title" value={inputs.title} onChange={onChange}></input>
        </div>
        <div>
          <label><strong>Author: </strong></label>
          <input
            name="author"
            value={inputs.author}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label><strong>Genre: </strong></label>
          <input name="genre" value={inputs.genre} onChange={onChange}></input>
        </div>
        <div>
          <label><strong>Price: </strong></label>
          <input name="price" value={inputs.price} onChange={onChange}></input>
        </div>
        <div>
          <label><strong>Image: </strong></label>
          <input
            name="imageUrl"
            type="url"
            value={inputs.imageUrl}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label><strong>Description: </strong></label>
          <textarea
            name="description"
            value={inputs.description}
            onChange={onChange}
          ></textarea>
        </div>
        <button id='update_book_button'>Update</button>
      </form>
    </div>
  );
};

export default EditBook;
