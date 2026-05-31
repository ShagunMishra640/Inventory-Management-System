import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 7000 },
];

const SalesChart = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Sales Overview</h2>

      <ResponsiveContainer width="100%" height={300} className="[&_.recharts-surface]:outline-none [&_*]:outline-none">
        <BarChart data={data}>
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Bar dataKey="sales" fill="#2563eb" activeBar={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
