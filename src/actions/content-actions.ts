"use server";

import { getDatabase } from "@/db";

// Homework
export async function getHomework(school?: string, grade?: number) {
  const db = getDatabase();
  if (!db) return [];
  
  let stmt;
  if (school && grade) {
    stmt = db.prepare("SELECT * FROM homework WHERE school = ? AND grade = ? ORDER BY id DESC");
    return stmt.all(school, grade);
  } else if (school) {
    stmt = db.prepare("SELECT * FROM homework WHERE school = ? ORDER BY id DESC");
    return stmt.all(school);
  }
  stmt = db.prepare("SELECT * FROM homework ORDER BY id DESC");
  return stmt.all();
}

export async function addHomework(data: {
  title: string;
  description: string;
  subject: string;
  grade: number;
  school: string;
  dueDate: string;
  createdBy: string;
}) {
  const db = getDatabase();
  if (!db) throw new Error("Database not configured");
  
  const stmt = db.prepare(`
    INSERT INTO homework (title, description, subject, grade, school, dueDate, createdBy, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(data.title, data.description || null, data.subject, data.grade, data.school, data.dueDate, data.createdBy, Date.now());
  return db.prepare("SELECT * FROM homework WHERE id = ?").get(result.lastInsertRowid);
}

export async function deleteHomework(id: number) {
  const db = getDatabase();
  if (!db) return;
  db.prepare("DELETE FROM homework WHERE id = ?").run(id);
}

// Tests
export async function getTests(school?: string, grade?: number) {
  const db = getDatabase();
  if (!db) return [];
  return db.prepare("SELECT * FROM tests ORDER BY id DESC").all();
}

export async function addTest(data: {
  title: string;
  subject: string;
  grade: number;
  school: string;
  date: string;
  duration?: string;
  createdBy: string;
}) {
  const db = getDatabase();
  if (!db) throw new Error("Database not configured");
  
  const stmt = db.prepare(`
    INSERT INTO tests (title, subject, grade, school, date, duration, createdBy, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(data.title, data.subject, data.grade, data.school, data.date, data.duration || null, data.createdBy, Date.now());
  return db.prepare("SELECT * FROM tests WHERE id = ?").get(result.lastInsertRowid);
}

export async function deleteTest(id: number) {
  const db = getDatabase();
  if (!db) return;
  db.prepare("DELETE FROM tests WHERE id = ?").run(id);
}

// Study Materials
export async function getStudyMaterials(school?: string, grade?: number) {
  const db = getDatabase();
  if (!db) return [];
  return db.prepare("SELECT * FROM study_materials ORDER BY id DESC").all();
}

export async function addStudyMaterial(data: {
  title: string;
  description?: string;
  subject: string;
  grade: number;
  school: string;
  fileUrl?: string;
  fileType?: string;
  createdBy: string;
}) {
  const db = getDatabase();
  if (!db) throw new Error("Database not configured");
  
  const stmt = db.prepare(`
    INSERT INTO study_materials (title, description, subject, grade, school, fileUrl, fileType, createdBy, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(data.title, data.description || null, data.subject, data.grade, data.school, data.fileUrl || null, data.fileType || null, data.createdBy, Date.now());
  return db.prepare("SELECT * FROM study_materials WHERE id = ?").get(result.lastInsertRowid);
}

export async function deleteStudyMaterial(id: number) {
  const db = getDatabase();
  if (!db) return;
  db.prepare("DELETE FROM study_materials WHERE id = ?").run(id);
}

// Exam Timetable
export async function getExamTimetable(school?: string, grade?: number) {
  const db = getDatabase();
  if (!db) return [];
  return db.prepare("SELECT * FROM exam_timetable ORDER BY date").all();
}

export async function addExamTimetable(data: {
  title: string;
  subject: string;
  grade: number;
  school: string;
  date: string;
  time: string;
  venue?: string;
  createdBy: string;
}) {
  const db = getDatabase();
  if (!db) throw new Error("Database not configured");
  
  const stmt = db.prepare(`
    INSERT INTO exam_timetable (title, subject, grade, school, date, time, venue, createdBy, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(data.title, data.subject, data.grade, data.school, data.date, data.time, data.venue || null, data.createdBy, Date.now());
  return db.prepare("SELECT * FROM exam_timetable WHERE id = ?").get(result.lastInsertRowid);
}

export async function deleteExamTimetable(id: number) {
  const db = getDatabase();
  if (!db) return;
  db.prepare("DELETE FROM exam_timetable WHERE id = ?").run(id);
}

// Weekly Timetable
export async function getWeeklyTimetable(school?: string, grade?: number) {
  const db = getDatabase();
  if (!db) return [];
  return db.prepare("SELECT * FROM weekly_timetable").all();
}

export async function addWeeklyTimetable(data: {
  grade: number;
  school: string;
  dayOfWeek: string;
  subject: string;
  time: string;
  teacher?: string;
}) {
  const db = getDatabase();
  if (!db) throw new Error("Database not configured");
  
  const stmt = db.prepare(`
    INSERT INTO weekly_timetable (grade, school, dayOfWeek, subject, time, teacher, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(data.grade, data.school, data.dayOfWeek, data.subject, data.time, data.teacher || null, Date.now());
  return db.prepare("SELECT * FROM weekly_timetable WHERE id = ?").get(result.lastInsertRowid);
}

export async function deleteWeeklyTimetable(id: number) {
  const db = getDatabase();
  if (!db) return;
  db.prepare("DELETE FROM weekly_timetable WHERE id = ?").run(id);
}

// Announcements
export async function getAnnouncements(school?: string) {
  const db = getDatabase();
  if (!db) return [];
  if (school) {
    return db.prepare("SELECT * FROM announcements WHERE school = ? ORDER BY createdAt DESC").all(school);
  }
  return db.prepare("SELECT * FROM announcements ORDER BY createdAt DESC").all();
}

export async function addAnnouncement(data: {
  title: string;
  message: string;
  school: string;
  createdBy: string;
}) {
  const db = getDatabase();
  if (!db) throw new Error("Database not configured");
  
  const stmt = db.prepare(`
    INSERT INTO announcements (title, message, school, createdBy, createdAt)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(data.title, data.message, data.school, data.createdBy, Date.now());
  return db.prepare("SELECT * FROM announcements WHERE id = ?").get(result.lastInsertRowid);
}

export async function deleteAnnouncement(id: number) {
  const db = getDatabase();
  if (!db) return;
  db.prepare("DELETE FROM announcements WHERE id = ?").run(id);
}

// Courses
export async function getCourses(school?: string, grade?: number) {
  const db = getDatabase();
  if (!db) return [];
  return db.prepare("SELECT * FROM courses ORDER BY name").all();
}

export async function addCourse(data: {
  name: string;
  description?: string;
  subject: string;
  grade: number;
  school: string;
  createdBy: string;
}) {
  const db = getDatabase();
  if (!db) throw new Error("Database not configured");
  
  const stmt = db.prepare(`
    INSERT INTO courses (name, description, subject, grade, school, createdBy, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(data.name, data.description || null, data.subject, data.grade, data.school, data.createdBy, Date.now());
  return db.prepare("SELECT * FROM courses WHERE id = ?").get(result.lastInsertRowid);
}

export async function deleteCourse(id: number) {
  const db = getDatabase();
  if (!db) return;
  db.prepare("DELETE FROM courses WHERE id = ?").run(id);
}