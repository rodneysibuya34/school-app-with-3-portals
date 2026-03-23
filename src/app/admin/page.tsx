"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ADMIN_PASSWORD = "Admin.manager@123.com";

const navItems = [
  { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Dashboard", href: "/admin" },
  { icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", label: "Schools", href: "/admin/schools" },
  { icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", label: "Teachers", href: "/admin/teachers" },
  { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", label: "Students", href: "/admin/students" },
  { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", label: "Subscriptions", href: "/admin/subscriptions" },
  { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", label: "Messages", href: "/admin/messages" },
];

const initialSchools = [
  { id: 1, name: "Oakridge Preparatory Academy", location: "Boston, MA", students: 892, teachers: 48, status: "Active", type: "High School", adminUsername: "oakridge_admin", adminPassword: "Oak@2024" },
  { id: 2, name: "Westfield Christian School", location: "Chicago, IL", students: 456, teachers: 28, status: "Active", type: "Primary", adminUsername: "westfield_admin", adminPassword: "West@2024" },
  { id: 3, name: "Riverside Elementary", location: "Miami, FL", students: 324, teachers: 22, status: "Active", type: "Primary", adminUsername: "riverside_admin", adminPassword: "River@2024" },
  { id: 4, name: "Highland Academy", location: "Seattle, WA", students: 678, teachers: 35, status: "Trial", type: "High School", adminUsername: "highland_admin", adminPassword: "High@2024" },
];

const initialTeachers = [
  { id: 1, name: "Dr. Sarah Mitchell", email: "s.mitchell@oakridge.edu", school: "Oakridge Preparatory Academy", subject: "Mathematics", status: "Active", username: "s.mitchell", password: "Mitch@123" },
  { id: 2, name: "Mr. David Park", email: "d.park@oakridge.edu", school: "Oakridge Preparatory Academy", subject: "English Literature", status: "Active", username: "d.park", password: "Park@123" },
  { id: 3, name: "Mrs. Emily Roberts", email: "e.roberts@westfield.edu", school: "Westfield Christian School", subject: "Chemistry", status: "Active", username: "e.roberts", password: "Rob@123" },
  { id: 4, name: "Dr. James Chen", email: "j.chen@oakridge.edu", school: "Oakridge Preparatory Academy", subject: "Physics", status: "Active", username: "j.chen", password: "Chen@123" },
  { id: 5, name: "Ms. Anna Williams", email: "a.williams@riverside.edu", school: "Riverside Elementary", subject: "History", status: "Pending", username: "a.williams", password: "Will@123" },
];

const initialStudents = [
  { id: 1, name: "Alex Thompson", email: "a.thompson@oakridge.edu", grade: 11, school: "Oakridge Preparatory Academy", status: "Active", username: "alex.t", password: "Alex@123" },
  { id: 2, name: "Emma Wilson", email: "e.wilson@oakridge.edu", grade: 10, school: "Oakridge Preparatory Academy", status: "Active", username: "emma.w", password: "Emma@123" },
  { id: 3, name: "Michael Brown", email: "m.brown@westfield.edu", grade: 9, school: "Westfield Christian School", status: "Active", username: "michael.b", password: "Mike@123" },
  { id: 4, name: "Sophia Lee", email: "s.lee@oakridge.edu", grade: 12, school: "Oakridge Preparatory Academy", status: "Active", username: "sophia.l", password: "Soph@123" },
  { id: 5, name: "James Garcia", email: "j.garcia@riverside.edu", grade: 8, school: "Riverside Elementary", status: "Inactive", username: "james.g", password: "Jame@123" },
];

const initialSubscriptions = [
  { id: 1, school: "Oakridge Preparatory Academy", schoolType: "High School", price: "R2,500/mo", startDate: "Jan 1, 2026", status: "Active", renewal: "Jan 1, 2027" },
  { id: 2, school: "Westfield Christian School", schoolType: "Primary", price: "R1,500/mo", startDate: "Mar 15, 2025", status: "Active", renewal: "Mar 15, 2026" },
  { id: 3, school: "Riverside Elementary", schoolType: "Primary", price: "R1,500/mo", startDate: "Jun 1, 2025", status: "Active", renewal: "Jun 1, 2026" },
  { id: 4, school: "Highland Academy", schoolType: "High School", price: "Free", startDate: "Mar 1, 2026", status: "Trial", renewal: "Mar 31, 2026" },
];

type ModalType = 'school' | 'teacher' | 'student' | 'subscription' | null;

export default function AdminPortal() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showModal, setShowModal] = useState<ModalType>(null);
  const [showPasswordModal, setShowPasswordModal] = useState<string | null>(null);
  const [schools, setSchools] = useState(initialSchools);
  const [teachers, setTeachers] = useState(initialTeachers);
  const [students, setStudents] = useState(initialStudents);
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);

  const [formData, setFormData] = useState({
    name: '', location: '', type: 'Primary', adminUsername: '', adminPassword: '',
    teacherName: '', teacherEmail: '', teacherSchool: '', teacherSubject: '', teacherUsername: '', teacherPassword: '',
    studentName: '', studentEmail: '', studentGrade: '', studentSchool: '', studentUsername: '', studentPassword: '',
    subSchool: '', subType: 'Primary', subStartDate: ''
  });

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
    router.push("/");
  };

  const calculatePrice = (type: string) => {
    return type === "Primary" ? "R1,500/mo" : "R2,500/mo";
  };

  const getStartDate = () => {
    const d = new Date();
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getRenewalDate = () => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const generateUsername = (name: string, school: string, count: number) => {
    const namePart = name.toLowerCase().replace(/\s+/g, '.').split('.')[0];
    const schoolPrefix = school.split(' ')[0].toLowerCase().substring(0, 3);
    return `${schoolPrefix}.${namePart}${count.toString().padStart(3, '0')}`;
  };

  const generatePassword = (count: number) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += chars.charAt((count + i) % chars.length);
    }
    return password + "@123";
  };

  const handleSubmit = (type: ModalType) => {
    const startDate = getStartDate();
    const renewalDate = getRenewalDate();

    if (type === 'school') {
      if (!formData.name || !formData.location) {
        alert("Please fill in School Name and Location");
        return;
      }
      const schoolUsername = formData.name.split(' ')[0].toLowerCase() + "_admin";
      const schoolPassword = generatePassword(schools.length + 1);
      
      const newSchool = {
        id: schools.length + 1,
        name: formData.name,
        location: formData.location,
        students: 0,
        teachers: 0,
        status: "Active",
        type: formData.type,
        adminUsername: schoolUsername,
        adminPassword: schoolPassword
      };
      setSchools([...schools, newSchool]);
      
      const newSub = {
        id: subscriptions.length + 1,
        school: formData.name,
        schoolType: formData.type,
        price: calculatePrice(formData.type),
        startDate: startDate,
        status: "Active",
        renewal: renewalDate
      };
      setSubscriptions([...subscriptions, newSub]);
    } else if (type === 'teacher') {
      if (!formData.teacherName || !formData.teacherSchool || !formData.teacherSubject) {
        alert("Please fill in Name, School, and Subject");
        return;
      }
      const teacherUsername = generateUsername(formData.teacherName, formData.teacherSchool, teachers.length + 1);
      const teacherPassword = generatePassword(teachers.length + 1);
      const newTeacher = {
        id: teachers.length + 1,
        name: formData.teacherName,
        email: formData.teacherEmail || `${teacherUsername}@${formData.teacherSchool.split(' ')[0].toLowerCase()}.edu`,
        school: formData.teacherSchool,
        subject: formData.teacherSubject,
        status: "Active",
        username: teacherUsername,
        password: teacherPassword
      };
      setTeachers([...teachers, newTeacher]);
      
      setSchools(schools.map(s => 
        s.name === formData.teacherSchool ? { ...s, teachers: s.teachers + 1 } : s
      ));
      
      setShowModal(null);
      setFormData({
        name: '', location: '', type: 'Primary', adminUsername: '', adminPassword: '',
        teacherName: '', teacherEmail: '', teacherSchool: '', teacherSubject: '', teacherUsername: '', teacherPassword: '',
        studentName: '', studentEmail: '', studentGrade: '', studentSchool: '', studentUsername: '', studentPassword: '',
        subSchool: '', subType: 'Primary', subStartDate: ''
      });
      
      alert(`Teacher created!\n\nUsername: ${teacherUsername}\nPassword: ${teacherPassword}\n\nShare these credentials with the teacher.`);
    } else if (type === 'student') {
      if (!formData.studentName || !formData.studentGrade || !formData.studentSchool) {
        alert("Please fill in Name, Grade, and School");
        return;
      }
      const studentUsername = generateUsername(formData.studentName, formData.studentSchool, students.length + 1);
      const studentPassword = generatePassword(students.length + 1);
      const newStudent = {
        id: students.length + 1,
        name: formData.studentName,
        email: formData.studentEmail || `${studentUsername}@${formData.studentSchool.split(' ')[0].toLowerCase()}.edu`,
        grade: parseInt(formData.studentGrade),
        school: formData.studentSchool,
        status: "Active",
        username: studentUsername,
        password: studentPassword
      };
      setStudents([...students, newStudent]);
      
      setSchools(schools.map(s => 
        s.name === formData.studentSchool ? { ...s, students: s.students + 1 } : s
      ));
      
      setShowModal(null);
      setFormData({
        name: '', location: '', type: 'Primary', adminUsername: '', adminPassword: '',
        teacherName: '', teacherEmail: '', teacherSchool: '', teacherSubject: '', teacherUsername: '', teacherPassword: '',
        studentName: '', studentEmail: '', studentGrade: '', studentSchool: '', studentUsername: '', studentPassword: '',
        subSchool: '', subType: 'Primary', subStartDate: ''
      });
      
      alert(`Student created!\n\nUsername: ${studentUsername}\nPassword: ${studentPassword}\n\nShare these credentials with the student.`);
    } else if (type === 'subscription') {
      const newSub = {
        id: subscriptions.length + 1,
        school: formData.subSchool,
        schoolType: formData.subType,
        price: calculatePrice(formData.subType),
        startDate: formData.subStartDate || startDate,
        status: "Active",
        renewal: renewalDate
      };
      setSubscriptions([...subscriptions, newSub]);
    }
    
    setShowModal(null);
    setFormData({
      name: '', location: '', type: 'Primary', adminUsername: '', adminPassword: '',
      teacherName: '', teacherEmail: '', teacherSchool: '', teacherSubject: '', teacherUsername: '', teacherPassword: '',
      studentName: '', studentEmail: '', studentGrade: '', studentSchool: '', studentUsername: '', studentPassword: '',
      subSchool: '', subType: 'Primary', subStartDate: ''
    });
  };

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-[#1E293B] rounded-2xl p-6 w-full max-w-md border border-white/10 max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            {showModal === 'school' && 'Create New School'}
            {showModal === 'teacher' && 'Add New Teacher'}
            {showModal === 'student' && 'Add New Student'}
            {showModal === 'subscription' && 'Create New Subscription'}
          </h2>

          {showModal === 'school' && (
            <div className="space-y-4">
              <div>
                <label className="block text-slate-400 text-sm mb-2">School Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none" placeholder="Enter school name" />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">Location</label>
                <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none" placeholder="City, State" />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">School Type</label>
                <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none">
                  <option value="Primary">Primary School (R1,500/mo)</option>
                  <option value="High School">High School (R2,500/mo)</option>
                </select>
              </div>
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-emerald-400 text-sm font-medium mb-2">Credentials will be auto-generated</p>
                <p className="text-slate-400 text-xs">Username: [school_admin], Password: [auto-generated]</p>
              </div>
            </div>
          )}

          {showModal === 'teacher' && (
            <div className="space-y-4">
              <div>
                <label className="block text-slate-400 text-sm mb-2">Full Name *</label>
                <input type="text" value={formData.teacherName} onChange={(e) => setFormData({...formData, teacherName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none" placeholder="Enter teacher name" />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">School *</label>
                <select value={formData.teacherSchool} onChange={(e) => setFormData({...formData, teacherSchool: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none">
                  <option value="">Select School</option>
                  {schools.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">Subject *</label>
                <input type="text" value={formData.teacherSubject} onChange={(e) => setFormData({...formData, teacherSubject: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none" placeholder="Mathematics, Science, etc." />
              </div>
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <p className="text-purple-400 text-sm font-medium mb-2">Credentials will be auto-generated</p>
                <p className="text-slate-400 text-xs">Click &quot;Create&quot; to generate login credentials</p>
              </div>
            </div>
          )}

          {showModal === 'student' && (
            <div className="space-y-4">
              <div>
                <label className="block text-slate-400 text-sm mb-2">Full Name *</label>
                <input type="text" value={formData.studentName} onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none" placeholder="Enter student name" />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">Grade *</label>
                <input type="number" value={formData.studentGrade} onChange={(e) => setFormData({...formData, studentGrade: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none" placeholder="1-12" />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">School *</label>
                <select value={formData.studentSchool} onChange={(e) => setFormData({...formData, studentSchool: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none">
                  <option value="">Select School</option>
                  {schools.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <p className="text-blue-400 text-sm font-medium mb-2">Credentials will be auto-generated</p>
                <p className="text-slate-400 text-xs">Click &quot;Create&quot; to generate login credentials</p>
              </div>
            </div>
          )}

          {showModal === 'subscription' && (
            <div className="space-y-4">
              <div>
                <label className="block text-slate-400 text-sm mb-2">School</label>
                <select value={formData.subSchool} onChange={(e) => setFormData({...formData, subSchool: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none">
                  <option value="">Select School</option>
                  {schools.filter(s => !subscriptions.some(sub => sub.school === s.name)).map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">School Type</label>
                <select value={formData.subType} onChange={(e) => setFormData({...formData, subType: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none">
                  <option value="Primary">Primary School - R1,500/mo</option>
                  <option value="High School">High School - R2,500/mo</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">Start Date</label>
                <input type="date" value={formData.subStartDate} onChange={(e) => setFormData({...formData, subStartDate: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none" />
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button onClick={() => setShowModal(null)} className="flex-1 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 font-medium transition-colors">
              Cancel
            </button>
            <button onClick={() => handleSubmit(showModal)} className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors">
              Create
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPasswordModal = () => {
    if (!showPasswordModal) return null;

    let username = "", password = "";
    if (showPasswordModal.startsWith("school_")) {
      const id = parseInt(showPasswordModal.replace("school_", ""));
      const school = schools.find(s => s.id === id);
      if (school) { username = school.adminUsername; password = school.adminPassword; }
    } else if (showPasswordModal.startsWith("teacher_")) {
      const id = parseInt(showPasswordModal.replace("teacher_", ""));
      const teacher = teachers.find(t => t.id === id);
      if (teacher) { username = teacher.username || ""; password = teacher.password || ""; }
    } else if (showPasswordModal.startsWith("student_")) {
      const id = parseInt(showPasswordModal.replace("student_", ""));
      const student = students.find(s => s.id === id);
      if (student) { username = student.username || ""; password = student.password || ""; }
    }

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-[#1E293B] rounded-2xl p-6 w-full max-w-sm border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Login Credentials</h2>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-white/5">
              <p className="text-slate-400 text-xs">Username</p>
              <p className="text-white font-medium">{username}</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5">
              <p className="text-slate-400 text-xs">Password</p>
              <p className="text-white font-medium">{password}</p>
            </div>
          </div>
          <button onClick={() => setShowPasswordModal(null)} className="w-full mt-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors">
            Close
          </button>
        </div>
      </div>
    );
  };

  const renderLoginScreen = () => (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white font-['Outfit']">Admin Portal</h1>
          <p className="text-slate-400 mt-2">Enter your admin password</p>
        </div>
        <div className="space-y-4">
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter password"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:outline-none"
          />
          {authError && <p className="text-red-400 text-sm">{authError}</p>}
          <button onClick={handleLogin} className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors">
            Login
          </button>
        </div>
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return renderLoginScreen();
  }

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
              <button onClick={() => setShowModal('school')} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create School
              </button>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">School Name</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Location</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Type</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Students</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Teachers</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Status</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Credentials</th>
                  </tr>
                </thead>
                <tbody>
                  {schools.map((school) => (
                    <tr key={school.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-4 px-4 text-white font-medium">{school.name}</td>
                      <td className="py-4 px-4 text-slate-400">{school.location}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          school.type === 'High School' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {school.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-white">{school.students}</td>
                      <td className="py-4 px-4 text-white">{school.teachers}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          school.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {school.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button onClick={() => setShowPasswordModal(`school_${school.id}`)} className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm">
                          View
                        </button>
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
              <button onClick={() => setShowModal('teacher')} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Teacher
              </button>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Name</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Email</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">School</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Subject</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Status</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Credentials</th>
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
                        <button onClick={() => setShowPasswordModal(`teacher_${teacher.id}`)} className="text-purple-400 hover:text-purple-300 transition-colors text-sm mr-3">View</button>
                        <button className="text-slate-400 hover:text-white transition-colors text-sm mr-3">Edit</button>
                        <button className="text-red-400 hover:text-red-300 transition-colors text-sm">Remove</button>
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
              <button onClick={() => setShowModal('student')} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Student
              </button>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Name</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Email</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Grade</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">School</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Status</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Credentials</th>
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
                        <button onClick={() => setShowPasswordModal(`student_${student.id}`)} className="text-blue-400 hover:text-blue-300 transition-colors text-sm mr-3">View</button>
                        <button className="text-slate-400 hover:text-white transition-colors text-sm mr-3">Edit</button>
                        <button className="text-red-400 hover:text-red-300 transition-colors text-sm">Remove</button>
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
              <button onClick={() => setShowModal('subscription')} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Subscription
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <p className="text-slate-400 text-sm mb-2">Total Monthly Revenue</p>
                <p className="text-3xl font-bold text-white">R{subscriptions.filter(s => s.status === 'Active' && s.price !== 'Free').reduce((acc, s) => acc + parseInt(s.price.replace(/[^0-9]/g, '')), 0).toLocaleString()}</p>
                <p className="text-green-400 text-sm mt-2">+12% from last month</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <p className="text-slate-400 text-sm mb-2">Annual Run Rate</p>
                <p className="text-3xl font-bold text-white">R{(subscriptions.filter(s => s.status === 'Active' && s.price !== 'Free').reduce((acc, s) => acc + parseInt(s.price.replace(/[^0-9]/g, '')), 0) * 12).toLocaleString()}</p>
                <p className="text-green-400 text-sm mt-2">+8% YoY</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <p className="text-slate-400 text-sm mb-2">Active Subscriptions</p>
                <p className="text-3xl font-bold text-white">{subscriptions.filter(s => s.status === 'Active').length}</p>
                <p className="text-slate-400 text-sm mt-2">{subscriptions.filter(s => s.status === 'Trial').length} trial</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <p className="text-slate-400 text-sm mb-2">Churn Rate</p>
                <p className="text-3xl font-bold text-white">2.1%</p>
                <p className="text-green-400 text-sm mt-2">-0.5% from last quarter</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">School</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Type</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Price</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Start Date</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Next Renewal</th>
                    <th className="text-left py-4 px-4 text-slate-400 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-4 px-4 text-white font-medium">{sub.school}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          sub.schoolType === 'High School' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {sub.schoolType}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-white font-medium">{sub.price}</td>
                      <td className="py-4 px-4 text-slate-400">{sub.startDate}</td>
                      <td className="py-4 px-4 text-slate-400">{sub.renewal}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          sub.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        const totalRevenue = subscriptions.filter(s => s.status === 'Active' && s.price !== 'Free').reduce((acc, s) => acc + parseInt(s.price.replace(/[^0-9]/g, '')), 0);
        const dashboardStats = [
          { label: "Total Schools", value: schools.length.toString(), icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", color: "#3B82F6" },
          { label: "Active Teachers", value: teachers.filter(t => t.status === 'Active').length.toString(), icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", color: "#A855F7" },
          { label: "Total Students", value: students.length.toString(), icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", color: "#10B981" },
          { label: "Monthly Revenue", value: `R${totalRevenue.toLocaleString()}`, icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "#F59E0B" },
        ];

        return (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white font-['Outfit']">Admin Dashboard</h1>
                <p className="text-slate-400 mt-1">Welcome back! Here&apos;s your platform overview.</p>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={handleLogout} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-colors">
                  Logout
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {dashboardStats.map((stat) => (
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
                  <button onClick={() => setShowModal('school')} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">Create School</p>
                    <p className="text-slate-400 text-sm">Add new school</p>
                  </button>
                  <button onClick={() => setShowModal('teacher')} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">Add Teacher</p>
                    <p className="text-slate-400 text-sm">New faculty member</p>
                  </button>
                  <button onClick={() => setShowModal('student')} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">Add Student</p>
                    <p className="text-slate-400 text-sm">Enroll new student</p>
                  </button>
                  <button onClick={() => setShowModal('subscription')} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">New Subscription</p>
                    <p className="text-slate-400 text-sm">Add subscription</p>
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
      {renderModal()}
      {renderPasswordModal()}
      <aside className="w-72 bg-[#1E293B] border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-white font-['Outfit']">EduHub</span>
          </div>
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
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}
