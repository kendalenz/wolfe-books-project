import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

const Books = () => {
  const { books } = useSelector((state) => state);
  const [genre, setGenre] = useState('');
  const navigate = useNavigate();
  const {filter} = useParams();
  const filtered = books.filter(book => !filter || book.title.toLowerCase().includes(filter.toLowerCase()));

  const Bookcard = (props) => {
    return (
      <div style={{ padding: '2rem', margin: '1rem' }}>
        <img src={props.imageUrl} className="books_page_img" alt="Book cover" />
        <br></br>
        <Link to={`/books/${props.id}`}>
          <strong>{props.title}</strong>
        </Link>
        <strong>{props.author}</strong>
        <br></br>
        <br></br>${props.price}
      </div>
    );
  };

  const genres = [];

  const getUniqueGenres = () => {
    books.forEach((book) => {
      if (!genres.includes(book.genre)) {
        genres.push(book.genre);
      }
    });
  };

  getUniqueGenres();

  return (
    <div className="content" style={{ height: '150vh' }}>
      <form className="genre_form">
        <label form="genre">View by genre:</label>
        <select value={genre} onChange={(ev) => setGenre(ev.target.value)}>
          <option value="">All</option>
          {genres.map((genre) => {
            return (
              <option key={genre} value={genre}>
                {genre}
              </option>
            );
          })}
        </select>
      </form>

      <div>
        <input value={filter || ''} placeholder='filter' onChange={
          ev => {
            if(ev.target.value==='') {
              navigate('/books')
            } else {
              navigate(`/books/search/${ev.target.value}`)
            }
          }
          }/>
      </div>

      <div className="books_div">
        {genre
          ? books
              .filter((book) => book.genre === genre)
              .map((book) => (
                <Bookcard
                  id={book.id}
                  key={book.id}
                  imageUrl={book.imageUrl}
                  title={book.title}
                  author={book.author}
                  price={book.price}
                />
              ))
          :
          filter
          ? 
            filtered.map(book => {
                return (
                    <Bookcard
                    id={book.id}
                    key={book.id}
                    imageUrl={book.imageUrl}
                    title={book.title}
                    author={book.author}
                    price={book.price}
                    />
                )
            }) 
          : books.map((book) => (
              <Bookcard
                id={book.id}
                key={book.id}
                imageUrl={book.imageUrl}
                title={book.title}
                author={book.author}
                price={book.price}
              />
            ))}
      </div>
    </div>
  );
};

export default Books;
