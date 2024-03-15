import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './components/signin&signup/Signin';
import Signup from './components/signin&signup/Signup';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signin></Signin>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
