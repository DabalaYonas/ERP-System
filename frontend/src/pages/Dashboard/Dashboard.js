import PageTitle from '../../components/PageTitle';
import StatisticCard from '../../components/StatisticCard';
import { Calendar, Divider, Flex, Skeleton, Tag, Timeline } from "antd";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import { UsergroupAddOutlined, FileDoneOutlined, FileSearchOutlined, DollarCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import MyTypography from "../../components/MyTypography";
import MyCard from "../../components/MyCard";
import PayrollAreaChart from '../../components/PayrollAreaChart ';
import EmployeeAttendanceChart from '../../components/AttendanceChart';
import { useEffect, useState } from 'react';
import { getHolidays } from '../../services/handleLeaves';
import dayjs from "dayjs";
import axios from 'axios';
import EmployeeStatusChart from '../../components/EmployeeStatusChart';

const breadcrumbItems = [
    {
      path: '/',
      title: 'Dashboard',
    }
  ];
     
  
function Dashboard() {
  const [holidayItems, setHolidayItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [attendSummary, setAttendSummary] = useState({});
  const [payrollSummary, setpayrollSummary] = useState({});

  useEffect(() => {
    const fetchDatas = async() => {
      try {
        const holidayResponse = await getHolidays();
        const employeeResponse = await axios.get('http://127.0.0.1:8000/employee/api/employee-count/', {withCredentials: true});
        const attendanceResponse = await axios.get('http://127.0.0.1:8000/attendance/api/attendance-summary/', {params: {'date': dayjs().format("YYYY-MM-DD")}, withCredentials: true});
        
        await axios.get('http://127.0.0.1:8000/payroll/api/payroll-summary/', 
          {params: {'payPeriod': dayjs().format("MMMM YYYY")}, withCredentials: true})
          .then(response => {
              setpayrollSummary(response.data); 
          })
          .catch(errInfo => {
            console.error(errInfo);
          });
          
        setEmployeeCount(employeeResponse.data.total_employees);
        setHolidayItems(holidayResponse);  
        setAttendSummary(attendanceResponse.data);  
        
        setLoading(false);
      } catch (error) {
        console.error(error);
      }   
    }

    fetchDatas();
  }, []);

  const isHoliday = (date) => {
    return holidayItems.some(item => dayjs(item.date).isSame(dayjs(date), 'date'))
  }

  if (loading) {
    return <Skeleton />
  }

  const cellRender = (date) => { 
    if (!isHoliday(date) || dayjs(date).isSame(dayjs(), 'date')) {
     return; 
    }
    
    return <div className='w-full bg-violet-500 h-1 rounded'></div>;
  };

    return <>
        <PageTitle title="Dashboard" items={breadcrumbItems} />
        <Flex gap="middle" className="pb-4">
          <Flex gap="middle" vertical className='flex-1'>
            <Flex gap="middle">
              <StatisticCard title="Total Employee" icon={<UsergroupAddOutlined />} value={employeeCount} change={10.0} percent />
              <StatisticCard title="Today Attend" icon={<FileDoneOutlined />} value={attendSummary.total_attend} change={10.0} percent decline />
              {/* <StatisticCard title="Total Applicant's" icon={<FileSearchOutlined />} value={12} change={50.0} percent /> */}
              <StatisticCard title="This Month Salary" icon={<DollarCircleOutlined />} value={payrollSummary.total_payroll_costs} suffix="Br" change={20.0} percent />
            </Flex>

              <Flex gap="middle">
                <MyCard title="Payment History" className=" basis-3/5">
                  <PayrollAreaChart />
                </MyCard>
                
                <MyCard title="Today Attendance" className=" basis-2/5">
                  <EmployeeAttendanceChart />
                </MyCard>

              </Flex>
              <Flex gap="middle" align='start'>

                <MyCard title="Attendance Overview" className="flex-1">
                  <AttendanceTable maxShow={5} />
                </MyCard>

                {/* <MyCard title="Employee Status" style={{ width: 300}}>
                  <EmployeeStatusChart />
                </MyCard> */}
              </Flex>
          </Flex>

          <Flex gap='middle' vertical className="h-lvh basis-1/4">
              <MyCard>
                <Flex justify="space-between" align="center" className="pt-4 pb-3">
                  <MyTypography level={3}>My Schedule</MyTypography>
                  <Tag className="text-lg" color="blue"><CalendarOutlined /></Tag>
                </Flex>
                <Calendar 
                  cellRender={cellRender}
                  headerRender={() => {}} 
                  fullscreen={false} />
              
                <Divider />
              
                <Timeline
                  mode='left'
                  items={[
                    {
                      children: 'Create a services site 2015-09-01',
                    },
                    {
                      children: 'Solve initial network problems 2015-09-01',
                    },
                    {
                      children: 'Technical testing 2015-09-01',
                    },
                    {
                      children: 'Network problems being solved 2015-09-01',
                    },
                    {
                      children: 'Network problems being solved 2015-09-01',
                    },
                    {
                      children: 'Network problems being solved 2015-09-01',
                    },
                  ]}
                />
              </MyCard>
          </Flex>
        </Flex>
    </>
}

export default Dashboard;