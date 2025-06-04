import { Request, Response } from 'express';
import * as locationService from '../services/locationManager';

export const setLocation = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { latitude, longitude } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ message: 'Latitude and longitude must be numbers.' });
    }

    await locationService.saveLocation(userId, latitude, longitude);

    res.status(200).json({ message: 'Location saved successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};