import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Books = ()=> {
    const { books } = useSelector(state => state);
    return (
        <ul>
            {/* <h4>Fiction</h4> */}

            {
                books.map(book => {
                    return (
                        <li key = {book.id}>
                            <Link to={`/books/${book.id}`}>{book.title}</Link>
                        </li>
                    )
                })
            } 

        </ul>
    )
};

export default Books;