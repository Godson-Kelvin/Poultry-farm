import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  Egg,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  Thermometer,
  Tractor,
  TrendingUp,
  Users,
  Warehouse,
  Wheat,
  Wind,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  alerts as initialAlerts,
  coopData,
  eggProduction,
  farmStats,
  feedData,
  recentActivity,
  tasks as initialTasks,
  weightData,
} from "./data/mockData";

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function StatCard({
  label,
  value,
  change,
  changeType,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  change: string;
  changeType: "up" | "down";
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={cn("rounded-xl p-2.5", color)}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-sm">
        {changeType === "up" ? (
          <ArrowUpRight className="h-4 w-4 text-emerald-600" />
        ) : (
          <ArrowDownRight className="h-4 w-4 text-rose-600" />
        )}
        <span className={changeType === "up" ? "text-emerald-600" : "text-rose-600"}>{change}</span>
        <span className="text-slate-400">vs yesterday</span>
      </div>
    </div>
  );
}

function AlertBadge({ type }: { type: string }) {
  const styles = {
    danger: "bg-rose-100 text-rose-700 border-rose-200",
    warning: "bg-amber-100 text-amber-700 border-amber-200",
    info: "bg-sky-100 text-sky-700 border-sky-200",
  };
  const labels = { danger: "Critical", warning: "Warning", info: "Info" };
  return (
    <span className={cn("rounded-full border px-2.5 py-0.5 text-xs font-semibold", styles[type as keyof typeof styles])}>
      {labels[type as keyof typeof labels]}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-xs font-semibold",
        status === "Good" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700",
      )}
    >
      {status}
    </span>
  );
}

function Modal({
  title,
  isOpen,
  onClose,
  children,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "houses", icon: Warehouse, label: "Houses" },
  { id: "flock", icon: Users, label: "Flock" },
  { id: "production", icon: Egg, label: "Production" },
  { id: "feed", icon: Wheat, label: "Feed" },
  { id: "schedule", icon: Calendar, label: "Schedule" },
  { id: "reports", icon: TrendingUp, label: "Reports" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [addRecordOpen, setAddRecordOpen] = useState(false);
  const [allAlertsOpen, setAllAlertsOpen] = useState(false);
  const [fullLogOpen, setFullLogOpen] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [alerts] = useState(initialAlerts);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "completed" ? "pending" : "completed" as const }
          : task,
      ),
    );
  };

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const activeTabLabel = navItems.find((item) => item.id === activeTab)?.label || "Dashboard";

  const filteredCoops = coopData.filter(
    (coop) =>
      coop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coop.status.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderContent = () => {
    switch (activeTab) {
      case "houses":
        return (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Houses</h3>
            <p className="text-slate-500">Manage and monitor all poultry houses.</p>
          </div>
        );
      case "flock":
        return (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Flock</h3>
            <p className="text-slate-500">Track bird health, age, and vaccinations.</p>
          </div>
        );
      case "production":
        return (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Production</h3>
            <p className="text-slate-500">Detailed egg production reports and grading.</p>
          </div>
        );
      case "feed":
        return (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Feed</h3>
            <p className="text-slate-500">Monitor feed inventory, consumption, and costs.</p>
          </div>
        );
      case "schedule":
        return (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Schedule</h3>
            <p className="text-slate-500">Daily tasks, vaccinations, and maintenance calendar.</p>
          </div>
        );
      case "reports":
        return (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Reports</h3>
            <p className="text-slate-500">Generate weekly, monthly, and yearly farm reports.</p>
          </div>
        );
      case "settings":
        return (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Settings</h3>
            <p className="text-slate-500">Configure farm preferences, users, and alerts.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-slate-100 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <Egg className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight text-slate-900">Kelvin's Farm</h1>
            <p className="text-xs text-slate-500">Farm Dashboard</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition",
                activeTab === item.id
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500">Farm Manager</p>
            <p className="mt-1 font-medium text-slate-900">Kelvin</p>
            <p className="text-xs text-slate-500">kelvin@kelsfarm.com</p>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search houses, birds, records..."
                className="h-10 w-64 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>

              {notificationsOpen && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setNotificationsOpen(false)} />
                  <div className="absolute right-0 top-full z-30 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                    <h4 className="mb-3 text-sm font-bold text-slate-900">Notifications</h4>
                    <div className="space-y-3">
                      {alerts.slice(0, 3).map((alert) => (
                        <div key={alert.id} className="flex items-start gap-3">
                          {alert.type === "danger" ? (
                            <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                          ) : alert.type === "warning" ? (
                            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                          ) : (
                            <Bell className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
                          )}
                          <div>
                            <p className="text-sm text-slate-900">{alert.message}</p>
                            <p className="text-xs text-slate-400">{alert.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setNotificationsOpen(false);
                        setAllAlertsOpen(true);
                      }}
                      className="mt-4 w-full rounded-xl bg-emerald-50 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
                    >
                      View all alerts
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="h-8 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-slate-900">Kelvin</p>
                <p className="text-xs text-slate-500">Manager</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
                K
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {activeTab === "dashboard" ? "Farm Overview" : activeTabLabel}
              </h2>
              <p className="text-slate-500">Sunday, June 14, 2026</p>
            </div>
            <button
              onClick={() => setAddRecordOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-95"
            >
              <Tractor className="h-4 w-4" />
              Add Record
            </button>
          </div>

          {activeTab !== "dashboard" ? (
            <div className="space-y-6">{renderContent()}</div>
          ) : (
            <>
              {/* Stats */}
              <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  label="Total Birds"
                  value={farmStats.totalBirds.toLocaleString()}
                  change="+1.2%"
                  changeType="up"
                  icon={Users}
                  color="bg-emerald-600"
                />
                <StatCard
                  label="Eggs Today"
                  value={farmStats.eggsToday.toLocaleString()}
                  change="+2.3%"
                  changeType="up"
                  icon={Egg}
                  color="bg-amber-500"
                />
                <StatCard
                  label="Mortality Rate"
                  value={`${farmStats.mortalityRate}%`}
                  change="-0.05%"
                  changeType="down"
                  icon={TrendingUp}
                  color="bg-rose-500"
                />
                <StatCard
                  label="Avg Bird Weight"
                  value={`${farmStats.avgWeightGrams}g`}
                  change="+1.1%"
                  changeType="up"
                  icon={Wheat}
                  color="bg-sky-500"
                />
              </div>

              {/* Environmental sensors */}
              <div className="mb-8 grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                    <Thermometer className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Avg Temperature</p>
                    <p className="text-xl font-bold text-slate-900">{farmStats.temperature}°C</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                    <Wind className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Avg Humidity</p>
                    <p className="text-xl font-bold text-slate-900">{farmStats.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Houses Operational</p>
                    <p className="text-xl font-bold text-slate-900">4 / 4</p>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="mb-8 grid gap-6 xl:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Egg Production</h3>
                      <p className="text-sm text-slate-500">Daily eggs collected vs target</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="flex items-center gap-1.5 text-slate-600">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        Actual
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-600">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                        Target
                      </span>
                    </div>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={eggProduction}>
                        <defs>
                          <linearGradient id="colorEggs" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#64748b", fontSize: 12 }}
                          tickFormatter={(value) => `${value / 1000}k`}
                        />
                        <Tooltip
                          contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
                          formatter={(value) => [typeof value === "number" ? value.toLocaleString() : value, "Eggs"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="eggs"
                          stroke="#10b981"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorEggs)"
                        />
                        <Line type="monotone" dataKey="target" stroke="#cbd5e1" strokeWidth={2} dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900">Feed Consumption</h3>
                    <p className="text-sm text-slate-500">Kilograms per day</p>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={feedData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#64748b", fontSize: 12 }}
                          tickFormatter={(value) => `${value}kg`}
                        />
                        <Tooltip
                          contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
                          formatter={(value) => [`${value} kg`, "Feed"]}
                        />
                        <Bar dataKey="consumed" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Middle section */}
              <div className="mb-8 grid gap-6 xl:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
                  <h3 className="mb-4 text-lg font-bold text-slate-900">House Performance</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-500">
                          <th className="pb-3 font-medium">House</th>
                          <th className="pb-3 font-medium">Birds</th>
                          <th className="pb-3 font-medium">Eggs Today</th>
                          <th className="pb-3 font-medium">Mortality</th>
                          <th className="pb-3 font-medium">Temp / Humidity</th>
                          <th className="pb-3 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCoops.map((coop) => (
                          <tr key={coop.id} className="border-b border-slate-50 last:border-0">
                            <td className="py-3.5 font-medium text-slate-900">{coop.name}</td>
                            <td className="py-3.5 text-slate-600">{coop.birds.toLocaleString()}</td>
                            <td className="py-3.5 text-slate-600">{coop.eggsToday.toLocaleString()}</td>
                            <td className="py-3.5 text-slate-600">{coop.mortality}%</td>
                            <td className="py-3.5 text-slate-600">
                              {coop.temp}°C / {coop.humidity}%
                            </td>
                            <td className="py-3.5">
                              <StatusBadge status={coop.status} />
                            </td>
                          </tr>
                        ))}
                        {filteredCoops.length === 0 && (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-slate-500">
                              No houses match your search.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-bold text-slate-900">Bird Weight Trend</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weightData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#64748b", fontSize: 12 }}
                          domain={["dataMin - 50", "dataMax + 50"]}
                        />
                        <Tooltip
                          contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
                          formatter={(value) => [`${value}g`, "Weight"]}
                        />
                        <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: "#10b981" }} />
                        <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-center text-sm text-emerald-800">
                    Average weight is on track with target
                  </div>
                </div>
              </div>

              {/* Bottom section */}
              <div className="grid gap-6 xl:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Alerts</h3>
                    <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-700">{alerts.length}</span>
                  </div>
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 rounded-xl border border-slate-100 p-3 hover:bg-slate-50">
                        <div className="mt-0.5 shrink-0">
                          {alert.type === "danger" ? (
                            <XCircle className="h-5 w-5 text-rose-500" />
                          ) : alert.type === "warning" ? (
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          ) : (
                            <Bell className="h-5 w-5 text-sky-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">{alert.message}</p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <AlertBadge type={alert.type} />
                            <span className="text-xs text-slate-400">{alert.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setAllAlertsOpen(true)}
                    className="mt-4 flex w-full items-center justify-center gap-1 rounded-xl py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50"
                  >
                    View all alerts
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Today's Tasks</h3>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                      {tasks.filter((t) => t.status === "completed").length}/{tasks.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <button
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:bg-slate-50"
                      >
                        {task.status === "completed" ? (
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                        ) : task.status === "in-progress" ? (
                          <Clock className="h-5 w-5 shrink-0 text-amber-500" />
                        ) : (
                          <Circle className="h-5 w-5 shrink-0 text-slate-300" />
                        )}
                        <div className="flex-1">
                          <p
                            className={cn(
                              "text-sm font-medium",
                              task.status === "completed" ? "text-slate-400 line-through" : "text-slate-900",
                            )}
                          >
                            {task.title}
                          </p>
                          <p className="text-xs text-slate-400">{task.time}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-bold text-slate-900">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="relative pl-5">
                        <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-emerald-500" />
                        <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                        <p className="text-sm text-slate-500">{activity.detail}</p>
                        <p className="mt-0.5 text-xs text-slate-400">{activity.time}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setFullLogOpen(true)}
                    className="mt-5 w-full rounded-xl border border-slate-200 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    View full log
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Modals */}
      <Modal title="Add Farm Record" isOpen={addRecordOpen} onClose={() => setAddRecordOpen(false)}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setAddRecordOpen(false);
          }}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Record Type</label>
            <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:bg-white">
              <option>Egg Collection</option>
              <option>Feed Delivery</option>
              <option>Mortality</option>
              <option>Health Check</option>
              <option>Weight Sample</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">House</label>
            <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:bg-white">
              <option>House A</option>
              <option>House B</option>
              <option>House C</option>
              <option>House D</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Value / Quantity</label>
            <input
              type="number"
              placeholder="Enter value"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:bg-white"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setAddRecordOpen(false)}
              className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Save Record
            </button>
          </div>
        </form>
      </Modal>

      <Modal title="All Alerts" isOpen={allAlertsOpen} onClose={() => setAllAlertsOpen(false)}>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 rounded-xl border border-slate-100 p-3">
              {alert.type === "danger" ? (
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
              ) : alert.type === "warning" ? (
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              ) : (
                <Bell className="mt-0.5 h-5 w-5 shrink-0 text-sky-500" />
              )}
              <div>
                <p className="text-sm font-medium text-slate-900">{alert.message}</p>
                <div className="mt-1 flex items-center gap-2">
                  <AlertBadge type={alert.type} />
                  <span className="text-xs text-slate-400">{alert.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal title="Activity Log" isOpen={fullLogOpen} onClose={() => setFullLogOpen(false)}>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="relative pl-5">
              <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-emerald-500" />
              <p className="text-sm font-medium text-slate-900">{activity.action}</p>
              <p className="text-sm text-slate-500">{activity.detail}</p>
              <p className="mt-0.5 text-xs text-slate-400">{activity.time}</p>
            </div>
          ))}
          <div className="relative pl-5">
            <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-slate-300" />
            <p className="text-sm font-medium text-slate-900">System backup completed</p>
            <p className="text-sm text-slate-500">Automatic daily backup</p>
            <p className="mt-0.5 text-xs text-slate-400">Yesterday 11:59 PM</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
