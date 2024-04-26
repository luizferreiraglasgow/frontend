import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Post from './components/Post'; // Import the Post component
import { AuthProvider } from './contexts/AuthContext'; // Import the AuthProvider
import AddPost from './components/AddPost';
import Category from './components/Category';
import UserPage from './components/User';
import Footer from './components/Footer';
function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap the entire component tree with AuthProvider */}
        <Navbar />
        <main className='pt-5'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/addPost" element={<AddPost />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/user/:userId" element={<UserPage />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
