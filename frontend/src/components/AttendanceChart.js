import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { status: 'Present', count: 80 },
  { status: 'Absent', count: 10 },
  { status: 'Late', count: 10 },
];

const EmployeeAttendanceChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="status" axisLine={false} tickLine={false} />
      <YAxis axisLine={false} tickLine={false}/>
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" barSize={50} />
    </BarChart>
  </ResponsiveContainer>
);

export default EmployeeAttendanceChart;