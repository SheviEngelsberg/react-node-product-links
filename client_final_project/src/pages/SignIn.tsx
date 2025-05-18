import { Link , useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './AuthForm.css'


const SignIn = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:5000/users/signIn', {
            name,
            password,
          });
    
          alert('התחברת בהצלחה!');
          console.log('User:', response.data.user);
          console.log('Token:', response.data.token);
    
          // שמירת הטוקן בלוקאל סטורג' (אופציונלי)
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('name', response.data.user.name);
            localStorage.setItem('password', response.data.user.password);
            localStorage.setItem('userId', response.data.user._id);

          // מעבר לעמוד אחר
          navigate('/');
        } catch (error: any) {
          if (axios.isAxiosError(error)) {
            console.error('שגיאת התחברות:', error.response?.data || error.message);
          } else {
            console.error('שגיאה כללית:', error);
          }
          alert('עדיין לא נרשמת לאתר');
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
              <button type="submit" className="auth-button">התחברי</button>
            </form>
            <div className="auth-links">
              <Link to="/signup" className="auth-link">אין לך חשבון? הרשמי כאן</Link>
              <Link to="/" className="auth-link">לעמוד הבית</Link>
            </div>
          </div>
        );
      };
      
      export default SignIn;
        