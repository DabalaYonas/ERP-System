import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', payroll: 4000 },
  { month: 'Feb', payroll: 3000 },
  { month: 'Mar', payroll: 5000 },
  { month: 'Apr', payroll: 7000 },
  { month: 'May', payroll: 6000 },
  { month: 'Jun', payroll: 8000 },
];

export const PayrollAreaChart = () => {
  return <ResponsiveContainer width="100%" height={400}>
    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorPayroll" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="payroll" stroke="#8884d8" fillOpacity={1} fill="url(#colorPayroll)" strokeWidth={3} />
    </AreaChart>
  </ResponsiveContainer>
};

// export default PayrollAreaChart;