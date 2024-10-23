import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Working', value: 70 },
  { name: 'On Leave', value: 15 },
  { name: 'Sick', value: 10 },
  { name: 'Remote', value: 5 },
];

const COLORS = ['#3b82f6', '#00C49F', '#FFBB28', '#FF8042'];

const EmployeeStatusChart = () => (
  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={100}
        innerRadius={70}
        paddingAngle={2}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

export default EmployeeStatusChart;