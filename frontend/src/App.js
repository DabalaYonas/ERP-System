import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
import Settings from './pages/Settings/Settings';
import Error404 from './pages/Error404';
import { ConfigProvider } from 'antd';
import ViewEmployee from './pages/Employee/ViewEmployee';
import Applications from './pages/Recruitment/Applications';
import NewApplication from './pages/Recruitment/NewApplication';
import NewPayslip from './pages/Payroll/NewPayslip';
import GeneratePayroll from './pages/Payroll/GeneratePayroll';
import ViewPayroll from './pages/Payroll/ViewPayroll';
import ViewPayslip from './pages/Payroll/ViewPayslip';
import IDCard from './components/IDCard';
import { useEffect } from 'react';
import axios from 'axios';
import PayrollPapers from './pages/Payroll/PayrollPapers';

function App() {  
  
//   useEffect(() => {
//   const updateOnlineStatus = () => {
//     console.log("Is Online", navigator.onLine);
    
//     axios.patch('http://127.0.0.1:8000/user/api/', { is_online: !navigator.onLine }, {headers : {"Content-Type": "application/json"}, withCredentials: true});
//   };

//   window.addEventListener('online', updateOnlineStatus);
//   window.addEventListener('offline', updateOnlineStatus);

//   return () => {
//     window.removeEventListener('online', updateOnlineStatus);
//     window.removeEventListener('offline', updateOnlineStatus);
//   };
// }, []);
  
  return (
    <ConfigProvider 
    theme={{
      token: {
        colorPrimary: "#2563eb",
        colorPrimaryHover: "#3b82f6",
      }
    }}>
    <BrowserRouter>
      <Routes>
        <Route element={<LoginRequired><Sidebar /></LoginRequired>}>
          <Route path='/' element={<LoginRequired><Dashboard /></LoginRequired>} />
          <Route path='/employees' element={<LoginRequired><Employees /></LoginRequired>} />
          <Route path='/employees/:userId' element={<LoginRequired><ViewEmployee /></LoginRequired>} />
          <Route path='/employees/:userId/id_card' element={<LoginRequired><IDCard /></LoginRequired>} />
          <Route path='/employees/add-employee' element={<LoginRequired><AddEmployee /></LoginRequired>} />
          <Route path='/payroll' element={<LoginRequired><Payroll /></LoginRequired>} />
          {/* <Route path='/payroll/:payrollId' element={<LoginRequired><ViewPayroll /></LoginRequired>} /> */}
          <Route path='/payroll/payslip/:payslipId' element={<LoginRequired><ViewPayslip /></LoginRequired>} />
          <Route path='/payroll/payslip/:payslipId/edit-payslip/' element={<LoginRequired><NewPayslip /></LoginRequired>} />
          <Route path='/payroll/new-payslip' element={<LoginRequired><NewPayslip /></LoginRequired>} />
          <Route path='/payroll/generate' element={<LoginRequired><GeneratePayroll /></LoginRequired>} />
          <Route path='/payroll/papers' element={<LoginRequired><PayrollPapers /></LoginRequired>} />
          <Route path='/attendance' element={<LoginRequired><Attendance /></LoginRequired>} />
          <Route path='/leave' element={<LoginRequired><Leave /></LoginRequired>} />
          <Route path='/recruitment' element={<LoginRequired><Recruitment /></LoginRequired>} />
          <Route path='/recruitment/:recruitmentID/' element={<LoginRequired><Applications /></LoginRequired>} />
          <Route path='/recruitment/:recruitmentID/:applicationID' element={<LoginRequired><NewApplication /></LoginRequired>} />
          <Route path='/settings' element={<LoginRequired><Settings /></LoginRequired>} />
          <Route path='/settings/:activeKey' element={<LoginRequired><Settings /></LoginRequired>} />
        </Route>
        <Route>
          <Route path='*' element={<Error404 />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>
      </Routes>
    <Routes>
      
    </Routes>
    </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
