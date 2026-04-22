const { Redis } = require('@upstash/redis');

let redis = null;

function getClient() {
  if (!redis && process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.log("Initializing Redis client with Upstash");
    console.log("Redis URL available:", !!process.env.UPSTASH_REDIS_REST_URL);
    console.log("Redis Token available:", !!process.env.UPSTASH_REDIS_REST_TOKEN);
    try {
      redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
      console.log("Redis client created successfully");
    } catch (e) {
      console.error("Error creating Redis client:", e.message);
      redis = null;
    }
  } else if (!process.env.UPSTASH_REDIS_REST_URL) {
    console.log("UPSTASH_REDIS_REST_URL not set - using in-memory fallback");
  } else if (!process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.log("UPSTASH_REDIS_REST_TOKEN not set - using in-memory fallback");
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
  courses: [],
  chat: [],
  notifications: [],
  pushSubscriptions: [],
  testResults: []
};

async function loadData() {
  const client = getClient();
  if (!client) {
    console.log("No Redis client - using default data");
    return defaultData;
  }
  try {
    console.log("Attempting to load data from Redis...");
    const data = await client.get('geleza_data');
    console.log("Redis load: raw data received:", typeof data, data ? "has data" : "null/empty");
    if (data) {
      const parsed = typeof data === 'string' ? JSON.parse(data) : data;
      console.log("Redis load: parsed data, entries:", Object.keys(parsed).map(k => `${k}: ${Array.isArray(parsed[k]) ? parsed[k].length : 'object'}`).join(', '));
      // Merge with defaultData to ensure all arrays exist
      return { ...defaultData, ...parsed };
    } else {
      console.log("Redis load: no data found, using default");
      return defaultData;
    }
  } catch (e) {
    console.error('Redis load error:', e.message);
    return defaultData;
  }
}

async function saveData(data) {
  const client = getClient();
  if (!client) {
    console.log("No Redis client - save skipped");
    return;
  }
  try {
    await client.set('geleza_data', JSON.stringify(data));
    console.log("Redis save: data saved successfully");
    clearCache();
  } catch (e) {
    console.error('Redis save error:', e.message);
  }
}

let cachedData = null;

function clearCache() {
  cachedData = null;
}

async function clearAllData() {
  console.log("Clearing all Redis data...");
  await saveData(defaultData);
  cachedData = null;
  console.log("All data cleared successfully");
}

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
  console.log("redis.js: addTeacher called with:", teacherData);
  const d = await getData();
  console.log("redis.js: current data teachers count:", d.teachers.length);
  const newTeacher = {
    id: Date.now(),
    ...teacherData,
    status: 'Active',
    schoolYear: 2026,
    createdAt: Date.now()
  };
  console.log("redis.js: new teacher object:", newTeacher);
  d.teachers.push(newTeacher);
  await saveData(d);
  console.log("redis.js: teacher saved, total teachers:", d.teachers.length);
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

/**
 * @param {string} [school]
 */
function getTests(school) {
  return getData().then(d => {
    if (school) {
      return d.tests.filter(t => t.school === school).sort((a, b) => b.id - a.id);
    }
    return d.tests.sort((a, b) => b.id - a.id);
  });
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

async function updateTest(id, updates) {
  const d = await getData();
  const idx = d.tests.findIndex(t => t.id === id);
  if (idx !== -1) {
    d.tests[idx] = { ...d.tests[idx], ...updates };
    await saveData(d);
    return d.tests[idx];
  }
}

/**
 * @param {string} [school]
 */
function getTestResults(school) {
  return getData().then(d => {
    let results = d.testResults || [];
    if (school) {
      results = results.filter(r => r.school === school);
    }
    return results.sort((a, b) => b.takenAt - a.takenAt);
  });
}

function addTestResult(resultData) {
  return getData().then(d => {
    const newResult = { id: Date.now(), ...resultData, takenAt: Date.now() };
    if (!d.testResults) d.testResults = [];
    d.testResults.push(newResult);
    saveData(d);
    return newResult;
  });
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

/**
 * @param {string} [school]
 */
function getExamTimetable(school) {
  return getData().then(d => {
    if (school) {
      return d.examTimetable.filter(et => et.school === school).sort((a, b) => b.id - a.id);
    }
    return d.examTimetable.sort((a, b) => b.id - a.id);
  });
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

/**
 * @param {string} [school]
 */
function getWeeklyTimetable(school) {
  return getData().then(d => {
    if (school) {
      return d.weeklyTimetable.filter(wt => wt.school === school).sort((a, b) => b.id - a.id);
    }
    return d.weeklyTimetable.sort((a, b) => b.id - a.id);
  });
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

function getChat(school, grade) {
  return getData().then(d => {
    let messages = d.chat;
    if (school) messages = messages.filter(m => m.school === school);
    if (grade) messages = messages.filter(m => m.grade === grade);
    return messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  });
}

async function addChatMessage(msgData) {
  const d = await getData();
  const newMsg = { id: Date.now(), ...msgData, timestamp: new Date().toISOString() };
  d.chat.push(newMsg);
  await saveData(d);
  return newMsg;
}

async function deleteChatMessage(id) {
  const d = await getData();
  d.chat = d.chat.filter(m => m.id !== id);
  await saveData(d);
}

async function updateChatMessage(id, updates) {
  const d = await getData();
  const idx = d.chat.findIndex(m => m.id === id);
  if (idx !== -1) {
    d.chat[idx] = { ...d.chat[idx], ...updates };
    await saveData(d);
  }
}

function getNotifications(userId, userType) {
  return getData().then(d => {
    console.log("getNotifications: data keys:", Object.keys(d));
    console.log("getNotifications: notifications exists:", !!d.notifications);
    console.log("getNotifications: notifications type:", typeof d.notifications);
    console.log("getNotifications: notifications length:", Array.isArray(d.notifications) ? d.notifications.length : 'not array');

    if (!Array.isArray(d.notifications)) {
      console.log("getNotifications: notifications is not array, using empty array");
      return [];
    }

    const filtered = d.notifications
      .filter(n => n.recipientId === userId && n.recipientType === userType)
      .sort((a, b) => b.createdAt - a.createdAt);

    console.log("getNotifications: filtered results:", filtered.length);
    return filtered;
  });
}

async function addNotification(notificationData) {
  const d = await getData();
  const notification = {
    id: Date.now(),
    ...notificationData,
    read: false,
    createdAt: Date.now()
  };
  d.notifications.push(notification);
  await saveData(d);
  return notification;
}

async function markNotificationAsRead(id) {
  const d = await getData();
  const idx = d.notifications.findIndex(n => n.id === id);
  if (idx !== -1) {
    d.notifications[idx].read = true;
    await saveData(d);
  }
}

async function deleteNotification(id) {
  const d = await getData();
  d.notifications = d.notifications.filter(n => n.id !== id);
  await saveData(d);
}

function getUnreadNotificationsCount(userId, userType) {
  return getData().then(d =>
    d.notifications.filter(n =>
      n.recipientId === userId &&
      n.recipientType === userType &&
      !n.read
    ).length
  );
}

function getPushSubscriptions(userId, userType) {
  return getData().then(d =>
    d.pushSubscriptions.filter(s => s.userId === userId && s.userType === userType)
  );
}

async function addPushSubscription(subscriptionData) {
  const d = await getData();
  const subscription = {
    id: Date.now(),
    ...subscriptionData,
    createdAt: Date.now()
  };
  d.pushSubscriptions.push(subscription);
  await saveData(d);
  return subscription;
}

async function removePushSubscription(userId, userType) {
  const d = await getData();
  d.pushSubscriptions = d.pushSubscriptions.filter(s => !(s.userId === userId && s.userType === userType));
  await saveData(d);
}

// ES6 exports
export {
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
  updateTest,
  deleteTest,
  getTestResults,
  addTestResult,
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
  addCourse,
  getChat,
  addChatMessage,
  deleteChatMessage,
  updateChatMessage,
  getNotifications,
  addNotification,
  markNotificationAsRead,
  deleteNotification,
  getUnreadNotificationsCount,
  getPushSubscriptions,
  addPushSubscription,
  removePushSubscription,
  getData,
  clearCache,
  clearAllData
};