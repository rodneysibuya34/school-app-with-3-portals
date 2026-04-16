"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

interface User {
  id: number;
  name: string;
  email: string;
  grade?: number;
  school: string;
  username: string;
  password: string;
  subjects?: string;
  schoolYear?: number;
}

interface Teacher extends User {
  subject: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [loginType, setLoginType] = useState<"student" | "teacher">("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [teachersData, setTeachersData] = useState<Teacher[]>([]);
  const [studentsData, setStudentsData] = useState<User[]>([]);
  const [schoolsData, setSchoolsData] = useState<{ name: string; year: number }[]>([]);
  const [loading, setLoading] = useState(true);
  
  // PIN system
  const [pinMode, setPinMode] = useState<"credentials" | "pin" | "create-pin">("credentials");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [pinAttempts, setPinAttempts] = useState(0);
  const [maxPinAttempts] = useState(2);
  const [currentUser, setCurrentUser] = useState<User | Teacher | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [schoolsRes, teachersRes, studentsRes] = await Promise.all([
          fetch('/api/schools'),
          fetch('/api/teachers'),
          fetch('/api/students')
        ]);
        
        const schools = schoolsRes.ok ? await schoolsRes.json() : [];
        const teachers = teachersRes.ok ? await teachersRes.json() : [];
        const students = studentsRes.ok ? await studentsRes.json() : [];
        
        setSchoolsData(Array.isArray(schools) ? schools.map((s: { name: string; year: number }) => ({ name: s.name, year: s.year || 2026 })) : []);
        setTeachersData(Array.isArray(teachers) ? teachers : []);
        setStudentsData(Array.isArray(students) ? students : []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const storedPin = loginType === "student" ? localStorage.getItem("studentPin") : localStorage.getItem("teacherPin");
    if (storedPin) {
      setPinMode("pin");
    } else {
      setPinMode("credentials");
    }
    setPinAttempts(0);
    setPin("");
    setPinError("");
  }, [loginType]);

  const handleLogin = () => {
    setError("");
    
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }
    
    if (loginType === "student") {
      const student = studentsData.find(s => s.username === username && s.password === password);
      if (student) {
        const storedPin = localStorage.getItem("studentPin");
        if (storedPin) {
          const school = schoolsData.find(s => s.name === student.school);
          const schoolYear = school ? school.year : new Date().getFullYear();
          localStorage.setItem("loggedInStudent", JSON.stringify({...student, schoolYear}));
          router.push("/student");
        } else {
          setCurrentUser(student);
          setPinMode("create-pin");
          setPin("");
          setConfirmPin("");
        }
        return;
      }
    } else {
      const teacher = teachersData.find(t => t.username === username && t.password === password);
      if (teacher) {
        const storedPin = localStorage.getItem("teacherPin");
        if (storedPin) {
          const school = schoolsData.find(s => s.name === teacher.school);
          const schoolYear = school ? school.year : new Date().getFullYear();
          localStorage.setItem("loggedInTeacher", JSON.stringify({...teacher, schoolYear}));
          router.push("/teacher");
        } else {
          setCurrentUser(teacher);
          setPinMode("create-pin");
          setPin("");
          setConfirmPin("");
        }
        return;
      }
    }
    
    setError("Invalid username or password");
  };

  const handlePinLogin = () => {
    setPinError("");
    const storedPin = loginType === "student" ? localStorage.getItem("studentPin") : localStorage.getItem("teacherPin");
    const storedUser = loginType === "student" ? localStorage.getItem("studentPinUser") : localStorage.getItem("teacherPinUser");
    
    if (pin === storedPin && storedUser) {
      const user = JSON.parse(storedUser);
      const school = schoolsData.find(s => s.name === user.school);
      const schoolYear = school ? school.year : new Date().getFullYear();
      
      if (loginType === "student") {
        localStorage.setItem("loggedInStudent", JSON.stringify({...user, schoolYear}));
        router.push("/student");
      } else {
        localStorage.setItem("loggedInTeacher", JSON.stringify({...user, schoolYear}));
        router.push("/teacher");
      }
    } else {
      const newAttempts = pinAttempts + 1;
      setPinAttempts(newAttempts);
      setPin("");
      if (newAttempts >= maxPinAttempts) {
        setPinMode("credentials");
        setPinAttempts(0);
        setError("Too many failed attempts. Please login with username and password.");
      } else {
        setPinError(`Incorrect PIN. ${maxPinAttempts - newAttempts} attempts remaining.`);
      }
    }
  };

  const handleCreatePin = () => {
    if (pin.length < 4 || pin.length > 6) {
      setPinError("PIN must be 4-6 digits");
      return;
    }
    if (pin !== confirmPin) {
      setPinError("PINs do not match");
      return;
    }
    if (loginType === "student") {
      localStorage.setItem("studentPin", pin);
      localStorage.setItem("studentPinUser", JSON.stringify(currentUser));
    } else {
      localStorage.setItem("teacherPin", pin);
      localStorage.setItem("teacherPinUser", JSON.stringify(currentUser));
    }
    const school = schoolsData.find(s => s.name === currentUser!.school);
    const schoolYear = school ? school.year : new Date().getFullYear();
    
    if (loginType === "student") {
      localStorage.setItem("loggedInStudent", JSON.stringify({...currentUser, schoolYear}));
      router.push("/student");
    } else {
      localStorage.setItem("loggedInTeacher", JSON.stringify({...currentUser, schoolYear}));
      router.push("/teacher");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  // PIN Login Screen
  if (pinMode === "pin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-200/30 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 p-8 rounded-2xl bg-white shadow-2xl border border-slate-200 w-full max-w-md">
          <div className="text-center mb-8">
            <Logo size={64} />
            <h1 className="text-2xl font-bold text-slate-800 font-['Outfit']">Geleza Mzansi</h1>
            <p className="text-slate-500 mt-2">Enter your PIN to access</p>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => {
                setPinMode("credentials");
                setPinAttempts(0);
              }}
              className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                loginType === "student" 
                  ? "bg-amber-500 text-white" 
                  : "bg-red-500 text-white"
              }`}
            >
              {loginType === "student" ? "Student" : "Teacher"}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-600 text-sm mb-2">PIN (4-6 digits)</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                onKeyDown={(e) => e.key === "Enter" && handlePinLogin()}
                placeholder="Enter your PIN"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:border-amber-500 focus:outline-none text-center text-2xl tracking-widest"
                maxLength={6}
                autoFocus
              />
            </div>
            {pinError && <p className="text-red-500 text-sm">{pinError}</p>}
            <button 
              onClick={handlePinLogin}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium transition-colors"
            >
              Unlock
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Create PIN Screen
  if (pinMode === "create-pin" && currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-200/30 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 p-8 rounded-2xl bg-white shadow-2xl border border-slate-200 w-full max-w-md">
          <div className="text-center mb-8">
            <Logo size={64} />
            <h1 className="text-2xl font-bold text-slate-800 font-['Outfit']">Create PIN</h1>
            <p className="text-slate-500 mt-2">Create a 4-6 digit PIN for quick access</p>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setLoginType("student")}
              className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                loginType === "student" 
                  ? "bg-amber-500 text-white" 
                  : "bg-red-500 text-white"
              }`}
            >
              {loginType === "student" ? "Student" : "Teacher"}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-600 text-sm mb-2">Enter PIN (4-6 digits)</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                onKeyDown={(e) => e.key === "Enter" && handleCreatePin()}
                placeholder="Enter PIN"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:border-amber-500 focus:outline-none text-center text-2xl tracking-widest"
                maxLength={6}
                autoFocus
              />
            </div>
            <div>
              <label className="block text-slate-600 text-sm mb-2">Confirm PIN</label>
              <input
                type="password"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                onKeyDown={(e) => e.key === "Enter" && handleCreatePin()}
                placeholder="Confirm PIN"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:border-amber-500 focus:outline-none text-center text-2xl tracking-widest"
                maxLength={6}
              />
            </div>
            {pinError && <p className="text-red-500 text-sm">{pinError}</p>}
            <button 
              onClick={handleCreatePin}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium transition-colors"
            >
              Create PIN & Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Credentials Login Screen
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