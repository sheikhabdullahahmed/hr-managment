import { useState } from "react";
import { useTheme } from "../Components/ThemeContext";



type EmployeeStatus = "Active" | "Remote" | "On Leave";
type PayrollStatus = "Paid" | "Pending" | "Processing";
const employees: Array<{
  id: number;
  initials: string;
  name: string;
  role: string;
  dept: string;
  status: EmployeeStatus;
  joined: string;
  color: string;
}> = [
  {
    id: 1,
    initials: "AK",
    name: "Ali Khan",
    role: "Product Lead",
    dept: "Engineering",
    status: "Active",
    joined: "Mar 2022",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    initials: "FN",
    name: "Faiza Noor",
    role: "UX Designer",
    dept: "Design",
    status: "Remote",
    joined: "Jul 2023",
    color: "from-emerald-400 to-purple-500",
  },
  {
    id: 3,
    initials: "UR",
    name: "Usman Raza",
    role: "Backend Dev",
    dept: "Engineering",
    status: "On Leave",
    joined: "Jan 2021",
    color: "from-pink-500 to-yellow-400",
  },
  {
    id: 4,
    initials: "SB",
    name: "Sana Butt",
    role: "HR Coordinator",
    dept: "HR",
    status: "Active",
    joined: "Oct 2023",
    color: "from-yellow-400 to-emerald-400",
  },
  {
    id: 5,
    initials: "ZM",
    name: "Zara Malik",
    role: "Sales Manager",
    dept: "Sales",
    status: "Active",
    joined: "May 2022",
    color: "from-purple-500 to-emerald-400",
  },
  {
    id: 6,
    initials: "HQ",
    name: "Hamza Qureshi",
    role: "DevOps Eng.",
    dept: "Engineering",
    status: "Active",
    joined: "Feb 2023",
    color: "from-pink-400 to-purple-600",
  },
];

const events = [
  {
    day: "15",
    month: "May",
    title: "Q2 Performance Reviews",
    sub: "All departments · 10:00 AM",
    tag: "Review",
    tagColor: "bg-purple-500/15 text-purple-400",
  },
  {
    day: "19",
    month: "May",
    title: "Leadership Sync",
    sub: "Management · 2:00 PM",
    tag: "Meeting",
    tagColor: "bg-pink-500/15 text-pink-400",
  },
  {
    day: "23",
    month: "May",
    title: "New Hire Onboarding",
    sub: "3 new hires · 9:00 AM",
    tag: "Training",
    tagColor: "bg-yellow-500/15 text-yellow-400",
  },
  {
    day: "27",
    month: "May",
    title: "Eid Holiday",
    sub: "Company-wide",
    tag: "Holiday",
    tagColor: "bg-emerald-500/15 text-emerald-400",
  },
];

const pipeline = [
  { role: "Senior Frontend Dev", filled: 12, total: 20, color: "#7c5cfc" },
  { role: "Product Manager", filled: 8, total: 15, color: "#f05b7a" },
  { role: "Data Analyst", filled: 19, total: 25, color: "#2ee8b5" },
  { role: "DevOps Engineer", filled: 5, total: 18, color: "#f5a623" },
  { role: "UI/UX Designer", filled: 14, total: 16, color: "#7c5cfc" },
];

const deptData = [
  { label: "Engineering", count: 54, color: "#7c5cfc" },
  { label: "Sales", count: 34, color: "#2ee8b5" },
  { label: "HR & Ops", count: 29, color: "#f5a623" },
  { label: "Design", count: 25, color: "#f05b7a" },
];

const payrollData: Array<{
  name: string;
  dept: string;
  salary: string;
  status: PayrollStatus;
  date: string;
}> = [
  {
    name: "Ali Khan",
    dept: "Engineering",
    salary: "PKR 280,000",
    status: "Paid",
    date: "May 1",
  },
  {
    name: "Faiza Noor",
    dept: "Design",
    salary: "PKR 210,000",
    status: "Paid",
    date: "May 1",
  },
  {
    name: "Usman Raza",
    dept: "Engineering",
    salary: "PKR 240,000",
    status: "Pending",
    date: "May 15",
  },
  {
    name: "Sana Butt",
    dept: "HR",
    salary: "PKR 180,000",
    status: "Paid",
    date: "May 1",
  },
  {
    name: "Zara Malik",
    dept: "Sales",
    salary: "PKR 260,000",
    status: "Processing",
    date: "May 10",
  },
];

const performanceData = [
  { name: "Ali Khan", score: 92, trend: "+4%", dept: "Engineering" },
  { name: "Faiza Noor", score: 88, trend: "+2%", dept: "Design" },
  { name: "Usman Raza", score: 74, trend: "-3%", dept: "Engineering" },
  { name: "Sana Butt", score: 95, trend: "+6%", dept: "HR" },
  { name: "Zara Malik", score: 81, trend: "+1%", dept: "Sales" },
];

const NAV = [
  { key: "dashboard", icon: "⊞", label: "Dashboard" },
  { key: "employees", icon: "👥", label: "Employees", badge: 142 },
  { key: "attendance", icon: "📅", label: "Attendance" },
  { key: "recruitment", icon: "🎯", label: "Recruitment", badge: 8 },
  { key: "performance", icon: "⭐", label: "Performance" },
  { key: "payroll", icon: "💰", label: "Payroll" },
  { key: "settings", icon: "⚙️", label: "Settings" },
];

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "bg-emerald-500/15 text-emerald-400",
    Remote: "bg-purple-500/15 text-purple-400",
    "On Leave": "bg-yellow-500/15 text-yellow-400",
    Paid: "bg-emerald-500/15 text-emerald-400",
    Pending: "bg-yellow-500/15 text-yellow-400",
    Processing: "bg-purple-500/15 text-purple-400",
    Present: "bg-emerald-500/15 text-emerald-400",
    Absent: "bg-pink-500/15 text-pink-400",
    Late: "bg-yellow-500/15 text-yellow-400",
  };
  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${map[status] || "bg-gray-500/15 text-gray-400"}`}
    >
      {status}
    </span>
  );
}
function KpiCard({
  label,
  value,
  delta,
  deltaUp,
  icon,
  accent,
}: {
  label: string;
  value: string;
  delta: string;
  deltaUp: boolean;
  icon: string;
  accent: "purple" | "pink" | "green" | "yellow";
}) {
  const { theme } = useTheme();

  const accents = {
    purple: {
      bar: "bg-purple-500",
      icon: "bg-purple-500/15",
      hover: "hover:border-purple-500/60",
    },
    pink: {
      bar: "bg-pink-500",
      icon: "bg-pink-500/15",
      hover: "hover:border-pink-500/60",
    },
    green: {
      bar: "bg-emerald-400",
      icon: "bg-emerald-400/15",
      hover: "hover:border-emerald-400/60",
    },
    yellow: {
      bar: "bg-yellow-400",
      icon: "bg-yellow-400/15",
      hover: "hover:border-yellow-400/60",
    },
  }[accent];

  return (
    <div
      className={`relative rounded-2xl p-4 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 cursor-default border
      ${
        theme === "dark"
          ? "bg-[#13161f] border-[#252935]"
          : "bg-white border-gray-200"
      }
      ${accents.hover}`}
    >
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] ${accents.bar} rounded-t-2xl`}
      />

      <div className="flex justify-between items-start mb-3">
        <span
          className={`text-[11px] font-medium
          ${theme === "dark" ? "text-[#6b7080]" : "text-gray-500"}`}
        >
          {label}
        </span>

        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${accents.icon}`}
        >
          {icon}
        </div>
      </div>

      <div
        style={{ fontFamily: "'Syne', sans-serif" }}
        className="text-3xl font-black leading-none mb-1"
      >
        {value}
      </div>

      <div
        className={`text-[11px]
        ${theme === "dark" ? "text-[#6b7080]" : "text-gray-500"}`}
      >
        <span className={deltaUp ? "text-emerald-400" : "text-pink-400"}>
          {deltaUp ? "▲" : "▼"} {delta}
        </span>{" "}
        {deltaUp ? "this month" : "vs last week"}
      </div>
    </div>
  );
}

// --- PAGE COMPONENTS ---

function DashboardPage() {
  const { theme } = useTheme();

  const cardClass =
    theme === "dark"
      ? "bg-[#13161f] border-[#252935]"
      : "bg-white border-gray-200 shadow-sm";

  const mutedText = theme === "dark" ? "text-[#6b7080]" : "text-gray-500";

  const hoverRow =
    theme === "dark" ? "hover:bg-[#1a1e2a]/50" : "hover:bg-gray-50";

  

  return (
    <div className="flex flex-col gap-4">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-3">
        <KpiCard
          label="Total Employees"
          value="142"
          delta="+4"
          deltaUp
          icon="👤"
          accent="purple"
        />

        <KpiCard
          label="On Leave Today"
          value="11"
          delta="+3"
          deltaUp={false}
          icon="🏖️"
          accent="pink"
        />

        <KpiCard
          label="Attendance Rate"
          value="92%"
          delta="+1.2%"
          deltaUp
          icon="✅"
          accent="green"
        />

        <KpiCard
          label="Open Positions"
          value="8"
          delta="2 filled"
          deltaUp
          icon="📋"
          accent="yellow"
        />
      </div>

      {/* Mid row */}
      <div className="grid grid-cols-[1fr_300px] gap-4">
        {/* Team Table */}
        <div
          className={`border rounded-2xl p-4 transition-all duration-300 ${cardClass}`}
        >
          <div className="flex justify-between items-center mb-3">
            <span
              style={{ fontFamily: "'Syne',sans-serif" }}
              className="font-bold text-sm"
            >
              Team Overview
            </span>

            <span className="text-xs text-purple-400 cursor-pointer hover:underline">
              View all →
            </span>
          </div>

          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {["Employee", "Department", "Status", "Joined"].map((h) => (
                  <th
                    key={h}
                    className={`text-left text-[10px] font-semibold uppercase tracking-widest pb-2 border-b ${
                      theme === "dark"
                        ? "text-[#6b7080] border-[#252935]"
                        : "text-gray-500 border-gray-200"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {employees.slice(0, 5).map((e) => (
                <tr
                  key={e.id}
                  className={`border-b last:border-0 transition-colors ${hoverRow} ${
                    theme === "dark" ? "border-[#252935]/50" : "border-gray-100"
                  }`}
                >
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full bg-gradient-to-br ${e.color} flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}
                      >
                        {e.initials}
                      </div>

                      <div>
                        <div className="text-xs font-medium">{e.name}</div>

                        <div className={`text-[10px] ${mutedText}`}>
                          {e.role}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className={`text-xs ${mutedText}`}>{e.dept}</td>

                  <td>
                    <StatusPill status={e.status} />
                  </td>

                  <td className={`text-[11px] ${mutedText}`}>{e.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Department Card */}
        <div
          className={`border rounded-2xl p-4 transition-all duration-300 ${cardClass}`}
        >
          <div className="flex justify-between items-center mb-3">
            <span
              style={{ fontFamily: "'Syne',sans-serif" }}
              className="font-bold text-sm"
            >
              By Department
            </span>
          </div>

          <div className="flex flex-col items-center gap-4">
            {/* DONUT */}
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 120 120" width="112" height="112">
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="none"
                  stroke="#7c5cfc"
                  strokeWidth="14"
                  strokeDasharray="110 179"
                  strokeDashoffset="0"
                  transform="rotate(-90 60 60)"
                />

                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="none"
                  stroke="#f05b7a"
                  strokeWidth="14"
                  strokeDasharray="51 238"
                  strokeDashoffset="-110"
                  transform="rotate(-90 60 60)"
                />

                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="none"
                  stroke="#2ee8b5"
                  strokeWidth="14"
                  strokeDasharray="68 221"
                  strokeDashoffset="-161"
                  transform="rotate(-90 60 60)"
                />

                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="none"
                  stroke="#f5a623"
                  strokeWidth="14"
                  strokeDasharray="60 229"
                  strokeDashoffset="-229"
                  transform="rotate(-90 60 60)"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  style={{ fontFamily: "'Syne',sans-serif" }}
                  className="text-2xl font-black"
                >
                  142
                </span>

                <span className={`text-[9px] ${mutedText}`}>total</span>
              </div>
            </div>

            {/* LABELS */}
            <div className="w-full flex flex-col gap-2">
              {deptData.map((d) => (
                <div key={d.label} className="flex items-center gap-2 text-xs">
                  <div
                    className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                    style={{ background: d.color }}
                  />

                  <span className={`flex-1 ${mutedText}`}>{d.label}</span>

                  <span className="font-semibold">{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Events */}
        <div
          className={`border rounded-2xl p-4 transition-all duration-300 ${cardClass}`}
        >
          <div className="flex justify-between items-center mb-3">
            <span
              style={{ fontFamily: "'Syne',sans-serif" }}
              className="font-bold text-sm"
            >
              Upcoming Events
            </span>

            <span className="text-xs text-purple-400 cursor-pointer hover:underline">
              Calendar →
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {events.map((ev, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-2.5 rounded-xl border transition-colors cursor-pointer
                ${
                  theme === "dark"
                    ? "bg-[#1a1e2a] border-[#252935] hover:border-purple-500/40"
                    : "bg-gray-50 border-gray-200 hover:border-purple-300"
                }`}
              >
                <div className="w-9 text-center flex-shrink-0">
                  <div
                    style={{ fontFamily: "'Syne',sans-serif" }}
                    className="text-lg font-black leading-none"
                  >
                    {ev.day}
                  </div>

                  <div
                    className={`text-[9px] uppercase tracking-wide ${mutedText}`}
                  >
                    {ev.month}
                  </div>
                </div>

                <div
                  className={`w-px h-8 ${
                    theme === "dark" ? "bg-[#252935]" : "bg-gray-200"
                  }`}
                />

                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{ev.title}</div>

                  <div className={`text-[10px] ${mutedText}`}>{ev.sub}</div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex-shrink-0 ${ev.tagColor}`}
                >
                  {ev.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline */}
        <div
          className={`border rounded-2xl p-4 transition-all duration-300 ${cardClass}`}
        >
          <div className="flex justify-between items-center mb-3">
            <span
              style={{ fontFamily: "'Syne',sans-serif" }}
              className="font-bold text-sm"
            >
              Recruitment Pipeline
            </span>

            <span className="text-xs text-purple-400 cursor-pointer hover:underline">
              Manage →
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {pipeline.map((p, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-medium">{p.role}</span>

                  <span className={mutedText}>
                    {p.filled}/{p.total}
                  </span>
                </div>

                <div
                  className={`h-1.5 rounded-full overflow-hidden ${
                    theme === "dark" ? "bg-[#1a1e2a]" : "bg-gray-200"
                  }`}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(p.filled / p.total) * 100}%`,
                      background: p.color,
                    }}
                  />
                </div>
              </div>
            ))}

            <button className="mt-1 w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white transition-colors">
              + Post New Job Opening
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmployeesPage() {
  const [search, setSearch] = useState("");
  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.dept.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="bg-[#13161f] border border-[#252935] rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <span
          style={{ fontFamily: "'Syne',sans-serif" }}
          className="font-bold text-base"
        >
          All Employees
        </span>
        <div className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search..."
            className="bg-[#1a1e2a] border border-[#252935] rounded-xl px-3 py-1.5 text-xs text-[#e8eaf2] placeholder-[#6b7080] outline-none focus:border-purple-500/50 w-44"
          />
          <button className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white transition-colors">
            + Add Employee
          </button>
        </div>
      </div>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {[
              "#",
              "Employee",
              "Department",
              "Role",
              "Status",
              "Joined",
              "Action",
            ].map((h) => (
              <th
                key={h}
                className="text-left text-[10px] font-semibold uppercase tracking-widest text-[#6b7080] pb-2 border-b border-[#252935]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((e, i) => (
            <tr
              key={e.id}
              className="border-b border-[#252935]/50 last:border-0 hover:bg-[#1a1e2a]/50 transition-colors"
            >
              <td className="py-3 text-[#6b7080] text-xs">{i + 1}</td>
              <td>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${e.color} flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}
                  >
                    {e.initials}
                  </div>
                  <span className="text-xs font-medium">{e.name}</span>
                </div>
              </td>
              <td className="text-xs text-[#6b7080]">{e.dept}</td>
              <td className="text-xs text-[#6b7080]">{e.role}</td>
              <td>
                <StatusPill status={e.status} />
              </td>
              <td className="text-[11px] text-[#6b7080]">{e.joined}</td>
              <td>
                <button className="text-[10px] text-purple-400 hover:text-purple-300 font-medium">
                  View →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AttendancePage() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const members = employees.slice(0, 5);
  const statuses = [
    ["Present", "Present", "Late", "Present", "Present"],
    ["Present", "Remote", "Remote", "Present", "Present"],
    ["Absent", "On Leave", "On Leave", "On Leave", "Present"],
    ["Present", "Present", "Present", "Present", "Late"],
    ["Present", "Present", "Present", "Absent", "Present"],
  ];
  return (
    <div className="bg-[#13161f] border border-[#252935] rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <span
          style={{ fontFamily: "'Syne',sans-serif" }}
          className="font-bold text-base"
        >
          Attendance — This Week
        </span>
        <span className="text-xs text-[#6b7080]">May 12 – 16, 2026</span>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left text-[10px] font-semibold uppercase tracking-widest text-[#6b7080] pb-2 border-b border-[#252935]">
              Employee
            </th>
            {days.map((d) => (
              <th
                key={d}
                className="text-center text-[10px] font-semibold uppercase tracking-widest text-[#6b7080] pb-2 border-b border-[#252935]"
              >
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.map((m, i) => (
            <tr
              key={m.id}
              className="border-b border-[#252935]/50 last:border-0"
            >
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0`}
                  >
                    {m.initials}
                  </div>
                  <span className="text-xs font-medium">{m.name}</span>
                </div>
              </td>
              {statuses[i].map((s, j) => (
                <td key={j} className="text-center py-3">
                  <StatusPill status={s} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-3 mt-4 pt-3 border-t border-[#252935]">
        {[
          ["Present", "bg-emerald-400"],
          ["Remote", "bg-purple-400"],
          ["Late", "bg-yellow-400"],
          ["Absent", "bg-pink-400"],
          ["On Leave", "bg-yellow-500"],
        ].map(([l, c]) => (
          <div
            key={l}
            className="flex items-center gap-1.5 text-[10px] text-[#6b7080]"
          >
            <div className={`w-2 h-2 rounded-full ${c}`} />
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

function RecruitmentPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          ["Total Applications", "47", "bg-purple-500"],
          ["Interviews Scheduled", "12", "bg-yellow-500"],
          ["Offers Sent", "4", "bg-emerald-500"],
        ].map(([l, v, c]) => (
          <div
            key={l}
            className="bg-[#13161f] border border-[#252935] rounded-2xl p-4"
          >
            <div className="text-[11px] text-[#6b7080] mb-2">{l}</div>
            <div
              style={{ fontFamily: "'Syne',sans-serif" }}
              className="text-3xl font-black"
            >
              {v}
            </div>
            <div className={`mt-2 h-1 w-12 rounded-full ${c}`} />
          </div>
        ))}
      </div>
      <div className="bg-[#13161f] border border-[#252935] rounded-2xl p-5">
        <span
          style={{ fontFamily: "'Syne',sans-serif" }}
          className="font-bold text-sm"
        >
          Open Positions
        </span>
        <div className="flex flex-col gap-3 mt-4">
          {pipeline.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-3 bg-[#1a1e2a] rounded-xl border border-[#252935] hover:border-purple-500/40 transition-colors"
            >
              <div className="flex-1">
                <div className="text-xs font-semibold">{p.role}</div>
                <div className="text-[10px] text-[#6b7080] mt-0.5">
                  {p.filled} applicants screened of {p.total}
                </div>
              </div>
              <div className="w-32">
                <div className="h-1.5 bg-[#252935] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(p.filled / p.total) * 100}%`,
                      background: p.color,
                    }}
                  />
                </div>
              </div>
              <button className="px-3 py-1 rounded-lg bg-purple-600/20 text-purple-400 text-[10px] font-semibold hover:bg-purple-600/40 transition-colors">
                Review
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PerformancePage() {
  return (
    <div className="bg-[#13161f] border border-[#252935] rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <span
          style={{ fontFamily: "'Syne',sans-serif" }}
          className="font-bold text-base"
        >
          Performance Scores — Q2 2026
        </span>
        <button className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white transition-colors">
          Run Reviews
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {performanceData.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-3 bg-[#1a1e2a] rounded-xl border border-[#252935]"
          >
            <div
              className={`w-8 h-8 rounded-full bg-gradient-to-br ${employees[i].color} flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}
            >
              {employees[i].initials}
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold">{p.name}</div>
              <div className="text-[10px] text-[#6b7080]">{p.dept}</div>
            </div>
            <div className="w-36">
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-[#6b7080]">Score</span>
                <span className="font-bold">{p.score}/100</span>
              </div>
              <div className="h-1.5 bg-[#252935] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-emerald-400 transition-all duration-700"
                  style={{ width: `${p.score}%` }}
                />
              </div>
            </div>
            <span
              className={`text-[11px] font-bold ${p.trend.startsWith("+") ? "text-emerald-400" : "text-pink-400"}`}
            >
              {p.trend}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PayrollPage() {
  return (
    <div className="bg-[#13161f] border border-[#252935] rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <span
          style={{ fontFamily: "'Syne',sans-serif" }}
          className="font-bold text-base"
        >
          Payroll — May 2026
        </span>
        <button className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white transition-colors">
          Run Payroll
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {[
              "Employee",
              "Department",
              "Salary",
              "Pay Date",
              "Status",
              "Action",
            ].map((h) => (
              <th
                key={h}
                className="text-left text-[10px] font-semibold uppercase tracking-widest text-[#6b7080] pb-2 border-b border-[#252935]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {payrollData.map((p, i) => (
            <tr
              key={i}
              className="border-b border-[#252935]/50 last:border-0 hover:bg-[#1a1e2a]/50 transition-colors"
            >
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full bg-gradient-to-br ${employees[i].color} flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0`}
                  >
                    {employees[i].initials}
                  </div>
                  <span className="text-xs font-medium">{p.name}</span>
                </div>
              </td>
              <td className="text-xs text-[#6b7080]">{p.dept}</td>
              <td className="text-xs font-semibold">{p.salary}</td>
              <td className="text-xs text-[#6b7080]">{p.date}</td>
              <td>
                <StatusPill status={p.status} />
              </td>
              <td>
                <button className="text-[10px] text-purple-400 hover:text-purple-300 font-medium">
                  Slip →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="bg-[#13161f] border border-[#252935] rounded-2xl p-5 max-w-lg">
      <span
        style={{ fontFamily: "'Syne',sans-serif" }}
        className="font-bold text-base"
      >
        Settings
      </span>
      <div className="flex flex-col gap-4 mt-4">
        {[
          ["Company Name", "PeopleOS Pvt Ltd"],
          ["HR Admin Email", "sara@peopleos.com"],
          ["Timezone", "Asia/Karachi (PKT)"],
          ["Currency", "PKR — Pakistani Rupee"],
        ].map(([label, val]) => (
          <div key={label} className="flex flex-col gap-1.5">
            <label className="text-[10px] text-[#6b7080] uppercase tracking-widest font-semibold">
              {label}
            </label>
            <input
              defaultValue={val}
              className="bg-[#1a1e2a] border border-[#252935] rounded-xl px-3 py-2 text-xs text-[#e8eaf2] outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
        ))}
        <button className="mt-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white transition-colors w-fit">
          Save Changes
        </button>
      </div>
    </div>
  );
}

const PAGE_MAP = {
  dashboard: { component: DashboardPage, title: "Dashboard" },
  employees: { component: EmployeesPage, title: "Employees" },
  attendance: { component: AttendancePage, title: "Attendance" },
  recruitment: { component: RecruitmentPage, title: "Recruitment" },
  performance: { component: PerformancePage, title: "Performance" },
  payroll: { component: PayrollPage, title: "Payroll" },
  settings: { component: SettingsPage, title: "Settings" },
};

export default function App() {
  const [activeTab, setActiveTab] =
    useState<keyof typeof PAGE_MAP>("dashboard");

  const ActivePage = PAGE_MAP[activeTab]?.component || DashboardPage;

  const pageTitle = PAGE_MAP[activeTab]?.title || "Dashboard";

  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`flex h-screen overflow-hidden transition-all duration-300
      ${
        theme === "dark"
          ? "bg-[#0c0e14] text-[#e8eaf2]"
          : "bg-[#f4f7fb] text-[#111827]"
      }`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      {/* SIDEBAR */}
      <aside
        className={`w-[200px] flex-shrink-0 flex flex-col py-5 px-3 gap-1 border-r transition-all duration-300
        ${
          theme === "dark"
            ? "bg-[#13161f] border-[#252935]"
            : "bg-white border-gray-200"
        }`}
      >
        <div
          style={{ fontFamily: "'Syne',sans-serif" }}
          className="text-lg font-black px-3 pb-5 tracking-tight"
        >
          People<span className="text-purple-400">OS</span>
        </div>

        {/* NAVIGATION */}
        {NAV.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key as keyof typeof PAGE_MAP)}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 w-full text-left
              
              ${
                activeTab === item.key
                  ? "bg-purple-500/15 text-purple-400"
                  : theme === "dark"
                    ? "text-[#6b7080] hover:bg-[#1a1e2a] hover:text-[#e8eaf2]"
                    : "text-gray-500 hover:bg-gray-100 hover:text-black"
              }
            `}
          >
            <span className="text-base w-5 text-center">{item.icon}</span>

            <span className="flex-1">{item.label}</span>

            {item.badge && (
              <span className="bg-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {item.badge}
              </span>
            )}
          </button>
        ))}

        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className={`mt-4 rounded-xl py-2 text-sm font-semibold transition-all
          ${
            theme === "dark"
              ? "bg-[#1a1e2a] hover:bg-[#252935] text-white"
              : "bg-gray-100 hover:bg-gray-200 text-black"
          }`}
        >
          {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* PROFILE */}
        <div
          className={`mt-auto pt-4 border-t
          ${theme === "dark" ? "border-[#252935]" : "border-gray-200"}`}
        >
          <div
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors cursor-pointer
            ${theme === "dark" ? "hover:bg-[#1a1e2a]" : "hover:bg-gray-100"}`}
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
              SA
            </div>

            <div>
              <div className="text-xs font-medium">Sara Ahmed</div>

              <div
                className={`text-[10px]
                ${theme === "dark" ? "text-[#6b7080]" : "text-gray-500"}`}
              >
                HR Manager
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
        {/* TOPBAR */}
        <div className="flex items-center justify-between">
          <div>
            <div
              style={{ fontFamily: "'Syne',sans-serif" }}
              className="text-xl font-black tracking-tight"
            >
              {activeTab === "dashboard" ? (
                <>
                  Good morning, <span className="text-purple-400">Sara</span> 👋
                </>
              ) : (
                pageTitle
              )}
            </div>

            <div
              className={`text-xs mt-0.5
              ${theme === "dark" ? "text-[#6b7080]" : "text-gray-500"}`}
            >
              {activeTab === "dashboard"
                ? "Wednesday, 13 May 2026 — Here's what's happening today."
                : `Manage your ${pageTitle.toLowerCase()} data`}
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex gap-2 items-center">
            {/* SEARCH */}
            <div
              className={`rounded-xl px-3 py-1.5 flex items-center gap-2 text-xs w-40 border transition-all
              ${
                theme === "dark"
                  ? "bg-[#13161f] border-[#252935] text-[#6b7080]"
                  : "bg-white border-gray-200 text-gray-500"
              }`}
            >
              🔍 Search...
            </div>

            {/* NOTIFICATION */}
            <div
              className={`relative w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-colors text-sm border
              ${
                theme === "dark"
                  ? "bg-[#13161f] border-[#252935] hover:border-purple-500/50"
                  : "bg-white border-gray-200 hover:border-purple-400"
              }`}
            >
              🔔
              <span
                className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-pink-500 rounded-full
                ${
                  theme === "dark"
                    ? "border border-[#0c0e14]"
                    : "border border-white"
                }`}
              />
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <ActivePage />
      </main>
    </div>
  );
}
