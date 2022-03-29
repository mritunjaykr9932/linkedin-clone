import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login.js";
import Home from './components/Home.js';
import Header from './components/Header.js';
import './App.css';
import { useEffect } from 'react';
import {getUserAuth} from './actions';
import {connect} from 'react-redux';

function App(props) {

  useEffect(() => {
    props.getUserAuth();
  }, []);
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<> <Header/> <Home /> </>} />
        </Routes>

      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {

  };
};
const mapDispatchToProps = (Dispatch) => ({
  getUserAuth: () => Dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
