"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const teachersData = [
  { id: 1, name: "Dr. Sarah Mitchell", email: "s.mitchell@oakridge.edu", school: "Oakridge Preparatory Academy", subject: "Mathematics", username: "s.mitchell", password: "Mitch@123" },
  { id: 2, name: "Mr. David Park", email: "d.park@oakridge.edu", school: "Oakridge Preparatory Academy", subject: "English Literature", username: "d.park", password: "Park@123" },
  { id: 3, name: "Mrs. Emily Roberts", email: "e.roberts@westfield.edu", school: "Westfield Christian School", subject: "Chemistry", username: "e.roberts", password: "Rob@123" },
  { id: 4, name: "Dr. James Chen", email: "j.chen@oakridge.edu", school: "Oakridge Preparatory Academy", subject: "Physics", username: "j.chen", password: "Chen@123" },
  { id: 5, name: "Ms. Anna Williams", email: "a.williams@riverside.edu", school: "Riverside Elementary", subject: "History", username: "a.williams", password: "Will@123" },
];

const studentsData = [
  { id: 1, name: "Alex Thompson", email: "a.thompson@oakridge.edu", grade: 11, school: "Oakridge Preparatory Academy", username: "alex.t", password: "Alex@123" },
  { id: 2, name: "Emma Wilson", email: "e.wilson@oakridge.edu", grade: 10, school: "Oakridge Preparatory Academy", username: "emma.w", password: "Emma@123" },
  { id: 3, name: "Michael Brown", email: "m.brown@westfield.edu", grade: 9, school: "Westfield Christian School", username: "michael.b", password: "Mike@123" },
  { id: 4, name: "Sophia Lee", email: "s.lee@oakridge.edu", grade: 12, school: "Oakridge Preparatory Academy", username: "sophia.l", password: "Soph@123" },
  { id: 5, name: "James Garcia", email: "j.garcia@riverside.edu", grade: 8, school: "Riverside Elementary", username: "james.g", password: "Jame@123" },
];

const navItems = [
  { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Dashboard" },
  { icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", label: "Classes" },
  { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01", label: "Grade Book" },
  { icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z", label: "Announcements" },
  { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", label: "Messages" },
];

export default function TeacherPortal() {
  const router = useRouter();
  const [loggedInTeacher, setLoggedInTeacher] = useState<typeof teachersData[0] | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const teacher = localStorage.getItem("loggedInTeacher");
    if (!teacher) {
      router.push("/login");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoggedInTeacher(JSON.parse(teacher));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInTeacher");
    router.push("/");
  };

  if (!loggedInTeacher) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const schoolStudents = studentsData.filter(s => s.school === loggedInTeacher.school);
  const schoolTeachers = teachersData.filter(t => t.school === loggedInTeacher.school);

  const stats = [
    { label: "My Students", value: schoolStudents.length.toString(), icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", color: "#A855F7" },
    { label: "My Subject", value: loggedInTeacher.subject, icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", color: "#3B82F6" },
    { label: "School Teachers", value: schoolTeachers.length.toString(), icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", color: "#10B981" },
    { label: "School", value: loggedInTeacher.school.split(" ")[0], icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", color: "#F59E0B" },
  ];

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      <aside className="w-72 bg-[#1E293B] border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-white font-['Outfit']">EduHub</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold">
              {getInitials(loggedInTeacher.name)}
            </div>
            <div>
              <p className="text-white font-medium">{loggedInTeacher.name}</p>
              <p className="text-slate-400 text-sm">{loggedInTeacher.subject}</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label.toLowerCase())}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.label.toLowerCase()
                  ? "bg-purple-500/20 text-purple-400 border-l-2 border-purple-400"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white font-['Outfit']">Teacher Dashboard</h1>
            <p className="text-slate-400 mt-1">Welcome back, {loggedInTeacher.name.split(" ")[1]}!</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors">
              Create Announcement
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/10 border border-purple-500/20 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                {getInitials(loggedInTeacher.name)}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{loggedInTeacher.name}</h2>
                <p className="text-purple-300">{loggedInTeacher.subject} • {loggedInTeacher.school}</p>
                <p className="text-slate-400 text-sm">Teacher ID: 2024-{loggedInTeacher.id.toString().padStart(4, '0')}</p>
              </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6 font-['Outfit']">My Students ({loggedInTeacher.school})</h2>
            <div className="space-y-3">
              {schoolStudents.map((student) => (
                <div key={student.id} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-medium">
                        {getInitials(student.name)}
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{student.name}</h3>
                        <p className="text-slate-400 text-sm">Grade {student.grade}</p>
                      </div>
                    </div>
                    <button className="text-purple-400 hover:text-purple-300 text-sm">View Grades</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6 font-['Outfit']">School Staff</h2>
            <div className="space-y-3">
              {schoolTeachers.map((teacher) => (
                <div key={teacher.id} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                      {getInitials(teacher.name)}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{teacher.name}</h3>
                      <p className="text-slate-400 text-sm">{teacher.subject}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
