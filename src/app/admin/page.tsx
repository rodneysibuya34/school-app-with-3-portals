"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Dashboard", href: "/admin" },
  { icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", label: "Schools", href: "/admin/schools" },
  { icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", label: "Teachers", href: "/admin/teachers" },
  { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", label: "Students", href: "/admin/students" },
  { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", label: "Subscriptions", href: "/admin/subscriptions" },
  { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", label: "Messages", href: "/admin/messages" },
];

const stats = [
  { label: "Total Schools", value: "12", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", color: "#3B82F6" },
  { label: "Active Teachers", value: "156", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", color: "#A855F7" },
  { label: "Total Students", value: "2,847", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", color: "#10B981" },
  { label: "Monthly Revenue", value: "$48,500", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "#F59E0B" },
];

const schools = [
  { id: 1, name: "Oakridge Preparatory Academy", location: "Boston, MA", students: 892, teachers: 48, status: "Active", plan: "Enterprise" },
  { id: 2, name: "Westfield Christian School", location: "Chicago, IL", students: 456, teachers: 28, status: "Active", plan: "Professional" },
  { id: 3, name: "Riverside Elementary", location: "Miami, FL", students: 324, teachers: 22, status: "Active", plan: "Basic" },
  { id: 4, name: "Highland Academy", location: "Seattle, WA", students: 678, teachers: 35, status: "Trial", plan: "Trial" },
];

const teachers = [
  { id: 1, name: "Dr. Sarah Mitchell", email: "s.mitchell@oakridge.edu", school: "Oakridge Preparatory", subject: "Mathematics", status: "Active" },
  { id: 2, name: "Mr. David Park", email: "d.park@oakridge.edu", school: "Oakridge Preparatory", subject: "English Literature", status: "Active" },
  { id: 3, name: "Mrs. Emily Roberts", email: "e.roberts@westfield.edu", school: "Westfield Christian", subject: "Chemistry", status: "Active" },
  { id: 4, name: "Dr. James Chen", email: "j.chen@oakridge.edu", school: "Oakridge Preparatory", subject: "Physics", status: "Active" },
  { id: 5, name: "Ms. Anna Williams", email: "a.williams@riverside.edu", school: "Riverside Elementary", subject: "History", status: "Pending" },
];

const students = [
  { id: 1, name: "Alex Thompson", email: "a.thompson@oakridge.edu", grade: 11, school: "Oakridge Preparatory", status: "Active" },
  { id: 2, name: "Emma Wilson", email: "e.wilson@oakridge.edu", grade: 10, school: "Oakridge Preparatory", status: "Active" },
  { id: 3, name: "Michael Brown", email: "m.brown@westfield.edu", grade: 9, school: "Westfield Christian", status: "Active" },
  { id: 4, name: "Sophia Lee", email: "s.lee@oakridge.edu", grade: 12, school: "Oakridge Preparatory", status: "Active" },
  { id: 5, name: "James Garcia", email: "j.garcia@riverside.edu", grade: 8, school: "Riverside Elementary", status: "Inactive" },
];

const subscriptions = [
  { id: 1, school: "Oakridge Preparatory Academy", plan: "Enterprise", price: "$2,499/mo", startDate: "Jan 1, 2026", status: "Active", renewal: "Jan 1, 2027" },
  { id: 2, school: "Westfield Christian School", plan: "Professional", price: "$899/mo", startDate: "Mar 15, 2025", status: "Active", renewal: "Mar 15, 2026" },
  { id: 3, school: "Riverside Elementary", plan: "Basic", price: "$299/mo", startDate: "Jun 1, 2025", status: "Active", renewal: "Jun 1, 2026" },
  { id: 4, school: "Highland Academy", plan: "Trial", price: "Free", startDate: "Mar 1, 2026", status: "Trial", renewal: "Mar 31, 2026" },
];

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "schools":
        return (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white font-['Outfit']">School Management</h1>
                <p className="text-slate-400 mt-1">Manage all registered schools</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create School
              </button>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">School Name</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Location</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Students</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Teachers</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Plan</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Status</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schools.map((school) => (
                    <tr key={school.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-4 px-4 text-white font-medium">{school.name}</td>
                      <td className="py-4 px-4 text-slate-400">{school.location}</td>
                      <td className="py-4 px-4 text-white">{school.students}</td>
                      <td className="py-4 px-4 text-white">{school.teachers}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          school.plan === 'Enterprise' ? 'bg-purple-500/20 text-purple-400' :
                          school.plan === 'Professional' ? 'bg-blue-500/20 text-blue-400' :
                          school.plan === 'Basic' ? 'bg-green-500/20 text-green-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {school.plan}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          school.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {school.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-slate-400 hover:text-white transition-colors">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "teachers":
        return (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white font-['Outfit']">Teacher Management</h1>
                <p className="text-slate-400 mt-1">Manage all teachers across schools</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Teacher
              </button>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Name</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Email</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">School</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Subject</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Status</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-4 px-4 text-white font-medium">{teacher.name}</td>
                      <td className="py-4 px-4 text-slate-400">{teacher.email}</td>
                      <td className="py-4 px-4 text-slate-400">{teacher.school}</td>
                      <td className="py-4 px-4 text-white">{teacher.subject}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          teacher.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {teacher.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-slate-400 hover:text-white transition-colors mr-3">Edit</button>
                        <button className="text-red-400 hover:text-red-300 transition-colors">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "students":
        return (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white font-['Outfit']">Student Management</h1>
                <p className="text-slate-400 mt-1">Manage all students across schools</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Student
              </button>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Name</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Email</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Grade</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">School</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Status</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-4 px-4 text-white font-medium">{student.name}</td>
                      <td className="py-4 px-4 text-slate-400">{student.email}</td>
                      <td className="py-4 px-4 text-white">{student.grade}</td>
                      <td className="py-4 px-4 text-slate-400">{student.school}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          student.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-slate-400 hover:text-white transition-colors mr-3">Edit</button>
                        <button className="text-red-400 hover:text-red-300 transition-colors">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "subscriptions":
        return (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white font-['Outfit']">Subscription Management</h1>
                <p className="text-slate-400 mt-1">Manage school subscriptions and billing</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Subscription
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <p className="text-slate-400 text-sm mb-2">Total Monthly Revenue</p>
                <p className="text-3xl font-bold text-white">$48,500</p>
                <p className="text-green-400 text-sm mt-2">+12% from last month</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <p className="text-slate-400 text-sm mb-2">Annual Run Rate</p>
                <p className="text-3xl font-bold text-white">$582,000</p>
                <p className="text-green-400 text-sm mt-2">+8% YoY</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <p className="text-slate-400 text-sm mb-2">Active Subscriptions</p>
                <p className="text-3xl font-bold text-white">11</p>
                <p className="text-slate-400 text-sm mt-2">1 trial pending</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <p className="text-slate-400 text-sm mb-2">Churn Rate</p>
                <p className="text-3xl font-bold text-white">2.1%</p>
                <p className="text-green-400 text-sm mt-2">-0.5% from last quarter</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">School</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Plan</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Price</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Start Date</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Next Renewal</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Status</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-4 px-4 text-white font-medium">{sub.school}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          sub.plan === 'Enterprise' ? 'bg-purple-500/20 text-purple-400' :
                          sub.plan === 'Professional' ? 'bg-blue-500/20 text-blue-400' :
                          sub.plan === 'Basic' ? 'bg-green-500/20 text-green-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {sub.plan}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-white">{sub.price}</td>
                      <td className="py-4 px-4 text-slate-400">{sub.startDate}</td>
                      <td className="py-4 px-4 text-slate-400">{sub.renewal}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          sub.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-slate-400 hover:text-white transition-colors mr-3">Manage</button>
                        <button className="text-emerald-400 hover:text-emerald-300 transition-colors">Invoice</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white font-['Outfit']">Admin Dashboard</h1>
                <p className="text-slate-400 mt-1">Welcome back! Here&apos;s your platform overview.</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
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
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white font-['Outfit']">Recent Schools</h2>
                  <button onClick={() => setActiveTab("schools")} className="text-emerald-400 hover:text-emerald-300 text-sm">View All</button>
                </div>
                <div className="space-y-4">
                  {schools.slice(0, 4).map((school) => (
                    <div key={school.id} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">{school.name}</h3>
                        <p className="text-slate-400 text-sm">{school.location}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        school.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {school.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white font-['Outfit']">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setActiveTab("schools")} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">Create School</p>
                    <p className="text-slate-400 text-sm">Add new school</p>
                  </button>
                  <button onClick={() => setActiveTab("teachers")} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">Add Teacher</p>
                    <p className="text-slate-400 text-sm">New faculty member</p>
                  </button>
                  <button onClick={() => setActiveTab("students")} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">Add Student</p>
                    <p className="text-slate-400 text-sm">Enroll new student</p>
                  </button>
                  <button onClick={() => setActiveTab("subscriptions")} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">Manage Billing</p>
                    <p className="text-slate-400 text-sm">View subscriptions</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

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
              AD
            </div>
            <div>
              <p className="text-white font-medium">Admin User</p>
              <p className="text-slate-400 text-sm">Platform Admin</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.label === "Dashboard") setActiveTab("dashboard");
                else if (item.label === "Schools") setActiveTab("schools");
                else if (item.label === "Teachers") setActiveTab("teachers");
                else if (item.label === "Students") setActiveTab("students");
                else if (item.label === "Subscriptions") setActiveTab("subscriptions");
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                (activeTab === "dashboard" && item.label === "Dashboard") ||
                (activeTab === "schools" && item.label === "Schools") ||
                (activeTab === "teachers" && item.label === "Teachers") ||
                (activeTab === "students" && item.label === "Students") ||
                (activeTab === "subscriptions" && item.label === "Subscriptions")
                  ? "bg-emerald-500/20 text-emerald-400 border-l-2 border-emerald-400"
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
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Log Out</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}
