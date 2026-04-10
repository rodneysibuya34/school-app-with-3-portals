const fs = require('fs');
const path = require('path');

const dataFile = path.join(process.cwd(), 'data.json');

function loadData() {
  try {
    if (fs.existsSync(dataFile)) {
      return JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    }
  } catch (e) {}
  return {
    schools: [],
    teachers: [],
    students: [],
    subscriptions: [],
    homework: [],
    tests: [],
    studyMaterials: [],
    examTimetable: [],
    weeklyTimetable: [],
    announcements: [],
    courses: []
  };
}

function saveData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

const data = loadData();

function getSchools() {
  return data.schools.sort((a, b) => b.id - a.id);
}

function addSchool(schoolData) {
  const newSchool = {
    id: Date.now(),
    ...schoolData,
    students: 0,
    teachers: 0,
    status: 'Trial',
    isActive: true,
    isBlocked: false,
    paymentStatus: 'trial',
    createdAt: Date.now()
  };
  data.schools.push(newSchool);
  saveData(data);
  return newSchool;
}

function updateSchool(id, updates) {
  const idx = data.schools.findIndex(s => s.id === id);
  if (idx !== -1) {
    data.schools[idx] = { ...data.schools[idx], ...updates };
    saveData(data);
  }
}

function deleteSchool(id) {
  data.schools = data.schools.filter(s => s.id !== id);
  saveData(data);
}

function getTeachers() {
  return data.teachers.sort((a, b) => b.id - a.id);
}

function addTeacher(teacherData) {
  const newTeacher = {
    id: Date.now(),
    ...teacherData,
    status: 'Active',
    schoolYear: 2026,
    createdAt: Date.now()
  };
  data.teachers.push(newTeacher);
  saveData(data);
  return newTeacher;
}

function deleteTeacher(id) {
  data.teachers = data.teachers.filter(t => t.id !== id);
  saveData(data);
}

function getStudents() {
  return data.students.sort((a, b) => b.id - a.id);
}

function addStudent(studentData) {
  const newStudent = {
    id: Date.now(),
    ...studentData,
    status: 'Active',
    schoolYear: 2026,
    createdAt: Date.now()
  };
  data.students.push(newStudent);
  saveData(data);
  return newStudent;
}

function deleteStudent(id) {
  data.students = data.students.filter(s => s.id !== id);
  saveData(data);
}

function getSubscriptions() {
  return data.subscriptions.sort((a, b) => b.id - a.id);
}

function addSubscription(subData) {
  const newSub = {
    id: Date.now(),
    ...subData,
    createdAt: Date.now()
  };
  data.subscriptions.push(newSub);
  saveData(data);
  return newSub;
}

function deleteSubscription(id) {
  data.subscriptions = data.subscriptions.filter(s => s.id !== id);
  saveData(data);
}

function getHomework(school) {
  if (school) {
    return data.homework.filter(h => h.school === school).sort((a, b) => b.id - a.id);
  }
  return data.homework.sort((a, b) => b.id - a.id);
}

function addHomework(hwData) {
  const newHw = {
    id: Date.now(),
    ...hwData,
    createdAt: Date.now()
  };
  data.homework.push(newHw);
  saveData(data);
  return newHw;
}

function deleteHomework(id) {
  data.homework = data.homework.filter(h => h.id !== id);
  saveData(data);
}

function getTests() {
  return data.tests.sort((a, b) => b.id - a.id);
}

function addTest(testData) {
  const newTest = {
    id: Date.now(),
    ...testData,
    createdAt: Date.now()
  };
  data.tests.push(newTest);
  saveData(data);
  return newTest;
}

function deleteTest(id) {
  data.tests = data.tests.filter(t => t.id !== id);
  saveData(data);
}

function getStudyMaterials() {
  return data.studyMaterials.sort((a, b) => b.id - a.id);
}

function addStudyMaterial(smData) {
  const newSm = {
    id: Date.now(),
    ...smData,
    createdAt: Date.now()
  };
  data.studyMaterials.push(newSm);
  saveData(data);
  return newSm;
}

function deleteStudyMaterial(id) {
  data.studyMaterials = data.studyMaterials.filter(sm => sm.id !== id);
  saveData(data);
}

function getExamTimetable() {
  return data.examTimetable.sort((a, b) => a.date.localeCompare(b.date));
}

function addExamTimetable(examData) {
  const newExam = {
    id: Date.now(),
    ...examData,
    createdAt: Date.now()
  };
  data.examTimetable.push(newExam);
  saveData(data);
  return newExam;
}

function deleteExamTimetable(id) {
  data.examTimetable = data.examTimetable.filter(e => e.id !== id);
  saveData(data);
}

function getWeeklyTimetable() {
  return data.weeklyTimetable;
}

function addWeeklyTimetable(scheduleData) {
  const newSchedule = {
    id: Date.now(),
    ...scheduleData,
    createdAt: Date.now()
  };
  data.weeklyTimetable.push(newSchedule);
  saveData(data);
  return newSchedule;
}

function deleteWeeklyTimetable(id) {
  data.weeklyTimetable = data.weeklyTimetable.filter(s => s.id !== id);
  saveData(data);
}

function getAnnouncements(school) {
  if (school) {
    return data.announcements.filter(a => a.school === school).sort((a, b) => b.createdAt - a.createdAt);
  }
  return data.announcements.sort((a, b) => b.createdAt - a.createdAt);
}

function addAnnouncement(annData) {
  const newAnn = {
    id: Date.now(),
    ...annData,
    createdAt: Date.now()
  };
  data.announcements.push(newAnn);
  saveData(data);
  return newAnn;
}

function deleteAnnouncement(id) {
  data.announcements = data.announcements.filter(a => a.id !== id);
  saveData(data);
}

function getCourses() {
  return data.courses.sort((a, b) => a.name.localeCompare(b.name));
}

function addCourse(courseData) {
  const newCourse = {
    id: Date.now(),
    ...courseData,
    createdAt: Date.now()
  };
  data.courses.push(newCourse);
  saveData(data);
  return newCourse;
}

function deleteCourse(id) {
  data.courses = data.courses.filter(c => c.id !== id);
  saveData(data);
}

function loginStudent(username, password) {
  const student = data.students.find(s => s.username === username);
  if (student && student.password === password) {
    return { success: true, user: student, type: 'student' };
  }
  return { success: false };
}

function loginTeacher(username, password) {
  const teacher = data.teachers.find(t => t.username === username);
  if (teacher && teacher.password === password) {
    return { success: true, user: teacher, type: 'teacher' };
  }
  return { success: false };
}

function loginSchoolAdmin(username, password) {
  const school = data.schools.find(s => s.adminUsername === username);
  if (school && school.adminPassword === password) {
    return { success: true, user: school, type: 'school_admin' };
  }
  return { success: false };
}

module.exports = {
  getSchools, addSchool, updateSchool, deleteSchool,
  getTeachers, addTeacher, deleteTeacher,
  getStudents, addStudent, deleteStudent,
  getSubscriptions, addSubscription, deleteSubscription,
  getHomework, addHomework, deleteHomework,
  getTests, addTest, deleteTest,
  getStudyMaterials, addStudyMaterial, deleteStudyMaterial,
  getExamTimetable, addExamTimetable, deleteExamTimetable,
  getWeeklyTimetable, addWeeklyTimetable, deleteWeeklyTimetable,
  getAnnouncements, addAnnouncement, deleteAnnouncement,
  getCourses, addCourse, deleteCourse,
  loginStudent, loginTeacher, loginSchoolAdmin
};