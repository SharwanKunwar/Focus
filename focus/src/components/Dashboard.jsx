import React, { useState } from "react";
import { usePlanner, useMediumPlanner, useLowerPlanner } from "../Store/useAllDataPlanner";
import moment from "moment";
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

const Dashboard = () => {
  const { tasks: higherTasks } = usePlanner();
  const { tasks: mediumTasks } = useMediumPlanner();
  const { tasks: lowerTasks } = useLowerPlanner();

  // --- Year selector ---
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // --- Generate daily data for year ---
  const generateDailyData = (year) => {
    const start = moment(`${year}-01-01`);
    const end = moment(`${year}-12-31`);
    const days = [];
    let id = 0;

    for (let d = start; d.isBefore(end); d.add(1, "day")) {
      const dayStr = d.format("YYYY-MM-DD");

      // Check if any task is completed on this day
      const completedTasksCount = [
        ...higherTasks,
        ...mediumTasks,
        ...lowerTasks,
      ].filter((t) => t.date === dayStr && t.completed).length;

      days.push({
        id: id++,
        date: dayStr,
        month: d.format("MMM"),
        week: d.week(),
        completedTasksCount,
      });
    }
    return days;
  };

  const progressData = generateDailyData(selectedYear);
  const months = moment.monthsShort();

  // --- Pie chart data ---
  const pieData = [
    { name: "Higher Tasks", value: higherTasks.length },
    { name: "Medium Tasks", value: mediumTasks.length },
    { name: "Lower Tasks", value: lowerTasks.length },
  ];

  const COLORS = ["#16a34a", "#f59e0b", "#2563eb"]; // green, yellow, blue


  // Example weekly activity data
const weeklyData = [
  { day: "Mon", tasks: higherTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Mon').length +
                 mediumTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Mon').length +
                 lowerTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Mon').length
  },
  { day: "Tue", tasks: higherTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Tue').length +
                 mediumTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Tue').length +
                 lowerTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Tue').length
  },
  { day: "Wed", tasks: higherTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Wed').length +
                 mediumTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Wed').length +
                 lowerTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Wed').length
  },
  { day: "Thu", tasks: higherTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Thu').length +
                 mediumTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Thu').length +
                 lowerTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Thu').length
  },
  { day: "Fri", tasks: higherTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Fri').length +
                 mediumTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Fri').length +
                 lowerTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Fri').length
  },
  { day: "Sat", tasks: higherTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Sat').length +
                 mediumTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Sat').length +
                 lowerTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Sat').length
  },
  { day: "Sun", tasks: higherTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Sun').length +
                 mediumTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Sun').length +
                 lowerTasks.filter(t => t.completed && t.date && moment(t.date).format('ddd') === 'Sun').length
  },
];


  return (
    <div className="p-6 w-full h-full bg-gray-100 rounded-tr-2xl flex flex-col gap-6 overflow-y-auto">
      {/* --- Year Selector --- */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-gray-700">
          Contribution Activity ({selectedYear})
        </h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[2025, 2024, 2023, 2022, 2021].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* --- GitHub-style Contribution Heatmap --- */}
      <div className="bg-white rounded-xl p-4 shadow overflow-x-auto">
        <div className="flex items-start gap-4">
          {months.map((month, mIndex) => {
            const monthDays = progressData.filter((d) => d.month === month);
            const weeks = [...new Set(monthDays.map((d) => moment(d.date).week()))];

            return (
              <div key={mIndex} className="flex flex-col items-center">
                <span className="text-xs text-gray-500 mb-1">{month}</span>
                <div className="flex gap-[3px]">
                  {weeks.map((week) => {
                    const weekDays = monthDays.filter(
                      (d) => moment(d.date).week() === week
                    );
                    return (
                      <div key={week} className="flex flex-col gap-[3px]">
                        {weekDays.map((day) => (
                          <div
                            key={day.id}
                            className="w-4 h-4 rounded-sm transition-all duration-200 hover:scale-110 border border-gray-200"
                            style={{
                              backgroundColor:
                                day.completedTasksCount > 0 ? "#16a34a" : "#ffffff",
                            }}
                            title={`${day.date} — Completed Tasks: ${day.completedTasksCount}`}
                          ></div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        
      </div>



      {/* pie chart and graph */}
<div className="w-full h-[380px] p-4 rounded-xl flex flex-col md:flex-row gap-4">
  {/* --- Pie Chart --- */}
  <div className="flex-1 bg-white rounded-xl p-4 flex flex-col items-center justify-center">
    <h3 className="text-gray-700 font-semibold mb-2">Task Summary</h3>
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={60}
          label={({ cx, cy, midAngle, innerRadius, outerRadius, index, value }) => {
            const RADIAN = Math.PI / 180;
            const radius = innerRadius + (outerRadius - innerRadius) / 2;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
            return (
              <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                fontSize={12}
              >
                {value}
              </text>
            );
          }}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${value}`, name]} />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* --- Bar Chart --- */}
  <div className="flex-1 bg-white rounded-xl p-4 flex flex-col justify-center">
    <h3 className="text-gray-700 font-semibold mb-2">Weekly Activity</h3>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={weeklyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="tasks" fill="#2563eb" radius={[5, 5, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>


    

    </div>
  );
};

export default Dashboard;
