import { sendPushToClass } from '@/lib/firebase-admin';

export async function notifyStudentsOfHomework(school: string, grade: number, title: string, subject: string) {
  await sendPushToClass(school, grade, '📚 New Homework', `${title} - ${subject}`, { type: 'homework', url: '/student' });
}

export async function notifyStudentsOfTest(school: string, grade: number, title: string, subject: string) {
  await sendPushToClass(school, grade, '📝 New Test', `${title} - ${subject}`, { type: 'test', url: '/student' });
}

export async function notifyStudentsOfAnnouncement(school: string, grade: number, title: string) {
  await sendPushToClass(school, grade, '📢 Announcement', title, { type: 'announcement', url: '/student' });
}

export async function notifyStudentsOfStudyMaterial(school: string, grade: number, title: string, subject: string) {
  await sendPushToClass(school, grade, '📖 Study Material', `${title} - ${subject}`, { type: 'study-material', url: '/student' });
}