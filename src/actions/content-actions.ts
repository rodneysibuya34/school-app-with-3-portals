"use server";

const db = require("@/db/redis");

export async function getHomework(school?: string) { return db.getHomework(school); }
export async function addHomework(data: any) { return db.addHomework(data); }
export async function deleteHomework(id: number) { db.deleteHomework(id); }

export async function getTests() { return db.getTests(); }
export async function addTest(data: any) { return db.addTest(data); }
export async function deleteTest(id: number) { db.deleteTest(id); }

export async function getStudyMaterials() { return db.getStudyMaterials(); }
export async function addStudyMaterial(data: any) { return db.addStudyMaterial(data); }
export async function deleteStudyMaterial(id: number) { db.deleteStudyMaterial(id); }

export async function getExamTimetable() { return db.getExamTimetable(); }
export async function addExamTimetable(data: any) { return db.addExamTimetable(data); }
export async function deleteExamTimetable(id: number) { db.deleteExamTimetable(id); }

export async function getWeeklyTimetable() { return db.getWeeklyTimetable(); }
export async function addWeeklyTimetable(data: any) { return db.addWeeklyTimetable(data); }
export async function deleteWeeklyTimetable(id: number) { db.deleteWeeklyTimetable(id); }

export async function getAnnouncements(school?: string) { return db.getAnnouncements(school); }
export async function addAnnouncement(data: any) { return db.addAnnouncement(data); }
export async function deleteAnnouncement(id: number) { db.deleteAnnouncement(id); }

export async function getCourses() { return db.getCourses(); }
export async function addCourse(data: any) { return db.addCourse(data); }
export async function deleteCourse(id: number) { db.deleteCourse(id); }