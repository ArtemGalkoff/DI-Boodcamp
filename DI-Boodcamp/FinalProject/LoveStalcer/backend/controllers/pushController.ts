import webpush, { PushSubscription } from 'web-push';
import { Request, Response } from 'express';

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY!;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY!;
const VAPID_EMAIL = 'mailto:admin@example.com';

webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

const subscriptions = new Map<number, PushSubscription>();

export const registerPush = (req: Request, res: Response): void => {
  const { userId, subscription } = req.body;

  if (!userId || !subscription || !subscription.keys) {
    res.status(400).json({ error: 'Missing userId or valid subscription' });
    return;
  }

  subscriptions.set(userId, subscription);
  res.status(201).json({ message: 'Subscription registered' });
};

export const sendPushToUser = async (userId: number, payload: object): Promise<void> => {
  const subscription = subscriptions.get(userId);
  if (!subscription) return;

  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
  } catch (error) {
      console.error(`Sending push error ${userId}:`, error);
  }
};

export const removePush = (req: Request, res: Response): void => {
  const { userId } = req.body;
  subscriptions.delete(userId);
  res.status(200).json({ message: 'Subscription removed' });
};