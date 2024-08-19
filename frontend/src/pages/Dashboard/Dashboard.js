import { useSelector } from "react-redux";
import PageTitle from '../../components/PageTitle';
import StatisticCard from '../../components/StatisticCard';
import { Affix, Calendar, Card, Col, Divider, Flex, Row, Table, Tag, theme, Timeline } from "antd";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import { UsergroupAddOutlined, FileDoneOutlined, DollarCircleOutlined, FileSyncOutlined, CalendarOutlined } from "@ant-design/icons";
import { Area } from "@ant-design/charts";
import MyTypography from "../../components/MyTypography";

const breadcrumbItems = [
    {
      path: '/',
      title: 'Dashboard',
    }
  ];
function Dashboard() {
    // const user = useSelector((state) => state.user);
  const { token } = theme.useToken();
    const data = [ 
      { year : '1991' , value : 3 } ,   
      { year : '1992' , value : 4 } ,   
      { year : '1993' , value : 3.5 } ,   
      { year : '1994' , value : 5 } ,   
      { year : '1995' , value : 4.9 } ,   
      { year : '1996' , value : 6 } ,   
      { year : '1997' , value : 17 } ,   
      { year : '1998' , value : 9 } ,   
      { year : '1999' , value : 13 } ,   
    ] ;
  
    const config = { 
      data ,
      height : 400 , 
      xField : 'year' , 
      yField : 'value' , 
      style: {
        fill: 'linear-gradient(-90deg, white 0%, #3b82f6 100%)',
      },
      axis: {
        y: { labelFormatter: '~s' },
      },
      line: {
        style: {
          stroke: '#3b82f6',
          strokeWidth: 4,
        },
      },
    } ;

    const cardStyle = {borderRadius: token.borderRadiusLG, 
      backgroundColor: "white",
      padding: "0px 16px",
    }

    return <>
        {/* <PageTitle title="Dashboard" items={breadcrumbItems} /> */}
        <Flex gap="middle" className="py-4">
          <Flex gap="middle" vertical>
            <Flex gap="middle">
              <StatisticCard title="Total Employee" icon={<UsergroupAddOutlined />} value={56} percent={10.0} />
              <StatisticCard title="Today Present" icon={<FileDoneOutlined />} value={48} percent={10.0} decline />
              <StatisticCard title="This Month Salary" icon={<DollarCircleOutlined />} value={865} suffix="Br" percent={10.0} />
              {/* <StatisticCard title="Total Applicant" icon={<FileSyncOutlined />} value={20} percent={20.0} /> */}
            </Flex>

            <div style={cardStyle}>
                <MyTypography level={3} className="py-3">Payment History</MyTypography>
              <Area {...config} />
            </div>

            <div style={cardStyle}>
              <MyTypography level={3} className="py-3">Attendance Overview</MyTypography>
              <AttendanceTable />
            </div>
          </Flex>

          <Flex gap='middle' vertical className=" h-lvh">
            <div style={cardStyle}>
              <Flex justify="space-between" align="center" className="pt-4 pb-3">
                <MyTypography level={3}>My Schedule</MyTypography>
                <Tag className="text-lg" color="blue"><CalendarOutlined /></Tag>
              </Flex>
              <Calendar fullscreen={false} >MY Schechelu</Calendar>
            
              <Divider />
            
              <Timeline
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
              </div>
          </Flex>
        </Flex>
    </>
}

export default Dashboard;