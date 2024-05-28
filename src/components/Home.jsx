import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Home.css';
import { ThreeCircles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleClick = (e) => {
        e.preventDefault(); // Prevent default behavior
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/new'); // Navigate after loader
        }, 3000); // Set loading to false and navigate after 3 seconds
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm section-same section2">
                        Find<br /> yourself in a <br />GreatBook

                        <button className='sub-section' onClick={handleClick} disabled={loading}>
                            {loading ? 'Loading...' : 'Get Started'}
                        </button>
                    </div>
                    <div className="col-sm section-same section1">
                        <img src="./book-lover-44.png" alt="Hello" />
                    </div>
                </div>
                <p className='signature'>Made With ❤️ by Dx</p>
            </div>

            {loading && (
                <div className="loader-container">
                    <ThreeCircles
                        visible={true}
                        height="100"
                        width="100"
                        color="#4fa94d"
                        ariaLabel="three-circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            )}
            
        </div>
    );
};

export default Home;
