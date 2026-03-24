"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const schoolsData = [
  { id: 1, name: "Oakridge Preparatory Academy", location: "Boston, MA", type: "High School", adminUsername: "oakridge_admin", adminPassword: "Oak@2024" },
  { id: 2, name: "Westfield Christian School", location: "Chicago, IL", type: "Primary", adminUsername: "westfield_admin", adminPassword: "West@2024" },
  { id: 3, name: "Riverside Elementary", location: "Miami, FL", type: "Primary", adminUsername: "riverside_admin", adminPassword: "River@2024" },
  { id: 4, name: "Highland Academy", location: "Seattle, WA", type: "High School", adminUsername: "highland_admin", adminPassword: "High@2024" },
];

const defaultTeachers = [
  { id: 1, name: "Dr. Sarah Mitchell", email: "s.mitchell@oakridge.edu", school: "Oakridge Preparatory Academy", subject: "Mathematics", username: "s.mitchell", password: "Mitch@123" },
  { id: 2, name: "Mr. David Park", email: "d.park@oakridge.edu", school: "Oakridge Preparatory Academy", subject: "English Literature", username: "d.park", password: "Park@123" },
  { id: 3, name: "Mrs. Emily Roberts", email: "e.roberts@westfield.edu", school: "Westfield Christian School", subject: "Chemistry", username: "e.roberts", password: "Rob@123" },
  { id: 4, name: "Dr. James Chen", email: "j.chen@oakridge.edu", school: "Oakridge Preparatory Academy", subject: "Physics", username: "j.chen", password: "Chen@123" },
  { id: 5, name: "Ms. Anna Williams", email: "a.williams@riverside.edu", school: "Riverside Elementary", subject: "History", username: "a.williams", password: "Will@123" },
];

const defaultStudents = [
  { id: 1, name: "Alex Thompson", email: "a.thompson@oakridge.edu", grade: 11, school: "Oakridge Preparatory Academy", username: "alex.t", password: "Alex@123" },
  { id: 2, name: "Emma Wilson", email: "e.wilson@oakridge.edu", grade: 10, school: "Oakridge Preparatory Academy", username: "emma.w", password: "Emma@123" },
  { id: 3, name: "Michael Brown", email: "m.brown@westfield.edu", grade: 9, school: "Westfield Christian School", username: "michael.b", password: "Mike@123" },
  { id: 4, name: "Sophia Lee", email: "s.lee@oakridge.edu", grade: 12, school: "Oakridge Preparatory Academy", username: "sophia.l", password: "Soph@123" },
  { id: 5, name: "James Garcia", email: "j.garcia@riverside.edu", grade: 8, school: "Riverside Elementary", username: "james.g", password: "Jame@123" },
];

const getTeachersData = () => {
  const stored = localStorage.getItem("teachersData");
  return stored ? JSON.parse(stored) : defaultTeachers;
};

const getStudentsData = () => {
  const stored = localStorage.getItem("studentsData");
  return stored ? JSON.parse(stored) : defaultStudents;
};

const teachersData = getTeachersData();
const studentsData = getStudentsData();

export default function LoginPage() {
  const router = useRouter();
  const [loginType, setLoginType] = useState<"student" | "teacher">("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
    
    if (loginType === "student") {
      const student = studentsData.find((s: { username: string; password: string }) => s.username === username && s.password === password);
      if (student) {
        // Get school year from stored schools data
        const storedSchools = localStorage.getItem("schoolsData");
        const schools = storedSchools ? JSON.parse(storedSchools) : [];
        const school = schools.find((s: { name: string; year: number }) => s.name === student.school);
        const schoolYear = school ? school.year : new Date().getFullYear();
        
        localStorage.setItem("loggedInStudent", JSON.stringify({...student, schoolYear}));
        router.push("/student");
        return;
      }
    } else {
      const teacher = teachersData.find((t: { username: string; password: string }) => t.username === username && t.password === password);
      if (teacher) {
        // Get school year from stored schools data for teacher too
        const storedSchools = localStorage.getItem("schoolsData");
        const schools = storedSchools ? JSON.parse(storedSchools) : [];
        const school = schools.find((s: { name: string; year: number }) => s.name === teacher.school);
        const schoolYear = school ? school.year : new Date().getFullYear();
        
        localStorage.setItem("loggedInTeacher", JSON.stringify({...teacher, schoolYear}));
        router.push("/teacher");
        return;
      }
    }
    
    setError("Invalid username or password");
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white font-['Outfit']">Geleza Mzansi Login</h1>
          <p className="text-slate-400 mt-2">Enter your credentials to access your portal</p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setLoginType("student")}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              loginType === "student" 
                ? "bg-blue-600 text-white" 
                : "bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setLoginType("teacher")}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              loginType === "teacher" 
                ? "bg-purple-600 text-white" 
                : "bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            Teacher
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-slate-400 text-sm mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder={loginType === "student" ? "e.g., alex.t" : "e.g., s.mitchell"}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button 
            onClick={handleLogin}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-colors"
          >
            Login
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-slate-400 text-sm text-center">
            Contact your school admin for login credentials
          </p>
        </div>
      </div>
    </div>
  );
}
