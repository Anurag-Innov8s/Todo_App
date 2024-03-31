import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
// import { TodoWrapper } from './components/TodoWrapper';
import { TodoWrapper } from './components/TodoWrapper';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="home" element={<TodoWrapper/>}></Route>
      </Routes>
      
    </Router> 
  );
}

export default App;
