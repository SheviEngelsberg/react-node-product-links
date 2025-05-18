import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './StoreOwnerLogin.css';

const StoreOwnerLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // כאן תבצעי קריאה ל-API שלך
        console.log('Logging in as store owner:', { email, password });
    };

    return (
        <div className="video-container">
            {/* <video
                src="/videos/reka.mp4"
                autoPlay
                muted
                loop
                className="background-video"
            /> */}
            <div className="store-owner-login-container">
                <h1 className="store-owner-title">התחברות לבעלות חנות</h1>
                <form className="store-owner-form" onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="שם משתמש"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="סיסמה"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">התחברי</button>
                </form>
                <button className="back-button" onClick={() => navigate('/')}>
                     לדף הבית
                </button>
            </div>
        </div>
    );
};

export default StoreOwnerLogin;
