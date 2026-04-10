"use server";

import { getDb } from "@/db";
import { homework, tests, studyMaterials, examTimetable, weeklyTimetable, announcements, courses } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

function getDatabase() {
  const database = getDb();
  if (!database) {
    throw new Error("Database not configured");
  }
  return database;
}

// Homework
export async function getHomework(school?: string, grade?: number) {
  const db = getDatabase();
  if (!db) return [];
  if (school) {
    return await db.select().from(homework).where(eq(homework.school, school)).orderBy(desc(homework.id));
  }
  return await db.select().from(homework).orderBy(desc(homework.id));
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
  const result = await db.insert(homework).values(data).returning();
  return result[0];
}

export async function deleteHomework(id: number) {
  const db = getDatabase();
  if (!db) return;
  await db.delete(homework).where(eq(homework.id, id));
}

// Tests
export async function getTests(school?: string, grade?: number) {
  const db = getDatabase();
  if (!db) return [];
  return await db.select().from(tests).orderBy(desc(tests.id));
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
  const result = await db.insert(tests).values(data).returning();
  return result[0];
}

export async function deleteTest(id: number) {
  const db = getDatabase();
  if (!db) return;
  await db.delete(tests).where(eq(tests.id, id));
}

// Study Materials
export async function getStudyMaterials(school?: string, grade?: number) {
  const db = getDatabase();
  if (!db) return [];
  return await db.select().from(studyMaterials).orderBy(desc(studyMaterials.id));
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
  const result = await db.insert(studyMaterials).values(data).returning();
  return result[0];
}

export async function deleteStudyMaterial(id: number) {
  const db = getDatabase();
  if (!db) return;
  await db.delete(studyMaterials).where(eq(studyMaterials.id, id));
}

// Exam Timetable
export async function getExamTimetable(school?: string, grade?: number) {
  const db = getDatabase();
  if (!db) return [];
  return await db.select().from(examTimetable).orderBy(examTimetable.date);
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
  const result = await db.insert(examTimetable).values(data).returning();
  return result[0];
}

export async function deleteExamTimetable(id: number) {
  const db = getDatabase();
  if (!db) return;
  await db.delete(examTimetable).where(eq(examTimetable.id, id));
}

// Weekly Timetable
export async function getWeeklyTimetable(school?: string, grade?: number) {
  const db = getDatabase();
  if (!db) return [];
  return await db.select().from(weeklyTimetable).orderBy(weeklyTimetable.dayOfWeek);
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
  const result = await db.insert(weeklyTimetable).values(data).returning();
  return result[0];
}

export async function deleteWeeklyTimetable(id: number) {
  const db = getDatabase();
  if (!db) return;
  await db.delete(weeklyTimetable).where(eq(weeklyTimetable.id, id));
}

// Announcements
export async function getAnnouncements(school?: string) {
  const db = getDatabase();
  if (!db) return [];
  return await db.select().from(announcements).orderBy(desc(announcements.createdAt));
}

export async function addAnnouncement(data: {
  title: string;
  message: string;
  school: string;
  createdBy: string;
}) {
  const db = getDatabase();
  if (!db) throw new Error("Database not configured");
  const result = await db.insert(announcements).values(data).returning();
  return result[0];
}

export async function deleteAnnouncement(id: number) {
  const db = getDatabase();
  if (!db) return;
  await db.delete(announcements).where(eq(announcements.id, id));
}

// Courses
export async function getCourses(school?: string, grade?: number) {
  const db = getDatabase();
  if (!db) return [];
  return await db.select().from(courses).orderBy(courses.name);
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
  const result = await db.insert(courses).values(data).returning();
  return result[0];
}

export async function deleteCourse(id: number) {
  const db = getDatabase();
  if (!db) return;
  await db.delete(courses).where(eq(courses.id, id));
}