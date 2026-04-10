"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import Image from "next/image";

const ADMIN_PASSWORD = "Admin.manager@2026!Geleza";

function genUsername(name: string, existing: string[]): string {
  const parts = name.toLowerCase().split(" ");
  let base = parts.length >= 2 ? parts[0][0] + "." + parts[parts.length - 1] : parts[0].substring(0, 6);
  let username = base;
  let counter = 1;
  while (existing.includes(username)) { username = base + counter; counter++; }
  return username;
}

function genPassword(name: string, school: string): string {
  const parts = name.split(" ");
  const first = parts[0][0].toUpperCase();
  const last = parts[parts.length - 1][0].toUpperCase();
  const schoolCode = school.split(" ")[0].toUpperCase().substring(0, 3);
  const random = Math.floor(Math.random() * 900) + 100;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${first}${last}@${schoolCode}${random}${months[new Date().getMonth()]}`;
}

const navItems = [
  { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Dashboard" },
  { icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", label: "Schools" },
  { icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", label: "Teachers" },
  { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", label: "Students" },
  { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", label: "Subscriptions" },
];

interface School {
  id: number;
  name: string;
  location: string;
  students: number;
  teachers: number;
  status: string;
  type: string;
  adminUsername: string;
  adminPassword: string;
  year: number;
  expiryDate: string;
  isActive: boolean;
  isBlocked: boolean;
  paymentStatus: "active" | "expired" | "expiring_soon" | "trial";
  schoolLogo?: string;
  contact?: string;
  address?: string;
  trialStartDate?: string;
  paymentPlan?: string;
}

interface Teacher {
  id: number;
  name: string;
  email: string;
  school: string;
  subject: string;
  status: string;
  username: string;
  password: string;
}

interface Student {
  id: number;
  name: string;
  email: string;
  grade: number;
  school: string;
  status: string;
  username: string;
  password: string;
}

interface Subscription {
  id: number;
  school: string;
  schoolType: string;
  price: string;
  planType: string;
  startDate: string;
  status: string;
  renewal: string;
}

const initialSchools: School[] = [];

const initialTeachers: Teacher[] = [];

const initialStudents: Student[] = [
  { id: 1, name: "Alex Thompson", email: "a.thompson@oakridge.edu", grade: 11, school: "Oakridge Preparatory Academy", status: "Active", username: "alex.t", password: "AT@OAK419Mar" },
  { id: 2, name: "Emma Wilson", email: "e.wilson@oakridge.edu", grade: 10, school: "Oakridge Preparatory Academy", status: "Active", username: "emma.w", password: "EW@OAK826Feb" },
  { id: 3, name: "Michael Brown", email: "m.brown@westfield.edu", grade: 9, school: "Westfield Christian School", status: "Active", username: "michael.b", password: "MB@WES152Oct" },
  { id: 4, name: "Sophia Lee", email: "s.lee@oakridge.edu", grade: 12, school: "Oakridge Preparatory Academy", status: "Active", username: "sophia.l", password: "SL@OAK937Aug" },
  { id: 5, name: "James Garcia", email: "j.garcia@riverside.edu", grade: 8, school: "Riverside Elementary", status: "Active", username: "james.g", password: "JG@RIV564Dec" },
];

const initialSubscriptions: Subscription[] = [
  { id: 1, school: "Oakridge Preparatory Academy", schoolType: "High School", price: "R2,500/mo", planType: "monthly", startDate: "Jan 1, 2026", status: "Active", renewal: "Jan 1, 2027" },
  { id: 2, school: "Westfield Christian School", schoolType: "Primary", price: "R1,500/mo", planType: "monthly", startDate: "Mar 15, 2025", status: "Active", renewal: "Mar 15, 2026" },
  { id: 3, school: "Riverside Elementary", schoolType: "Primary", price: "R1,500/mo", planType: "monthly", startDate: "Jun 1, 2025", status: "Active", renewal: "Jun 1, 2026" },
  { id: 4, school: "Highland Academy", schoolType: "High School", price: "Free", planType: "trial", startDate: "Mar 1, 2026", status: "Trial", renewal: "Mar 31, 2026" },
];

type ModalType = 'school' | 'teacher' | 'student' | 'subscription' | 'newYear' | null;

export default function AdminPortal() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [schools, setSchools] = useState<School[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [showModal, setShowModal] = useState<ModalType>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '', location: '', type: 'Primary', adminUsername: '', adminPassword: '', schoolYear: 2026, schoolExpiry: '', schoolLogo: '', schoolContact: '', schoolAddress: '',
    teacherName: '', teacherEmail: '', teacherSchool: '', teacherSubject: '',
    studentName: '', studentEmail: '', studentGrade: '', studentSchool: '',
    subSchool: '', subType: 'Primary', subStartDate: '', subPrice: '', subRenewal: ''
  });
  const [schoolLogoFile, setSchoolLogoFile] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [schoolsRes, teachersRes, studentsRes, subsRes] = await Promise.all([
          fetch('/api/schools'),
          fetch('/api/teachers'),
          fetch('/api/students'),
          fetch('/api/subscriptions')
        ]);
        const [schoolsData, teachersData, studentsData, subsData] = await Promise.all([
          schoolsRes.json(),
          teachersRes.json(),
          studentsRes.json(),
          subsRes.json()
        ]);
        setSchools(schoolsData);
        setTeachers(teachersData);
        setStudents(studentsData);
        setSubscriptions(subsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput("");
    router.push("/");
  };

  const getPaymentStatus = (school: School): School["paymentStatus"] => {
    const expiry = new Date(school.expiryDate);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (school.paymentStatus === "trial" && daysUntilExpiry <= 7 && daysUntilExpiry >= 0) return "expiring_soon";
    if (daysUntilExpiry < 0) return "expired";
    if (school.paymentStatus === "trial") return "trial";
    if (daysUntilExpiry <= 7) return "expiring_soon";
    return "active";
  };

  const toggleSchoolActive = async (schoolId: number) => {
    const school = schools.find(s => s.id === schoolId);
    if (!school) return;
    try {
      await fetch('/api/schools', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: schoolId, isActive: !school.isActive, status: school.isActive ? "Inactive" : "Active" })
      });
      setSchools(schools.map(s => s.id === schoolId ? { ...s, isActive: !s.isActive, status: school.isActive ? "Inactive" : "Active" } : s));
    } catch (error) {
      alert("Error updating school");
    }
  };

  const toggleSchoolBlock = async (schoolId: number) => {
    const school = schools.find(s => s.id === schoolId);
    if (!school) return;
    try {
      await fetch('/api/schools', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: schoolId, isBlocked: !school.isBlocked })
      });
      setSchools(schools.map(s => s.id === schoolId ? { ...s, isBlocked: !s.isBlocked } : s));
    } catch (error) {
      alert("Error updating school");
    }
  };

  const deleteSchool = async (schoolId: number) => {
    if (confirm("Are you sure you want to delete this school? This cannot be undone.")) {
      try {
        await fetch('/api/schools', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: schoolId })
        });
        setSchools(schools.filter(s => s.id !== schoolId));
      } catch (error) {
        alert("Error deleting school");
      }
    }
  };

  const activateTrial = async (schoolId: number) => {
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 7);
    const expiryDate = trialEnd.toISOString().split('T')[0];
    try {
      await fetch('/api/schools', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: schoolId, expiryDate, paymentStatus: "trial", isActive: true, status: "Trial" })
      });
      setSchools(schools.map(s => s.id === schoolId ? { ...s, expiryDate, paymentStatus: "trial" as const, isActive: true, status: "Trial" } : s));
    } catch (error) {
      alert("Error activating trial");
    }
  };

  const endTrial = async (schoolId: number) => {
    try {
      await fetch('/api/schools', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: schoolId, paymentStatus: "expired", isActive: false, status: "Inactive" })
      });
      setSchools(schools.map(s => s.id === schoolId ? { ...s, paymentStatus: "expired" as const, isActive: false, status: "Inactive" } : s));
    } catch (error) {
      alert("Error ending trial");
    }
  };

  const upgradeToPaid = async (schoolId: number, plan: string = 'monthly') => {
    const school = schools.find(s => s.id === schoolId);
    if (!school) return;
    
    const isHighSchool = school.type === "High School";
    let expiryDate: Date;
    let price: string;
    let planType: string;
    
    switch (plan) {
      case 'quarterly':
        expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 3);
        price = isHighSchool ? "R7,000/quarter" : "R4,000/quarter";
        planType = "quarterly";
        break;
      case 'annual':
        expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        price = isHighSchool ? "R25,000/year" : "R14,000/year";
        planType = "annual";
        break;
      default:
        expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        price = isHighSchool ? "R2,500/mo" : "R1,500/mo";
        planType = "monthly";
    }
    
    const expiryDateStr = expiryDate.toISOString().split('T')[0];
    
    try {
      await fetch('/api/schools', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: schoolId, 
          paymentStatus: "active", 
          isActive: true, 
          status: "Active", 
          expiryDate: expiryDateStr,
          paymentPlan: planType
        })
      });
      
      setSchools(schools.map(s => s.id === schoolId ? { 
        ...s, 
        paymentStatus: "active" as const, 
        isActive: true, 
        status: "Active", 
        expiryDate: expiryDateStr,
        paymentPlan: planType
      } : s));
      
      await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          school: school.name,
          schoolType: school.type,
          price: price,
          planType: planType,
          startDate: new Date().toISOString().split('T')[0],
          status: "Active",
          renewal: expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        })
      });
      
      alert(`School upgraded to ${planType} plan!\n\nPrice: ${price}\nValid until: ${expiryDate.toLocaleDateString()}`);
    } catch (error) {
      alert("Error upgrading school");
    }
  };

  const handleUpgradeClick = (schoolId: number) => {
    const school = schools.find(s => s.id === schoolId);
    if (!school) return;
    
    const isHighSchool = school.type === "High School";
    const choice = confirm("Choose payment plan:\n\nOK = Monthly\nCancel = Quarterly\n\nFor annual, click Cancel twice.");
    
    if (choice) {
      upgradeToPaid(schoolId, 'monthly');
    } else {
      const secondChoice = confirm("Choose:\n\nOK = Quarterly\nCancel = Annual");
      if (secondChoice) {
        upgradeToPaid(schoolId, 'quarterly');
      } else {
        upgradeToPaid(schoolId, 'annual');
      }
    }
  };

  const updateExpiryDate = async (schoolId: number, newDate: string) => {
    try {
      await fetch('/api/schools', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: schoolId, expiryDate: newDate })
      });
      setSchools(schools.map(s => s.id === schoolId ? { ...s, expiryDate: newDate, paymentStatus: getPaymentStatus({ ...s, expiryDate: newDate } as School) } : s));
    } catch (error) {
      alert("Error updating expiry date");
    }
  };

  const handleSubmit = async (type: ModalType) => {
    if (type === 'school') {
      if (!formData.name || !formData.location) {
        alert("Please fill in School Name and Location");
        return;
      }
      try {
        const schoolUsername = formData.name.split(' ')[0].toLowerCase() + "_admin";
        const schoolPassword = genPassword(formData.name, formData.name);
        const trialEndDate = new Date();
        trialEndDate.setDate(trialEndDate.getDate() + 10);
        const expiryDate = formData.schoolExpiry || trialEndDate.toISOString().split('T')[0];
        
        const response = await fetch('/api/schools', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            location: formData.location,
            type: formData.type,
            adminUsername: schoolUsername,
            adminPassword: schoolPassword,
            year: formData.schoolYear,
            expiryDate,
            contact: formData.schoolContact || undefined,
            address: formData.schoolAddress || undefined
          })
        });
        
        if (!response.ok) throw new Error('Failed to create school');
        
        const newSchool = await response.json();
        setSchools([...schools, newSchool]);
        
        alert(`School created!\n\nUsername: ${schoolUsername}\nPassword: ${schoolPassword}\nTrial Period: 10 days (Expires: ${expiryDate})`);
        setShowModal(null);
        setSchoolLogoFile(null);
        setFormData({ name: '', location: '', type: 'Primary', adminUsername: '', adminPassword: '', schoolYear: 2026, schoolExpiry: '', schoolLogo: '', schoolContact: '', schoolAddress: '', teacherName: '', teacherEmail: '', teacherSchool: '', teacherSubject: '', studentName: '', studentEmail: '', studentGrade: '', studentSchool: '', subSchool: '', subType: 'Primary', subStartDate: '', subPrice: '', subRenewal: '' });
      } catch (error) {
        alert("Error creating school. Please try again.");
        console.error(error);
      }
    } else if (type === 'teacher') {
      if (!formData.teacherName || !formData.teacherSchool || !formData.teacherSubject) {
        alert("Please fill in Name, School, and Subject");
        return;
      }
      const existingUsernames = teachers.map(t => t.username);
      const teacherUsername = genUsername(formData.teacherName, existingUsernames);
      const teacherPassword = genPassword(formData.teacherName, formData.teacherSchool);
      
      try {
        const response = await fetch('/api/teachers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.teacherName,
            email: formData.teacherEmail || `${teacherUsername}@${formData.teacherSchool.split(' ')[0].toLowerCase()}.edu`,
            school: formData.teacherSchool,
            subject: formData.teacherSubject,
            username: teacherUsername,
            password: teacherPassword
          })
        });
        
        if (!response.ok) throw new Error('Failed to create teacher');
        
        const newTeacher = await response.json();
        setTeachers([...teachers, newTeacher]);
        
        const updatedSchools = schools.map(s => s.name === formData.teacherSchool ? { ...s, teachers: (s.teachers || 0) + 1 } : s);
        setSchools(updatedSchools);
        
        alert(`Teacher created!\n\nUsername: ${teacherUsername}\nPassword: ${teacherPassword}`);
        setShowModal(null);
        setFormData({ name: '', location: '', type: 'Primary', adminUsername: '', adminPassword: '', schoolYear: 2026, schoolExpiry: '', schoolLogo: '', schoolContact: '', schoolAddress: '', teacherName: '', teacherEmail: '', teacherSchool: '', teacherSubject: '', studentName: '', studentEmail: '', studentGrade: '', studentSchool: '', subSchool: '', subType: 'Primary', subStartDate: '', subPrice: '', subRenewal: '' });
      } catch (error) {
        alert("Error creating teacher. Please try again.");
        console.error(error);
      }
    } else if (type === 'student') {
      if (!formData.studentName || !formData.studentGrade || !formData.studentSchool) {
        alert("Please fill in Name, Grade, and School");
        return;
      }
      const existingUsernames = students.map(s => s.username);
      const studentUsername = genUsername(formData.studentName, existingUsernames);
      const studentPassword = genPassword(formData.studentName, formData.studentSchool);
      
      try {
        const response = await fetch('/api/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.studentName,
            email: formData.studentEmail || `${studentUsername}@${formData.studentSchool.split(' ')[0].toLowerCase()}.edu`,
            grade: parseInt(formData.studentGrade),
            school: formData.studentSchool,
            username: studentUsername,
            password: studentPassword
          })
        });
        
        if (!response.ok) throw new Error('Failed to create student');
        
        const newStudent = await response.json();
        setStudents([...students, newStudent]);
        
        const updatedSchools = schools.map(s => s.name === formData.studentSchool ? { ...s, students: (s.students || 0) + 1 } : s);
        setSchools(updatedSchools);
        
        alert(`Student created!\n\nUsername: ${studentUsername}\nPassword: ${studentPassword}`);
        setShowModal(null);
        setFormData({ name: '', location: '', type: 'Primary', adminUsername: '', adminPassword: '', schoolYear: 2026, schoolExpiry: '', schoolLogo: '', schoolContact: '', schoolAddress: '', teacherName: '', teacherEmail: '', teacherSchool: '', teacherSubject: '', studentName: '', studentEmail: '', studentGrade: '', studentSchool: '', subSchool: '', subType: 'Primary', subStartDate: '', subPrice: '', subRenewal: '' });
      } catch (error) {
        alert("Error creating student. Please try again.");
        console.error(error);
      }
    } else if (type === 'subscription') {
      if (!formData.subSchool || !formData.subPrice || !formData.subStartDate || !formData.subRenewal) {
        alert("Please fill in all subscription fields");
        return;
      }
      try {
        const response = await fetch('/api/subscriptions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            school: formData.subSchool,
            schoolType: formData.subType,
            price: formData.subPrice,
            startDate: formData.subStartDate,
            status: "Active",
            renewal: formData.subRenewal
          })
        });
        
        if (!response.ok) throw new Error('Failed to create subscription');
        
        const newSub = await response.json();
        setSubscriptions([...subscriptions, newSub]);
        
        alert(`Subscription created for ${formData.subSchool}!`);
        setShowModal(null);
        setFormData({ name: '', location: '', type: 'Primary', adminUsername: '', adminPassword: '', schoolYear: 2026, schoolExpiry: '', schoolLogo: '', schoolContact: '', schoolAddress: '', teacherName: '', teacherEmail: '', teacherSchool: '', teacherSubject: '', studentName: '', studentEmail: '', studentGrade: '', studentSchool: '', subSchool: '', subType: 'Primary', subStartDate: '', subPrice: '', subRenewal: '' });
      } catch (error) {
        alert("Error creating subscription. Please try again.");
        console.error(error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400';
      case 'Trial': return 'bg-yellow-500/20 text-yellow-400';
      case 'Inactive': return 'bg-gray-500/20 text-gray-400';
      case 'Blocked': return 'bg-red-500/20 text-red-400';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'expiring_soon': return 'bg-orange-500/20 text-orange-400';
      case 'expired': return 'bg-red-500/20 text-red-400';
      case 'trial': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1C1917] flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 p-8 rounded-2xl bg-[#1E293B] shadow-2xl border border-slate-200 w-full max-w-md">
          <div className="text-center mb-8">
            <Logo size={64} />
            <h1 className="text-2xl font-bold text-slate-800 font-['Outfit']">Geleza Mzansi Admin</h1>
            <p className="text-slate-500 mt-2">Enter admin password to continue</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Admin Password"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:border-cyan-500 focus:outline-none"
            />
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
            <button onClick={handleLogin} className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium">
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1C1917]">
      <aside className="w-64 bg-[#1E293B] border-r border-white/10 fixed h-full">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Logo size={40} />
            <span className="text-xl font-semibold text-white">Admin</span>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => setActiveTab(item.label.toLowerCase())}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.label.toLowerCase() ? "bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-400" : "text-slate-400 hover:text-white hover:bg-[#1E293B]/5"}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 absolute bottom-0 w-full">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      <main className="ml-64 p-8">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-[#1E293B]/5 border border-white/10">
                <p className="text-3xl font-bold text-white">{schools.length}</p>
                <p className="text-slate-400 text-sm">Schools</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#1E293B]/5 border border-white/10">
                <p className="text-3xl font-bold text-white">{teachers.length}</p>
                <p className="text-slate-400 text-sm">Teachers</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#1E293B]/5 border border-white/10">
                <p className="text-3xl font-bold text-white">{students.length}</p>
                <p className="text-slate-400 text-sm">Students</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#1E293B]/5 border border-white/10">
                <p className="text-3xl font-bold text-white">R{(schools.reduce((acc, s) => acc + (s.status === "Active" ? (s.type === "High School" ? 2500 : 1500) : 0), 0)).toLocaleString()}</p>
                <p className="text-slate-400 text-sm">Monthly Revenue</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-[#1E293B]/5 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Schools Overview</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-slate-400">School</th>
                      <th className="text-left py-3 px-4 text-slate-400">Type</th>
                      <th className="text-left py-3 px-4 text-slate-400">Status</th>
                      <th className="text-left py-3 px-4 text-slate-400">Payment</th>
                      <th className="text-left py-3 px-4 text-slate-400">Expiry</th>
                      <th className="text-left py-3 px-4 text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schools.map(school => {
                      const paymentStatus = getPaymentStatus(school);
                      return (
                        <tr key={school.id} className="border-b border-white/5">
                          <td className="py-3 px-4 text-white">{school.name}</td>
                          <td className="py-3 px-4 text-slate-300">{school.type}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(school.status)}`}>{school.status}</span>
                            {school.isBlocked && <span className="ml-2 px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-400">Blocked</span>}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(paymentStatus)}`}>
                              {paymentStatus === 'active' ? 'Active' : paymentStatus === 'expired' ? 'Expired' : paymentStatus === 'expiring_soon' ? 'Expiring Soon' : 'Trial'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-300">{school.expiryDate}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button onClick={() => toggleSchoolActive(school.id)} className={`px-2 py-1 rounded text-xs ${school.isActive ? 'bg-gray-500/20 text-gray-400' : 'bg-green-500/20 text-green-400'}`}>
                                {school.isActive ? 'Disable' : 'Enable'}
                              </button>
                              <button onClick={() => toggleSchoolBlock(school.id)} className={`px-2 py-1 rounded text-xs ${school.isBlocked ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                {school.isBlocked ? 'Unblock' : 'Block'}
                              </button>
                              <button onClick={() => deleteSchool(school.id)} className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-400">Delete</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "schools" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-white">Schools</h1>
              <button onClick={() => setShowModal('school')} className="px-4 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700">Add School</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {schools.map(school => {
                const paymentStatus = getPaymentStatus(school);
                const trialDaysLeft = school.trialStartDate ? 
                  Math.max(0, 7 - Math.ceil((new Date().getTime() - new Date(school.trialStartDate).getTime()) / (1000 * 60 * 60 * 24))) : 0;
                return (
                  <div key={school.id} className="p-6 rounded-2xl bg-[#1E293B]/5 border border-white/10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        {school.schoolLogo ? (
                          <Image src={school.schoolLogo} alt={school.name} width={48} height={48} className="rounded-lg object-cover" unoptimized />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                            {school.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h3 className="text-xl font-semibold text-white">{school.name}</h3>
                          <p className="text-slate-400 text-sm">{school.location}</p>
                          {school.contact && <p className="text-slate-400 text-xs mt-1">{school.contact}</p>}
                          {school.address && <p className="text-slate-400 text-xs">{school.address}</p>}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(school.status)}`}>{school.status}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-[#1E293B]/5">
                        <p className="text-slate-400 text-xs">Students</p>
                        <p className="text-white font-bold">{school.students}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#1E293B]/5">
                        <p className="text-slate-400 text-xs">Teachers</p>
                        <p className="text-white font-bold">{school.teachers}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Expiry Date:</span>
                        <input 
                          type="date" 
                          value={school.expiryDate || ''}
                          onChange={(e) => updateExpiryDate(school.id, e.target.value)}
                          className="bg-transparent text-white text-sm border border-white/10 rounded px-2"
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Payment:</span>
                        <span className={`${getPaymentStatusColor(paymentStatus)}`}>
                          {paymentStatus === 'active' ? 'Active' : paymentStatus === 'expired' ? 'Expired' : paymentStatus === 'expiring_soon' ? 'Expiring Soon' : 'Trial'}
                        </span>
                      </div>
                      {paymentStatus === 'trial' && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Trial Days Left:</span>
                          <span className={trialDaysLeft <= 2 ? 'text-red-400' : 'text-green-400'}>
                            {trialDaysLeft} days
                          </span>
                        </div>
                      )}
                      <div className="flex gap-2 pt-2 flex-wrap">
                        {paymentStatus === 'trial' ? (
                          <>
                            <button onClick={() => handleUpgradeClick(school.id)} className="flex-1 py-2 rounded-lg text-sm bg-green-500/20 text-green-400">Upgrade to Paid</button>
                            <button onClick={() => endTrial(school.id)} className="flex-1 py-2 rounded-lg text-sm bg-red-500/20 text-red-400">End Trial</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => activateTrial(school.id)} className="flex-1 py-2 rounded-lg text-sm bg-purple-500/20 text-purple-400">Start Trial</button>
                            <button onClick={() => toggleSchoolActive(school.id)} className={`flex-1 py-2 rounded-lg text-sm ${school.isActive ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                              {school.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                            <button onClick={() => toggleSchoolBlock(school.id)} className={`flex-1 py-2 rounded-lg text-sm ${school.isBlocked ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                              {school.isBlocked ? 'Unblock' : 'Block'}
                            </button>
                            <button onClick={() => deleteSchool(school.id)} className="flex-1 py-2 rounded-lg text-sm bg-red-500/20 text-red-400">Delete</button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "teachers" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-white">Teachers</h1>
              <button onClick={() => setShowModal('teacher')} className="px-4 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700">Add Teacher</button>
            </div>
            <div className="p-6 rounded-2xl bg-[#1E293B]/5 border border-white/10">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-slate-400">Name</th>
                    <th className="text-left py-3 px-4 text-slate-400">Email</th>
                    <th className="text-left py-3 px-4 text-slate-400">School</th>
                    <th className="text-left py-3 px-4 text-slate-400">Subject</th>
                    <th className="text-left py-3 px-4 text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map(teacher => (
                    <tr key={teacher.id} className="border-b border-white/5">
                      <td className="py-3 px-4 text-white">{teacher.name}</td>
                      <td className="py-3 px-4 text-slate-300">{teacher.email}</td>
                      <td className="py-3 px-4 text-slate-300">{teacher.school}</td>
                      <td className="py-3 px-4 text-slate-300">{teacher.subject}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(teacher.status)}`}>{teacher.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-white">Students</h1>
              <button onClick={() => setShowModal('student')} className="px-4 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700">Add Student</button>
            </div>
            <div className="p-6 rounded-2xl bg-[#1E293B]/5 border border-white/10">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-slate-400">Name</th>
                    <th className="text-left py-3 px-4 text-slate-400">Email</th>
                    <th className="text-left py-3 px-4 text-slate-400">Grade</th>
                    <th className="text-left py-3 px-4 text-slate-400">School</th>
                    <th className="text-left py-3 px-4 text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id} className="border-b border-white/5">
                      <td className="py-3 px-4 text-white">{student.name}</td>
                      <td className="py-3 px-4 text-slate-300">{student.email}</td>
                      <td className="py-3 px-4 text-slate-300">{student.grade}</td>
                      <td className="py-3 px-4 text-slate-300">{student.school}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(student.status)}`}>{student.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "subscriptions" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-white">Subscriptions</h1>
              <button onClick={() => setShowModal('subscription')} className="px-4 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700">Add Subscription</button>
            </div>
            <div className="p-6 rounded-2xl bg-[#1E293B]/5 border border-white/10">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-slate-400">School</th>
                    <th className="text-left py-3 px-4 text-slate-400">Type</th>
                    <th className="text-left py-3 px-4 text-slate-400">Price</th>
                    <th className="text-left py-3 px-4 text-slate-400">Start Date</th>
                    <th className="text-left py-3 px-4 text-slate-400">Renewal</th>
                    <th className="text-left py-3 px-4 text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map(sub => (
                    <tr key={sub.id} className="border-b border-white/5">
                      <td className="py-3 px-4 text-white">{sub.school}</td>
                      <td className="py-3 px-4 text-slate-300">{sub.schoolType}</td>
                      <td className="py-3 px-4 text-slate-300">{sub.price}</td>
                      <td className="py-3 px-4 text-slate-300">{sub.startDate}</td>
                      <td className="py-3 px-4 text-slate-300">{sub.renewal}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(sub.status)}`}>{sub.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1E293B] rounded-2xl p-6 w-full max-w-md border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-6">
              Add {showModal === 'school' ? 'School' : showModal === 'teacher' ? 'Teacher' : showModal === 'student' ? 'Student' : 'Subscription'}
            </h3>
            <div className="space-y-4">
              {showModal === 'school' && (
                <>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="School Name" className="w-full px-4 py-3 rounded-xl bg-[#1E293B]/5 border border-white/10 text-white" />
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">School Logo</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setSchoolLogoFile(event.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-[#1E293B]/5 border border-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:text-white file:cursor-pointer"
                    />
                    {schoolLogoFile && (
                      <div className="mt-2 flex items-center gap-2">
                        <Image src={schoolLogoFile} alt="Logo preview" width={48} height={48} className="rounded-lg object-cover" unoptimized />
                        <button type="button" onClick={() => setSchoolLogoFile(null)} className="text-red-400 text-sm hover:text-red-300">Remove</button>
                      </div>
                    )}
                  </div>
                  <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="Location" className="w-full px-4 py-3 rounded-xl bg-[#1E293B]/5 border border-white/10 text-white" />
                  <input type="text" value={formData.schoolContact} onChange={(e) => setFormData({...formData, schoolContact: e.target.value})} placeholder="Contact (phone/email)" className="w-full px-4 py-3 rounded-xl bg-[#1E293B]/5 border border-white/10 text-white" />
                  <input type="text" value={formData.schoolAddress} onChange={(e) => setFormData({...formData, schoolAddress: e.target.value})} placeholder="School Address" className="w-full px-4 py-3 rounded-xl bg-[#1E293B]/5 border border-white/10 text-white" />
                  <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-white/10 text-white">
                    <option value="Primary">Primary School</option>
                    <option value="High School">High School</option>
                  </select>
                  <input type="number" value={formData.schoolYear} onChange={(e) => setFormData({...formData, schoolYear: parseInt(e.target.value)})} placeholder="Year" className="w-full px-4 py-3 rounded-xl bg-[#1E293B]/5 border border-white/10 text-white" />
                  <input type="date" value={formData.schoolExpiry} onChange={(e) => setFormData({...formData, schoolExpiry: e.target.value})} placeholder="Expiry Date" className="w-full px-4 py-3 rounded-xl bg-[#1E293B]/5 border border-white/10 text-white" />
                </>
              )}
              {showModal === 'teacher' && (
                <>
                  <input type="text" value={formData.teacherName} onChange={(e) => setFormData({...formData, teacherName: e.target.value})} placeholder="Teacher Name" className="w-full px-4 py-3 rounded-xl bg-[#1E293B]/5 border border-white/10 text-white" />
                  <input type="email" value={formData.teacherEmail} onChange={(e) => setFormData({...formData, teacherEmail: e.target.value})} placeholder="Email (optional)" className="w-full px-4 py-3 rounded-xl bg-[#1E293B]/5 border border-white/10 text-white" />
                  <select value={formData.teacherSchool} onChange={(e) => setFormData({...formData, teacherSchool: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-white/10 text-white">
                    <option value="">Select School</option>
                    {schools.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                  </select>
                  <input type="text" value={formData.teacherSubject} onChange={(e) => setFormData({...formData, teacherSubject: e.target.value})} placeholder="Subject(s) - e.g., Mathematics, Physics, Chemistry" className="w-full px-4 py-3 rounded-xl bg-[#1E293B]/5 border border-white/10 text-white" />
                </>
              )}
              {showModal === 'student' && (
                <>
                  <input type="text" value={formData.studentName} onChange={(e) => setFormData({...formData, studentName: e.target.value})} placeholder="Student Name" className="w-full px-4 py-3 rounded-xl bg-[#1E293B]/5 border border-white/10 text-white" />
                  <input type="email" value={formData.studentEmail} onChange={(e) => setFormData({...formData, studentEmail: e.target.value})} placeholder="Email (optional)" className="w-full px-4 py-3 rounded-xl bg-[#1E293B]/5 border border-white/10 text-white" />
                  <input type="number" value={formData.studentGrade} onChange={(e) => setFormData({...formData, studentGrade: e.target.value})} placeholder="Grade (4-12)" className="w-full px-4 py-3 rounded-xl bg-[#1E293B]/5 border border-white/10 text-white" />
                  <select value={formData.studentSchool} onChange={(e) => setFormData({...formData, studentSchool: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-white/10 text-white">
                    <option value="">Select School</option>
                    {schools.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                  </select>
                </>
              )}
              {showModal === 'subscription' && (
                <>
                  <select value={formData.subSchool} onChange={(e) => setFormData({...formData, subSchool: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-white/10 text-white">
                    <option value="">Select School</option>
                    {schools.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                  </select>
                  <select value={formData.subType} onChange={(e) => setFormData({...formData, subType: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-white/10 text-white">
                    <option value="Primary">Primary School</option>
                    <option value="High School">High School</option>
                  </select>
                  <input type="text" value={formData.subPrice || ''} onChange={(e) => setFormData({...formData, subPrice: e.target.value})} placeholder="Price (e.g., R1,500/mo)" className="w-full px-4 py-3 rounded-xl bg-[#1E293B]/5 border border-white/10 text-white" />
                  <input type="date" value={formData.subStartDate} onChange={(e) => setFormData({...formData, subStartDate: e.target.value})} placeholder="Start Date" className="w-full px-4 py-3 rounded-xl bg-[#1E293B]/5 border border-white/10 text-white" />
                  <input type="text" value={formData.subRenewal || ''} onChange={(e) => setFormData({...formData, subRenewal: e.target.value})} placeholder="Renewal Date (e.g., Jan 1, 2027)" className="w-full px-4 py-3 rounded-xl bg-[#1E293B]/5 border border-white/10 text-white" />
                </>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(null)} className="flex-1 px-4 py-3 rounded-xl bg-[#1E293B]/10 text-white hover:bg-[#1E293B]/20">Cancel</button>
              <button onClick={() => handleSubmit(showModal)} className="flex-1 px-4 py-3 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}