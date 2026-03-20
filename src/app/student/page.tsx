"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const studentsData = [
  { id: 1, name: "Alex Thompson", email: "a.thompson@oakridge.edu", grade: 11, school: "Oakridge Preparatory Academy", username: "alex.t", password: "Alex@123" },
  { id: 2, name: "Emma Wilson", email: "e.wilson@oakridge.edu", grade: 10, school: "Oakridge Preparatory Academy", username: "emma.w", password: "Emma@123" },
  { id: 3, name: "Michael Brown", email: "m.brown@westfield.edu", grade: 9, school: "Westfield Christian School", username: "michael.b", password: "Mike@123" },
  { id: 4, name: "Sophia Lee", email: "s.lee@oakridge.edu", grade: 12, school: "Oakridge Preparatory Academy", username: "sophia.l", password: "Soph@123" },
  { id: 5, name: "James Garcia", email: "j.garcia@riverside.edu", grade: 8, school: "Riverside Elementary", username: "james.g", password: "Jame@123" },
];

const coursesByGrade: Record<number, Array<{name: string, teacher: string, grade: string, progress: number}>> = {
  8: [
    { name: "Mathematics", teacher: "Ms. Anna Williams", grade: "A", progress: 92 },
    { name: "Science", teacher: "Mrs. Emily Roberts", grade: "A-", progress: 88 },
    { name: "English", teacher: "Mr. David Park", grade: "A", progress: 94 },
    { name: "History", teacher: "Dr. Sarah Mitchell", grade: "B+", progress: 85 },
  ],
  9: [
    { name: "Mathematics", teacher: "Mrs. Emily Roberts", grade: "B+", progress: 82 },
    { name: "Physics", teacher: "Dr. James Chen", grade: "B", progress: 78 },
    { name: "English", teacher: "Mr. David Park", grade: "A-", progress: 90 },
    { name: "Chemistry", teacher: "Mrs. Emily Roberts", grade: "B+", progress: 84 },
  ],
  10: [
    { name: "Mathematics", teacher: "Dr. Sarah Mitchell", grade: "A-", progress: 88 },
    { name: "Physics", teacher: "Dr. James Chen", grade: "A", progress: 92 },
    { name: "English", teacher: "Mr. David Park", grade: "A", progress: 95 },
    { name: "Chemistry", teacher: "Mrs. Emily Roberts", grade: "B+", progress: 86 },
  ],
  11: [
    { name: "Mathematics", teacher: "Dr. Sarah Mitchell", grade: "A", progress: 92 },
    { name: "Physics", teacher: "Dr. James Chen", grade: "A-", progress: 88 },
    { name: "Chemistry", teacher: "Mrs. Emily Roberts", grade: "B+", progress: 85 },
    { name: "English Literature", teacher: "Mr. David Park", grade: "A", progress: 94 },
  ],
  12: [
    { name: "Advanced Mathematics", teacher: "Dr. Sarah Mitchell", grade: "A", progress: 95 },
    { name: "Advanced Physics", teacher: "Dr. James Chen", grade: "A", progress: 93 },
    { name: "Advanced Chemistry", teacher: "Mrs. Emily Roberts", grade: "A-", progress: 90 },
    { name: "English Literature", teacher: "Mr. David Park", grade: "A", progress: 96 },
  ],
};

const assignmentsByGrade: Record<number, Array<{title: string, course: string, due: string, status: string}>> = {
  8: [
    { title: "Math Worksheet Chapter 5", course: "Mathematics", due: "Mar 22", status: "pending" },
    { title: "Science Project", course: "Science", due: "Mar 25", status: "pending" },
    { title: "Reading Comprehension", course: "English", due: "Mar 28", status: "draft" },
  ],
  9: [
    { title: "Algebra Problem Set", course: "Mathematics", due: "Mar 22", status: "pending" },
    { title: "Physics Lab Report", course: "Physics", due: "Mar 24", status: "pending" },
    { title: "Essay: Theme Analysis", course: "English", due: "Mar 27", status: "draft" },
  ],
  10: [
    { title: "Calculus Problem Set #7", course: "Mathematics", due: "Mar 22", status: "pending" },
    { title: "Physics Lab Report", course: "Physics", due: "Mar 24", status: "pending" },
    { title: "Chemistry Lab Quiz", course: "Chemistry", due: "Mar 25", status: "pending" },
  ],
  11: [
    { title: "Calculus Problem Set #7", course: "Mathematics", due: "Mar 22", status: "pending" },
    { title: "Physics Lab Report", course: "Physics", due: "Mar 24", status: "pending" },
    { title: "Chemistry Lab Quiz", course: "Chemistry", due: "Mar 25", status: "pending" },
    { title: "Essay: Shakespeare Analysis", course: "English", due: "Mar 28", status: "draft" },
  ],
  12: [
    { title: "AP Calculus Practice Exam", course: "Advanced Mathematics", due: "Mar 20", status: "pending" },
    { title: "Physics Research Paper", course: "Advanced Physics", due: "Mar 23", status: "pending" },
    { title: "Chemistry Final Project", course: "Advanced Chemistry", due: "Mar 26", status: "pending" },
  ],
};

const navItems = [
  { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Dashboard" },
  { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", label: "Courses" },
  { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01", label: "Assignments" },
  { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", label: "Calendar" },
  { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", label: "Messages" },
];

export default function StudentPortal() {
  const router = useRouter();
  const [loggedInStudent, setLoggedInStudent] = useState<typeof studentsData[0] | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const student = localStorage.getItem("loggedInStudent");
    if (!student) {
      router.push("/login");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoggedInStudent(JSON.parse(student));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInStudent");
    router.push("/");
  };

  if (!loggedInStudent) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const courses = coursesByGrade[loggedInStudent.grade as keyof typeof coursesByGrade] || [];
  const assignments = assignmentsByGrade[loggedInStudent.grade as keyof typeof assignmentsByGrade] || [];

  const gpaValues: Record<string, string> = {
    "A": "4.0", "A-": "3.7", "B+": "3.3", "B": "3.0", "B-": "2.7", "C+": "2.3", "C": "2.0"
  };

  const avgGrade = courses.length > 0 
    ? courses.reduce((acc, c) => acc + (gpaValues[c.grade] ? parseFloat(gpaValues[c.grade]) : 0), 0) / courses.length
    : 0;
  const gpa = avgGrade.toFixed(1);

  const stats = [
    { label: "GPA", value: gpa, icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "#3B82F6" },
    { label: "Attendance", value: "96%", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "#10B981" },
    { label: "Grade", value: loggedInStudent.grade.toString(), icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", color: "#A855F7" },
  ];

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      <aside className="w-72 bg-[#1E293B] border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-white font-['Outfit']">EduHub</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
              {getInitials(loggedInStudent.name)}
            </div>
            <div>
              <p className="text-white font-medium">{loggedInStudent.name}</p>
              <p className="text-slate-400 text-sm">Grade {loggedInStudent.grade}</p>
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
                  ? "bg-blue-500/20 text-blue-400 border-l-2 border-blue-400"
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
            <h1 className="text-3xl font-bold text-white font-['Outfit']">Student Dashboard</h1>
            <p className="text-slate-400 mt-1">Welcome back, {loggedInStudent.name.split(" ")[0]}!</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/10 border border-blue-500/20 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                {getInitials(loggedInStudent.name)}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{loggedInStudent.name}</h2>
                <p className="text-blue-300">Grade {loggedInStudent.grade} • {loggedInStudent.school}</p>
                <p className="text-slate-400 text-sm">Student ID: 2024-{loggedInStudent.id.toString().padStart(4, '0')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
            <h2 className="text-xl font-semibold text-white mb-6 font-['Outfit']">My Courses</h2>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.name} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">{course.name}</h3>
                    <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ background: course.grade.startsWith('A') ? '#10B98120' : '#F59E0B20', color: course.grade.startsWith('A') ? '#10B981' : '#F59E0B' }}>
                      {course.grade}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-3">{course.teacher}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${course.progress}%`, background: 'linear-gradient(90deg, #3B82F6, #60A5FA)' }} />
                    </div>
                    <span className="text-slate-400 text-sm">{course.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6 font-['Outfit']">Upcoming Assignments</h2>
            <div className="space-y-3">
              {assignments.map((assignment) => (
                <div key={assignment.title} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">{assignment.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      assignment.status === 'pending' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {assignment.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-slate-400">{assignment.course}</p>
                    <p className="text-slate-500">Due: {assignment.due}</p>
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
