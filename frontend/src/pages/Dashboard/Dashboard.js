import PageTitle from '../../components/PageTitle';
import StatisticCard from '../../components/StatisticCard';
import { Calendar, Divider, Flex, Tag, Timeline } from "antd";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import { UsergroupAddOutlined, FileDoneOutlined, DollarCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import MyTypography from "../../components/MyTypography";
import MyCard from "../../components/MyCard";
import {PayrollAreaChart} from '../../components/PayrollAreaChart ';

const breadcrumbItems = [
    {
      path: '/',
      title: 'Dashboard',
    }
  ];
function Dashboard() {
    return <>
        <PageTitle title="Dashboard" items={breadcrumbItems} />
        <PayrollAreaChart />
        <Flex gap="middle" className="pb-4">
          <Flex gap="middle" vertical>
            <Flex gap="middle">
              <StatisticCard title="Total Employee" icon={<UsergroupAddOutlined />} value={56} percent={10.0} />
              <StatisticCard title="Today Present" icon={<FileDoneOutlined />} value={48} percent={10.0} decline />
              <StatisticCard title="This Month Salary" icon={<DollarCircleOutlined />} value={865} suffix="Br" percent={10.0} />
            </Flex>

              <MyCard title="Payment History">
              </MyCard>

              <MyCard title="Attendance Overview">
                <AttendanceTable />
              </MyCard>
          </Flex>

          <Flex gap='middle' vertical className=" h-lvh">
              <MyCard>
              <Flex justify="space-between" align="center" className="pt-4 pb-3">
                <MyTypography level={3}>My Schedule</MyTypography>
                <Tag className="text-lg" color="blue"><CalendarOutlined /></Tag>
              </Flex>
              <Calendar fullscreen={false} >MY Schechelu</Calendar>
            
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