export const farmStats = {
  totalBirds: 12480,
  hens: 10850,
  roosters: 1630,
  eggsToday: 9842,
  eggsYesterday: 9620,
  feedConsumedKg: 2450,
  mortalityRate: 0.32,
  avgWeightGrams: 1840,
  temperature: 22.4,
  humidity: 64,
};

export const coopData = [
  { id: 1, name: "House A", birds: 4200, eggsToday: 3820, mortality: 0.2, temp: 22.5, humidity: 63, status: "Good" },
  { id: 2, name: "House B", birds: 3850, eggsToday: 3120, mortality: 0.4, temp: 23.1, humidity: 66, status: "Good" },
  { id: 3, name: "House C", birds: 2680, eggsToday: 1980, mortality: 0.6, temp: 21.8, humidity: 61, status: "Attention" },
  { id: 4, name: "House D", birds: 1750, eggsToday: 922, mortality: 0.1, temp: 22.9, humidity: 68, status: "Good" },
];

export const eggProduction = [
  { day: "Mon", eggs: 9200, target: 9500 },
  { day: "Tue", eggs: 9350, target: 9500 },
  { day: "Wed", eggs: 9480, target: 9500 },
  { day: "Thu", eggs: 9620, target: 9600 },
  { day: "Fri", eggs: 9580, target: 9600 },
  { day: "Sat", eggs: 9710, target: 9600 },
  { day: "Sun", eggs: 9842, target: 9700 },
];

export const feedData = [
  { day: "Mon", consumed: 2380, cost: 1428 },
  { day: "Tue", consumed: 2410, cost: 1446 },
  { day: "Wed", consumed: 2395, cost: 1437 },
  { day: "Thu", consumed: 2430, cost: 1458 },
  { day: "Fri", consumed: 2405, cost: 1443 },
  { day: "Sat", consumed: 2440, cost: 1464 },
  { day: "Sun", consumed: 2450, cost: 1470 },
];

export const weightData = [
  { week: "W1", weight: 1650, target: 1700 },
  { week: "W2", weight: 1720, target: 1750 },
  { week: "W3", weight: 1780, target: 1800 },
  { week: "W4", weight: 1840, target: 1850 },
  { week: "W5", weight: 1890, target: 1900 },
];

export const alerts = [
  { id: 1, type: "warning", message: "House C temperature dropped to 21.8°C", time: "10 min ago" },
  { id: 2, type: "danger", message: "Feed silo 2 is below 15%", time: "32 min ago" },
  { id: 3, type: "info", message: "Vaccination scheduled for House B tomorrow", time: "1 hr ago" },
  { id: 4, type: "warning", message: "House C mortality slightly above average", time: "2 hrs ago" },
];

export const tasks = [
  { id: 1, title: "Collect eggs - House A", status: "completed", time: "06:00 AM" },
  { id: 2, title: "Check water lines - House B", status: "in-progress", time: "08:00 AM" },
  { id: 3, title: "Refill feed silo 2", status: "pending", time: "10:00 AM" },
  { id: 4, title: "Inspect ventilation - House C", status: "pending", time: "12:00 PM" },
  { id: 5, title: "Clean egg belts - House D", status: "pending", time: "02:00 PM" },
];

export const recentActivity = [
  { id: 1, action: "Egg collection completed", detail: "House A - 3,820 eggs", time: "06:15 AM" },
  { id: 2, action: "Feed delivery received", detail: "12 tons layer mash", time: "07:40 AM" },
  { id: 3, action: "Health check", detail: "House B - no issues", time: "08:30 AM" },
  { id: 4, action: "Temperature alert resolved", detail: "House D cooling restored", time: "09:10 AM" },
];
