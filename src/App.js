import Form from './components/Form'
import './App.css';
import {
  BrowserRouter as Router,
  useNavigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import { useEffect } from 'react';


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/form' element={<Form />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
