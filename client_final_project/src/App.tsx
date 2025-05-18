import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Category from './pages/Category'

import StoreOwnerLogin from './pages/StoreOwnerLogin'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/store-owner-login" element={<StoreOwnerLogin />} />

      </Routes>
    </Router>
  );
}

export default App;
