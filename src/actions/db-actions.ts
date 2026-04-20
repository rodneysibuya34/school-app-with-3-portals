"use server";

const db = require("@/db/redis");

export async function getSchools() {
  return db.getSchools();
}

export async function addSchool(schoolData: any) {
  return db.addSchool(schoolData);
}

export async function updateSchool(id: number, data: any) {
  return db.updateSchool(id, data);
}

export async function deleteSchool(id: number) {
  return db.deleteSchool(id);
}

export async function getTeachers() {
  return db.getTeachers();
}

export async function addTeacher(teacherData: any) {
  console.log("db-actions: addTeacher called with:", teacherData);
  const result = db.addTeacher(teacherData);
  console.log("db-actions: addTeacher result:", result);
  return result;
}

export async function updateTeacher(id: number, data: any) {}

export async function deleteTeacher(id: number) {
  return db.deleteTeacher(id);
}

export async function getStudents() {
  return db.getStudents();
}

export async function addStudent(studentData: any) {
  return db.addStudent(studentData);
}

export async function updateStudent(id: number, data: any) {}

export async function deleteStudent(id: number) {
  return db.deleteStudent(id);
}

export async function getSubscriptions() {
  return db.getSubscriptions();
}

export async function addSubscription(subData: any) {
  return db.addSubscription(subData);
}

export async function deleteSubscription(id: number) {
  return db.deleteSubscription(id);
}

export async function loginStudent(username: string, password: string) {
  return db.loginStudent(username, password);
}

export async function loginTeacher(username: string, password: string) {
  return db.loginTeacher(username, password);
}

export async function loginSchoolAdmin(username: string, password: string) {
  return db.loginSchoolAdmin(username, password);
}

export async function getNotifications(userId: string, userType: string) {
  return db.getNotifications(userId, userType);
}

export async function addNotification(notificationData: any) {
  return db.addNotification(notificationData);
}

export async function markNotificationAsRead(id: number) {
  return db.markNotificationAsRead(id);
}

export async function deleteNotification(id: number) {
  return db.deleteNotification(id);
}

export async function getUnreadNotificationsCount(userId: string, userType: string) {
  return db.getUnreadNotificationsCount(userId, userType);
}

export async function clearAllData() {
  return db.clearAllData();
}

export async function getPushSubscriptions(userId: string, userType: string) {
  return db.getPushSubscriptions(userId, userType);
}

export async function addPushSubscription(subscriptionData: any) {
  return db.addPushSubscription(subscriptionData);
}

export async function removePushSubscription(userId: string, userType: string) {
  return db.removePushSubscription(userId, userType);
}