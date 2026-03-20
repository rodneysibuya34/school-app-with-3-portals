import Link from "next/link";

const navItems = [
  { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Dashboard", href: "/parent" },
  { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", label: "Academic Progress", href: "/parent/academics" },
  { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01", label: "Attendance", href: "/parent/attendance" },
  { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "Fees & Payments", href: "/parent/fees" },
  { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", label: "Messages", href: "/parent/messages" },
];

const stats = [
  { label: "GPA", value: "3.8", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "#10B981" },
  { label: "Attendance", value: "95%", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "#3B82F6" },
  { label: "Rank", value: "#12", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", color: "#A855F7" },
  { label: "Credits", value: "64/68", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", color: "#F59E0B" },
];

const courses = [
  { name: "Mathematics", grade: "A", teacher: "Dr. Sarah Mitchell" },
  { name: "Physics", grade: "A-", teacher: "Dr. James Chen" },
  { name: "Chemistry", grade: "B+", teacher: "Mrs. Emily Roberts" },
  { name: "English Literature", grade: "A", teacher: "Mr. David Park" },
  { name: "World History", grade: "A-", teacher: "Ms. Anna Williams" },
];

const attendance = [
  { month: "January", present: 19, absent: 1, late: 2 },
  { month: "February", present: 18, absent: 0, late: 3 },
  { month: "March", present: 15, absent: 1, late: 1 },
];

const feeInfo = {
  total: "$2,450",
  status: "Paid",
  dueDate: "Aug 15, 2026",
  nextDue: "$0",
};

export default function ParentPortal() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      <aside className="w-72 bg-[#1E293B] border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-white font-['Outfit']">EduHub</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold">
              JT
            </div>
            <div>
              <p className="text-white font-medium">Jennifer Thompson</p>
              <p className="text-slate-400 text-sm">Parent of Alex</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Log Out</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white font-['Outfit']">Parent Dashboard</h1>
            <p className="text-slate-400 mt-1">Welcome back, Jennifer! Here&apos;s Alex&apos;s academic overview.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors">
              Contact Teacher
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xl font-bold">
                AT
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Alex Thompson</h2>
                <p className="text-emerald-300">Grade 11 • Section A</p>
                <p className="text-slate-400 text-sm">Student ID: 2024-0892</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-sm">Overall Grade</p>
              <p className="text-3xl font-bold text-emerald-400">A-</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}20` }}>
                  <svg className="w-6 h-6" style={{ color: stat.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6 font-['Outfit']">Current Courses</h2>
            <div className="space-y-3">
              {courses.map((course) => (
                <div key={course.name} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-medium">{course.name}</h3>
                    <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ background: course.grade.startsWith('A') ? '#10B98120' : '#F59E0B20', color: course.grade.startsWith('A') ? '#10B981' : '#F59E0B' }}>
                      {course.grade}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">{course.teacher}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6 font-['Outfit']">Attendance Summary</h2>
              <div className="space-y-4">
                {attendance.map((month) => (
                  <div key={month.month} className="flex items-center justify-between">
                    <span className="text-slate-400">{month.month}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-green-400">{month.present} present</span>
                      <span className="text-red-400">{month.absent} absent</span>
                      <span className="text-yellow-400">{month.late} late</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 font-medium transition-colors">
                View Detailed Attendance
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6 font-['Outfit']">Fee Status</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Semester Fee</span>
                  <span className="text-white font-medium">{feeInfo.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Status</span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400">
                    {feeInfo.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Next Payment Due</span>
                  <span className="text-white">{feeInfo.nextDue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
