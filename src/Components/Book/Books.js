import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

const Books = () => {
  const { books, auth } = useSelector((state) => state);
  const [genre, setGenre] = useState('');
  const navigate = useNavigate();
  const {filter} = useParams();
  const filtered = books.filter(book => !filter || book.title.toLowerCase().includes(filter.toLowerCase()) || book.author.toLowerCase().includes(filter.toLowerCase()));

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
    <div className="page_content" style={{ height: '150vh' }}>
      <div className="books_forms_div">
        <div className='genre_search_forms'>
          <div className="books_page_form">
          <form>
            <label form="genre">View by genre:</label>
            <select className='select'value={genre} onChange={(ev) => setGenre(ev.target.value)}>
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
          </div>
     
          <div className="books_page_form">
          <form>
            <label>Search Books:</label>
            <input value={filter || ''} onChange={
              ev => {
                if(ev.target.value==='') {
                  navigate('/books')
                } else {
                  navigate(`/books/search/${ev.target.value}`)
                }
              }
            }/>
          </form>
          </div>
        </div>
        
        <div className='add_book_button'>
          {auth.isAdmin ? <button><Link to="/createbook">Add a Book</Link></button> : null}
        </div>
    </div>

      <div className="books_div">
        { genre && filter
          ? books
          .filter((book) => book.genre === genre)
          .filter(book => !filter || book.title.toLowerCase().includes(filter.toLowerCase()) || book.author.toLowerCase().includes(filter.toLowerCase()))
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
        genre
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
            ? filtered.map(book => {
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
