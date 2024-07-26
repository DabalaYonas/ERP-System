import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import LoginRequired from './actions/LoginRequired';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginRequired><Dashboard /></LoginRequired>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
