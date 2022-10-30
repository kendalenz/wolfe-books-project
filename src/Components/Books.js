import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Books = ()=> {
    const { books } = useSelector(state => state);
    // const dispatch = useDispatch();
    // const [title, setTitle] = useState('');
    // const [author, setAuthor] = useState('');
    // const [price, setPrice] = useState(0);

    return (
        <ul>
            <h4>Fiction</h4>

            {
                books.map(book => {
                    return (
                        <li key = {book.id}>
                            {book.title}
                        </li>
                    )
                })
            } 

        </ul>
    )
};

export default Books;