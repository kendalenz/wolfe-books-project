import React, { useState } from "react";
import { useSelector } from "react-redux";

const Books = ()=> {
    const { books } = useSelector(state => state);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');

    return (
        <ul>
            <li>Hello world!</li>
        </ul>
    )
};

export default Books;