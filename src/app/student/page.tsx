"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

const studentsData = [
  { id: 1, name: "Alex Thompson", email: "a.thompson@oakridge.edu", grade: 11, school: "Oakridge Preparatory Academy", username: "alex.t", password: "Alex@123" },
  { id: 2, name: "Emma Wilson", email: "e.wilson@oakridge.edu", grade: 10, school: "Oakridge Preparatory Academy", username: "emma.w", password: "Emma@123" },
  { id: 3, name: "Michael Brown", email: "m.brown@westfield.edu", grade: 9, school: "Westfield Christian School", username: "michael.b", password: "Mike@123" },
  { id: 4, name: "Sophia Lee", email: "s.lee@oakridge.edu", grade: 12, school: "Oakridge Preparatory Academy", username: "sophia.l", password: "Soph@123" },
  { id: 5, name: "James Garcia", email: "j.garcia@riverside.edu", grade: 8, school: "Riverside Elementary", username: "james.g", password: "Jame@123" },
];

interface Homework {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  grade: number;
  fileUrl: string;
  fileType: string;
  subject: string;
}

interface Test {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  grade: number;
  questions: Question[];
  published: boolean;
  timeLimit: number;
}

interface Question {
  id: number;
  text: string;
  type: "mcq" | "truefalse";
  options?: string[];
  correctAnswer: string;
}

interface StudyMaterial {
  id: number;
  title: string;
  subject: string;
  description: string;
  fileUrl: string;
  fileType: string;
}

const homeworkByGrade: Record<number, Homework[]> = {
  8: [
    { id: 1, title: "Math Worksheet Chapter 5", description: "Complete exercises 1-20 from Chapter 5", dueDate: "2024-03-25", grade: 8, fileUrl: "", fileType: "", subject: "Mathematics" },
    { id: 2, title: "Science Project", description: "Submit your science fair project", dueDate: "2024-03-28", grade: 8, fileUrl: "", fileType: "", subject: "Science" },
  ],
  9: [
    { id: 3, title: "Algebra Problem Set", description: "Complete problems 1-15 from Chapter 4", dueDate: "2024-03-25", grade: 9, fileUrl: "", fileType: "", subject: "Mathematics" },
    { id: 4, title: "Physics Lab Report", description: "Write up the pendulum experiment", dueDate: "2024-03-27", grade: 9, fileUrl: "", fileType: "", subject: "Physics" },
  ],
  10: [
    { id: 5, title: "Calculus Problem Set #7", description: "Integration problems", dueDate: "2024-03-25", grade: 10, fileUrl: "", fileType: "", subject: "Mathematics" },
    { id: 6, title: "Chemistry Lab Quiz", description: "Study for the lab quiz", dueDate: "2024-03-26", grade: 10, fileUrl: "", fileType: "", subject: "Chemistry" },
  ],
  11: [
    { id: 7, title: "Calculus Problem Set #7", description: "Advanced integration techniques", dueDate: "2024-03-25", grade: 11, fileUrl: "", fileType: "", subject: "Mathematics" },
    { id: 8, title: "Physics Lab Report", description: "Write up the circuit experiment", dueDate: "2024-03-27", grade: 11, fileUrl: "", fileType: "", subject: "Physics" },
    { id: 9, title: "Essay: Shakespeare Analysis", description: "Write 500 words on Hamlet", dueDate: "2024-03-28", grade: 11, fileUrl: "", fileType: "", subject: "English" },
  ],
  12: [
    { id: 10, title: "AP Calculus Practice Exam", description: "Complete practice exam", dueDate: "2024-03-22", grade: 12, fileUrl: "", fileType: "", subject: "Mathematics" },
    { id: 11, title: "Physics Research Paper", description: "Submit research paper", dueDate: "2024-03-25", grade: 12, fileUrl: "", fileType: "", subject: "Physics" },
  ],
};

const testsByGrade: Record<number, Test[]> = {
  8: [
    { id: 1, title: "Mathematics Quiz", description: "Covers Chapter 5 topics", dueDate: "2024-03-28", grade: 8, questions: [
      { id: 1, text: "What is 15 + 27?", type: "mcq", options: ["42", "41", "43", "40"], correctAnswer: "42" },
      { id: 2, text: "The square root of 144 is 12.", type: "truefalse", correctAnswer: "True" },
      { id: 3, text: "What is 8 × 7?", type: "mcq", options: ["54", "56", "58", "52"], correctAnswer: "56" },
    ], published: true, timeLimit: 15 },
  ],
  9: [
    { id: 2, title: "Physics Quiz", description: "Covers motion and forces", dueDate: "2024-03-27", grade: 9, questions: [
      { id: 1, text: "What is Newton's first law also known as?", type: "mcq", options: ["Law of Acceleration", "Law of Inertia", "Law of Action", "Law of Gravity"], correctAnswer: "Law of Inertia" },
      { id: 2, text: "Force equals mass times acceleration.", type: "truefalse", correctAnswer: "True" },
    ], published: true, timeLimit: 10 },
  ],
  10: [
    { id: 3, title: "Chemistry Quiz", description: "Covers periodic table", dueDate: "2024-03-26", grade: 10, questions: [
      { id: 1, text: "What is the atomic number of Carbon?", type: "mcq", options: ["4", "6", "8", "12"], correctAnswer: "6" },
      { id: 2, text: "Noble gases are reactive.", type: "truefalse", correctAnswer: "False" },
    ], published: true, timeLimit: 10 },
  ],
  11: [
    { id: 4, title: "Calculus Mid-term", description: "Covers derivatives and integrals", dueDate: "2024-03-30", grade: 11, questions: [
      { id: 1, text: "What is the derivative of x²?", type: "mcq", options: ["x", "2x", "2", "x²"], correctAnswer: "2x" },
      { id: 2, text: "The integral of 2x is x² + C.", type: "truefalse", correctAnswer: "True" },
      { id: 3, text: "What is d/dx(sin x)?", type: "mcq", options: ["cos x", "-cos x", "-sin x", "sin x"], correctAnswer: "cos x" },
    ], published: true, timeLimit: 20 },
  ],
  12: [
    { id: 5, title: "AP Physics Practice", description: "Covers all AP topics", dueDate: "2024-03-25", grade: 12, questions: [
      { id: 1, text: "What is the speed of light?", type: "mcq", options: ["3×10⁶ m/s", "3×10⁸ m/s", "3×10⁷ m/s", "3×10⁹ m/s"], correctAnswer: "3×10⁸ m/s" },
    ], published: true, timeLimit: 15 },
  ],
};

const examTimetableByGrade: Record<number, { date: string; exam: string; time: string; venue: string; fileUrl?: string }[]> = {
  8: [
    { date: "2024-04-15", exam: "Mathematics", time: "09:00 - 11:00", venue: "Hall A" },
    { date: "2024-04-16", exam: "English", time: "09:00 - 11:00", venue: "Hall B" },
  ],
  9: [
    { date: "2024-04-15", exam: "Mathematics", time: "09:00 - 11:00", venue: "Hall A" },
    { date: "2024-04-16", exam: "Physics", time: "09:00 - 11:00", venue: "Lab 1" },
  ],
  10: [
    { date: "2024-04-15", exam: "Mathematics", time: "09:00 - 11:00", venue: "Hall A" },
    { date: "2024-04-16", exam: "Chemistry", time: "09:00 - 11:00", venue: "Lab 2" },
  ],
  11: [
    { date: "2024-04-15", exam: "Mathematics", time: "09:00 - 12:00", venue: "Hall A" },
    { date: "2024-04-16", exam: "Physics", time: "09:00 - 12:00", venue: "Lab 1" },
    { date: "2024-04-17", exam: "English Literature", time: "09:00 - 11:30", venue: "Hall B" },
  ],
  12: [
    { date: "2024-04-15", exam: "AP Calculus", time: "08:00 - 11:00", venue: "Hall A" },
    { date: "2024-04-16", exam: "AP Physics", time: "08:00 - 11:00", venue: "Lab 1" },
    { date: "2024-04-17", exam: "AP Chemistry", time: "08:00 - 11:00", venue: "Lab 2" },
  ],
};

const weeklyTimetableByGrade: Record<number, { day: string; time: string; subject: string }[]> = {
  8: [
    { day: "Monday", time: "08:00 - 09:00", subject: "Mathematics" },
    { day: "Monday", time: "09:00 - 10:00", subject: "Science" },
    { day: "Tuesday", time: "08:00 - 09:00", subject: "English" },
    { day: "Wednesday", time: "08:00 - 09:00", subject: "Mathematics" },
    { day: "Thursday", time: "09:00 - 10:00", subject: "History" },
    { day: "Friday", time: "08:00 - 09:00", subject: "Science" },
  ],
  9: [
    { day: "Monday", time: "08:00 - 09:00", subject: "Mathematics" },
    { day: "Monday", time: "10:00 - 11:00", subject: "Physics" },
    { day: "Tuesday", time: "08:00 - 09:00", subject: "English" },
    { day: "Wednesday", time: "09:00 - 10:00", subject: "Chemistry" },
    { day: "Thursday", time: "08:00 - 09:00", subject: "Mathematics" },
    { day: "Friday", time: "10:00 - 11:00", subject: "Physics" },
  ],
  10: [
    { day: "Monday", time: "08:00 - 09:00", subject: "Mathematics" },
    { day: "Monday", time: "09:00 - 10:00", subject: "Chemistry" },
    { day: "Tuesday", time: "08:00 - 09:00", subject: "English" },
    { day: "Wednesday", time: "08:00 - 09:00", subject: "Physics" },
    { day: "Thursday", time: "09:00 - 10:00", subject: "Chemistry" },
    { day: "Friday", time: "08:00 - 09:00", subject: "Mathematics" },
  ],
  11: [
    { day: "Monday", time: "08:00 - 09:30", subject: "Mathematics" },
    { day: "Monday", time: "10:00 - 11:30", subject: "Physics" },
    { day: "Tuesday", time: "08:00 - 09:30", subject: "Chemistry" },
    { day: "Wednesday", time: "08:00 - 09:30", subject: "Mathematics" },
    { day: "Thursday", time: "09:00 - 10:30", subject: "English Literature" },
    { day: "Friday", time: "08:00 - 09:30", subject: "Physics" },
  ],
  12: [
    { day: "Monday", time: "08:00 - 10:00", subject: "AP Calculus" },
    { day: "Tuesday", time: "08:00 - 10:00", subject: "AP Physics" },
    { day: "Wednesday", time: "08:00 - 10:00", subject: "AP Chemistry" },
    { day: "Thursday", time: "08:00 - 10:00", subject: "English Literature" },
    { day: "Friday", time: "08:00 - 10:00", subject: "AP Calculus" },
  ],
};

const studyMaterialsByGrade: Record<number, StudyMaterial[]> = {
  8: [
    { id: 1, title: "Math Basics Guide", subject: "Mathematics", description: "Basic math formulas and concepts", fileUrl: "", fileType: "pdf" },
    { id: 2, title: "Science Experiment Guide", subject: "Science", description: "How to conduct experiments", fileUrl: "", fileType: "pdf" },
  ],
  9: [
    { id: 3, title: "Algebra Cheat Sheet", subject: "Mathematics", description: "Key algebra formulas", fileUrl: "", fileType: "pdf" },
    { id: 4, title: "Physics Formula Sheet", subject: "Physics", description: "Motion and force formulas", fileUrl: "", fileType: "pdf" },
  ],
  10: [
    { id: 5, title: "Trigonometry Notes", subject: "Mathematics", description: "Complete trig guide", fileUrl: "", fileType: "pdf" },
    { id: 6, title: "Periodic Table", subject: "Chemistry", description: "Full periodic table with properties", fileUrl: "", fileType: "pdf" },
  ],
  11: [
    { id: 7, title: "Calculus Quick Reference", subject: "Mathematics", description: "Derivatives and integrals", fileUrl: "", fileType: "pdf" },
    { id: 8, title: "Physics MCAT Prep", subject: "Physics", description: "Practice problems", fileUrl: "", fileType: "pdf" },
  ],
  12: [
    { id: 9, title: "AP Calculus Review", subject: "Mathematics", description: "Full AP review guide", fileUrl: "", fileType: "pdf" },
    { id: 10, title: "AP Physics Formula Sheet", subject: "Physics", description: "All formulas needed", fileUrl: "", fileType: "pdf" },
  ],
};

const coursesByGrade: Record<number, Array<{name: string, teacher: string, grade: string, progress: number, testScores: number[]}>> = {
  8: [
    { name: "Mathematics", teacher: "Ms. Anna Williams", grade: "A", progress: 92, testScores: [88, 92, 95] },
    { name: "Science", teacher: "Mrs. Emily Roberts", grade: "A-", progress: 88, testScores: [85, 88, 90] },
    { name: "English", teacher: "Mr. David Park", grade: "A", progress: 94, testScores: [92, 94, 96] },
    { name: "History", teacher: "Dr. Sarah Mitchell", grade: "B+", progress: 85, testScores: [82, 85, 88] },
  ],
  9: [
    { name: "Mathematics", teacher: "Mrs. Emily Roberts", grade: "B+", progress: 82, testScores: [78, 82, 85] },
    { name: "Physics", teacher: "Dr. James Chen", grade: "B", progress: 78, testScores: [75, 78, 80] },
    { name: "English", teacher: "Mr. David Park", grade: "A-", progress: 90, testScores: [88, 90, 92] },
    { name: "Chemistry", teacher: "Mrs. Emily Roberts", grade: "B+", progress: 84, testScores: [82, 84, 86] },
  ],
  10: [
    { name: "Mathematics", teacher: "Dr. Sarah Mitchell", grade: "A-", progress: 88, testScores: [85, 88, 90] },
    { name: "Physics", teacher: "Dr. James Chen", grade: "A", progress: 92, testScores: [90, 92, 94] },
    { name: "English", teacher: "Mr. David Park", grade: "A", progress: 95, testScores: [93, 95, 97] },
    { name: "Chemistry", teacher: "Mrs. Emily Roberts", grade: "B+", progress: 86, testScores: [84, 86, 88] },
  ],
  11: [
    { name: "Mathematics", teacher: "Dr. Sarah Mitchell", grade: "A", progress: 92, testScores: [90, 92, 94] },
    { name: "Physics", teacher: "Dr. James Chen", grade: "A-", progress: 88, testScores: [86, 88, 90] },
    { name: "Chemistry", teacher: "Mrs. Emily Roberts", grade: "B+", progress: 85, testScores: [83, 85, 87] },
    { name: "English Literature", teacher: "Mr. David Park", grade: "A", progress: 94, testScores: [92, 94, 96] },
  ],
  12: [
    { name: "Advanced Mathematics", teacher: "Dr. Sarah Mitchell", grade: "A", progress: 95, testScores: [93, 95, 97] },
    { name: "Advanced Physics", teacher: "Dr. James Chen", grade: "A", progress: 93, testScores: [91, 93, 95] },
    { name: "Advanced Chemistry", teacher: "Mrs. Emily Roberts", grade: "A-", progress: 90, testScores: [88, 90, 92] },
    { name: "English Literature", teacher: "Mr. David Park", grade: "A", progress: 96, testScores: [94, 96, 98] },
  ],
};

const navItems = [
  { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Dashboard" },
  { icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", label: "Homework" },
  { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01", label: "Online Tests" },
  { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", label: "Exam Timetable" },
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Weekly Timetable" },
  { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", label: "Study Materials" },
  { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "My Progress" },
];

export default function StudentPortal() {
  const router = useRouter();
  const [loggedInStudent, setLoggedInStudent] = useState<typeof studentsData[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeTest, setActiveTest] = useState<Test | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testScore, setTestScore] = useState<{ correct: number; total: number } | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const student = localStorage.getItem("loggedInStudent");
    if (!student) {
      router.push("/login");
      return;
    }
    setLoggedInStudent(JSON.parse(student));
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInStudent");
    router.push("/");
  };

  const handleSubmitTest = useCallback(() => {
    if (!activeTest) return;
    let correct = 0;
    activeTest.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    setTestScore({ correct, total: activeTest.questions.length });
    setTestSubmitted(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, [activeTest, answers]);

  useEffect(() => {
    if (!activeTest || testSubmitted || timeLeft <= 0) return;
    
    timerRef.current = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, activeTest, testSubmitted]);

  useEffect(() => {
    if (activeTest && timeLeft === 0 && !testSubmitted) {
      handleSubmitTest();
    }
  }, [timeLeft, activeTest, testSubmitted, handleSubmitTest]);

  if (isLoading || !loggedInStudent) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const homeworkList = homeworkByGrade[loggedInStudent.grade as keyof typeof homeworkByGrade] || [];
  const testList = testsByGrade[loggedInStudent.grade as keyof typeof testsByGrade] || [];
  const examTimetable = examTimetableByGrade[loggedInStudent.grade as keyof typeof examTimetableByGrade] || [];
  const weeklyTimetable = weeklyTimetableByGrade[loggedInStudent.grade as keyof typeof weeklyTimetableByGrade] || [];
  const studyMaterials = studyMaterialsByGrade[loggedInStudent.grade as keyof typeof studyMaterialsByGrade] || [];
  const courses = coursesByGrade[loggedInStudent.grade as keyof typeof coursesByGrade] || [];

  const gpaValues: Record<string, string> = {
    "A": "4.0", "A-": "3.7", "B+": "3.3", "B": "3.0", "B-": "2.7", "C+": "2.3", "C": "2.0"
  };

  const avgGrade = courses.length > 0 
    ? courses.reduce((acc, c) => acc + (gpaValues[c.grade] ? parseFloat(gpaValues[c.grade]) : 0), 0) / courses.length
    : 0;
  const gpa = avgGrade.toFixed(1);

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const startTest = (test: Test) => {
    setActiveTest(test);
    setCurrentQuestion(0);
    setAnswers({});
    setTestSubmitted(false);
    setTestScore(null);
    setTimeLeft(test.timeLimit * 60);
  };

  const renderDashboard = () => (
    <>
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
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#3B82F620' }}>
              <svg className="w-6 h-6" style={{ color: '#3B82F6' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{gpa}</p>
          <p className="text-slate-400 text-sm">GPA</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#10B98120' }}>
              <svg className="w-6 h-6" style={{ color: '#10B981' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">96%</p>
          <p className="text-slate-400 text-sm">Attendance</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#A855F720' }}>
              <svg className="w-6 h-6" style={{ color: '#A855F7' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{loggedInStudent.grade}</p>
          <p className="text-slate-400 text-sm">Grade</p>
        </div>
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
          <h2 className="text-xl font-semibold text-white mb-6 font-['Outfit']">Upcoming Homework</h2>
          <div className="space-y-3">
            {homeworkList.slice(0, 4).map((hw) => (
              <div key={hw.id} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">{hw.title}</h3>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                    {hw.subject}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <p className="text-slate-400">{hw.subject}</p>
                  <p className="text-slate-500">Due: {hw.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderHomework = () => (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-['Outfit']">Homework & Assignments</h1>
        <p className="text-slate-400 mt-1">View and download your homework assignments</p>
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
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">{hw.subject}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{hw.title}</h3>
            <p className="text-slate-400 text-sm mb-4">{hw.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Due: {hw.dueDate}</span>
              <button className="text-blue-400 hover:text-blue-300">Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTests = () => {
    if (activeTest) {
      const question = activeTest.questions[currentQuestion];
      const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
      };

      if (testSubmitted && testScore) {
        return (
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center">
            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: testScore.correct >= testScore.total / 2 ? '#10B98120' : '#EF444420' }}>
              <svg className="w-10 h-10" style={{ color: testScore.correct >= testScore.total / 2 ? '#10B981' : '#EF4444' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={testScore.correct >= testScore.total / 2 ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"} />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Test Completed!</h2>
            <p className="text-slate-400 mb-6">You scored {testScore.correct} out of {testScore.total}</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setActiveTest(null)} className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Back to Tests
              </button>
            </div>
          </div>
        );
      }

      return (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">{activeTest.title}</h1>
              <p className="text-slate-400">Question {currentQuestion + 1} of {activeTest.questions.length}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-xl ${timeLeft < 60 ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white'}`}>
                Time: {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 mb-6">
            <p className="text-lg text-white mb-6">{question.text}</p>
            <div className="space-y-3">
              {question.type === "mcq" && question.options?.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setAnswers({ ...answers, [question.id]: opt })}
                  className={`w-full p-4 rounded-xl text-left transition-colors ${
                    answers[question.id] === opt
                      ? "bg-blue-500/20 border-2 border-blue-500 text-white"
                      : "bg-white/5 border-2 border-transparent text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {opt}
                </button>
              ))}
              {question.type === "truefalse" && (
                <>
                  <button
                    onClick={() => setAnswers({ ...answers, [question.id]: "True" })}
                    className={`w-full p-4 rounded-xl text-center transition-colors ${
                      answers[question.id] === "True"
                        ? "bg-blue-500/20 border-2 border-blue-500 text-white"
                        : "bg-white/5 border-2 border-transparent text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    True
                  </button>
                  <button
                    onClick={() => setAnswers({ ...answers, [question.id]: "False" })}
                    className={`w-full p-4 rounded-xl text-center transition-colors ${
                      answers[question.id] === "False"
                        ? "bg-blue-500/20 border-2 border-blue-500 text-white"
                        : "bg-white/5 border-2 border-transparent text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    False
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {currentQuestion === activeTest.questions.length - 1 ? (
              <button
                onClick={handleSubmitTest}
                className="px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(Math.min(activeTest.questions.length - 1, currentQuestion + 1))}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white font-['Outfit']">Online Tests</h1>
          <p className="text-slate-400 mt-1">Take your tests and get immediate feedback</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testList.map((test) => (
            <div key={test.id} className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300">{test.timeLimit} min</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{test.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{test.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Due: {test.dueDate}</span>
                <button onClick={() => startTest(test)} className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors">
                  Start Test
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderExamTimetable = () => (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-['Outfit']">Exam Timetable</h1>
        <p className="text-slate-400 mt-1">View and download your exam schedule</p>
      </div>

      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 mb-6">
        <div className="flex justify-end mb-4">
          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Timetable
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 text-slate-400 font-medium">Date</th>
                <th className="text-left py-4 px-4 text-slate-400 font-medium">Exam</th>
                <th className="text-left py-4 px-4 text-slate-400 font-medium">Time</th>
                <th className="text-left py-4 px-4 text-slate-400 font-medium">Venue</th>
              </tr>
            </thead>
            <tbody>
              {examTimetable.map((exam, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-4 px-4 text-white">{exam.date}</td>
                  <td className="py-4 px-4 text-white font-medium">{exam.exam}</td>
                  <td className="py-4 px-4 text-slate-300">{exam.time}</td>
                  <td className="py-4 px-4 text-slate-300">{exam.venue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderWeeklyTimetable = () => (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-['Outfit']">Weekly Timetable</h1>
        <p className="text-slate-400 mt-1">View and download your weekly class schedule</p>
      </div>

      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 mb-6">
        <div className="flex justify-end mb-4">
          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Timetable
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
            <div key={day} className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4 text-center pb-2 border-b border-white/10">{day}</h3>
              <div className="space-y-2">
                {weeklyTimetable.filter(t => t.day === day).map((t, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5">
                    <p className="text-white text-sm font-medium">{t.subject}</p>
                    <p className="text-slate-400 text-xs">{t.time}</p>
                  </div>
                ))}
                {weeklyTimetable.filter(t => t.day === day).length === 0 && (
                  <p className="text-slate-500 text-sm text-center py-4">No classes</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStudyMaterials = () => (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-['Outfit']">Study Materials</h1>
        <p className="text-slate-400 mt-1">Access your study guides and materials</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyMaterials.map((material) => (
          <div key={material.id} className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300">{material.subject}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{material.title}</h3>
            <p className="text-slate-400 text-sm mb-4">{material.description}</p>
            <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProgress = () => {
    const totalTests = courses.reduce((acc, c) => acc + c.testScores.length, 0);
    const avgScore = courses.length > 0 
      ? courses.reduce((acc, c) => acc + c.testScores.reduce((a, b) => a + b, 0) / c.testScores.length, 0) / courses.length
      : 0;

    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white font-['Outfit']">My Progress</h1>
          <p className="text-slate-400 mt-1">Track your academic performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <p className="text-3xl font-bold text-white mb-1">{gpa}</p>
            <p className="text-slate-400 text-sm">Overall GPA</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <p className="text-3xl font-bold text-white mb-1">{avgScore.toFixed(0)}%</p>
            <p className="text-slate-400 text-sm">Average Score</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <p className="text-3xl font-bold text-white mb-1">{totalTests}</p>
            <p className="text-slate-400 text-sm">Tests Completed</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6">Course Performance</h2>
          <div className="space-y-6">
            {courses.map((course) => (
              <div key={course.name}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-white font-medium">{course.name}</h3>
                    <p className="text-slate-400 text-sm">{course.teacher}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{course.grade}</p>
                    <p className="text-slate-400 text-sm">{course.progress}%</p>
                  </div>
                </div>
                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${course.progress}%`, background: 'linear-gradient(90deg, #3B82F6, #60A5FA)' }} />
                </div>
                <div className="flex gap-2 mt-2">
                  {course.testScores.map((score, idx) => (
                    <div key={idx} className="flex-1 p-2 rounded-lg bg-white/5 text-center">
                      <p className="text-white text-sm font-medium">{score}%</p>
                      <p className="text-slate-500 text-xs">Test {idx + 1}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
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
            <h1 className="text-3xl font-bold text-white font-['Outfit']">{navItems.find(n => n.label.toLowerCase() === activeTab)?.label || 'Dashboard'}</h1>
            <p className="text-slate-400 mt-1">Welcome back, {loggedInStudent.name.split(" ")[0]}!</p>
          </div>
        </div>

        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "homework" && renderHomework()}
        {activeTab === "online tests" && renderTests()}
        {activeTab === "exam timetable" && renderExamTimetable()}
        {activeTab === "weekly timetable" && renderWeeklyTimetable()}
        {activeTab === "study materials" && renderStudyMaterials()}
        {activeTab === "my progress" && renderProgress()}
      </main>
    </div>
  );
}
