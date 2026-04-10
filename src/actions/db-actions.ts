"use server";

import { db, getDb } from "@/db";
import { schools, teachers, students, subscriptions } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

function getDatabase() {
  const database = getDb();
  if (!database) {
    throw new Error("Database not configured. Please set DB_URL and DB_TOKEN environment variables.");
  }
  return database;
}

export async function getSchools() {
  return await getDatabase().select().from(schools).orderBy(desc(schools.id));
}

export async function addSchool(schoolData: {
  name: string;
  location: string;
  type: string;
  adminUsername: string;
  adminPassword: string;
  year: number;
  expiryDate: string;
  contact?: string;
  address?: string;
}) {
  const database = getDatabase();
  const result = await database.insert(schools).values({
    name: schoolData.name,
    location: schoolData.location,
    type: schoolData.type,
    adminUsername: schoolData.adminUsername,
    adminPassword: schoolData.adminPassword,
    year: schoolData.year,
    expiryDate: schoolData.expiryDate,
    contact: schoolData.contact,
    address: schoolData.address,
    students: 0,
    teachers: 0,
    status: "Trial",
    isActive: true,
    isBlocked: false,
    paymentStatus: "trial",
  }).returning();
  return result[0];
}

export async function updateSchool(id: number, data: Partial<{
  name: string;
  location: string;
  type: string;
  expiryDate: string;
  isActive: boolean;
  isBlocked: boolean;
  paymentStatus: string;
  contact: string;
  address: string;
  status: string;
}>) {
  const database = getDatabase();
  await database.update(schools).set(data).where(eq(schools.id, id));
}

export async function deleteSchool(id: number) {
  const database = getDatabase();
  await database.delete(schools).where(eq(schools.id, id));
}

export async function getTeachers() {
  return await getDatabase().select().from(teachers).orderBy(desc(teachers.id));
}

export async function addTeacher(teacherData: {
  name: string;
  email?: string;
  school: string;
  subject: string;
  username: string;
  password: string;
}) {
  const database = getDatabase();
  const result = await database.insert(teachers).values({
    name: teacherData.name,
    email: teacherData.email,
    school: teacherData.school,
    subject: teacherData.subject,
    username: teacherData.username,
    password: teacherData.password,
    status: "Active",
    schoolYear: 2026,
  }).returning();
  return result[0];
}

export async function updateTeacher(id: number, data: Partial<{
  name: string;
  email: string;
  school: string;
  subject: string;
  status: string;
}>) {
  const database = getDatabase();
  await database.update(teachers).set(data).where(eq(teachers.id, id));
}

export async function deleteTeacher(id: number) {
  const database = getDatabase();
  await database.delete(teachers).where(eq(teachers.id, id));
}

export async function getStudents() {
  return await getDatabase().select().from(students).orderBy(desc(students.id));
}

export async function addStudent(studentData: {
  name: string;
  email?: string;
  grade: number;
  school: string;
  username: string;
  password: string;
  subjects?: string;
}) {
  const database = getDatabase();
  const result = await database.insert(students).values({
    name: studentData.name,
    email: studentData.email,
    grade: studentData.grade,
    school: studentData.school,
    username: studentData.username,
    password: studentData.password,
    status: "Active",
    schoolYear: 2026,
    subjects: studentData.subjects,
  }).returning();
  return result[0];
}

export async function updateStudent(id: number, data: Partial<{
  name: string;
  email: string;
  grade: number;
  school: string;
  status: string;
  subjects: string;
}>) {
  const database = getDatabase();
  await database.update(students).set(data).where(eq(students.id, id));
}

export async function deleteStudent(id: number) {
  const database = getDatabase();
  await database.delete(students).where(eq(students.id, id));
}

export async function getSubscriptions() {
  return await getDatabase().select().from(subscriptions).orderBy(desc(subscriptions.id));
}

export async function addSubscription(subData: {
  school: string;
  schoolType: string;
  price: string;
  startDate: string;
  status: string;
  renewal: string;
}) {
  const database = getDatabase();
  const result = await database.insert(subscriptions).values(subData).returning();
  return result[0];
}

export async function deleteSubscription(id: number) {
  const database = getDatabase();
  await database.delete(subscriptions).where(eq(subscriptions.id, id));
}

export async function loginStudent(username: string, password: string) {
  const database = getDatabase();
  const result = await database.select().from(students).where(eq(students.username, username));
  const student = result[0];
  if (student && student.password === password) {
    return { success: true, user: student, type: "student" };
  }
  return { success: false };
}

export async function loginTeacher(username: string, password: string) {
  const database = getDatabase();
  const result = await database.select().from(teachers).where(eq(teachers.username, username));
  const teacher = result[0];
  if (teacher && teacher.password === password) {
    return { success: true, user: teacher, type: "teacher" };
  }
  return { success: false };
}

export async function loginSchoolAdmin(username: string, password: string) {
  const database = getDatabase();
  const result = await database.select().from(schools).where(eq(schools.adminUsername, username));
  const school = result[0];
  if (school && school.adminPassword === password) {
    return { success: true, user: school, type: "school_admin" };
  }
  return { success: false };
}