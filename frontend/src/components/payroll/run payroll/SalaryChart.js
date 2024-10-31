import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Salary', value: 80, color: '#3b82f6' },
  { name: 'Bonus', value: 5, color: '#00C49F' },
  { name: 'Commission', value: 2, color: '#FFBB28' },
  { name: 'Company taxes', value: 5, color: '#FF8042' },
  { name: 'Paid Time Off', value: 4, color: '#FF6361' },
  { name: 'Reimbursement', value: 5, color: '#BC5090' },
  { name: 'Overtime', value: 2, color: '#58508D' },
  { name: 'Benefits', value: 5, color: '#FF9F94' },
];

const SalaryPieChart = () => {
  return (
    <PieChart width={500} height={300}>
      <Pie
        data={data}
        cx={120}
        cy={150}
        innerRadius={80}
        outerRadius={105}
        paddingAngle={5}
        dataKey="value"
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend 
        layout="vertical" 
        iconType='circle' 
        iconSize={8} 
        verticalAlign="middle" 
        align="right" />
    </PieChart>
  );
};

export default SalaryPieChart;