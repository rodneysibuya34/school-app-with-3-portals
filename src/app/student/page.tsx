"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const studentsData = [
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
  subject: string;
}

interface Test {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  grade: number;
  questions: { id: number; text: string; type: string; options?: string[]; correctAnswer: string }[];
  published: boolean;
  timeLimit: number;
}

interface StudyMaterial {
  id: number;
  title: string;
  subject: string;
  description: string;
  fileUrl: string;
  fileType: string;
  grade: number;
}

const homeworkByGrade: Record<number, Homework[]> = {
  8: [
    { id: 1, title: "Algebra Exercises", description: "Complete exercises 1-20 from Chapter 4", dueDate: "2026-04-02", grade: 8, fileUrl: "", fileType: "", subject: "Mathematics" },
    { id: 2, title: "Natural Sciences Project", description: "Research renewable energy sources", dueDate: "2026-04-05", grade: 8, fileUrl: "", fileType: "", subject: "Natural Sciences" },
  ],
  9: [
    { id: 3, title: "Economic Management Sciences", description: "Complete budget exercise", dueDate: "2026-04-02", grade: 9, fileUrl: "", fileType: "", subject: "EMS" },
    { id: 4, title: "Geography Map Work", description: "Complete the topographic map exercise", dueDate: "2026-04-04", grade: 9, fileUrl: "", fileType: "", subject: "Geography" },
  ],
  10: [
    { id: 5, title: "Physics Practical", description: "Write up the pendulum experiment", dueDate: "2026-04-03", grade: 10, fileUrl: "", fileType: "", subject: "Physical Sciences" },
    { id: 6, title: "Life Sciences Essay", description: "Write about cell division", dueDate: "2026-04-06", grade: 10, fileUrl: "", fileType: "", subject: "Life Sciences" },
  ],
  11: [
    { id: 7, title: "Mathematics Functions", description: "Complete exercise on inverse functions", dueDate: "2026-04-02", grade: 11, fileUrl: "", fileType: "", subject: "Mathematics" },
    { id: 8, title: "Accounting Transactions", description: "Record the transactions in the general journal", dueDate: "2026-04-04", grade: 11, fileUrl: "", fileType: "", subject: "Accounting" },
    { id: 9, title: "History Source Analysis", description: "Analyze the provided primary source", dueDate: "2026-04-07", grade: 11, fileUrl: "", fileType: "", subject: "History" },
  ],
  12: [
    { id: 10, title: "Mathematics Paper 1 Prep", description: "Practice past exam papers", dueDate: "2026-04-02", grade: 12, fileUrl: "", fileType: "", subject: "Mathematics" },
    { id: 11, title: "Physical Sciences Experiment", description: "Conduct the titration experiment", dueDate: "2026-04-05", grade: 12, fileUrl: "", fileType: "", subject: "Physical Sciences" },
    { id: 12, title: "Business Studies Case Study", description: "Analyse the case study and answer questions", dueDate: "2026-04-08", grade: 12, fileUrl: "", fileType: "", subject: "Business Studies" },
  ],
};

const testsByGrade: Record<number, Test[]> = {
  8: [{ id: 1, title: "Mathematics Test", description: "Covers Algebra and Geometry", dueDate: "2026-04-10", grade: 8, questions: [], published: true, timeLimit: 60 }],
  9: [{ id: 2, title: "Geography Test", description: "Map work and climate", dueDate: "2026-04-12", grade: 9, questions: [], published: true, timeLimit: 45 }],
  10: [{ id: 3, title: "Physical Sciences Test", description: "Newton's Laws and matter", dueDate: "2026-04-11", grade: 10, questions: [], published: true, timeLimit: 60 }],
  11: [{ id: 4, title: "Mathematics Test", description: "Functions and calculus", dueDate: "2026-04-14", grade: 11, questions: [], published: true, timeLimit: 90 }],
  12: [{ id: 5, title: "Final Exam Preparation", description: "Covers all topics", dueDate: "2026-04-15", grade: 12, questions: [], published: true, timeLimit: 120 }],
};

const examTimetableByGrade: Record<number, { date: string; exam: string; time: string; venue: string }[]> = {
  8: [
    { date: "2026-06-15", exam: "Mathematics", time: "09:00 - 11:00", venue: "Hall A" },
    { date: "2026-06-16", exam: "English Home Language", time: "09:00 - 11:00", venue: "Hall B" },
  ],
  9: [
    { date: "2026-06-15", exam: "Mathematics", time: "09:00 - 11:00", venue: "Hall A" },
    { date: "2026-06-16", exam: "Natural Sciences", time: "09:00 - 11:00", venue: "Lab 1" },
  ],
  10: [
    { date: "2026-06-15", exam: "Mathematics", time: "09:00 - 11:00", venue: "Hall A" },
    { date: "2026-06-16", exam: "Physical Sciences", time: "09:00 - 11:00", venue: "Lab 1" },
    { date: "2026-06-17", exam: "Life Sciences", time: "09:00 - 11:00", venue: "Hall B" },
  ],
  11: [
    { date: "2026-06-15", exam: "Mathematics", time: "09:00 - 12:00", venue: "Hall A" },
    { date: "2026-06-16", exam: "Physical Sciences", time: "09:00 - 12:00", venue: "Lab 1" },
    { date: "2026-06-17", exam: "English Home Language", time: "09:00 - 11:30", venue: "Hall B" },
    { date: "2026-06-18", exam: "Life Sciences", time: "09:00 - 11:00", venue: "Hall A" },
  ],
  12: [
    { date: "2026-06-15", exam: "Mathematics", time: "08:00 - 11:00", venue: "Hall A" },
    { date: "2026-06-16", exam: "Physical Sciences", time: "08:00 - 11:00", venue: "Lab 1" },
    { date: "2026-06-17", exam: "English Home Language", time: "08:00 - 11:00", venue: "Hall B" },
    { date: "2026-06-18", exam: "Accounting/Business Studies", time: "08:00 - 11:00", venue: "Hall A" },
    { date: "2026-06-19", exam: "Geography/History", time: "08:00 - 11:00", venue: "Hall B" },
  ],
};

const weeklyTimetableByGrade: Record<number, { day: string; time: string; subject: string }[]> = {
  8: [
    { day: "Monday", time: "08:00 - 09:00", subject: "Mathematics" },
    { day: "Monday", time: "09:00 - 10:00", subject: "Natural Sciences" },
    { day: "Tuesday", time: "08:00 - 09:00", subject: "English Home Language" },
    { day: "Wednesday", time: "08:00 - 09:00", subject: "Mathematics" },
    { day: "Thursday", time: "09:00 - 10:00", subject: "Geography" },
    { day: "Friday", time: "08:00 - 09:00", subject: "History" },
  ],
  9: [
    { day: "Monday", time: "08:00 - 09:00", subject: "Mathematics" },
    { day: "Monday", time: "10:00 - 11:00", subject: "Natural Sciences" },
    { day: "Tuesday", time: "08:00 - 09:00", subject: "English Home Language" },
    { day: "Wednesday", time: "09:00 - 10:00", subject: "Technology" },
    { day: "Thursday", time: "08:00 - 09:00", subject: "Mathematics" },
    { day: "Friday", time: "10:00 - 11:00", subject: "Geography" },
  ],
  10: [
    { day: "Monday", time: "08:00 - 09:00", subject: "Mathematics" },
    { day: "Monday", time: "09:00 - 10:00", subject: "Physical Sciences" },
    { day: "Tuesday", time: "08:00 - 09:00", subject: "English Home Language" },
    { day: "Wednesday", time: "08:00 - 09:00", subject: "Life Sciences" },
    { day: "Thursday", time: "09:00 - 10:00", subject: "Geography" },
    { day: "Friday", time: "08:00 - 09:00", subject: "Mathematics" },
  ],
  11: [
    { day: "Monday", time: "08:00 - 09:30", subject: "Mathematics" },
    { day: "Monday", time: "10:00 - 11:30", subject: "Physical Sciences" },
    { day: "Tuesday", time: "08:00 - 09:30", subject: "English Home Language" },
    { day: "Wednesday", time: "08:00 - 09:30", subject: "Life Sciences" },
    { day: "Thursday", time: "09:00 - 10:30", subject: "Afrikaans First Add" },
    { day: "Friday", time: "08:00 - 09:30", subject: "History" },
  ],
  12: [
    { day: "Monday", time: "08:00 - 10:00", subject: "Mathematics" },
    { day: "Tuesday", time: "08:00 - 10:00", subject: "Physical Sciences" },
    { day: "Wednesday", time: "08:00 - 10:00", subject: "English Home Language" },
    { day: "Thursday", time: "08:00 - 10:00", subject: "Accounting" },
    { day: "Friday", time: "08:00 - 10:00", subject: "Geography" },
  ],
};

const studyMaterialsByGrade: Record<number, StudyMaterial[]> = {
  8: [
    { id: 1, title: "Mathematics Basics", subject: "Mathematics", description: "Basic math formulas and concepts", fileUrl: "", fileType: "application/pdf", grade: 8 },
    { id: 2, title: "Natural Sciences Guide", subject: "Natural Sciences", description: "Physics and Chemistry fundamentals", fileUrl: "", fileType: "application/pdf", grade: 8 },
  ],
  9: [
    { id: 3, title: "Algebra Workbook", subject: "Mathematics", description: "Algebra exercises and answers", fileUrl: "", fileType: "application/pdf", grade: 9 },
    { id: 4, title: "Geography Map Skills", subject: "Geography", description: "Map reading and interpretation", fileUrl: "", fileType: "application/pdf", grade: 9 },
  ],
  10: [
    { id: 5, title: "Trigonometry Notes", subject: "Mathematics", description: "Complete trig formulas", fileUrl: "", fileType: "application/pdf", grade: 10 },
    { id: 6, title: "Physics Formula Sheet", subject: "Physical Sciences", description: "Mechanics and waves formulas", fileUrl: "", fileType: "application/pdf", grade: 10 },
  ],
  11: [
    { id: 7, title: "Calculus Quick Reference", subject: "Mathematics", description: "Derivatives and integrals", fileUrl: "", fileType: "application/pdf", grade: 11 },
    { id: 8, title: "Chemistry Periodic Table", subject: "Physical Sciences", description: "Full periodic table with properties", fileUrl: "", fileType: "application/pdf", grade: 11 },
  ],
  12: [
    { id: 9, title: "Mathematics Paper 1 Checklist", subject: "Mathematics", description: "All topics for final exam", fileUrl: "", fileType: "application/pdf", grade: 12 },
    { id: 10, title: "Physics Past Papers", subject: "Physical Sciences", description: "Grade 12 practice papers", fileUrl: "", fileType: "application/pdf", grade: 12 },
  ],
};

const coursesByGrade: Record<number, { name: string; teacher: string; grade: string; progress: number }[]> = {
  8: [
    { name: "Mathematics", teacher: "Ms. Anna Williams", grade: "A", progress: 92 },
    { name: "Natural Sciences", teacher: "Mr. David Park", grade: "A-", progress: 88 },
    { name: "English Home Language", teacher: "Mrs. Emily Roberts", grade: "A", progress: 94 },
    { name: "Geography", teacher: "Dr. James Chen", grade: "B+", progress: 85 },
  ],
  9: [
    { name: "Mathematics", teacher: "Mrs. Emily Roberts", grade: "B+", progress: 82 },
    { name: "Natural Sciences", teacher: "Mr. David Park", grade: "B", progress: 78 },
    { name: "English Home Language", teacher: "Dr. Sarah Mitchell", grade: "A-", progress: 90 },
    { name: "Geography", teacher: "Dr. James Chen", grade: "B+", progress: 84 },
  ],
  10: [
    { name: "Mathematics", teacher: "Dr. Sarah Mitchell", grade: "A-", progress: 88 },
    { name: "Physical Sciences", teacher: "Dr. James Chen", grade: "A", progress: 92 },
    { name: "English Home Language", teacher: "Mrs. Emily Roberts", grade: "A", progress: 95 },
    { name: "Life Sciences", teacher: "Mr. David Park", grade: "B+", progress: 86 },
  ],
  11: [
    { name: "Mathematics", teacher: "Dr. Sarah Mitchell", grade: "A", progress: 92 },
    { name: "Physical Sciences", teacher: "Dr. James Chen", grade: "A-", progress: 88 },
    { name: "English Home Language", teacher: "Mrs. Emily Roberts", grade: "A", progress: 94 },
    { name: "Life Sciences", teacher: "Mr. David Park", grade: "B+", progress: 85 },
    { name: "History", teacher: "Ms. Anna Williams", grade: "A-", progress: 89 },
  ],
  12: [
    { name: "Mathematics", teacher: "Dr. Sarah Mitchell", grade: "A", progress: 95 },
    { name: "Physical Sciences", teacher: "Dr. James Chen", grade: "A", progress: 93 },
    { name: "English Home Language", teacher: "Mrs. Emily Roberts", grade: "A-", progress: 90 },
    { name: "Accounting", teacher: "Ms. Anna Williams", grade: "A", progress: 96 },
    { name: "Geography", teacher: "Mr. David Park", grade: "B+", progress: 87 },
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
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeTest, setActiveTest] = useState<Test | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testScore, setTestScore] = useState<{ correct: number; total: number } | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [homeworkList, setHomeworkList] = useState<Homework[]>([]);
  const [testList, setTestList] = useState<Test[]>([]);
  const [examTimetableList, setExamTimetableList] = useState<{ date: string; exam: string; time: string; venue: string; grade: number }[]>([]);
  const [weeklyTimetableList, setWeeklyTimetableList] = useState<{ day: string; time: string; subject: string; grade: number }[]>([]);
  const [studyMaterialsList, setStudyMaterialsList] = useState<StudyMaterial[]>([]);
  const [coursesList, setCoursesList] = useState<{ name: string; teacher: string; grade: string; progress: number }[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const student = localStorage.getItem("loggedInStudent");
    if (!student) {
      router.push("/login");
      return;
    }
    setLoggedInStudent(JSON.parse(student));

    const storedHomework = localStorage.getItem("homeworkData");
    if (storedHomework) setHomeworkList(JSON.parse(storedHomework));
    
    const storedTests = localStorage.getItem("testData");
    if (storedTests) setTestList(JSON.parse(storedTests));

    const storedExamTimetable = localStorage.getItem("examTimetableData");
    if (storedExamTimetable) setExamTimetableList(JSON.parse(storedExamTimetable));

    const storedWeeklyTimetable = localStorage.getItem("weeklyTimetableData");
    if (storedWeeklyTimetable) setWeeklyTimetableList(JSON.parse(storedWeeklyTimetable));

    const storedStudyMaterials = localStorage.getItem("studyMaterialsData");
    if (storedStudyMaterials) setStudyMaterialsList(JSON.parse(storedStudyMaterials));

    const storedCourses = localStorage.getItem("coursesData");
    if (storedCourses) setCoursesList(JSON.parse(storedCourses));
  }, [router]);

  useEffect(() => {
    if (activeTest && timeLeft > 0 && !testSubmitted) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (activeTest && timeLeft === 0 && !testSubmitted) {
      handleSubmitTest();
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [timeLeft, activeTest, testSubmitted]);

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

  const allHomework = homeworkList.length > 0 ? homeworkList : homeworkByGrade[loggedInStudent.grade] || [];
  const allTests = testList.length > 0 ? testList : testsByGrade[loggedInStudent.grade] || [];
  const allExamTimetable = examTimetableList.length > 0 ? examTimetableList : (examTimetableByGrade[loggedInStudent.grade] || []).map(e => ({ ...e, grade: loggedInStudent.grade }));
  const allWeeklyTimetable = weeklyTimetableList.length > 0 ? weeklyTimetableList : (weeklyTimetableByGrade[loggedInStudent.grade] || []).map(e => ({ ...e, grade: loggedInStudent.grade }));
  const allStudyMaterials = studyMaterialsList.length > 0 ? studyMaterialsList : studyMaterialsByGrade[loggedInStudent.grade] || [];
  const allCourses = coursesList.length > 0 ? coursesList : coursesByGrade[loggedInStudent.grade] || [];

  const homework = allHomework.filter(hw => hw.grade === loggedInStudent.grade);
  const tests = allTests.filter(t => t.grade === loggedInStudent.grade);
  const examTimetable = allExamTimetable.filter(et => et.grade === loggedInStudent.grade);
  const weeklyTimetable = allWeeklyTimetable.filter(wt => wt.grade === loggedInStudent.grade);
  const studyMaterials = allStudyMaterials.filter(sm => sm.grade === loggedInStudent.grade);
  const courses = allCourses;

  const gpaValues: Record<string, string> = { "A": "4.0", "A-": "3.7", "B+": "3.3", "B": "3.0", "B-": "2.7", "C+": "2.3", "C": "2.0" };
  const avgGrade = courses.length > 0 ? courses.reduce((acc, c) => acc + (gpaValues[c.grade] ? parseFloat(gpaValues[c.grade]) : 0), 0) / courses.length : 0;
  const gpa = avgGrade.toFixed(1);

  const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").toUpperCase();

  const startTest = (test: Test) => {
    setActiveTest(test);
    setCurrentQuestion(0);
    setAnswers({});
    setTestSubmitted(false);
    setTestScore(null);
    setTimeLeft(test.timeLimit * 60);
  };

  const handleSubmitTest = () => {
    if (!activeTest) return;
    let correct = 0;
    activeTest.questions.forEach((q) => { if (answers[q.id] === q.correctAnswer) correct++; });
    setTestScore({ correct, total: activeTest.questions.length });
    setTestSubmitted(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleDownload = (fileUrl: string, fileName: string, fileType: string = 'application/pdf') => {
    if (fileUrl && fileUrl.startsWith('data:')) {
      const link = document.createElement('a');
      link.href = fileUrl;
      const ext = fileType.split('/')[1] || 'pdf';
      link.download = `${fileName}.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (fileUrl) {
      window.open(fileUrl, '_blank');
    } else {
      alert('No file available for download');
    }
  };

  const renderDashboard = () => (
    <>
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/10 border border-blue-500/20 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
            {getInitials(loggedInStudent.name)}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{loggedInStudent.name}</h2>
            <p className="text-blue-300">Grade {loggedInStudent.grade} • {loggedInStudent.school}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <p className="text-3xl font-bold text-white mb-1">{gpa}</p>
          <p className="text-slate-400 text-sm">GPA</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <p className="text-3xl font-bold text-white mb-1">96%</p>
          <p className="text-slate-400 text-sm">Attendance</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <p className="text-3xl font-bold text-white mb-1">{loggedInStudent.grade}</p>
          <p className="text-slate-400 text-sm">Grade</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6">My Courses</h2>
          {courses.map((course) => (
            <div key={course.name} className="p-4 rounded-xl bg-white/5 mb-3">
              <div className="flex justify-between mb-2">
                <h3 className="text-white font-medium">{course.name}</h3>
                <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">{course.grade}</span>
              </div>
              <p className="text-slate-400 text-sm">{course.teacher}</p>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6">Upcoming Homework</h2>
          {homework.slice(0, 4).map((hw) => (
            <div key={hw.id} className="p-4 rounded-xl bg-white/5 mb-3">
              <h3 className="text-white font-medium">{hw.title}</h3>
              <p className="text-slate-400 text-sm">Due: {hw.dueDate}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderHomework = () => (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Homework & Assignments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {homework.map((hw) => (
          <div key={hw.id} className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">{hw.title}</h3>
            <p className="text-slate-400 text-sm mb-4">{hw.description}</p>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Due: {hw.dueDate}</span>
              <button onClick={() => handleDownload(hw.fileUrl, hw.title, hw.fileType)} className="text-blue-400 hover:text-blue-300">Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTests = () => {
    if (activeTest) {
      if (testSubmitted && testScore) {
        return (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Test Completed!</h2>
            <p className="text-slate-400 mb-6">You scored {testScore.correct} out of {testScore.total}</p>
            <button onClick={() => setActiveTest(null)} className="px-6 py-3 rounded-xl bg-blue-600 text-white">Back to Tests</button>
          </div>
        );
      }
      return (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">{activeTest.title}</h1>
            <p className="text-slate-400">Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
          </div>
          <div className="flex justify-between">
            <button onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))} disabled={currentQuestion === 0} className="px-6 py-3 rounded-xl bg-white/10 text-white">Previous</button>
            <button onClick={handleSubmitTest} className="px-6 py-3 rounded-xl bg-green-600 text-white">Submit</button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h1 className="text-3xl font-bold text-white mb-6">Online Tests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tests.map((test) => (
            <div key={test.id} className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">{test.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{test.description}</p>
              <button onClick={() => startTest(test)} className="px-4 py-2 rounded-xl bg-green-600 text-white">Start Test</button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderExamTimetable = () => (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Exam Timetable</h1>
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-4 text-slate-400">Date</th>
              <th className="text-left py-4 px-4 text-slate-400">Exam</th>
              <th className="text-left py-4 px-4 text-slate-400">Time</th>
              <th className="text-left py-4 px-4 text-slate-400">Venue</th>
            </tr>
          </thead>
          <tbody>
            {examTimetable.map((exam, idx) => (
              <tr key={idx} className="border-b border-white/5">
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
  );

  const renderWeeklyTimetable = () => (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Weekly Timetable</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
          <div key={day} className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 text-center border-b border-white/10 pb-2">{day}</h3>
            {weeklyTimetable.filter(t => t.day === day).map((t, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/5 mb-2">
                <p className="text-white text-sm font-medium">{t.subject}</p>
                <p className="text-slate-400 text-xs">{t.time}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStudyMaterials = () => (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Study Materials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyMaterials.map((material) => (
          <div key={material.id} className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">{material.title}</h3>
            <p className="text-slate-400 text-sm mb-4">{material.description}</p>
            <button onClick={() => handleDownload(material.fileUrl, material.title, material.fileType)} className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProgress = () => (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">My Progress</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <p className="text-3xl font-bold text-white mb-1">{gpa}</p>
          <p className="text-slate-400 text-sm">Overall GPA</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <p className="text-3xl font-bold text-white mb-1">{courses.length}</p>
          <p className="text-slate-400 text-sm">Courses</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <p className="text-3xl font-bold text-white mb-1">{homework.length}</p>
          <p className="text-slate-400 text-sm">Homework</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      <aside className="w-72 bg-[#1E293B] border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /></svg>
            </div>
            <span className="text-xl font-semibold text-white">Geleza Mzansi</span>
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
            <button key={item.label} onClick={() => setActiveTab(item.label.toLowerCase())}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.label.toLowerCase() ? "bg-blue-500/20 text-blue-400 border-l-2 border-blue-400" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-white mb-6">{navItems.find(n => n.label.toLowerCase() === activeTab)?.label || 'Dashboard'}</h1>
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