import { getDb } from "./index";
import { schools, teachers, students, subscriptions } from "./schema";

const database = getDb();
if (!database) {
  console.log("Database not configured - cannot seed");
  process.exit(0);
}

console.log("Seeding database...");

// Seed schools
await database.insert(schools).values([
  { name: "Oakridge Preparatory Academy", location: "Boston, MA", type: "High School", adminUsername: "oakridge_admin", adminPassword: "Oakridge2026!Admin", year: 2026, expiryDate: "2027-01-01", isActive: true, isBlocked: false, paymentStatus: "active", students: 2, teachers: 2 },
  { name: "Westfield Christian School", location: "Chicago, IL", type: "Primary", adminUsername: "westfield_admin", adminPassword: "Westfield2026!Admin", year: 2026, expiryDate: "2026-03-15", isActive: true, isBlocked: false, paymentStatus: "active", students: 2, teachers: 1 },
  { name: "Riverside Elementary", location: "Miami, FL", type: "Primary", adminUsername: "riverside_admin", adminPassword: "Riverside2026!Admin", year: 2026, expiryDate: "2026-06-01", isActive: true, isBlocked: false, paymentStatus: "active", students: 2, teachers: 1 },
]);

console.log("Database seeded successfully!");