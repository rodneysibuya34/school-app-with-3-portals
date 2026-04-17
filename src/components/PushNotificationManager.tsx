"use client";

import { useState, useEffect } from "react";
import { Bell, BellOff, Settings } from "lucide-react";

interface PushNotificationManagerProps {
  userId: string;
  userType: string;
}

export default function PushNotificationManager({ userId, userType }: PushNotificationManagerProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if push notifications are supported
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);

      // Check if already subscribed
      checkSubscriptionStatus();
    }

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (error) {
      console.error('Error checking subscription status:', error);
    }
  };

  const requestPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Error requesting permission:', error);
      return false;
    }
  };

  const subscribeToNotifications = async () => {
    setLoading(true);
    try {
      // Request permission first
      const granted = await requestPermission();
      if (!granted) {
        alert('Notification permission denied. Please enable notifications in your browser settings.');
        return;
      }

      const registration = await navigator.serviceWorker.ready;

      // You'll need to get these from your push service (like Firebase, OneSignal, etc.)
      // For demo purposes, we'll use a placeholder
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 'placeholder-key';

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey
      });

      // Send subscription to your server
      const response = await fetch('/api/push-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          userType,
          subscription: subscription.toJSON()
        })
      });

      if (response.ok) {
        setIsSubscribed(true);
        alert('Push notifications enabled! You\'ll now receive notifications for new content.');
      } else {
        throw new Error('Failed to save subscription');
      }
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      alert('Failed to enable push notifications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const unsubscribeFromNotifications = async () => {
    setLoading(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();

        // Remove subscription from server
        await fetch('/api/push-subscription', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, userType })
        });

        setIsSubscribed(false);
        alert('Push notifications disabled.');
      }
    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error);
      alert('Failed to disable push notifications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const testNotification = () => {
    if (permission === 'granted') {
      new Notification('Test Notification', {
        body: 'This is a test push notification from Geleza Mzansi!',
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png'
      });
    } else {
      alert('Please enable notifications first.');
    }
  };

  if (!isSupported) {
    return (
      <div className="flex items-center gap-2 text-slate-400 text-sm">
        <BellOff className="w-4 h-4" />
        <span>Push notifications not supported</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={isSubscribed ? unsubscribeFromNotifications : subscribeToNotifications}
        disabled={loading}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isSubscribed
            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
            : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={isSubscribed ? 'Disable push notifications' : 'Enable push notifications'}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : isSubscribed ? (
          <Bell className="w-4 h-4" />
        ) : (
          <BellOff className="w-4 h-4" />
        )}
        <span>{loading ? 'Loading...' : isSubscribed ? 'Enabled' : 'Enable'}</span>
      </button>

      {isSubscribed && (
        <button
          onClick={testNotification}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-slate-500/20 text-slate-400 hover:bg-slate-500/30 transition-colors"
          title="Test notification"
        >
          <Settings className="w-4 h-4" />
          <span>Test</span>
        </button>
      )}

      {permission === 'denied' && (
        <span className="text-red-400 text-sm">
          Notifications blocked. Enable in browser settings.
        </span>
      )}
    </div>
  );
}