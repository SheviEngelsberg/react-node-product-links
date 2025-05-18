import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        password: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name');
        if (!token || !name) {
            navigate('/signin');
        } else {
            setUser({ name, password: '' });
        }
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            alert(userId)
            const response = await axios.put(
                `http://localhost:5000/users/updateUser/${userId}`,
                user,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
            alert('הפרטים עודכנו בהצלחה');
            if (response.data.name) {
                localStorage.setItem('name', response.data.name);
            }
        } catch (error) {
            console.error('שגיאה מלאה:', error);
            if (axios.isAxiosError(error)) {
                alert(`שגיאה: ${error.response?.data?.message || error.message}`);
            } else {
                alert('קרתה שגיאה בעדכון הפרופיל');
            }
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleRemoval = async () => {
        try {
            const token = localStorage.getItem('token'); // אם את שומרת אותו שם
            const userId = localStorage.getItem('userId');
            await axios.delete(`http://localhost:5000/users/deleteUser/${userId}`, {
                headers: {
                    Authorization: token,
                },
            });
            localStorage.clear();
            alert('User deleted successfully!');
            navigate('/');

            // כאן את יכולה גם לעדכן state כדי להסיר את המשתמש מהרשימה בצד לקוח
        } catch (error: any) {
            console.error(error);
            alert(error.response?.data?.message || 'Failed to delete user');
        }
    };
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="profile-container">
            <button className="close-button" onClick={() => navigate('/')}>×</button>
            <h2>💖 הפרופיל שלך 💖</h2>
            <div className="profile-form">
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="שם חדש"
                />
                <div className="password-field">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="סיסמה חדשה"
                    />
                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </span>
                </div>

                <button onClick={handleUpdate}>עדכן פרטים</button>
                <button onClick={handleLogout} className="logout">התנתק</button>
                <button onClick={handleRemoval} className="removal">הסרה מהמערכת</button>


            </div>
        </div>
    );
};

export default Profile;
