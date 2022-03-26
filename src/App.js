import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login.js";
import Home from './components/Home.js';
import Header from './components/Header.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<><Header /> <Home /></>} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
