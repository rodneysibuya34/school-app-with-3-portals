import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const schools = sqliteTable("schools", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  location: text("location").notNull(),
  students: integer("students").default(0),
  teachers: integer("teachers").default(0),
  status: text("status").default("Trial"),
  type: text("type").default("Primary"),
  adminUsername: text("admin_username").notNull(),
  adminPassword: text("admin_password").notNull(),
  year: integer("year").default(2026),
  expiryDate: text("expiry_date"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  isBlocked: integer("is_blocked", { mode: "boolean" }).default(false),
  paymentStatus: text("payment_status").default("trial"),
  contact: text("contact"),
  address: text("address"),
  schoolLogo: text("school_logo"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const teachers = sqliteTable("teachers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email"),
  school: text("school").notNull(),
  subject: text("subject").notNull(),
  status: text("status").default("Active"),
  username: text("username").notNull(),
  password: text("password").notNull(),
  schoolYear: integer("school_year").default(2026),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const students = sqliteTable("students", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email"),
  grade: integer("grade").notNull(),
  school: text("school").notNull(),
  status: text("status").default("Active"),
  username: text("username").notNull(),
  password: text("password").notNull(),
  schoolYear: integer("school_year").default(2026),
  subjects: text("subjects"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const subscriptions = sqliteTable("subscriptions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  school: text("school").notNull(),
  schoolType: text("school_type").notNull(),
  price: text("price").notNull(),
  startDate: text("start_date").notNull(),
  status: text("status").default("Active"),
  renewal: text("renewal").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});