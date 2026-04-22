"use server";

const db = require("@/db/redis");

export async function getHomework(school?: string) { return db.getHomework(school); }
export async function addHomework(data: any) { return db.addHomework(data); }
export async function deleteHomework(id: number) { db.deleteHomework(id); }

export async function getTests(school?: string) { return db.getTests(school); }
export async function addTest(data: any) { return db.addTest(data); }
export async function updateTest(id: number, data: any) { return db.updateTest(id, data); }
export async function deleteTest(id: number) { db.deleteTest(id); }

export async function getTestResults(school?: string) { return db.getTestResults(school); }
export async function addTestResult(data: any) { return db.addTestResult(data); }

export async function getStudyMaterials() { return db.getStudyMaterials(); }
export async function addStudyMaterial(data: any) { return db.addStudyMaterial(data); }
export async function deleteStudyMaterial(id: number) { db.deleteStudyMaterial(id); }

export async function getExamTimetable(school?: string) { return db.getExamTimetable(school); }
export async function addExamTimetable(data: any) { return db.addExamTimetable(data); }
export async function deleteExamTimetable(id: number) { db.deleteExamTimetable(id); }

export async function getWeeklyTimetable(school?: string) { return db.getWeeklyTimetable(school); }
export async function addWeeklyTimetable(data: any) { return db.addWeeklyTimetable(data); }
export async function deleteWeeklyTimetable(id: number) { db.deleteWeeklyTimetable(id); }

export async function getAnnouncements(school?: string) { return db.getAnnouncements(school); }
export async function addAnnouncement(data: any) { return db.addAnnouncement(data); }
export async function deleteAnnouncement(id: number) { db.deleteAnnouncement(id); }

export async function getCourses() { return db.getCourses(); }
export async function addCourse(data: any) { return db.addCourse(data); }
export async function deleteCourse(id: number) { db.deleteCourse(id); }

export async function getChat(school?: string, grade?: number) { return db.getChat(school, grade); }
export async function addChatMessage(data: any) { return db.addChatMessage(data); }
export async function deleteChatMessage(id: number) { return db.deleteChatMessage(id); }
export async function updateChatMessage(id: number, data: any) { return db.updateChatMessage(id, data); }