"use server";

import { getDatabase } from "@/db";

export async function getSchools() {
  const database = getDatabase();
  if (!database) return [];
  const stmt = database.prepare("SELECT * FROM schools ORDER BY id DESC");
  return stmt.all();
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
  if (!database) throw new Error("Database not configured");
  
  const stmt = database.prepare(`
    INSERT INTO schools (name, location, type, adminUsername, adminPassword, year, expiryDate, contact, address, students, teachers, status, isActive, isBlocked, paymentStatus)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 'Trial', 1, 0, 'trial')
  `);
  
  const result = stmt.run(
    schoolData.name,
    schoolData.location,
    schoolData.type,
    schoolData.adminUsername,
    schoolData.adminPassword,
    schoolData.year,
    schoolData.expiryDate,
    schoolData.contact || null,
    schoolData.address || null
  );
  
  const newSchool = database.prepare("SELECT * FROM schools WHERE id = ?").get(result.lastInsertRowid);
  return newSchool;
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
  paymentPlan: string;
}>) {
  const database = getDatabase();
  if (!database) return;
  
  const updates = Object.keys(data).map(k => `${k} = ?`).join(", ");
  const values = Object.values(data).filter(v => v !== undefined);
  
  if (updates) {
    const stmt = database.prepare(`UPDATE schools SET ${updates} WHERE id = ?`);
    stmt.run(...values, id);
  }
}

export async function deleteSchool(id: number) {
  const database = getDatabase();
  if (!database) return;
  const stmt = database.prepare("DELETE FROM schools WHERE id = ?");
  stmt.run(id);
}

export async function getTeachers() {
  const database = getDatabase();
  if (!database) return [];
  const stmt = database.prepare("SELECT * FROM teachers ORDER BY id DESC");
  return stmt.all();
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
  if (!database) throw new Error("Database not configured");
  
  const stmt = database.prepare(`
    INSERT INTO teachers (name, email, school, subject, username, password, status, schoolYear)
    VALUES (?, ?, ?, ?, ?, ?, 'Active', 2026)
  `);
  
  const result = stmt.run(
    teacherData.name,
    teacherData.email || null,
    teacherData.school,
    teacherData.subject,
    teacherData.username,
    teacherData.password
  );
  
  const newTeacher = database.prepare("SELECT * FROM teachers WHERE id = ?").get(result.lastInsertRowid);
  return newTeacher;
}

export async function updateTeacher(id: number, data: Partial<{
  name: string;
  email: string;
  school: string;
  subject: string;
  status: string;
}>) {
  const database = getDatabase();
  if (!database) return;
  
  const updates = Object.keys(data).map(k => `${k} = ?`).join(", ");
  const values = Object.values(data).filter(v => v !== undefined);
  
  if (updates) {
    const stmt = database.prepare(`UPDATE teachers SET ${updates} WHERE id = ?`);
    stmt.run(...values, id);
  }
}

export async function deleteTeacher(id: number) {
  const database = getDatabase();
  if (!database) return;
  const stmt = database.prepare("DELETE FROM teachers WHERE id = ?");
  stmt.run(id);
}

export async function getStudents() {
  const database = getDatabase();
  if (!database) return [];
  const stmt = database.prepare("SELECT * FROM students ORDER BY id DESC");
  return stmt.all();
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
  if (!database) throw new Error("Database not configured");
  
  const stmt = database.prepare(`
    INSERT INTO students (name, email, grade, school, username, password, status, schoolYear, subjects)
    VALUES (?, ?, ?, ?, ?, ?, 'Active', 2026, ?)
  `);
  
  const result = stmt.run(
    studentData.name,
    studentData.email || null,
    studentData.grade,
    studentData.school,
    studentData.username,
    studentData.password,
    studentData.subjects || null
  );
  
  const newStudent = database.prepare("SELECT * FROM students WHERE id = ?").get(result.lastInsertRowid);
  return newStudent;
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
  if (!database) return;
  
  const updates = Object.keys(data).map(k => `${k} = ?`).join(", ");
  const values = Object.values(data).filter(v => v !== undefined);
  
  if (updates) {
    const stmt = database.prepare(`UPDATE students SET ${updates} WHERE id = ?`);
    stmt.run(...values, id);
  }
}

export async function deleteStudent(id: number) {
  const database = getDatabase();
  if (!database) return;
  const stmt = database.prepare("DELETE FROM students WHERE id = ?");
  stmt.run(id);
}

export async function getSubscriptions() {
  const database = getDatabase();
  if (!database) return [];
  const stmt = database.prepare("SELECT * FROM subscriptions ORDER BY id DESC");
  return stmt.all();
}

export async function addSubscription(subData: {
  school: string;
  schoolType: string;
  price: string;
  startDate: string;
  status: string;
  renewal: string;
  planType?: string;
}) {
  const database = getDatabase();
  if (!database) throw new Error("Database not configured");
  
  const stmt = database.prepare(`
    INSERT INTO subscriptions (school, schoolType, price, planType, startDate, status, renewal)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    subData.school,
    subData.schoolType,
    subData.price,
    subData.planType || 'monthly',
    subData.startDate,
    subData.status,
    subData.renewal
  );
  
  const newSub = database.prepare("SELECT * FROM subscriptions WHERE id = ?").get(result.lastInsertRowid);
  return newSub;
}

export async function deleteSubscription(id: number) {
  const database = getDatabase();
  if (!database) return;
  const stmt = database.prepare("DELETE FROM subscriptions WHERE id = ?");
  stmt.run(id);
}

export async function loginStudent(username: string, password: string) {
  const database = getDatabase();
  if (!database) return { success: false };
  
  const stmt = database.prepare("SELECT * FROM students WHERE username = ?");
  const student = stmt.get(username) as any;
  
  if (student && student.password === password) {
    return { success: true, user: student, type: "student" };
  }
  return { success: false };
}

export async function loginTeacher(username: string, password: string) {
  const database = getDatabase();
  if (!database) return { success: false };
  
  const stmt = database.prepare("SELECT * FROM teachers WHERE username = ?");
  const teacher = stmt.get(username) as any;
  
  if (teacher && teacher.password === password) {
    return { success: true, user: teacher, type: "teacher" };
  }
  return { success: false };
}

export async function loginSchoolAdmin(username: string, password: string) {
  const database = getDatabase();
  if (!database) return { success: false };
  
  const stmt = database.prepare("SELECT * FROM schools WHERE adminUsername = ?");
  const school = stmt.get(username) as any;
  
  if (school && school.adminPassword === password) {
    return { success: true, user: school, type: "school_admin" };
  }
  return { success: false };
}