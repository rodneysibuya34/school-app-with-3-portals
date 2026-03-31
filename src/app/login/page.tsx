"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateUsername, generatePassword, checkDuplicateUser } from "@/utils/auth";
import Logo from "@/components/Logo";

interface User {
  id: number;
  name: string;
  email: string;
  grade?: number;
  school: string;
  username: string;
  password: string;
  subjects?: string[];
  schoolYear?: number;
}

interface Teacher extends User {
  subject: string;
}

const schoolsData = [
  { id: 1, name: "Oakridge Preparatory Academy", location: "Boston, MA", type: "High School", adminUsername: "oakridge_admin", adminPassword: "Oakridge2026!Admin" },
  { id: 2, name: "Westfield Christian School", location: "Chicago, IL", type: "Primary", adminUsername: "westfield_admin", adminPassword: "Westfield2026!Admin" },
  { id: 3, name: "Riverside Elementary", location: "Miami, FL", type: "Primary", adminUsername: "riverside_admin", adminPassword: "Riverside2026!Admin" },
  { id: 4, name: "Highland Academy", location: "Seattle, WA", type: "High School", adminUsername: "highland_admin", adminPassword: "Highland2026!Admin" },
];

const getStoredTeachers = (): Teacher[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem("teachersData");
  if (stored) return JSON.parse(stored);
  
  return [];
};

const getStoredStudents = (): User[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem("studentsData");
  if (stored) return JSON.parse(stored);
  
  return [];
};

export default function LoginPage() {
  const router = useRouter();
  const [loginType, setLoginType] = useState<"student" | "teacher">("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [teachersData, setTeachersData] = useState<Teacher[]>(() => getStoredTeachers());
  const [studentsData, setStudentsData] = useState<User[]>(() => getStoredStudents());

  useEffect(() => {
    if (!localStorage.getItem("teachersData")) {
      localStorage.setItem("teachersData", JSON.stringify(teachersData));
    }
    if (!localStorage.getItem("studentsData")) {
      localStorage.setItem("studentsData", JSON.stringify(studentsData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = () => {
    setError("");
    
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }
    
    if (loginType === "student") {
      const student = studentsData.find(s => s.username === username && s.password === password);
      if (student) {
        const storedSchools = localStorage.getItem("schoolsData");
        const schools = storedSchools ? JSON.parse(storedSchools) : [];
        const school = schools.find((s: { name: string; year: number }) => s.name === student.school);
        const schoolYear = school ? school.year : new Date().getFullYear();
        
        localStorage.setItem("loggedInStudent", JSON.stringify({...student, schoolYear}));
        router.push("/student");
        return;
      }
    } else {
      const teacher = teachersData.find(t => t.username === username && t.password === password);
      if (teacher) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-200/30 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 p-8 rounded-2xl bg-white shadow-2xl border border-slate-200 w-full max-w-md">
        <div className="text-center mb-8">
          <Logo size={64} />
          <h1 className="text-2xl font-bold text-slate-800 font-['Outfit']">Geleza Mzansi Login</h1>
          <p className="text-slate-500 mt-2">Enter your credentials to access your portal</p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setLoginType("student")}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              loginType === "student" 
                ? "bg-amber-500 text-white" 
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setLoginType("teacher")}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              loginType === "teacher" 
                ? "bg-red-500 text-white" 
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Teacher
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-slate-600 text-sm mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder={loginType === "student" ? "e.g., alex.t" : "e.g., s.mitchell"}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-600 text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:border-amber-500 focus:outline-none"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button 
            onClick={handleLogin}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium transition-colors"
          >
            Login
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-slate-500 text-sm text-center">
            Contact your school admin for login credentials
          </p>
        </div>
      </div>
    </div>
  );
}