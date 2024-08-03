import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import LoginRequired from './actions/LoginRequired';
import Dashboard from './pages/Dashboard';
import Employees from './pages/employee/Employees';
import AddEmployee from './pages/employee/AddEmployee';
import Payroll from './pages/Payroll';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import Recruitment from './pages/Recruitment';
import Settings from './pages/Settings';
import Error404 from './pages/Error404';
import { ConfigProvider } from 'antd';
import ViewEmployee from './pages/employee/ViewEmployee';

function App() {
  return (
    <ConfigProvider 
    theme={{
      token: {
        colorPrimary: "#2563eb",
        colorPrimaryHover: "#3b82f6",
      }
    }}>
    <BrowserRouter>
    <Sidebar>
      <Routes>
        <Route path='/' element={<LoginRequired><Dashboard /></LoginRequired>} />
        <Route path='*' element={<Error404 />} />
        <Route path='/employees' element={<LoginRequired><Employees /></LoginRequired>} />
        <Route path='/employees/:userId' element={<LoginRequired><ViewEmployee /></LoginRequired>} />
        <Route path='/employees/add-employee' element={<LoginRequired><AddEmployee /></LoginRequired>} />
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
    </ConfigProvider>
  );
}

export default App;
