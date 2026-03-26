"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface TeacherData {
  id: number;
  name: string;
  email: string;
  school: string;
  subject: string;
  username: string;
  password: string;
  schoolYear: number;
}

interface StudentData {
  id: number;
  name: string;
  email: string;
  grade: number;
  school: string;
  username: string;
  password: string;
  schoolYear: number;
}

const teachersData: TeacherData[] = [
  { id: 1, name: "Dr. Sarah Mitchell", email: "s.mitchell@oakridge.edu", school: "Oakridge Preparatory Academy", subject: "Mathematics", username: "s.mitchell", password: "Mitch@123", schoolYear: 2026 },
  { id: 2, name: "Mr. David Park", email: "d.park@oakridge.edu", school: "Oakridge Preparatory Academy", subject: "English Literature", username: "d.park", password: "Park@123", schoolYear: 2026 },
  { id: 3, name: "Mrs. Emily Roberts", email: "e.roberts@westfield.edu", school: "Westfield Christian School", subject: "Chemistry", username: "e.roberts", password: "Rob@123", schoolYear: 2026 },
  { id: 4, name: "Dr. James Chen", email: "j.chen@oakridge.edu", school: "Oakridge Preparatory Academy", subject: "Physics", username: "j.chen", password: "Chen@123", schoolYear: 2026 },
  { id: 5, name: "Ms. Anna Williams", email: "a.williams@riverside.edu", school: "Riverside Elementary", subject: "History", username: "a.williams", password: "Will@123", schoolYear: 2026 },
];

const studentsData: StudentData[] = [
  { id: 1, name: "Alex Thompson", email: "a.thompson@oakridge.edu", grade: 11, school: "Oakridge Preparatory Academy", username: "alex.t", password: "Alex@123", schoolYear: 2026 },
  { id: 2, name: "Emma Wilson", email: "e.wilson@oakridge.edu", grade: 10, school: "Oakridge Preparatory Academy", username: "emma.w", password: "Emma@123", schoolYear: 2026 },
  { id: 3, name: "Michael Brown", email: "m.brown@westfield.edu", grade: 9, school: "Westfield Christian School", username: "michael.b", password: "Mike@123", schoolYear: 2026 },
  { id: 4, name: "Sophia Lee", email: "s.lee@oakridge.edu", grade: 12, school: "Oakridge Preparatory Academy", username: "sophia.l", password: "Soph@123", schoolYear: 2026 },
  { id: 5, name: "James Garcia", email: "j.garcia@riverside.edu", grade: 8, school: "Riverside Elementary", username: "james.g", password: "Jame@123", schoolYear: 2026 },
];

interface Homework {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  grade: number;
  fileUrl: string;
  fileType: string;
}

interface Test {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  grade: number;
  questions: Question[];
  published: boolean;
}

interface Question {
  id: number;
  text: string;
  type: "mcq" | "truefalse";
  options?: string[];
  correctAnswer: string;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  priority: "normal" | "important" | "urgent";
}

const navItems = [
  { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Dashboard" },
  { icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", label: "Homework" },
  { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01", label: "Tests" },
  { icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", label: "Students" },
  { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", label: "Exam Timetable" },
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Weekly Timetable" },
  { icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z", label: "Announcements" },
];

export default function TeacherPortal() {
  const router = useRouter();
  const [loggedInTeacher, setLoggedInTeacher] = useState<typeof teachersData[0] | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [homeworkList, setHomeworkList] = useState<Homework[]>(() => {
    const stored = localStorage.getItem("homeworkData");
    return stored ? JSON.parse(stored) : [
      { id: 1, title: "Algebra Practice Problems", description: "Complete exercises 1-20 from Chapter 5", dueDate: "2026-03-25", grade: 11, fileUrl: "/homework/algebra.pdf", fileType: "pdf" },
      { id: 2, title: "Geometry Proofs", description: "Submit proofs for theorems 1-5", dueDate: "2026-03-28", grade: 10, fileUrl: "/homework/geometry.pdf", fileType: "pdf" },
    ];
  });
  const [testList, setTestList] = useState<Test[]>([
    { id: 1, title: "Mid-term Exam", description: "Covers chapters 1-5", dueDate: "2024-04-15", grade: 11, questions: [], published: true },
    { id: 2, title: "Quiz: Trigonometry", description: "Short quiz on basic trig functions", dueDate: "2024-04-10", grade: 10, questions: [], published: false },
  ]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: 1, title: "Parent-Teacher Meeting", content: "Join us this Friday at 2 PM for the quarterly parent-teacher meeting.", date: "2024-03-20", priority: "important" },
    { id: 2, title: "Exam Preparation", content: "Please ensure all students complete practice papers before the mid-term.", date: "2024-03-18", priority: "normal" },
  ]);
  const [showHomeworkModal, setShowHomeworkModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showExamModal, setShowExamModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newHomework, setNewHomework] = useState({ title: "", description: "", dueDate: "", grade: "" });
  const [homeworkFile, setHomeworkFile] = useState<{ name: string; data: string; type: string } | null>(null);
  const [newTest, setNewTest] = useState({ title: "", description: "", dueDate: "", grade: "" });
  const [newAnnouncement, setNewAnnouncement] = useState<{ title: string; content: string; priority: "normal" | "important" | "urgent" }>({ title: "", content: "", priority: "normal" });
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [currentTestId, setCurrentTestId] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState({ text: "", type: "mcq" as "mcq" | "truefalse", options: ["", "", "", ""], correctAnswer: "" });
  const [examTimetable, setExamTimetable] = useState<{ date: string; exam: string; time: string; venue: string; fileUrl?: string; fileType?: string }[]>([
    { date: "2024-04-15", exam: "Mathematics Paper 1", time: "09:00 - 11:00", venue: "Hall A" },
    { date: "2024-04-16", exam: "English Literature", time: "09:00 - 11:30", venue: "Hall B" },
  ]);
  const [weeklyTimetable, setWeeklyTimetable] = useState<{ day: string; time: string; subject: string; grade: number; fileUrl?: string; fileType?: string }[]>([
    { day: "Monday", time: "08:00 - 09:00", subject: "Mathematics", grade: 11 },
    { day: "Monday", time: "09:00 - 10:00", subject: "Mathematics", grade: 10 },
    { day: "Tuesday", time: "08:00 - 09:00", subject: "Mathematics", grade: 11 },
    { day: "Wednesday", time: "10:00 - 11:00", subject: "Mathematics", grade: 12 },
  ]);
  const [newExam, setNewExam] = useState({ date: "", exam: "", time: "", venue: "" });
  const [examFile, setExamFile] = useState<{ name: string; data: string; type: string } | null>(null);
  const [newSchedule, setNewSchedule] = useState({ day: "Monday", time: "08:00 - 09:00", subject: "", grade: "" });
  const [scheduleFile, setScheduleFile] = useState<{ name: string; data: string; type: string } | null>(null);

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

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedHomework = localStorage.getItem("homeworkData");
    if (storedHomework) {
      setHomeworkList(JSON.parse(storedHomework));
    }
    const storedTests = localStorage.getItem("testData");
    if (storedTests) {
      setTestList(JSON.parse(storedTests));
    }
    const storedAnnouncements = localStorage.getItem("announcementData");
    if (storedAnnouncements) {
      setAnnouncements(JSON.parse(storedAnnouncements));
    }
    const storedExamTimetable = localStorage.getItem("examTimetableData");
    if (storedExamTimetable) {
      setExamTimetable(JSON.parse(storedExamTimetable));
    }
    const storedWeeklyTimetable = localStorage.getItem("weeklyTimetableData");
    if (storedWeeklyTimetable) {
      setWeeklyTimetable(JSON.parse(storedWeeklyTimetable));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInTeacher");
    router.push("/");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHomeworkFile({
          name: file.name,
          data: reader.result as string,
          type: file.type
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddHomework = () => {
    if (newHomework.title && newHomework.dueDate && newHomework.grade) {
      const hw: Homework = {
        id: Date.now(),
        title: newHomework.title,
        description: newHomework.description,
        dueDate: newHomework.dueDate,
        grade: parseInt(newHomework.grade),
        fileUrl: homeworkFile?.data || "",
        fileType: homeworkFile?.type || "unknown"
      };
      setHomeworkList([...homeworkList, hw]);
      localStorage.setItem("homeworkData", JSON.stringify([...homeworkList, hw]));
      setNewHomework({ title: "", description: "", dueDate: "", grade: "" });
      setHomeworkFile(null);
      setShowHomeworkModal(false);
    }
  };

  const handleCloseHomeworkModal = () => {
    setShowHomeworkModal(false);
    setNewHomework({ title: "", description: "", dueDate: "", grade: "" });
    setHomeworkFile(null);
  };

    const handleAddTest = () => {
      if (newTest.title && newTest.dueDate && newTest.grade) {
        const test: Test = {
          id: Date.now(),
          title: newTest.title,
          description: newTest.description,
          dueDate: newTest.dueDate,
          grade: parseInt(newTest.grade),
          questions: [],
          published: false
        };
        setTestList([...testList, test]);
        localStorage.setItem("testData", JSON.stringify([...testList, test]));
        setNewTest({ title: "", description: "", dueDate: "", grade: "" });
        setShowTestModal(false);
      }
    };

  const handleAddQuestion = () => {
    if (newQuestion.text && newQuestion.correctAnswer) {
      const q: Question = {
        id: Date.now(),
        text: newQuestion.text,
        type: newQuestion.type,
        options: newQuestion.type === "mcq" ? newQuestion.options : undefined,
        correctAnswer: newQuestion.correctAnswer
      };
      setTestQuestions([...testQuestions, q]);
      setNewQuestion({ text: "", type: "mcq", options: ["", "", "", ""], correctAnswer: "" });
      setShowQuestionModal(false);
    }
  };

  const handleAddAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      const ann: Announcement = {
        id: Date.now(),
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        date: new Date().toISOString().split('T')[0],
        priority: newAnnouncement.priority
      };
      setAnnouncements([...announcements, ann]);
      setNewAnnouncement({ title: "", content: "", priority: "normal" });
      setShowAnnouncementModal(false);
    }
  };

  const handleAddExam = () => {
    if (newExam.date && newExam.exam && newExam.time && newExam.venue) {
      setExamTimetable([...examTimetable, { ...newExam, fileUrl: examFile?.data, fileType: examFile?.type }]);
      setNewExam({ date: "", exam: "", time: "", venue: "" });
      setExamFile(null);
      setShowExamModal(false);
    }
  };

  const handleCloseExamModal = () => {
    setShowExamModal(false);
    setNewExam({ date: "", exam: "", time: "", venue: "" });
    setExamFile(null);
  };

  const handleDeleteExam = (index: number) => {
    setExamTimetable(examTimetable.filter((_, i) => i !== index));
  };

  const handleAddSchedule = () => {
    if (newSchedule.day && newSchedule.time && newSchedule.subject && newSchedule.grade) {
      setWeeklyTimetable([...weeklyTimetable, { ...newSchedule, grade: parseInt(newSchedule.grade), fileUrl: scheduleFile?.data, fileType: scheduleFile?.type }]);
      setNewSchedule({ day: "Monday", time: "08:00 - 09:00", subject: "", grade: "" });
      setScheduleFile(null);
      setShowScheduleModal(false);
    }
  };

  const handleCloseScheduleModal = () => {
    setShowScheduleModal(false);
    setNewSchedule({ day: "Monday", time: "08:00 - 09:00", subject: "", grade: "" });
    setScheduleFile(null);
  };

  const handleDeleteSchedule = (day: string, index: number) => {
    const daySchedules = weeklyTimetable.filter(t => t.day === day);
    const itemToDelete = daySchedules[index];
    setWeeklyTimetable(weeklyTimetable.filter(t => !(t.day === itemToDelete.day && t.time === itemToDelete.time && t.subject === itemToDelete.subject)));
  };

  const handlePublishTest = (testId: number) => {
    setTestList(testList.map(t => t.id === testId ? { ...t, published: !t.published } : t));
  };

  const renderDashboard = () => {
    if (!loggedInTeacher) return null;
    return (
    <>
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/10 border border-purple-500/20 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
              {getInitials(loggedInTeacher.name)}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{loggedInTeacher.name}</h2>
              <p className="text-purple-300">{loggedInTeacher.subject} • {loggedInTeacher.school}</p>
              <p className="text-slate-400 text-sm">Teacher ID: {loggedInTeacher.schoolYear}-{loggedInTeacher.id.toString().padStart(4, '0')}</p>
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
    </>
    );
  };

  const renderHomework = () => (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white font-['Outfit']">Homework & Assignments</h1>
          <p className="text-slate-400 mt-1">Upload and manage homework assignments</p>
        </div>
        <button onClick={() => setShowHomeworkModal(true)} className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Homework
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {homeworkList.map((hw) => (
          <div key={hw.id} className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">Grade {hw.grade}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{hw.title}</h3>
            <p className="text-slate-400 text-sm mb-4">{hw.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Due: {hw.dueDate}</span>
              {hw.fileUrl ? (
                <a href={hw.fileUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                  {hw.fileType.startsWith('image/') ? 'View Image' : 'View/Download'}
                </a>
              ) : (
                <span className="text-slate-500">No file</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {showHomeworkModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1E293B] rounded-2xl p-6 w-full max-w-md border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-6">Add New Homework</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Title</label>
                <input type="text" value={newHomework.title} onChange={(e) => setNewHomework({...newHomework, title: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500" placeholder="Homework title" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Description</label>
                <textarea value={newHomework.description} onChange={(e) => setNewHomework({...newHomework, description: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500" rows={3} placeholder="Homework description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Due Date</label>
                  <input type="date" value={newHomework.dueDate} onChange={(e) => setNewHomework({...newHomework, dueDate: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Grade</label>
                  <select value={newHomework.grade} onChange={(e) => setNewHomework({...newHomework, grade: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500">
                    <option value="">Select Grade</option>
                    {[8,9,10,11,12].map(g => <option key={g} value={g}>Grade {g}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Upload File (PDF/Image)</label>
                <input 
                  type="file" 
                  id="homework-file"
                  accept="image/*,application/pdf"
                  capture="environment"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="homework-file" className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-purple-500 transition-colors cursor-pointer block">
                  {homeworkFile ? (
                    <div className="flex flex-col items-center">
                      <svg className="w-8 h-8 text-green-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-green-400 text-sm font-medium">{homeworkFile.name}</p>
                      <p className="text-slate-500 text-xs mt-1">Click to change file</p>
                    </div>
                  ) : (
                    <>
                      <svg className="w-8 h-8 text-slate-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-slate-400 text-sm">Tap to upload from camera or files</p>
                      <p className="text-slate-500 text-xs mt-1">PDF, PNG, JPG up to 10MB</p>
                    </>
                  )}
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleCloseHomeworkModal} className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">Cancel</button>
              <button onClick={handleAddHomework} className="flex-1 px-4 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors">Create Homework</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTests = () => (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white font-['Outfit']">Online Tests & Quizzes</h1>
          <p className="text-slate-400 mt-1">Create and manage MCQ and True/False tests</p>
        </div>
        <button onClick={() => setShowTestModal(true)} className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Test
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {testList.map((test) => (
          <div key={test.id} className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300">Grade {test.grade}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${test.published ? 'bg-blue-500/20 text-blue-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                  {test.published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{test.title}</h3>
            <p className="text-slate-400 text-sm mb-4">{test.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Due: {test.dueDate}</span>
              <div className="flex gap-2">
                <button onClick={() => { setCurrentTestId(test.id); setShowQuestionModal(true); }} className="text-purple-400 hover:text-purple-300">Add Questions</button>
                <button onClick={() => handlePublishTest(test.id)} className="text-blue-400 hover:text-blue-300">{test.published ? 'Unpublish' : 'Publish'}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showTestModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1E293B] rounded-2xl p-6 w-full max-w-md border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-6">Create New Test</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Test Title</label>
                <input type="text" value={newTest.title} onChange={(e) => setNewTest({...newTest, title: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500" placeholder="Test title" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Description</label>
                <textarea value={newTest.description} onChange={(e) => setNewTest({...newTest, description: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500" rows={3} placeholder="Test description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Due Date</label>
                  <input type="date" value={newTest.dueDate} onChange={(e) => setNewTest({...newTest, dueDate: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Grade</label>
                  <select value={newTest.grade} onChange={(e) => setNewTest({...newTest, grade: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500">
                    <option value="">Select Grade</option>
                    {[8,9,10,11,12].map(g => <option key={g} value={g}>Grade {g}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowTestModal(false)} className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">Cancel</button>
              <button onClick={handleAddTest} className="flex-1 px-4 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors">Create Test</button>
            </div>
          </div>
        </div>
      )}

      {showQuestionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1E293B] rounded-2xl p-6 w-full max-w-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-6">Add Question</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Question Type</label>
                <select value={newQuestion.type} onChange={(e) => setNewQuestion({...newQuestion, type: e.target.value as "mcq" | "truefalse"})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500">
                  <option value="mcq">Multiple Choice (MCQ)</option>
                  <option value="truefalse">True/False</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Question Text</label>
                <textarea value={newQuestion.text} onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500" rows={2} placeholder="Enter your question" />
              </div>
              {newQuestion.type === "mcq" && (
                <div className="space-y-2">
                  <label className="block text-sm text-slate-400 mb-2">Options</label>
                  {newQuestion.options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="radio" name="correct" checked={newQuestion.correctAnswer === opt} onChange={() => setNewQuestion({...newQuestion, correctAnswer: opt})} className="w-4 h-4 accent-purple-500" />
                      <input type="text" value={opt} onChange={(e) => { const newOpts = [...newQuestion.options]; newOpts[i] = e.target.value; setNewQuestion({...newQuestion, options: newOpts}); }} className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500" placeholder={`Option ${i+1}`} />
                    </div>
                  ))}
                </div>
              )}
              {newQuestion.type === "truefalse" && (
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Correct Answer</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-white">
                      <input type="radio" name="tf" checked={newQuestion.correctAnswer === "True"} onChange={() => setNewQuestion({...newQuestion, correctAnswer: "True"})} className="w-4 h-4 accent-purple-500" />
                      True
                    </label>
                    <label className="flex items-center gap-2 text-white">
                      <input type="radio" name="tf" checked={newQuestion.correctAnswer === "False"} onChange={() => setNewQuestion({...newQuestion, correctAnswer: "False"})} className="w-4 h-4 accent-purple-500" />
                      False
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowQuestionModal(false)} className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">Cancel</button>
              <button onClick={handleAddQuestion} className="flex-1 px-4 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors">Add Question</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderExamTimetable = () => (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white font-['Outfit']">Exam Timetable</h1>
          <p className="text-slate-400 mt-1">Manage exam schedules and venues</p>
        </div>
        <button onClick={() => setShowExamModal(true)} className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Exam
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 text-slate-400 font-medium">Date</th>
                <th className="text-left py-4 px-4 text-slate-400 font-medium">Exam</th>
                <th className="text-left py-4 px-4 text-slate-400 font-medium">Time</th>
                <th className="text-left py-4 px-4 text-slate-400 font-medium">Venue</th>
                <th className="text-left py-4 px-4 text-slate-400 font-medium">Timetable</th>
                <th className="text-left py-4 px-4 text-slate-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {examTimetable.map((exam, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-4 px-4 text-white">{exam.date}</td>
                  <td className="py-4 px-4 text-white font-medium">{exam.exam}</td>
                  <td className="py-4 px-4 text-slate-300">{exam.time}</td>
                  <td className="py-4 px-4 text-slate-300">{exam.venue}</td>
                  <td className="py-4 px-4">
                    {exam.fileUrl ? (
                      <a href={exam.fileUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 text-sm">
                        {exam.fileType?.startsWith('image/') ? 'View Image' : 'View'}
                      </a>
                    ) : <span className="text-slate-500 text-sm">-</span>}
                  </td>
                  <td className="py-4 px-4">
                    <button onClick={() => handleDeleteExam(idx)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showExamModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1E293B] rounded-2xl p-6 w-full max-w-md border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-6">Add New Exam</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Exam Name</label>
                <input type="text" value={newExam.exam} onChange={(e) => setNewExam({...newExam, exam: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500" placeholder="e.g., Mathematics Paper 1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Date</label>
                  <input type="date" value={newExam.date} onChange={(e) => setNewExam({...newExam, date: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Time</label>
                  <input type="text" value={newExam.time} onChange={(e) => setNewExam({...newExam, time: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500" placeholder="09:00 - 11:00" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Venue</label>
                <input type="text" value={newExam.venue} onChange={(e) => setNewExam({...newExam, venue: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500" placeholder="e.g., Hall A" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Upload Timetable (Optional)</label>
                <input 
                  type="file" 
                  id="exam-file"
                  accept="image/*,application/pdf"
                  capture="environment"
                  onChange={(e) => { const file = e.target.files?.[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setExamFile({ name: file.name, data: reader.result as string, type: file.type }); reader.readAsDataURL(file); }}}
                  className="hidden"
                />
                <label htmlFor="exam-file" className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center hover:border-purple-500 transition-colors cursor-pointer block">
                  {examFile ? (
                    <p className="text-green-400 text-sm">{examFile.name}</p>
                  ) : (
                    <p className="text-slate-400 text-sm">Tap to upload timetable image/PDF</p>
                  )}
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleCloseExamModal} className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">Cancel</button>
              <button onClick={handleAddExam} className="flex-1 px-4 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors">Add Exam</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderWeeklyTimetable = () => (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white font-['Outfit']">Weekly Timetable</h1>
          <p className="text-slate-400 mt-1">Manage weekly class schedules</p>
        </div>
        <button onClick={() => setShowScheduleModal(true)} className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
          <div key={day} className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 text-center pb-2 border-b border-white/10">{day}</h3>
            <div className="space-y-2">
              {weeklyTimetable.filter(t => t.day === day).map((t, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                  <p className="text-white text-sm font-medium">{t.subject}</p>
                  <p className="text-slate-400 text-xs">Grade {t.grade} • {t.time}</p>
                  {t.fileUrl && (
                    <a href={t.fileUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 text-xs block mt-1">View Timetable</a>
                  )}
                  <button onClick={() => handleDeleteSchedule(day, idx)} className="text-red-400 text-xs opacity-0 group-hover:opacity-100 mt-1">Delete</button>
                </div>
              ))}
              {weeklyTimetable.filter(t => t.day === day).length === 0 && (
                <p className="text-slate-500 text-sm text-center py-4">No classes</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1E293B] rounded-2xl p-6 w-full max-w-md border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-6">Add New Schedule</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Day</label>
                <select value={newSchedule.day} onChange={(e) => setNewSchedule({...newSchedule, day: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Time</label>
                <input type="text" value={newSchedule.time} onChange={(e) => setNewSchedule({...newSchedule, time: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500" placeholder="08:00 - 09:00" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Subject</label>
                <input type="text" value={newSchedule.subject} onChange={(e) => setNewSchedule({...newSchedule, subject: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500" placeholder="e.g., Mathematics" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Grade</label>
                <select value={newSchedule.grade} onChange={(e) => setNewSchedule({...newSchedule, grade: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500">
                  <option value="">Select Grade</option>
                  {[8,9,10,11,12].map(g => <option key={g} value={g}>Grade {g}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Upload Timetable (Optional)</label>
                <input 
                  type="file" 
                  id="schedule-file"
                  accept="image/*,application/pdf"
                  capture="environment"
                  onChange={(e) => { const file = e.target.files?.[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setScheduleFile({ name: file.name, data: reader.result as string, type: file.type }); reader.readAsDataURL(file); }}}
                  className="hidden"
                />
                <label htmlFor="schedule-file" className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center hover:border-purple-500 transition-colors cursor-pointer block">
                  {scheduleFile ? (
                    <p className="text-green-400 text-sm">{scheduleFile.name}</p>
                  ) : (
                    <p className="text-slate-400 text-sm">Tap to upload timetable image/PDF</p>
                  )}
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleCloseScheduleModal} className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">Cancel</button>
              <button onClick={handleAddSchedule} className="flex-1 px-4 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors">Add Schedule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderStudents = () => {
    const myStudents = studentsData.filter(s => s.school === loggedInTeacher?.school);
    const gradeFilter = localStorage.getItem("teacherGradeFilter") || "";
    const filteredStudents = gradeFilter ? myStudents.filter(s => s.grade === parseInt(gradeFilter)) : myStudents;
    
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white font-['Outfit']">My Students</h1>
            <p className="text-slate-400 mt-1">View and manage your students</p>
          </div>
          <div className="flex items-center gap-4">
            <select 
              value={gradeFilter} 
              onChange={(e) => { localStorage.setItem("teacherGradeFilter", e.target.value); setActiveTab("students"); }}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="">All Grades</option>
              {[8,9,10,11,12].map(g => <option key={g} value={g}>Grade {g}</option>)}
            </select>
            <span className="text-slate-400 text-sm">{filteredStudents.length} student(s)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div key={student.id} className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                  {student.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{student.name}</h3>
                  <p className="text-slate-400 text-sm">Grade {student.grade}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-slate-400"><span className="text-slate-500">Email:</span> {student.email}</p>
                <p className="text-slate-400"><span className="text-slate-500">Username:</span> {student.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAnnouncements = () => (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white font-['Outfit']">Announcements</h1>
          <p className="text-slate-400 mt-1">Post updates and notifications</p>
        </div>
        <button onClick={() => setShowAnnouncementModal(true)} className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Announcement
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map((ann) => (
          <div key={ann.id} className={`p-6 rounded-2xl border transition-all duration-300 ${
            ann.priority === "urgent" ? "bg-red-500/10 border-red-500/30" :
            ann.priority === "important" ? "bg-yellow-500/10 border-yellow-500/30" :
            "bg-white/5 border-white/10"
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  ann.priority === "urgent" ? "bg-red-500/20 text-red-300" :
                  ann.priority === "important" ? "bg-yellow-500/20 text-yellow-300" :
                  "bg-blue-500/20 text-blue-300"
                }`}>
                  {ann.priority.toUpperCase()}
                </span>
                <h3 className="text-lg font-semibold text-white">{ann.title}</h3>
              </div>
              <span className="text-slate-500 text-sm">{ann.date}</span>
            </div>
            <p className="text-slate-300">{ann.content}</p>
          </div>
        ))}
      </div>

      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1E293B] rounded-2xl p-6 w-full max-w-md border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-6">New Announcement</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Title</label>
                <input type="text" value={newAnnouncement.title} onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500" placeholder="Announcement title" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Content</label>
                <textarea value={newAnnouncement.content} onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500" rows={4} placeholder="Announcement content" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Priority</label>
                <select value={newAnnouncement.priority} onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value as "normal" | "important" | "urgent"})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500">
                  <option value="normal">Normal</option>
                  <option value="important">Important</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAnnouncementModal(false)} className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">Cancel</button>
              <button onClick={handleAddAnnouncement} className="flex-1 px-4 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors">Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

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
            <span className="text-xl font-semibold text-white font-['Outfit']">Geleza Mzansi</span>
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
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "homework" && renderHomework()}
        {activeTab === "tests" && renderTests()}
        {activeTab === "students" && renderStudents()}
        {activeTab === "exam timetable" && renderExamTimetable()}
        {activeTab === "weekly timetable" && renderWeeklyTimetable()}
        {activeTab === "announcements" && renderAnnouncements()}
      </main>
    </div>
  );
}
