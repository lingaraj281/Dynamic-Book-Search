import React, { useState, useEffect } from "react";
import '../App.css'
import { useNavigate } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';

export default function Dummy() {
    const [book, setBook] = useState([]);
    const [result, setResult] = useState([]);
    const [apiKey, setApiKey] = useState("AIzaSyDQdd-uMz41av9UYv8OGyWSeW0PyxBPqEM");
    const navigate = useNavigate(); 
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query'); // Access 'query' parameter instead of 'prev'
    const truncateText = (text, maxWords) => {
        if (!text) return "";
        const words = text.split(" ");
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(" ") + "...";
        }
        return text;
    };
    const truncateText1 = (t1) => {
        if (!t1) return "";
        const t2 = t1.split("-")[0];
        return t2;
    };

    useEffect(() => {
        if (query) {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=40`)
                .then(response => response.json())
                .then(data => {
                    if (data.items) {
                        setResult(data.items);
                        setBook(data.items);
                    } else {
                        setResult([]);
                        setBook([]);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                });
        } else {
            setResult([]);
            setBook([]);
        }
    }, [query, apiKey]);

    return (
        <div>
            <h1 className="results-heading">Search Results for "{query}"</h1>

<div className="results">
                {result.map(book => (

                    <div key={book.id} className="book-item">
                        <div class="container">
                            <div class="row">
                                <div class="col-3 left-col">
                                    <img
                                        className="results-img"
                                        src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'placeholder.jpg'}
                                        alt={book.volumeInfo.title}
                                    />
                                </div>
                                <div class="col-sm">
                                    <div className="row-sm">
                                        <span className="book-title">{book.volumeInfo.title} | {book.volumeInfo.authors}</span>
                                    </div>
                                    <div className="row-sm"></div>
                                    <div className="row-sm">
                                        
                                    <p className="book-Description">
            {book.volumeInfo.description
              ? truncateText(book.volumeInfo.description, 30)
              : 'No Description Available'}
          </p>
                                    <button className="more-info"><a href={book.volumeInfo.previewLink}>More Information</a>
                                    </button>
                                    </div>
                                    <div className="row-sm">Average Rating : {book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 'N/A'}</div>
                                    <p key={book.id}>Published Year : {book.volumeInfo.publishedDate ? truncateText1(book.volumeInfo.publishedDate):'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>    
        </div>
    )
}
