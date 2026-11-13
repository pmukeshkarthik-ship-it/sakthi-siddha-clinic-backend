const hours = {
  1: [["10:00","13:30"],["17:00","19:30"]],
  2: [["10:00","13:30"]],
  3: [["17:00","19:30"]],
  4: [["10:00","13:30"],["17:00","19:30"]],
  6: [["10:00","13:30"],["17:00","19:30"]]
};
export function isPastClinicDate(dateString) {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit"
  }).format(new Date());
  return dateString < today;
}
export function isValidClinicSlot(dateString, timeString) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString) ||
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(timeString)) return false;
  const date = new Date(`${dateString}T12:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0,10) !== dateString) return false;
  const weekday = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kolkata", weekday: "short" }).format(date);
  const day = {Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[weekday];
  return (hours[day] || []).some(([start,end]) => timeString >= start && timeString <= end);
}
export const clinicHours = {
  timezone: "Asia/Kolkata",
  Monday: ["10:00-13:30","17:00-19:30"],
  Tuesday: ["10:00-13:30"],
  Wednesday: ["17:00-19:30"],
  Thursday: ["10:00-13:30","17:00-19:30"],
  Friday: [], Saturday: ["10:00-13:30","17:00-19:30"], Sunday: []
};
