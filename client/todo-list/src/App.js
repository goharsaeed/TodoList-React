import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState } from 'react'; // Import useState
import Signup from './components/Signup';
import Login from './components/Login';
import Todo from './components/Todo';

function App() {
  // Use useState to manage the user's authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle user logout
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear the user's token from local storage
    localStorage.removeItem('token');
    // Set the isLoggedIn state to false
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
