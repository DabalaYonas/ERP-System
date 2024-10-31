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
import ViewPayslip from './pages/Payroll/ViewPayslip';
import IDCard from './components/IDCard';
import PayrollPapers from './pages/Payroll/PayrollPapers';
import PayrollPage from './pages/Payroll/PayrollPage';
import ProcessPayroll from './pages/Payroll/ProcessPayroll';
import RunPayroll from './pages/Payroll/RunPayroll';
import { useState } from 'react';

function App() {  
  const [showPayrollNotification, setShowPayrollNotification] = useState(false);
  
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
          <Route path='/payroll' element={<LoginRequired><PayrollPage setShowPayrollNotification={setShowPayrollNotification} showPayrollNotification={showPayrollNotification}/></LoginRequired>} />
          {/* <Route path='/payroll/:payrollId' element={<LoginRequired><RunPayroll /></LoginRequired>} /> */}
          <Route path='/payroll/payslip/:payslipId' element={<LoginRequired><ViewPayslip /></LoginRequired>} />
          <Route path='/payroll/payslip/:payslipId/edit-payslip/' element={<LoginRequired><NewPayslip /></LoginRequired>} />
          <Route path='/payroll/new-payslip' element={<LoginRequired><NewPayslip /></LoginRequired>} />
          <Route path='/payroll/generate' element={<LoginRequired><GeneratePayroll /></LoginRequired>} />
          <Route path='/payroll/papers' element={<LoginRequired><PayrollPapers /></LoginRequired>} />
          <Route path='/payroll/process-payroll/:year/:month' element={<LoginRequired><ProcessPayroll /></LoginRequired>} />
          <Route path='/attendance' element={<LoginRequired><Attendance /></LoginRequired>} />
          <Route path='/leave' element={<LoginRequired><Leave /></LoginRequired>} />
          <Route path='/recruitment' element={<LoginRequired><Recruitment /></LoginRequired>} />
          <Route path='/recruitment/:recruitmentID/' element={<LoginRequired><Applications /></LoginRequired>} />
          <Route path='/recruitment/:recruitmentID/:applicationID' element={<LoginRequired><NewApplication /></LoginRequired>} />
          <Route path='/settings' element={<LoginRequired><Settings /></LoginRequired>} />
          <Route path='/settings/:activeKey' element={<LoginRequired><Settings /></LoginRequired>} />
        </Route>
        
        <Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/payroll/run-payroll/:year/:month' element={<LoginRequired><RunPayroll setShowPayrollNotification={setShowPayrollNotification}/></LoginRequired>} />
        </Route>
        
        <Route path='*' element={<Error404 />} />
      </Routes>
    <Routes>
      
    </Routes>
    </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
