"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import AIAssistant from "@/components/AIAssistant";
import Logo from "@/components/Logo";

interface StudentData {
  id: number;
  name: string;
  email: string;
  grade: number;
  school: string;
  username: string;
  password: string;
  schoolYear: number;
  subjects: string[];
}

const studentsData: StudentData[] = [];

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
  subject: string;
  questions: { id: number; text: string; type: string; options?: string[]; correctAnswer: string }[];
  published: boolean;
  duration?: number;
  timeLimit?: number;
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
  4: [
    { id: 1, title: "English Spelling", description: "Learn spelling words for Friday", dueDate: "2026-04-03", grade: 4, fileUrl: "", fileType: "", subject: "English Home Language" },
    { id: 2, title: "Mathematics Worksheet", description: "Complete addition and subtraction exercises", dueDate: "2026-04-02", grade: 4, fileUrl: "", fileType: "", subject: "Mathematics" },
    { id: 3, title: "Life Skills Project", description: "Draw your family tree", dueDate: "2026-04-07", grade: 4, fileUrl: "", fileType: "", subject: "Life Skills" },
    { id: 4, title: "Natural Sciences Activity", description: "Collect 5 different leaves from outside", dueDate: "2026-04-04", grade: 4, fileUrl: "", fileType: "", subject: "Natural Sciences" },
  ],
  5: [
    { id: 5, title: "Mathematics Workbook", description: "Pages 20-25 on fractions", dueDate: "2026-04-02", grade: 5, fileUrl: "", fileType: "", subject: "Mathematics" },
    { id: 6, title: "English Comprehension", description: "Read the story and answer questions", dueDate: "2026-04-04", grade: 5, fileUrl: "", fileType: "", subject: "English Home Language" },
    { id: 7, title: "Social Sciences Project", description: "Draw a map of South Africa", dueDate: "2026-04-06", grade: 5, fileUrl: "", fileType: "", subject: "Social Sciences" },
    { id: 8, title: "Afrikaans Vocabulary", description: "Learn 10 new words", dueDate: "2026-04-03", grade: 5, fileUrl: "", fileType: "", subject: "Afrikaans First Add" },
  ],
  6: [
    { id: 9, title: "Mathematics Problem Solving", description: "Word problems on decimals", dueDate: "2026-04-02", grade: 6, fileUrl: "", fileType: "", subject: "Mathematics" },
    { id: 10, title: "English Essay", description: "Write about your favourite holiday", dueDate: "2026-04-05", grade: 6, fileUrl: "", fileType: "", subject: "English Home Language" },
    { id: 11, title: "Natural Sciences Experiment", description: "Record temperature changes through the day", dueDate: "2026-04-07", grade: 6, fileUrl: "", fileType: "", subject: "Natural Sciences" },
    { id: 12, title: "Geography Map Work", description: "Label the provinces of South Africa", dueDate: "2026-04-04", grade: 6, fileUrl: "", fileType: "", subject: "Social Sciences" },
  ],
  7: [
    { id: 13, title: "Mathematics Algebra", description: "Solve simple equations", dueDate: "2026-04-02", grade: 7, fileUrl: "", fileType: "", subject: "Mathematics" },
    { id: 14, title: "English Reading Comprehension", description: "Read the passage and answer questions", dueDate: "2026-04-04", grade: 7, fileUrl: "", fileType: "", subject: "English Home Language" },
    { id: 15, title: "Natural Sciences Project", description: "Research the water cycle", dueDate: "2026-04-06", grade: 7, fileUrl: "", fileType: "", subject: "Natural Sciences" },
    { id: 16, title: "History Assignment", description: "Write about a famous South African leader", dueDate: "2026-04-08", grade: 7, fileUrl: "", fileType: "", subject: "Social Sciences" },
  ],
  8: [
    { id: 1, title: "Algebra Exercises", description: "Complete exercises 1-20 from Chapter 4", dueDate: "2026-04-02", grade: 8, fileUrl: "", fileType: "", subject: "Mathematics" },
    { id: 2, title: "Natural Sciences Project", description: "Research renewable energy sources", dueDate: "2026-04-05", grade: 8, fileUrl: "", fileType: "", subject: "Natural Sciences" },
    { id: 3, title: "Geography Map Work", description: "Complete the topographic map exercise", dueDate: "2026-04-03", grade: 8, fileUrl: "", fileType: "", subject: "Geography" },
    { id: 4, title: "History Essay", description: "Write about the Anglo-Zulu War", dueDate: "2026-04-07", grade: 8, fileUrl: "", fileType: "", subject: "History" },
  ],
  9: [
    { id: 5, title: "Economic Management Sciences", description: "Complete budget exercise", dueDate: "2026-04-02", grade: 9, fileUrl: "", fileType: "", subject: "EMS" },
    { id: 6, title: "Geography Map Work", description: "Complete the topographic map exercise", dueDate: "2026-04-04", grade: 9, fileUrl: "", fileType: "", subject: "Geography" },
    { id: 7, title: "Natural Sciences Experiment", description: "Write up the chemistry experiment", dueDate: "2026-04-06", grade: 9, fileUrl: "", fileType: "", subject: "Natural Sciences" },
    { id: 8, title: "Technology Project", description: "Design a sustainable house", dueDate: "2026-04-08", grade: 9, fileUrl: "", fileType: "", subject: "Technology" },
  ],
  10: [
    { id: 9, title: "Physics Practical", description: "Write up the pendulum experiment", dueDate: "2026-04-03", grade: 10, fileUrl: "", fileType: "", subject: "Physical Sciences" },
    { id: 10, title: "Life Sciences Essay", description: "Write about cell division", dueDate: "2026-04-06", grade: 10, fileUrl: "", fileType: "", subject: "Life Sciences" },
    { id: 11, title: "Mathematical Literacy", description: "Complete the data handling exercise", dueDate: "2026-04-02", grade: 10, fileUrl: "", fileType: "", subject: "Mathematical Literacy" },
    { id: 12, title: "Business Studies", description: "Analyze the case study", dueDate: "2026-04-05", grade: 10, fileUrl: "", fileType: "", subject: "Business Studies" },
    { id: 13, title: "History Source Analysis", description: "Analyze the provided primary source", dueDate: "2026-04-07", grade: 10, fileUrl: "", fileType: "", subject: "History" },
    { id: 14, title: "Geography Fieldwork", description: "Complete the urbanisation fieldwork", dueDate: "2026-04-09", grade: 10, fileUrl: "", fileType: "", subject: "Geography" },
  ],
  11: [
    { id: 15, title: "Mathematics Functions", description: "Complete exercise on inverse functions", dueDate: "2026-04-02", grade: 11, fileUrl: "", fileType: "", subject: "Mathematics" },
    { id: 16, title: "Accounting Transactions", description: "Record the transactions in the general journal", dueDate: "2026-04-04", grade: 11, fileUrl: "", fileType: "", subject: "Accounting" },
    { id: 17, title: "History Source Analysis", description: "Analyze the provided primary source", dueDate: "2026-04-07", grade: 11, fileUrl: "", fileType: "", subject: "History" },
    { id: 18, title: "Economics Essay", description: "Write about supply and demand", dueDate: "2026-04-03", grade: 11, fileUrl: "", fileType: "", subject: "Economics" },
    { id: 19, title: "Information Technology Project", description: "Create a database system", dueDate: "2026-04-08", grade: 11, fileUrl: "", fileType: "", subject: "Information Technology" },
  ],
  12: [
    { id: 20, title: "Mathematics Paper 1 Prep", description: "Practice past exam papers", dueDate: "2026-04-02", grade: 12, fileUrl: "", fileType: "", subject: "Mathematics" },
    { id: 21, title: "Physical Sciences Experiment", description: "Conduct the titration experiment", dueDate: "2026-04-05", grade: 12, fileUrl: "", fileType: "", subject: "Physical Sciences" },
    { id: 22, title: "Business Studies Case Study", description: "Analyse the case study and answer questions", dueDate: "2026-04-08", grade: 12, fileUrl: "", fileType: "", subject: "Business Studies" },
    { id: 23, title: "Geography Fieldwork Report", description: "Complete the rural settlement fieldwork", dueDate: "2026-04-10", grade: 12, fileUrl: "", fileType: "", subject: "Geography" },
    { id: 24, title: "Consumer Studies Practical", description: "Plan a balanced meal on a budget", dueDate: "2026-04-06", grade: 12, fileUrl: "", fileType: "", subject: "Consumer Studies" },
  ],
};

const testsByGrade: Record<number, Test[]> = {
  4: [
    { id: 1, title: "Mathematics Test", description: "Addition, subtraction, multiplication", dueDate: "2026-04-10", grade: 4, subject: "Mathematics", questions: [], published: true, timeLimit: 45 },
    { id: 2, title: "English Test", description: "Spelling and reading comprehension", dueDate: "2026-04-12", grade: 4, subject: "English Home Language", questions: [], published: true, timeLimit: 45 },
  ],
  5: [
    { id: 3, title: "Mathematics Test", description: "Fractions and data handling", dueDate: "2026-04-11", grade: 5, subject: "Mathematics", questions: [], published: true, timeLimit: 45 },
    { id: 4, title: "Natural Sciences Test", description: "Living things and habitats", dueDate: "2026-04-13", grade: 5, subject: "Natural Sciences", questions: [], published: true, timeLimit: 45 },
  ],
  6: [
    { id: 5, title: "Mathematics Test", description: "Decimals and percentages", dueDate: "2026-04-10", grade: 6, subject: "Mathematics", questions: [], published: true, timeLimit: 45 },
    { id: 6, title: "English Test", description: "Grammar and punctuation", dueDate: "2026-04-12", grade: 6, subject: "English Home Language", questions: [], published: true, timeLimit: 45 },
  ],
  7: [
    { id: 7, title: "Mathematics Test", description: "Integers and basic algebra", dueDate: "2026-04-11", grade: 7, subject: "Mathematics", questions: [], published: true, timeLimit: 45 },
    { id: 8, title: "Natural Sciences Test", description: "Matter and energy", dueDate: "2026-04-14", grade: 7, subject: "Natural Sciences", questions: [], published: true, timeLimit: 45 },
  ],
  8: [
    { id: 1, title: "Mathematics Test", description: "Covers Algebra and Geometry", dueDate: "2026-04-10", grade: 8, subject: "Mathematics", questions: [], published: true, timeLimit: 60 },
    { id: 2, title: "Natural Sciences Test", description: "Chemistry and Physics basics", dueDate: "2026-04-12", grade: 8, subject: "Natural Sciences", questions: [], published: true, timeLimit: 45 },
  ],
  9: [
    { id: 3, title: "Geography Test", description: "Map work and climate", dueDate: "2026-04-12", grade: 9, subject: "Geography", questions: [], published: true, timeLimit: 45 },
    { id: 4, title: "EMS Test", description: "Financial literacy and business", dueDate: "2026-04-11", grade: 9, subject: "EMS", questions: [], published: true, timeLimit: 45 },
  ],
  10: [
    { id: 5, title: "Physical Sciences Test", description: "Newton's Laws and matter", dueDate: "2026-04-11", grade: 10, subject: "Physical Sciences", questions: [], published: true, timeLimit: 60 },
    { id: 6, title: "Life Sciences Test", description: "Cells and photosynthesis", dueDate: "2026-04-13", grade: 10, subject: "Life Sciences", questions: [], published: true, timeLimit: 60 },
    { id: 7, title: "Mathematical Literacy Test", description: "Data handling and measurement", dueDate: "2026-04-14", grade: 10, subject: "Mathematical Literacy", questions: [], published: true, timeLimit: 60 },
  ],
  11: [
    { id: 8, title: "Mathematics Test", description: "Functions and calculus", dueDate: "2026-04-14", grade: 11, subject: "Mathematics", questions: [], published: true, timeLimit: 90 },
    { id: 9, title: "Accounting Test", description: "Financial statements", dueDate: "2026-04-15", grade: 11, subject: "Accounting", questions: [], published: true, timeLimit: 60 },
  ],
  12: [
    { id: 10, title: "Final Exam Preparation", description: "Covers all topics", dueDate: "2026-04-15", grade: 12, subject: "Mathematics", questions: [], published: true, timeLimit: 120 },
  ],
};

const examTimetableByGrade: Record<number, { date: string; exam: string; time: string; venue: string }[]> = {
  4: [
    { date: "2026-06-15", exam: "Mathematics", time: "09:00 - 10:30", venue: "Room 4A" },
    { date: "2026-06-16", exam: "English Home Language", time: "09:00 - 10:30", venue: "Room 4A" },
    { date: "2026-06-17", exam: "Afrikaans First Add", time: "09:00 - 10:30", venue: "Room 4A" },
    { date: "2026-06-18", exam: "Natural Sciences", time: "09:00 - 10:00", venue: "Room 4A" },
    { date: "2026-06-19", exam: "Life Skills", time: "09:00 - 10:00", venue: "Room 4A" },
  ],
  5: [
    { date: "2026-06-15", exam: "Mathematics", time: "09:00 - 10:30", venue: "Room 5A" },
    { date: "2026-06-16", exam: "English Home Language", time: "09:00 - 10:30", venue: "Room 5A" },
    { date: "2026-06-17", exam: "Afrikaans First Add", time: "09:00 - 10:30", venue: "Room 5A" },
    { date: "2026-06-18", exam: "Natural Sciences", time: "09:00 - 10:00", venue: "Room 5A" },
    { date: "2026-06-19", exam: "Social Sciences", time: "09:00 - 10:00", venue: "Room 5A" },
  ],
  6: [
    { date: "2026-06-15", exam: "Mathematics", time: "09:00 - 11:00", venue: "Room 6A" },
    { date: "2026-06-16", exam: "English Home Language", time: "09:00 - 11:00", venue: "Room 6A" },
    { date: "2026-06-17", exam: "Afrikaans First Add", time: "09:00 - 10:30", venue: "Room 6A" },
    { date: "2026-06-18", exam: "Natural Sciences", time: "09:00 - 10:30", venue: "Room 6A" },
    { date: "2026-06-19", exam: "Social Sciences", time: "09:00 - 10:30", venue: "Room 6A" },
  ],
  7: [
    { date: "2026-06-15", exam: "Mathematics", time: "09:00 - 11:00", venue: "Room 7A" },
    { date: "2026-06-16", exam: "English Home Language", time: "09:00 - 11:00", venue: "Room 7A" },
    { date: "2026-06-17", exam: "Afrikaans First Add", time: "09:00 - 10:30", venue: "Room 7A" },
    { date: "2026-06-18", exam: "Natural Sciences", time: "09:00 - 11:00", venue: "Lab 1" },
    { date: "2026-06-19", exam: "Social Sciences", time: "09:00 - 10:30", venue: "Room 7A" },
  ],
  8: [
    { date: "2026-06-15", exam: "Mathematics", time: "09:00 - 11:00", venue: "Hall A" },
    { date: "2026-06-16", exam: "English Home Language", time: "09:00 - 11:00", venue: "Hall B" },
    { date: "2026-06-17", exam: "Natural Sciences", time: "09:00 - 11:00", venue: "Lab 1" },
  ],
  9: [
    { date: "2026-06-15", exam: "Mathematics", time: "09:00 - 11:00", venue: "Hall A" },
    { date: "2026-06-16", exam: "English Home Language", time: "09:00 - 11:00", venue: "Hall B" },
    { date: "2026-06-17", exam: "EMS", time: "09:00 - 11:00", venue: "Hall C" },
  ],
  10: [
    { date: "2026-06-15", exam: "Mathematics/Mathematical Literacy", time: "09:00 - 11:00", venue: "Hall A" },
    { date: "2026-06-16", exam: "English Home Language", time: "09:00 - 11:00", venue: "Hall B" },
    { date: "2026-06-17", exam: "Physical Sciences/Life Sciences", time: "09:00 - 11:00", venue: "Lab 1" },
    { date: "2026-06-18", exam: "Geography/History/Business Studies", time: "09:00 - 11:00", venue: "Hall C" },
  ],
  11: [
    { date: "2026-06-15", exam: "Mathematics", time: "09:00 - 12:00", venue: "Hall A" },
    { date: "2026-06-16", exam: "English Home Language", time: "09:00 - 11:30", venue: "Hall B" },
    { date: "2026-06-17", exam: "Physical Sciences/Life Sciences", time: "09:00 - 12:00", venue: "Lab 1" },
    { date: "2026-06-18", exam: "Accounting/Business Studies/Economics", time: "09:00 - 11:00", venue: "Hall C" },
  ],
  12: [
    { date: "2026-06-15", exam: "Mathematics/Mathematical Literacy", time: "08:00 - 11:00", venue: "Hall A" },
    { date: "2026-06-16", exam: "English Home Language", time: "08:00 - 11:00", venue: "Hall B" },
    { date: "2026-06-17", exam: "Physical Sciences/Life Sciences", time: "08:00 - 11:00", venue: "Lab 1" },
    { date: "2026-06-18", exam: "Accounting/Business Studies/Economics", time: "08:00 - 11:00", venue: "Hall C" },
    { date: "2026-06-19", exam: "Geography/History/IT", time: "08:00 - 11:00", venue: "Hall D" },
  ],
};

const weeklyTimetableByGrade: Record<number, { day: string; time: string; subject: string }[]> = {
  4: [
    { day: "Monday", time: "08:00 - 08:45", subject: "Mathematics" },
    { day: "Monday", time: "08:45 - 09:30", subject: "English Home Language" },
    { day: "Monday", time: "10:00 - 10:45", subject: "Afrikaans First Add" },
    { day: "Tuesday", time: "08:00 - 08:45", subject: "English Home Language" },
    { day: "Tuesday", time: "08:45 - 09:30", subject: "Mathematics" },
    { day: "Wednesday", time: "08:00 - 08:45", subject: "Natural Sciences" },
    { day: "Wednesday", time: "08:45 - 09:30", subject: "Mathematics" },
    { day: "Thursday", time: "08:00 - 08:45", subject: "Social Sciences" },
    { day: "Thursday", time: "08:45 - 09:30", subject: "Life Skills" },
    { day: "Friday", time: "08:00 - 08:45", subject: "Mathematics" },
    { day: "Friday", time: "08:45 - 09:30", subject: "English Home Language" },
  ],
  5: [
    { day: "Monday", time: "08:00 - 08:45", subject: "English Home Language" },
    { day: "Monday", time: "08:45 - 09:30", subject: "Mathematics" },
    { day: "Monday", time: "10:00 - 10:45", subject: "Afrikaans First Add" },
    { day: "Tuesday", time: "08:00 - 08:45", subject: "Mathematics" },
    { day: "Tuesday", time: "08:45 - 09:30", subject: "Natural Sciences" },
    { day: "Wednesday", time: "08:00 - 08:45", subject: "Social Sciences" },
    { day: "Wednesday", time: "08:45 - 09:30", subject: "Mathematics" },
    { day: "Thursday", time: "08:00 - 08:45", subject: "English Home Language" },
    { day: "Thursday", time: "08:45 - 09:30", subject: "Life Skills" },
    { day: "Friday", time: "08:00 - 08:45", subject: "Mathematics" },
    { day: "Friday", time: "08:45 - 09:30", subject: "English Home Language" },
  ],
  6: [
    { day: "Monday", time: "08:00 - 09:00", subject: "Mathematics" },
    { day: "Monday", time: "09:00 - 10:00", subject: "English Home Language" },
    { day: "Monday", time: "10:30 - 11:15", subject: "Afrikaans First Add" },
    { day: "Tuesday", time: "08:00 - 09:00", subject: "English Home Language" },
    { day: "Tuesday", time: "09:00 - 10:00", subject: "Mathematics" },
    { day: "Wednesday", time: "08:00 - 09:00", subject: "Natural Sciences" },
    { day: "Wednesday", time: "09:00 - 10:00", subject: "Social Sciences" },
    { day: "Thursday", time: "08:00 - 09:00", subject: "Mathematics" },
    { day: "Thursday", time: "09:00 - 10:00", subject: "Life Skills" },
    { day: "Friday", time: "08:00 - 09:00", subject: "English Home Language" },
    { day: "Friday", time: "09:00 - 10:00", subject: "Mathematics" },
  ],
  7: [
    { day: "Monday", time: "08:00 - 09:00", subject: "Mathematics" },
    { day: "Monday", time: "09:00 - 10:00", subject: "English Home Language" },
    { day: "Monday", time: "10:30 - 11:15", subject: "Afrikaans First Add" },
    { day: "Tuesday", time: "08:00 - 09:00", subject: "Natural Sciences" },
    { day: "Tuesday", time: "09:00 - 10:00", subject: "Mathematics" },
    { day: "Wednesday", time: "08:00 - 09:00", subject: "Social Sciences" },
    { day: "Wednesday", time: "09:00 - 10:00", subject: "English Home Language" },
    { day: "Thursday", time: "08:00 - 09:00", subject: "Mathematics" },
    { day: "Thursday", time: "09:00 - 10:00", subject: "Natural Sciences" },
    { day: "Friday", time: "08:00 - 09:00", subject: "English Home Language" },
    { day: "Friday", time: "09:00 - 10:00", subject: "Life Skills" },
  ],
  8: [
    { day: "Monday", time: "08:00 - 09:00", subject: "Mathematics" },
    { day: "Monday", time: "09:00 - 10:00", subject: "English Home Language" },
    { day: "Monday", time: "10:00 - 11:00", subject: "Natural Sciences" },
    { day: "Tuesday", time: "08:00 - 09:00", subject: "Afrikaans First Add" },
    { day: "Tuesday", time: "09:00 - 10:00", subject: "Geography" },
    { day: "Wednesday", time: "08:00 - 09:00", subject: "Mathematics" },
    { day: "Wednesday", time: "09:00 - 10:00", subject: "History" },
    { day: "Thursday", time: "08:00 - 09:00", subject: "EMS" },
    { day: "Thursday", time: "09:00 - 10:00", subject: "Technology" },
    { day: "Friday", time: "08:00 - 09:00", subject: "Physical Education" },
    { day: "Friday", time: "09:00 - 10:00", subject: "Life Orientation" },
  ],
  9: [
    { day: "Monday", time: "08:00 - 09:00", subject: "Mathematics" },
    { day: "Monday", time: "09:00 - 10:00", subject: "English Home Language" },
    { day: "Monday", time: "10:00 - 11:00", subject: "Natural Sciences" },
    { day: "Tuesday", time: "08:00 - 09:00", subject: "Afrikaans First Add" },
    { day: "Tuesday", time: "09:00 - 10:00", subject: "Geography" },
    { day: "Wednesday", time: "08:00 - 09:00", subject: "EMS" },
    { day: "Wednesday", time: "09:00 - 10:00", subject: "Technology" },
    { day: "Thursday", time: "08:00 - 09:00", subject: "History" },
    { day: "Thursday", time: "09:00 - 10:00", subject: "Life Orientation" },
    { day: "Friday", time: "08:00 - 09:00", subject: "Music/Art" },
    { day: "Friday", time: "09:00 - 10:00", subject: "Physical Education" },
  ],
  10: [
    { day: "Monday", time: "08:00 - 09:00", subject: "Mathematics/Mathematical Literacy" },
    { day: "Monday", time: "09:00 - 10:00", subject: "English Home Language" },
    { day: "Monday", time: "10:00 - 11:00", subject: "Physical Sciences/Life Sciences" },
    { day: "Tuesday", time: "08:00 - 09:00", subject: "Afrikaans First Add" },
    { day: "Tuesday", time: "09:00 - 10:00", subject: "Geography/History" },
    { day: "Tuesday", time: "10:00 - 11:00", subject: "Business Studies/Economics" },
    { day: "Wednesday", time: "08:00 - 09:00", subject: "Information Technology" },
    { day: "Wednesday", time: "09:00 - 10:00", subject: "Life Orientation" },
    { day: "Thursday", time: "08:00 - 09:00", subject: "Mathematics/Mathematical Literacy" },
    { day: "Thursday", time: "09:00 - 10:00", subject: "Physical Sciences/Life Sciences" },
    { day: "Friday", time: "08:00 - 09:00", subject: "Consumer Studies" },
    { day: "Friday", time: "09:00 - 10:00", subject: "Physical Education" },
  ],
  11: [
    { day: "Monday", time: "08:00 - 09:30", subject: "Mathematics" },
    { day: "Monday", time: "09:30 - 11:00", subject: "Physical Sciences" },
    { day: "Tuesday", time: "08:00 - 09:30", subject: "English Home Language" },
    { day: "Tuesday", time: "09:30 - 11:00", subject: "Accounting/Business Studies" },
    { day: "Wednesday", time: "08:00 - 09:30", subject: "Life Sciences/Geography" },
    { day: "Wednesday", time: "09:30 - 11:00", subject: "History/Economics" },
    { day: "Thursday", time: "08:00 - 09:30", subject: "Information Technology" },
    { day: "Thursday", time: "09:30 - 11:00", subject: "Afrikaans First Add" },
    { day: "Friday", time: "08:00 - 09:30", subject: "Life Orientation" },
    { day: "Friday", time: "09:30 - 11:00", subject: "Consumer Studies/Tourism" },
  ],
  12: [
    { day: "Monday", time: "08:00 - 10:00", subject: "Mathematics/Mathematical Literacy" },
    { day: "Tuesday", time: "08:00 - 10:00", subject: "Physical Sciences" },
    { day: "Tuesday", time: "10:00 - 11:30", subject: "English Home Language" },
    { day: "Wednesday", time: "08:00 - 10:00", subject: "Accounting/Business Studies" },
    { day: "Wednesday", time: "10:00 - 11:30", subject: "Geography/History" },
    { day: "Thursday", time: "08:00 - 10:00", subject: "Life Sciences/Economics" },
    { day: "Thursday", time: "10:00 - 11:30", subject: "Information Technology" },
    { day: "Friday", time: "08:00 - 10:00", subject: "Afrikaans First Add" },
    { day: "Friday", time: "10:00 - 11:30", subject: "Life Orientation" },
  ],
};

const studyMaterialsByGrade: Record<number, StudyMaterial[]> = {
  4: [
    { id: 1, title: "Mathematics Basics", subject: "Mathematics", description: "Basic operations and number sense", fileUrl: "", fileType: "application/pdf", grade: 4 },
    { id: 2, title: "English Phonics", subject: "English Home Language", description: "Phonics and spelling rules", fileUrl: "", fileType: "application/pdf", grade: 4 },
    { id: 3, title: "South Africa Fact Sheet", subject: "Social Sciences", description: "Facts about our country", fileUrl: "", fileType: "application/pdf", grade: 4 },
  ],
  5: [
    { id: 4, title: "Fractions Guide", subject: "Mathematics", description: "Understanding fractions", fileUrl: "", fileType: "application/pdf", grade: 5 },
    { id: 5, title: "Reading Strategies", subject: "English Home Language", description: "Comprehension techniques", fileUrl: "", fileType: "application/pdf", grade: 5 },
    { id: 6, title: "Natural Sciences Notes", subject: "Natural Sciences", description: "Living and non-living things", fileUrl: "", fileType: "application/pdf", grade: 5 },
  ],
  6: [
    { id: 7, title: "Decimals and Percentages", subject: "Mathematics", description: "Working with decimals", fileUrl: "", fileType: "application/pdf", grade: 6 },
    { id: 8, title: "Writing Toolkit", subject: "English Home Language", description: "Essay writing tips", fileUrl: "", fileType: "application/pdf", grade: 6 },
    { id: 9, title: "South African Provinces", subject: "Social Sciences", description: "Map of our provinces", fileUrl: "", fileType: "application/pdf", grade: 6 },
  ],
  7: [
    { id: 10, title: "Integers and Algebra", subject: "Mathematics", description: "Introduction to algebra", fileUrl: "", fileType: "application/pdf", grade: 7 },
    { id: 11, title: "Grammar Handbook", subject: "English Home Language", description: "Punctuation and grammar", fileUrl: "", fileType: "application/pdf", grade: 7 },
    { id: 12, title: "Matter and Materials", subject: "Natural Sciences", description: "States of matter", fileUrl: "", fileType: "application/pdf", grade: 7 },
  ],
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
  4: [
    { name: "Mathematics", teacher: "Ms. Sarah Jones", grade: "A", progress: 92 },
    { name: "English Home Language", teacher: "Mrs. Amy Miller", grade: "A-", progress: 88 },
    { name: "Afrikaans First Add", teacher: "Mnr. Pieter van der Merwe", grade: "B+", progress: 85 },
    { name: "Natural Sciences", teacher: "Mr. David Park", grade: "A", progress: 90 },
    { name: "Social Sciences", teacher: "Ms. Lisa Johnson", grade: "A-", progress: 89 },
    { name: "Life Skills", teacher: "Mrs. Karen Brown", grade: "A", progress: 94 },
  ],
  5: [
    { name: "Mathematics", teacher: "Ms. Sarah Jones", grade: "A-", progress: 90 },
    { name: "English Home Language", teacher: "Mrs. Amy Miller", grade: "A", progress: 92 },
    { name: "Afrikaans First Add", teacher: "Mnr. Pieter van der Merwe", grade: "B+", progress: 84 },
    { name: "Natural Sciences", teacher: "Mr. David Park", grade: "A-", progress: 88 },
    { name: "Social Sciences", teacher: "Ms. Lisa Johnson", grade: "B+", progress: 86 },
    { name: "Life Skills", teacher: "Mrs. Karen Brown", grade: "A", progress: 91 },
  ],
  6: [
    { name: "Mathematics", teacher: "Mrs. Emily Roberts", grade: "A", progress: 94 },
    { name: "English Home Language", teacher: "Ms. Lisa Johnson", grade: "A-", progress: 90 },
    { name: "Afrikaans First Add", teacher: "Mnr. Pieter van der Merwe", grade: "A-", progress: 88 },
    { name: "Natural Sciences", teacher: "Mr. David Park", grade: "A", progress: 92 },
    { name: "Social Sciences", teacher: "Mrs. Karen Brown", grade: "B+", progress: 85 },
    { name: "Life Skills", teacher: "Ms. Anna Williams", grade: "A", progress: 93 },
  ],
  7: [
    { name: "Mathematics", teacher: "Mrs. Emily Roberts", grade: "A-", progress: 88 },
    { name: "English Home Language", teacher: "Ms. Lisa Johnson", grade: "A", progress: 91 },
    { name: "Afrikaans First Add", teacher: "Mnr. Pieter van der Merwe", grade: "B+", progress: 84 },
    { name: "Natural Sciences", teacher: "Dr. James Chen", grade: "A-", progress: 87 },
    { name: "Social Sciences", teacher: "Mrs. Karen Brown", grade: "A-", progress: 89 },
    { name: "Life Skills", teacher: "Ms. Anna Williams", grade: "A", progress: 92 },
  ],
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
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeTest, setActiveTest] = useState<Test | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testScore, setTestScore] = useState<{ correct: number; total: number } | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [paymentWarning, setPaymentWarning] = useState<{ school: string; daysLeft: number } | null>(null);
  const [completedTests, setCompletedTests] = useState<Record<number, { correct: number; total: number }>>({});

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
    const parsedStudent = JSON.parse(student);
    setLoggedInStudent(parsedStudent);

    const storedSubjects = localStorage.getItem(`studentSubjects_${parsedStudent.id}`);
    if (storedSubjects) {
      setSelectedSubjects(JSON.parse(storedSubjects));
    } else if (parsedStudent.grade >= 10) {
      setShowSubjectModal(true);
    }

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

    const storedResults = localStorage.getItem(`testResults_${parsedStudent.id}`);
    if (storedResults) setCompletedTests(JSON.parse(storedResults));

    const storedSchools = localStorage.getItem("schoolsData");
    if (storedSchools && parsedStudent.school) {
      const schools = JSON.parse(storedSchools);
      const mySchool = schools.find((s: { name: string; expiryDate: string; isActive?: boolean; isBlocked?: boolean }) => s.name === parsedStudent.school);
      if (mySchool) {
        if (mySchool.isBlocked) {
          alert("Your school has been blocked. Please contact your administrator.");
          localStorage.removeItem("loggedInStudent");
          router.push("/");
          return;
        }
        if (!mySchool.isActive) {
          alert("Your school is inactive. Please contact your administrator.");
          localStorage.removeItem("loggedInStudent");
          router.push("/");
          return;
        }
        const expiry = new Date(mySchool.expiryDate);
        const now = new Date();
        const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        if (daysLeft <= 7 && daysLeft > 0) {
          setPaymentWarning({ school: mySchool.name, daysLeft });
        } else if (daysLeft <= 0) {
          alert("Your school's subscription has expired. Please contact your administrator.");
          localStorage.removeItem("loggedInStudent");
          router.push("/");
        }
      }
    }
  }, [router]);

  const saveSubjects = (subjects: string[]) => {
    setSelectedSubjects(subjects);
    if (loggedInStudent) {
      localStorage.setItem(`studentSubjects_${loggedInStudent.id}`, JSON.stringify(subjects));
    }
    setShowSubjectModal(false);
  };

  useEffect(() => {
    if (activeTest && timeLeft > 0 && !testSubmitted) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (activeTest && timeLeft === 0 && !testSubmitted) {
      handleSubmitTest();
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const isSubjectSpecific = (subject: string) => {
    const electiveSubjects = ["Mathematics", "Physical Sciences", "Life Sciences", "Geography", "History", "Business Studies", "Accounting", "Economics", "Information Technology", "Mathematical Literacy", "Consumer Studies", "Religious Studies", "Xitsonga"];
    return electiveSubjects.includes(subject);
  };

  const filterBySubjects = <T extends { subject: string }>(items: T[]): T[] => {
    if (loggedInStudent!.grade < 10 || selectedSubjects.length === 0) return items;
    return items.filter(item => !isSubjectSpecific(item.subject) || selectedSubjects.includes(item.subject));
  };

  const homework = filterBySubjects(allHomework.filter(hw => hw.grade === loggedInStudent.grade));
  const tests = filterBySubjects(allTests.filter(t => t.grade === loggedInStudent.grade));
  const examTimetable = allExamTimetable.filter(et => et.grade === loggedInStudent.grade);
  const weeklyTimetable = allWeeklyTimetable.filter(wt => wt.grade === loggedInStudent.grade);
  const studyMaterials = filterBySubjects(allStudyMaterials.filter(sm => sm.grade === loggedInStudent.grade));
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
    setTimeLeft((test.duration || test.timeLimit || 60) * 60);
  };

  const handleSubmitTest = () => {
    if (!activeTest) return;
    let correct = 0;
    activeTest.questions.forEach((q) => { if (answers[q.id] === q.correctAnswer) correct++; });
    setTestScore({ correct, total: activeTest.questions.length });
    setTestSubmitted(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    
    if (loggedInStudent) {
      const storedResults = localStorage.getItem(`testResults_${loggedInStudent.id}`);
      const testResults: Record<number, { correct: number; total: number }> = storedResults ? JSON.parse(storedResults) : {};
      testResults[activeTest.id] = { correct, total: activeTest.questions.length };
      localStorage.setItem(`testResults_${loggedInStudent.id}`, JSON.stringify(testResults));
      setCompletedTests(testResults);
    }
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

  const renderDashboard = () => {
    const totalSubjects = loggedInStudent.subjects?.length || 0;
    const completedTestCount = Object.keys(completedTests).length;
    const testPercentage = tests.length > 0 ? Math.round((completedTestCount / tests.length) * 100) : 0;
    
    return (
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
        <div className="p-6 rounded-2xl bg-[#1E293B]/5 backdrop-blur-xl border border-white/10">
          <p className="text-3xl font-bold text-white mb-1">{totalSubjects}</p>
          <p className="text-slate-400 text-sm">Total Subjects</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#1E293B]/5 backdrop-blur-xl border border-white/10">
          <p className="text-3xl font-bold text-white mb-1">{completedTestCount}/{tests.length}</p>
          <p className="text-slate-400 text-sm">Tests Completed</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#1E293B]/5 backdrop-blur-xl border border-white/10">
          <p className="text-3xl font-bold text-white mb-1">{loggedInStudent.grade}</p>
          <p className="text-slate-400 text-sm">Grade</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#1E293B]/5 backdrop-blur-xl border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6">My Subjects</h2>
          {courses.length > 0 ? courses.map((course) => (
            <div key={course.name} className="p-4 rounded-xl bg-[#1E293B]/5 mb-3">
              <div className="flex justify-between mb-2">
                <h3 className="text-white font-medium">{course.name}</h3>
                <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">{course.grade}</span>
              </div>
              <p className="text-slate-400 text-sm">{course.teacher}</p>
            </div>
          )) : (
            <p className="text-slate-400">No subjects enrolled yet</p>
          )}
        </div>

        <div className="p-6 rounded-2xl bg-[#1E293B]/5 backdrop-blur-xl border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6">Upcoming Homework</h2>
          {homework.slice(0, 4).map((hw) => (
            <div key={hw.id} className="p-4 rounded-xl bg-[#1E293B]/5 mb-3">
              <h3 className="text-white font-medium">{hw.title}</h3>
              <p className="text-slate-400 text-sm">Due: {hw.dueDate}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  };

  const renderHomework = () => (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Homework & Assignments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {homework.map((hw) => (
          <div key={hw.id} className="p-6 rounded-2xl bg-[#1E293B]/5 backdrop-blur-xl border border-white/10">
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
            <p className="text-slate-500 text-sm mt-1">Question {currentQuestion + 1} of {activeTest.questions.length}</p>
          </div>
          {activeTest.questions.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#1E293B]/5 border border-white/10 text-center">
              <p className="text-slate-400 mb-4">This test has no questions yet.</p>
              <button onClick={() => setActiveTest(null)} className="px-6 py-3 rounded-xl bg-blue-600 text-white">Back to Tests</button>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-[#1E293B]/5 border border-white/10">
              <p className="text-white text-lg mb-6">{activeTest.questions[currentQuestion]?.text}</p>
              {activeTest.questions[currentQuestion]?.type === "mcq" && activeTest.questions[currentQuestion]?.options && (
                <div className="space-y-3">
                  {activeTest.questions[currentQuestion]?.options?.map((opt, idx) => (
                    <label key={idx} className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${answers[activeTest.questions[currentQuestion].id] === opt ? 'bg-blue-600 text-white' : 'bg-[#1E293B]/5 text-slate-300 hover:bg-[#1E293B]/10'}`}>
                      <input type="radio" name={`q-${activeTest.questions[currentQuestion].id}`} value={opt} checked={answers[activeTest.questions[currentQuestion].id] === opt} onChange={() => setAnswers({ ...answers, [activeTest.questions[currentQuestion].id]: opt })} className="hidden" />
                      <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                        {answers[activeTest.questions[currentQuestion].id] === opt && <span className="w-3 h-3 rounded-full bg-current" />}
                      </span>
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              )}
              {activeTest.questions[currentQuestion]?.type === "truefalse" && (
                <div className="space-y-3">
                  {["True", "False"].map((opt) => (
                    <label key={opt} className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${answers[activeTest.questions[currentQuestion].id] === opt ? 'bg-blue-600 text-white' : 'bg-[#1E293B]/5 text-slate-300 hover:bg-[#1E293B]/10'}`}>
                      <input type="radio" name={`q-${activeTest.questions[currentQuestion].id}`} value={opt} checked={answers[activeTest.questions[currentQuestion].id] === opt} onChange={() => setAnswers({ ...answers, [activeTest.questions[currentQuestion].id]: opt })} className="hidden" />
                      <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                        {answers[activeTest.questions[currentQuestion].id] === opt && <span className="w-3 h-3 rounded-full bg-current" />}
                      </span>
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="flex justify-between mt-6">
            <button onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))} disabled={currentQuestion === 0} className="px-6 py-3 rounded-xl bg-[#1E293B]/10 text-white disabled:opacity-50">Previous</button>
            {currentQuestion < activeTest.questions.length - 1 ? (
              <button onClick={() => setCurrentQuestion(currentQuestion + 1)} className="px-6 py-3 rounded-xl bg-blue-600 text-white">Next</button>
            ) : (
              <button onClick={handleSubmitTest} className="px-6 py-3 rounded-xl bg-green-600 text-white">Submit</button>
            )}
          </div>
        </div>
      );
    }
    return (
      <div>
        <h1 className="text-3xl font-bold text-white mb-6">Online Tests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tests.map((test) => {
            const completed = completedTests[test.id];
            return (
              <div key={test.id} className="p-6 rounded-2xl bg-[#1E293B]/5 backdrop-blur-xl border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white">{test.title}</h3>
                  {completed && (
                    <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">Completed</span>
                  )}
                </div>
                <p className="text-slate-400 text-sm mb-4">{test.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">{test.duration || 60} min</span>
                  {completed ? (
                    <span className="px-4 py-2 rounded-xl bg-slate-500/20 text-slate-400 cursor-not-allowed">
                      {completed.correct}/{completed.total} - Completed
                    </span>
                  ) : (
                    <button onClick={() => startTest(test)} className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors">Start Test</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderExamTimetable = () => (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Exam Timetable</h1>
      <div className="p-6 rounded-2xl bg-[#1E293B]/5 backdrop-blur-xl border border-white/10">
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
          <div key={day} className="p-4 rounded-2xl bg-[#1E293B]/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 text-center border-b border-white/10 pb-2">{day}</h3>
            {weeklyTimetable.filter(t => t.day === day).map((t, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#1E293B]/5 mb-2">
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
          <div key={material.id} className="p-6 rounded-2xl bg-[#1E293B]/5 backdrop-blur-xl border border-white/10">
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

  const renderProgress = () => {
    const storedTestResults = localStorage.getItem(`testResults_${loggedInStudent?.id}`);
    const testResults: Record<number, { correct: number; total: number }> = storedTestResults ? JSON.parse(storedTestResults) : {};
    
    const homeworkCompleted = homework.length > 0 ? Math.min(100, Math.round((homework.length / 10) * 100)) : 0;
    const testsTaken = Object.keys(testResults).length;
    const avgTestScore = testsTaken > 0 
      ? Math.round(Object.values(testResults).reduce((acc, r) => acc + (r.correct / r.total * 100), 0) / testsTaken)
      : 0;

    return (
      <div>
        <h1 className="text-3xl font-bold text-white mb-6">My Progress</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-[#1E293B]/5 backdrop-blur-xl border border-white/10">
            <p className="text-3xl font-bold text-white mb-1">{gpa}</p>
            <p className="text-slate-400 text-sm">Overall GPA</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#1E293B]/5 backdrop-blur-xl border border-white/10">
            <p className="text-3xl font-bold text-white mb-1">{courses.length}</p>
            <p className="text-slate-400 text-sm">Courses</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#1E293B]/5 backdrop-blur-xl border border-white/10">
            <p className="text-3xl font-bold text-white mb-1">{homework.length}</p>
            <p className="text-slate-400 text-sm">Homework</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-[#1E293B]/5 backdrop-blur-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Homework Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Completion Rate</span>
                  <span className="text-white font-medium">{homeworkCompleted}%</span>
                </div>
                <div className="w-full h-3 bg-[#1E293B]/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${homeworkCompleted}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total Homework</span>
                <span className="text-white">{homework.length} assignments</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#1E293B]/5 backdrop-blur-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Test Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Average Score</span>
                  <span className="text-white font-medium">{avgTestScore}%</span>
                </div>
                <div className="w-full h-3 bg-[#1E293B]/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${avgTestScore}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Tests Taken</span>
                <span className="text-white">{testsTaken} tests</span>
              </div>
              {testsTaken > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-slate-400 text-sm mb-2">Recent Test Results:</p>
                  <div className="space-y-2">
                    {Object.entries(testResults).slice(-3).map(([testId, result]) => {
                      const test = tests.find(t => t.id === parseInt(testId));
                      return (
                        <div key={testId} className="flex justify-between text-sm">
                          <span className="text-white">{test?.title || `Test #${testId}`}</span>
                          <span className="text-green-400">{Math.round(result.correct / result.total * 100)}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#1E293B]/5 backdrop-blur-xl border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">Subject Performance</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {courses.map((course) => {
              const gradeValue = gpaValues[course.grade] || "0";
              const percentage = parseFloat(gradeValue) / 4 * 100;
              return (
                <div key={course.name} className="p-4 rounded-xl bg-[#1E293B]/5">
                  <p className="text-white font-medium text-sm mb-2">{course.name}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-400 font-bold">{course.grade}</span>
                    <span className="text-slate-500 text-xs">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const grade10Subjects = [
    "Mathematics", "Mathematical Literacy", "Physical Sciences", "Life Sciences",
    "Geography", "History", "Business Studies", "Economics", "Information Technology",
    "English Home Language", "Afrikaans First Add", "Religious Studies", "Xitsonga", "Accounting"
  ];

  const handleSubjectToggle = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      {showSubjectModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1E293B] rounded-2xl p-6 w-full max-w-lg border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Select Your Subjects</h3>
            <p className="text-slate-400 text-sm mb-4">Choose the subjects you are taking this year (select at least 4):</p>
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto mb-4">
              {grade10Subjects.map(subject => (
                <button
                  key={subject}
                  onClick={() => handleSubjectToggle(subject)}
                  className={`p-3 rounded-xl text-left transition-all ${
                    selectedSubjects.includes(subject)
                      ? "bg-blue-500/20 border-2 border-blue-500 text-white"
                      : "bg-[#1E293B]/5 border-2 border-transparent text-slate-300 hover:bg-[#1E293B]/10"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (selectedSubjects.length >= 4) {
                    saveSubjects(selectedSubjects);
                  } else {
                    alert("Please select at least 4 subjects");
                  }
                }}
                className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              >
                Save Subjects
              </button>
              {selectedSubjects.length > 0 && (
                <button
                  onClick={() => setShowSubjectModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#1E293B]/10 text-white hover:bg-[#1E293B]/20"
                >
                  Skip for now
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <aside className="w-72 bg-[#1E293B] border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <Logo size={40} />
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.label.toLowerCase() ? "bg-blue-500/20 text-blue-400 border-l-2 border-blue-400" : "text-slate-400 hover:text-white hover:bg-[#1E293B]/5"}`}>
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
        {paymentWarning && (
          <div className="mb-6 p-4 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center gap-3">
            <svg className="w-6 h-6 text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="flex-1">
              <p className="text-orange-300 font-medium">Payment Reminder</p>
              <p className="text-orange-200 text-sm">Your school&apos;s subscription expires in {paymentWarning.daysLeft} days. Please settle payment within 7 days to avoid access revocation.</p>
            </div>
            <button onClick={() => setPaymentWarning(null)} className="text-orange-400 hover:text-orange-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <h1 className="text-3xl font-bold text-white mb-6">{navItems.find(n => n.label.toLowerCase() === activeTab)?.label || 'Dashboard'}</h1>
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "homework" && renderHomework()}
        {activeTab === "online tests" && renderTests()}
        {activeTab === "exam timetable" && renderExamTimetable()}
        {activeTab === "weekly timetable" && renderWeeklyTimetable()}
        {activeTab === "study materials" && renderStudyMaterials()}
        {activeTab === "my progress" && renderProgress()}
      </main>

      <AIAssistant mode="student" studentName={loggedInStudent?.name} grade={loggedInStudent?.grade} />
    </div>
  );
}