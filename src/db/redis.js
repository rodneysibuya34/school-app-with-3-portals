const { Redis } = require('@upstash/redis');

let redis = null;

function getClient() {
  if (!redis && process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  return redis;
}

const defaultData = {
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

async function loadData() {
  const client = getClient();
  if (!client) return defaultData;
  try {
    const data = await client.get('geleza_data');
    return data || defaultData;
  } catch (e) {
    console.error('Redis load error:', e.message);
    return defaultData;
  }
}

async function saveData(data) {
  const client = getClient();
  if (!client) return;
  try {
    await client.set('geleza_data', JSON.stringify(data));
  } catch (e) {
    console.error('Redis save error:', e.message);
  }
}

let cachedData = null;

async function getData() {
  if (!cachedData) {
    cachedData = await loadData();
  }
  return cachedData;
}

function getSchools() {
  return getData().then(d => d.schools.sort((a, b) => b.id - a.id));
}

async function addSchool(schoolData) {
  const d = await getData();
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
  d.schools.push(newSchool);
  await saveData(d);
  return newSchool;
}

async function updateSchool(id, updates) {
  const d = await getData();
  const idx = d.schools.findIndex(s => s.id === id);
  if (idx !== -1) {
    d.schools[idx] = { ...d.schools[idx], ...updates };
    await saveData(d);
  }
}

async function deleteSchool(id) {
  const d = await getData();
  d.schools = d.schools.filter(s => s.id !== id);
  await saveData(d);
}

function getTeachers() {
  return getData().then(d => d.teachers.sort((a, b) => b.id - a.id));
}

async function addTeacher(teacherData) {
  const d = await getData();
  const newTeacher = {
    id: Date.now(),
    ...teacherData,
    status: 'Active',
    schoolYear: 2026,
    createdAt: Date.now()
  };
  d.teachers.push(newTeacher);
  await saveData(d);
  return newTeacher;
}

async function updateTeacher(id, updates) {
  const d = await getData();
  const idx = d.teachers.findIndex(t => t.id === id);
  if (idx !== -1) {
    d.teachers[idx] = { ...d.teachers[idx], ...updates };
    await saveData(d);
  }
}

async function deleteTeacher(id) {
  const d = await getData();
  d.teachers = d.teachers.filter(t => t.id !== id);
  await saveData(d);
}

function getStudents() {
  return getData().then(d => d.students.sort((a, b) => b.id - a.id));
}

async function addStudent(studentData) {
  const d = await getData();
  const newStudent = {
    id: Date.now(),
    ...studentData,
    status: 'Active',
    schoolYear: 2026,
    createdAt: Date.now()
  };
  d.students.push(newStudent);
  await saveData(d);
  return newStudent;
}

async function updateStudent(id, updates) {
  const d = await getData();
  const idx = d.students.findIndex(s => s.id === id);
  if (idx !== -1) {
    d.students[idx] = { ...d.students[idx], ...updates };
    await saveData(d);
  }
}

async function deleteStudent(id) {
  const d = await getData();
  d.students = d.students.filter(s => s.id !== id);
  await saveData(d);
}

function getSubscriptions() {
  return getData().then(d => d.subscriptions);
}

async function addSubscription(subData) {
  const d = await getData();
  const newSub = {
    id: Date.now(),
    ...subData,
    createdAt: Date.now()
  };
  d.subscriptions.push(newSub);
  await saveData(d);
  return newSub;
}

async function deleteSubscription(id) {
  const d = await getData();
  d.subscriptions = d.subscriptions.filter(s => s.id !== id);
  await saveData(d);
}

async function loginStudent(username, password) {
  const d = await getData();
  const student = d.students.find(s => s.username === username && s.password === password);
  return student || null;
}

async function loginTeacher(username, password) {
  const d = await getData();
  const teacher = d.teachers.find(t => t.username === username && t.password === password);
  return teacher || null;
}

async function loginSchoolAdmin(username, password) {
  const d = await getData();
  const school = d.schools.find(s => s.adminUsername === username && s.adminPassword === password);
  return school || null;
}

function getHomework(school) {
  return getData().then(d => {
    if (school) {
      return d.homework.filter(h => h.school === school).sort((a, b) => b.id - a.id);
    }
    return d.homework.sort((a, b) => b.id - a.id);
  });
}

async function addHomework(hwData) {
  const d = await getData();
  const newHw = { id: Date.now(), ...hwData, createdAt: Date.now() };
  d.homework.push(newHw);
  await saveData(d);
  return newHw;
}

async function deleteHomework(id) {
  const d = await getData();
  d.homework = d.homework.filter(h => h.id !== id);
  await saveData(d);
}

function getTests() {
  return getData().then(d => d.tests.sort((a, b) => b.id - a.id));
}

async function addTest(testData) {
  const d = await getData();
  const newTest = { id: Date.now(), ...testData, createdAt: Date.now() };
  d.tests.push(newTest);
  await saveData(d);
  return newTest;
}

async function deleteTest(id) {
  const d = await getData();
  d.tests = d.tests.filter(t => t.id !== id);
  await saveData(d);
}

function getStudyMaterials() {
  return getData().then(d => d.studyMaterials.sort((a, b) => b.id - a.id));
}

async function addStudyMaterial(smData) {
  const d = await getData();
  const newSm = { id: Date.now(), ...smData, createdAt: Date.now() };
  d.studyMaterials.push(newSm);
  await saveData(d);
  return newSm;
}

async function deleteStudyMaterial(id) {
  const d = await getData();
  d.studyMaterials = d.studyMaterials.filter(sm => sm.id !== id);
  await saveData(d);
}

function getExamTimetable() {
  return getData().then(d => d.examTimetable.sort((a, b) => b.id - a.id));
}

async function addExamTimetable(etData) {
  const d = await getData();
  const newEt = { id: Date.now(), ...etData, createdAt: Date.now() };
  d.examTimetable.push(newEt);
  await saveData(d);
  return newEt;
}

async function deleteExamTimetable(id) {
  const d = await getData();
  d.examTimetable = d.examTimetable.filter(et => et.id !== id);
  await saveData(d);
}

function getWeeklyTimetable() {
  return getData().then(d => d.weeklyTimetable.sort((a, b) => b.id - a.id));
}

async function addWeeklyTimetable(wtData) {
  const d = await getData();
  const newWt = { id: Date.now(), ...wtData, createdAt: Date.now() };
  d.weeklyTimetable.push(newWt);
  await saveData(d);
  return newWt;
}

async function deleteWeeklyTimetable(id) {
  const d = await getData();
  d.weeklyTimetable = d.weeklyTimetable.filter(wt => wt.id !== id);
  await saveData(d);
}

function getAnnouncements(school) {
  return getData().then(d => {
    if (school) {
      return d.announcements.filter(a => a.school === school).sort((a, b) => b.id - a.id);
    }
    return d.announcements.sort((a, b) => b.id - a.id);
  });
}

async function addAnnouncement(annData) {
  const d = await getData();
  const newAnn = { id: Date.now(), ...annData, createdAt: Date.now() };
  d.announcements.push(newAnn);
  await saveData(d);
  return newAnn;
}

async function deleteAnnouncement(id) {
  const d = await getData();
  d.announcements = d.announcements.filter(a => a.id !== id);
  await saveData(d);
}

function getCourses() {
  return getData().then(d => d.courses.sort((a, b) => b.id - a.id));
}

async function addCourse(courseData) {
  const d = await getData();
  const newCourse = { id: Date.now(), ...courseData, createdAt: Date.now() };
  d.courses.push(newCourse);
  await saveData(d);
  return newCourse;
}

module.exports = {
  getSchools,
  addSchool,
  updateSchool,
  deleteSchool,
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getSubscriptions,
  addSubscription,
  deleteSubscription,
  loginStudent,
  loginTeacher,
  loginSchoolAdmin,
  getHomework,
  addHomework,
  deleteHomework,
  getTests,
  addTest,
  deleteTest,
  getStudyMaterials,
  addStudyMaterial,
  deleteStudyMaterial,
  getExamTimetable,
  addExamTimetable,
  deleteExamTimetable,
  getWeeklyTimetable,
  addWeeklyTimetable,
  deleteWeeklyTimetable,
  getAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
  getCourses,
  addCourse
};