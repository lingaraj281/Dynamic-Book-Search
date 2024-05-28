import React, { useState, useEffect } from "react";
import '../App.css'
import { useNavigate } from 'react-router-dom'; 

export default function Dummy() {
    const [book, setBook] = useState([]);
    const [myOptions, setMyOptions] = useState([]);
    const [query, setQuery] = useState("");
    const [apiKey, setApiKey] = useState("AIzaSyDQdd-uMz41av9UYv8OGyWSeW0PyxBPqEM");
    const navigate = useNavigate(); 

    useEffect(() => {
        if (query) {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    if (data.items) {
                        setMyOptions(data.items);
                        setBook(data.items);
                    } else {
                        setMyOptions([]);
                        setBook([]);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                });
        } else {
            setMyOptions([]);
            setBook([]);
        }
    }, [query, apiKey]);

    const handleFilter = (value) => {
        setQuery(value);
        if (value === "") {
            setBook([]); 
        } else {
            const res = myOptions.filter(f => f.volumeInfo.title.toLowerCase().includes(value.toLowerCase()));
            setBook(res);
        }
    };

    const goBack = (e) =>{
        e.preventDefault()
        navigate(`/`)
    }
 
    const handleChange = (e) => {
        e.preventDefault();
        navigate(`/Search?query=${encodeURIComponent(query)}`);
    };
    
    return (
        
        <div className="con-1">
             <div className="con-2"> 
             <h1 className="head">Search any book</h1>
        <form onSubmit={handleChange}>
            <div className="form-group">
                <input type="text" onChange={e => handleFilter(e.target.value)} className="form-control" />
                <br />
                <button type="submit" className="btn btn-danger">Search</button>
            </div>
        </form>

        <div className="result">
            {book.map((d, i) => (
                <div key={i} className="result-list">
                    <a href={d.volumeInfo.previewLink} className="result-list-links">
                        {d.volumeInfo.title}
                    </a>
                </div>
            ))}
        </div></div>
        <button className="back-button" onClick={goBack}>Go Back</button>
        <p className='signature'>Made With ❤️ by Dx</p>
           
        </div>
    );
}
