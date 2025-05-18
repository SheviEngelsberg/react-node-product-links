import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name');
        const savedCategory = localStorage.getItem('selectedCategory');

        setIsLoggedIn(!!token);
        setUserName(name);
        if (savedCategory) {
            setSelectedCategory(savedCategory);
        }
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            localStorage.setItem('selectedCategory', selectedCategory);
        }
    }, [selectedCategory]);

    const handleCategoryClick = (category: string) => {
        if (!isLoggedIn) {
            alert('כדי להמשיך, עליך להתחבר או להירשם קודם');
            return;
        }
        navigate(`/category/${encodeURIComponent(category)}`);
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <div className="video-container">
            <video
                src={isLoggedIn ? "/videos/reka.mp4" : "/videos/reka b.mp4"}
                autoPlay
                muted
                loop
                className="background-video"
            />

            <div className='contaner'>
                <div className="header">
                    {isLoggedIn ? (
                        <div className="user-initial">
                            <button onClick={handleProfileClick} className="user-button">
                                {userName?.charAt(0).toUpperCase()}
                            </button>
                        </div>
                    ) : (
                        <div className="buttons">
                            <button onClick={() => navigate('/signin')} className="inButton">התחברות</button>
                            <button onClick={() => navigate('/signup')} className="upButton">הרשמה</button>
                            <div className="top-link">
                                <span onClick={() => navigate('/store-owner-login')}>
                                    בעלת חנות? <u>התחברי כאן</u>
                                </span>
                            </div>


                        </div>
                    )}
                    <img src={logo} alt="logo" className="logo" />
                </div>
                <div className='text'>
                    {!isLoggedIn ? (
                        <>
                            <p className="main-text" id='label'>
                                !ברוכה הבאה לעולם שלך<br />
                                כל מה שאת אוהבת במקום אחד<br />
                            </p><p className="main-text">
                                !חלמת? חיפשת? מצאת <br />
                                💖 קבלי לינק שאת הולכת להתאהב בו 💖<br />
                            </p>
                        </>) :
                        <p className="main-text">
                            💖 בחרי את מה שאת הכי אוהבת💖
                        </p>
                    }
                </div>

                {isLoggedIn && (
                    <div className="Categories">
                        {['בגדים', 'משחקים', 'נעליים'].map((category) => (
                            <button
                                key={category}
                                className={selectedCategory === category ? 'selected' : ''}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Home;
