import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'January', Salary: 4000, Benefits: 2400, Taxes: 2400 },
  { name: 'February', Salary: 3000, Benefits: 1398, Taxes: 2210 },
  { name: 'March', Salary: 2000, Benefits: 9800, Taxes: 2290 },
  { name: 'April', Salary: 2780, Benefits: 3908, Taxes: 2000 },
  { name: 'May', Salary: 1890, Benefits: 4800, Taxes: 2181 },
  { name: 'June', Salary: 2390, Benefits: 3800, Taxes: 2500 },
  { name: 'July', Salary: 3490, Benefits: 4300, Taxes: 2100 },
];

const PayrollStackedBarChart = () => {
    const [activeIndex, setActiveIndex] = useState(null);
  
    const handleMouseEnter = (data, index) => {
      setActiveIndex(index);
    };
  
    const handleMouseLeave = () => {
      setActiveIndex(null);
    };

  return <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3" vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false}/>
        <YAxis axisLine={false} tickLine={false}/>
        <Tooltip />
        <Legend
            iconType='circle'
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} />

        <Bar dataKey="Salary" stackId="a" fill="#8884d8" 
            stroke='#000'
            strokeWidth={activeIndex === 0 || activeIndex === null ? 0 : 1}  />

        <Bar dataKey="Benefits" stackId="a" fill="#8884d8" opacity={0.6} radius={[10, 10, 0, 0]} 
            stroke='#000'
            strokeWidth={activeIndex === 1 || activeIndex === null ? 0 : 1} />

        {/* <Bar dataKey="Taxes" stackId="a" fill="#ffc658" /> */}
    </BarChart>
  </ResponsiveContainer>
};

export default PayrollStackedBarChart;