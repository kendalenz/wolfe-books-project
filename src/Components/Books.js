import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Books = () => {
  const { books } = useSelector((state) => state);

  const Bookcard = (props) => {
    return (
        <div style={{padding: '2rem', margin: '1rem'}}>
            <img src={props.imageUrl} className='books_page_img' alt='Book cover'/>
            <br></br>
            <strong>{props.title}</strong>
            <br></br>
            <strong>{props.author}</strong>
            <br></br>
            {props.price}
        </div>
    );
};

  return (
    <div className='books_div'>

      {
        books.map((book) => <Bookcard imageUrl={book.imageUrl} title={book.title} author={book.author} price={book.price}/>)
        // {
        // const fictionGenre = books.filter(book => book.genre === 'Fiction');

        // const nonFictionGenre = books.filter(book => book.genre === 'Non-fiction');
            // return (
            //     <>
            //         <bookCard />
            //     </>
        //   <div className='books_div'key={book.id}>
        //     <img src={book.imageUrl} className='books_page_img' alt='Book cover'/>
        //     <br></br>
        //     <Link to={`/books/${book.id}`}><strong>{book.title}</strong></Link>
        //     <br></br>
        //     <strong>{book.author}</strong>
        //     <br></br>
        //     <br></br>
        //     ${book.price}
        //     <br></br>
        //     <br></br>
        //   </div>
            // );
    //   })
    }
    </div>
  );
};

export default Books;
