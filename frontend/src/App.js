import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import LoginRequired from './actions/LoginRequired';
import Dashboard from './pages/Dashboard/Dashboard';
import Employees from './pages/Employee/Employees';
import AddEmployee from './pages/Employee/AddEmployee';
import Payroll from './pages/Payroll/Payroll';
import Attendance from './pages/Attendance/Attendance';
import Leave from './pages/Leave/Leave';
import Recruitment from './pages/Recruitment/Recruitment';
import Settings from './pages/Settings';
import Error404 from './pages/Error404';
import { ConfigProvider } from 'antd';
import ViewEmployee from './pages/Employee/ViewEmployee';
import Applications from './pages/Recruitment/Applications';
import NewApplication from './pages/Recruitment/NewApplication';

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
        <Route path='/recruitment/:recruitmentID/' element={<LoginRequired><Applications /></LoginRequired>} />
        <Route path='/recruitment/:recruitmentID/:applicationID' element={<LoginRequired><NewApplication /></LoginRequired>} />
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
