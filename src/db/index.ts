import Database from "better-sqlite3";
import * as schema from "./schema";

let dbInstance: Database.Database | null = null;

function getDb() {
  if (dbInstance) return dbInstance;
  
  dbInstance = new Database("geleza.db");
  
  dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS schools (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      students INTEGER DEFAULT 0,
      teachers INTEGER DEFAULT 0,
      status TEXT DEFAULT 'Trial',
      type TEXT DEFAULT 'Primary',
      adminUsername TEXT NOT NULL,
      adminPassword TEXT NOT NULL,
      year INTEGER DEFAULT 2026,
      expiryDate TEXT,
      isActive INTEGER DEFAULT 1,
      isBlocked INTEGER DEFAULT 0,
      paymentStatus TEXT DEFAULT 'trial',
      paymentPlan TEXT DEFAULT 'monthly',
      contact TEXT,
      address TEXT,
      schoolLogo TEXT,
      createdAt INTEGER
    );
    
    CREATE TABLE IF NOT EXISTS teachers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      school TEXT NOT NULL,
      subject TEXT NOT NULL,
      status TEXT DEFAULT 'Active',
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      schoolYear INTEGER DEFAULT 2026,
      createdAt INTEGER
    );
    
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      grade INTEGER NOT NULL,
      school TEXT NOT NULL,
      status TEXT DEFAULT 'Active',
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      schoolYear INTEGER DEFAULT 2026,
      subjects TEXT,
      createdAt INTEGER
    );
    
    CREATE TABLE IF NOT EXISTS subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      school TEXT NOT NULL,
      schoolType TEXT NOT NULL,
      price TEXT NOT NULL,
      planType TEXT DEFAULT 'monthly',
      startDate TEXT NOT NULL,
      status TEXT DEFAULT 'Active',
      renewal TEXT NOT NULL,
      createdAt INTEGER
    );
    
    CREATE TABLE IF NOT EXISTS homework (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      subject TEXT NOT NULL,
      grade INTEGER NOT NULL,
      school TEXT NOT NULL,
      dueDate TEXT NOT NULL,
      createdBy TEXT NOT NULL,
      createdAt INTEGER
    );
    
    CREATE TABLE IF NOT EXISTS tests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      subject TEXT NOT NULL,
      grade INTEGER NOT NULL,
      school TEXT NOT NULL,
      date TEXT NOT NULL,
      duration TEXT,
      createdBy TEXT NOT NULL,
      createdAt INTEGER
    );
    
    CREATE TABLE IF NOT EXISTS study_materials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      subject TEXT NOT NULL,
      grade INTEGER NOT NULL,
      school TEXT NOT NULL,
      fileUrl TEXT,
      fileType TEXT,
      createdBy TEXT NOT NULL,
      createdAt INTEGER
    );
    
    CREATE TABLE IF NOT EXISTS exam_timetable (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      subject TEXT NOT NULL,
      grade INTEGER NOT NULL,
      school TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      venue TEXT,
      createdBy TEXT NOT NULL,
      createdAt INTEGER
    );
    
    CREATE TABLE IF NOT EXISTS weekly_timetable (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      grade INTEGER NOT NULL,
      school TEXT NOT NULL,
      dayOfWeek TEXT NOT NULL,
      subject TEXT NOT NULL,
      time TEXT NOT NULL,
      teacher TEXT,
      createdAt INTEGER
    );
    
    CREATE TABLE IF NOT EXISTS announcements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      school TEXT NOT NULL,
      createdBy TEXT NOT NULL,
      createdAt INTEGER
    );
    
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      subject TEXT NOT NULL,
      grade INTEGER NOT NULL,
      school TEXT NOT NULL,
      createdBy TEXT NOT NULL,
      createdAt INTEGER
    );
  `);
  
  return dbInstance;
}

export function getDatabase() {
  return dbInstance;
}

export function getDbInstance() {
  return dbInstance;
}

export const db = dbInstance;