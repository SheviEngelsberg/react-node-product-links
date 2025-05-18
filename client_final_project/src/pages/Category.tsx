import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Category.css'

const Category = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    const [searchTerm, setSearchTerm] = useState('');
    const [userName, setUserName] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const name = localStorage.getItem('name');
        setUserName(name);
    }, []);

    const handleSearch = () => {
        if (!searchTerm.trim()) return;

        navigate(`/search?term=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(categoryName || '')}`);
    };

    return (
        <div className="search-section">
            <button className="close-button" onClick={() => navigate('/')}>×</button>
            <h3>!{userName} היי </h3>
            <h3>?מה תרצי לחפש בקטגוריית {categoryName}</h3>
            <div className="search-wrapper">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="הקלידי שם מוצר..."
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">
                    🔍
                </button>
            </div>
        </div>
    );
};

export default Category;
