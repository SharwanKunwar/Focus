import React, { useState } from "react";
import {
  usePlanner,
  useMediumPlanner,
  useLowerPlanner,
} from "../Store/useAllDataPlanner";
import moment from "moment";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const Dashboard = () => {
  const { tasks: higherTasks } = usePlanner();
  const { tasks: mediumTasks } = useMediumPlanner();
  const { tasks: lowerTasks } = useLowerPlanner();

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // --- Generate daily contribution data
  const generateDailyData = (year) => {
    const start = moment(`${year}-01-01`);
    const end = moment(`${year}-12-31`);
    const days = [];
    let id = 0;

    // Combine all tasks first
    const allTasks = [...higherTasks, ...mediumTasks, ...lowerTasks];

    for (let d = start.clone(); d.isBefore(end); d.add(1, "day")) {
      const dayStr = d.format("YYYY-MM-DD");

      // Count completed tasks for that day
      const completedTasksCount = allTasks.filter(
        (t) =>
          moment(t.dateForSearch).format("YYYY-MM-DD") === dayStr &&
          t.status === "Completed"
      ).length;

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

  const COLORS = ["#ef4444", "#facc15", "#22c55e"]; // Red, Yellow, Green

  // --- Weekly activity (by priority) ---
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const allTasks = [...higherTasks, ...mediumTasks, ...lowerTasks];

  const weeklyData = daysOfWeek.map((day) => {
    const dayTasks = allTasks.filter(
      (t) => moment(t.dateForSearch).format("ddd") === day
    );

    return {
      day,
      High: dayTasks.filter((t) => t.priority === "High").length,
      Medium: dayTasks.filter((t) => t.priority === "Medium").length,
      Low: dayTasks.filter((t) => t.priority === "Low").length,
    };
  });

  return (
    <div className="p-6 w-full h-full bg-gray-100 rounded-tr-2xl flex flex-col gap-5 overflow-y-auto">
      {/* Year Selector */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl mastShadow">
        <h2 className="text-lg font-semibold text-gray-700">
          Contribution Activity ({selectedYear})
        </h2>
        <div className=" bg-gray-50 pr-2 rounded-md">
          <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className=" rounded-md p-2 px-3 focus:outline-none focus:ring-0 focus:ring-sky-500"
        >
          {[2025, 2024, 2023, 2022, 2021].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        </div>
      </div>

      {/* ✅ GitHub-style Heatmap */}
      <div className="bg-white rounded-xl p-5 mastShadow overflow-x-auto overflow-y-hidden">
        <div className="flex items-start gap-4">
          {months.map((month, mIndex) => {
            const monthDays = progressData.filter((d) => d.month === month);
            const weeks = [...new Set(monthDays.map((d) => d.week))];

            return (
              <div key={mIndex} className="flex flex-col items-center">
                <span className="text-xs text-gray-500 mb-1">{month}</span>
                <div className="flex gap-[4px]">
                  {weeks.map((week) => {
                    const weekDays = monthDays.filter((d) => d.week === week);
                    return (
                      <div key={week} className="flex flex-col gap-[3px]">
                        {weekDays.map((day) => (
                          <div
                            key={day.id}
                            className="w-3 h-3 rounded-sm transition-all duration-200 hover:scale-110 border border-gray-200"
                            style={{
                              backgroundColor:
                                day.completedTasksCount > 0
                                  ? "#16a34a"
                                  : "#f3f4f6",
                            }}
                            title={`${day.date} — Completed: ${day.completedTasksCount}`}
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

      {/* Pie & Bar Charts */}
      <div className="w-full h-[380px] p-4 rounded-xl flex flex-col md:flex-row gap-4">
        {/* Pie Chart */}
        <div className="flex-1 bg-white rounded-lg mastShadow p-4 flex flex-col items-center justify-center">
          <h3 className="text-gray-700 font-semibold mb-2">Task Summary</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label={({ value }) => value}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart (Stacked by Priority) */}
        <div className="flex-1 rounded-lg mastShadow bg-white p-4 flex flex-col justify-center overflow-hidden">
          <h3 className="text-gray-700 font-semibold mb-2">
            Weekly Activity (by Priority)
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="High"
                stackId="a"
                fill="#ef4444"
                name="High Priority"
                radius={[0, 0, 0, 0]}
              />
              <Bar dataKey="Low" stackId="a" fill="#22c55e" name="Low Priority" />
              <Bar dataKey="Medium" stackId="a" fill="#facc15" name="Medium Priority" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
