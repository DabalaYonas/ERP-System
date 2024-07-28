import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import LoginRequired from './actions/LoginRequired';
import Dashboard from './pages/Dashboard';
import Employee from './pages/Employee';
import Payroll from './pages/Payroll';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import Recruitment from './pages/Recruitment';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
    <Sidebar>
      <Routes>
        <Route path='/' element={<LoginRequired><Dashboard /></LoginRequired>} />
        <Route path='/employee' element={<LoginRequired><Employee /></LoginRequired>} />
        <Route path='/payroll' element={<LoginRequired><Payroll /></LoginRequired>} />
        <Route path='/attendance' element={<LoginRequired><Attendance /></LoginRequired>} />
        <Route path='/leave' element={<LoginRequired><Leave /></LoginRequired>} />
        <Route path='/recruitment' element={<LoginRequired><Recruitment /></LoginRequired>} />
        <Route path='/settings' element={<LoginRequired><Settings /></LoginRequired>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </Sidebar>
    </BrowserRouter>
  );
}

export default App;
