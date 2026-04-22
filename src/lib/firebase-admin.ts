import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
  }
}

export default admin;

export async function sendPushNotification(fcmToken: string, title: string, body: string, data?: Record<string, string>) {
  if (!fcmToken) return;
  
  try {
    const message = {
      notification: {
        title,
        body,
      },
      token: fcmToken,
      data: data || {},
      webpush: {
        notification: {
          icon: '/icon-192x192.png',
          badge: '/icon-192x192.png',
        },
        fcmOptions: {
          link: data?.url || '/student',
        },
      },
    };

    const response = await admin.messaging().send(message);
    console.log('Push notification sent:', response);
    return response;
  } catch (error) {
    console.error('Error sending push notification:', error);
    throw error;
  }
}

export async function sendPushToUser(userId: string, userType: string, title: string, body: string, data?: Record<string, string>) {
  const db = require('@/db/redis');
  
  try {
    const subscriptions = await db.getPushSubscriptions(userId, userType);
    
    for (const sub of subscriptions) {
      if (sub.fcmToken) {
        await sendPushNotification(sub.fcmToken, title, body, data);
      }
    }
  } catch (error) {
    console.error('Error sending push to user:', error);
  }
}

export async function sendPushToClass(school: string, grade: number, title: string, body: string, data?: Record<string, string>) {
  const db = require('@/db/redis');
  
  try {
    const subscriptions = await db.getPushSubscriptionsByGrade(school, grade);
    
    for (const sub of subscriptions) {
      if (sub.fcmToken) {
        await sendPushNotification(sub.fcmToken, title, body, data);
      }
    }
  } catch (error) {
    console.error('Error sending push to class:', error);
  }
}