import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getMessaging, getToken, Messaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let messaging: Messaging | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (!app && typeof window !== 'undefined') {
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
  }
  return app!;
}

export function getFirebaseMessaging(): Messaging | null {
  if (!messaging && typeof window !== 'undefined') {
    try {
      app = getFirebaseApp();
      if (app) {
        messaging = getMessaging(app);
      }
    } catch (error) {
      console.error('Error initializing Firebase Messaging:', error);
    }
  }
  return messaging;
}

export async function getFCMToken(): Promise<string | null> {
  const messaging = getFirebaseMessaging();
  if (!messaging) return null;
  
  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
}

export function onFirebaseMessage(callback: (payload: any) => void) {
  const messaging = getFirebaseMessaging();
  if (messaging) {
    onMessage(messaging, callback);
  }
}