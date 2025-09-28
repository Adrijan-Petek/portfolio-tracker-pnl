import React from 'react';
import sample from '../../sample_reports/report-sample.json';
import { PieChart, Pie, Cell } from 'recharts';

export default function Home() {
  const data = Object.entries(sample.portfolio).map(([token,val])=>({name:token,value:val}));
  const COLORS = ['#0088FE','#00C49F','#FFBB28','#FF8042'];
  return (<div style={{padding:20}}>
    <h1>Portfolio Tracker Sample</h1>
    <PieChart width={400} height={400}>
      <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
        {data.map((entry,index)=><Cell key={index} fill={COLORS[index%COLORS.length]} />)}
      </Pie>
    </PieChart>
  </div>);
}
