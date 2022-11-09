import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Search = ()=> {
    const {books} = useSelector(state => state);
    const navigate = useNavigate();
    const {filter} = useParams(); 
    const filtered = books.filter(book => !filter || book.title.toLowerCase().includes(filter.toLowerCase()))

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
    
    return (
        <div>
            <input value={filter || ''} placeholder='filter' onChange={ev => navigate(`/books/search/${ev.target.value}`)}/>
            {/* <input value={filter || ''} placeholder='filter' onChange={ev => navigate(`/books/search/${ev.target.value}`)}/> */}
        {
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
        }  
    </div>
    )
}

export default Search;









