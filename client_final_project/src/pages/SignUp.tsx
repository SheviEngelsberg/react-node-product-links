import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';

const SignUp = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
      const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/users/signUp', {
                name,
                password,
                type: 'user'
            });

            alert('נרשמת בהצלחה!');

            const response = await axios.post('http://localhost:5000/users/signIn', {
                name,
                password,
            });

            alert('התחברת בהצלחה!');


            localStorage.setItem('token', response.data.token);
            localStorage.setItem('name', response.data.user.name);
            localStorage.setItem('password', response.data.user.password);
            localStorage.setItem('userId', response.data.user._id);

            navigate('/');
        } catch (error: any) {
            alert('אירעה שגיאה בהרשמה');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    placeholder="שם"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="auth-input"
                />
                <input
                    type="password"
                    placeholder="סיסמה"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                />
                <button type="submit" className="auth-button signup">הרשמי</button>
            </form>
            <div className="auth-links">
                <Link to="/signin" className="auth-link">כבר רשומה? התחברי כאן</Link>
                <Link to="/" className="auth-link">לעמוד הבית</Link>
            </div>
        </div>
    );
};

export default SignUp;
