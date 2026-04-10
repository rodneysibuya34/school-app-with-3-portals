import { getDatabase } from "./index";

const database = getDatabase();
if (!database) {
  console.log("Database not initialized");
  process.exit(1);
}

console.log("Seeding database...");

// Seed schools
database.prepare(`
  INSERT OR IGNORE INTO schools (id, name, location, type, adminUsername, adminPassword, year, expiryDate, isActive, isBlocked, paymentStatus, students, teachers, status)
  VALUES (1, 'Oakridge Preparatory Academy', 'Boston, MA', 'High School', 'oakridge_admin', 'Oakridge2026!Admin', 2026, '2027-01-01', 1, 0, 'active', 2, 2, 'Active')
`).run();

database.prepare(`
  INSERT OR IGNORE INTO schools (id, name, location, type, adminUsername, adminPassword, year, expiryDate, isActive, isBlocked, paymentStatus, students, teachers, status)
  VALUES (2, 'Westfield Christian School', 'Chicago, IL', 'Primary', 'westfield_admin', 'Westfield2026!Admin', 2026, '2026-12-31', 1, 0, 'active', 2, 1, 'Active')
`).run();

database.prepare(`
  INSERT OR IGNORE INTO schools (id, name, location, type, adminUsername, adminPassword, year, expiryDate, isActive, isBlocked, paymentStatus, students, teachers, status)
  VALUES (3, 'Riverside Elementary', 'Miami, FL', 'Primary', 'riverside_admin', 'Riverside2026!Admin', 2026, '2026-12-31', 1, 0, 'active', 2, 1, 'Active')
`).run();

// Seed teachers
database.prepare(`
  INSERT OR IGNORE INTO teachers (id, name, email, school, subject, username, password, status, schoolYear)
  VALUES (1, 'Dr. Sarah Mitchell', 's.mitchell@oakridge.edu', 'Oakridge Preparatory Academy', 'Mathematics', 's.mitchell', 'SM@OAK152Apr', 'Active', 2026)
`).run();

database.prepare(`
  INSERT OR IGNORE INTO teachers (id, name, email, school, subject, username, password, status, schoolYear)
  VALUES (2, 'Mr. David Park', 'd.park@oakridge.edu', 'Oakridge Preparatory Academy', 'English Literature', 'd.park', 'DP@OAK737May', 'Active', 2026)
`).run();

// Seed students
database.prepare(`
  INSERT OR IGNORE INTO students (id, name, email, grade, school, username, password, status, schoolYear, subjects)
  VALUES (1, 'Alex Thompson', 'a.thompson@oakridge.edu', 11, 'Oakridge Preparatory Academy', 'alex.t', 'AT@OAK419Mar', 'Active', 2026, 'Mathematics,Physical Sciences,English Home Language,Life Sciences,Geography')
`).run();

database.prepare(`
  INSERT OR IGNORE INTO students (id, name, email, grade, school, username, password, status, schoolYear, subjects)
  VALUES (2, 'Emma Wilson', 'e.wilson@oakridge.edu', 10, 'Oakridge Preparatory Academy', 'emma.w', 'EW@OAK826Feb', 'Active', 2026, 'Mathematics,Physical Sciences,English Home Language,Life Sciences,Geography')
`).run();

console.log("Database seeded successfully!");