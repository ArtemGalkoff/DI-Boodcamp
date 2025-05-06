import { Request, Response } from 'express';
import { addContributor, getContributors, removeContributor } from '../models/contributorModel';

export const addContributorController = async (req: Request, res: Response): Promise<void> => {
  const { story_id, user_id } = req.body;
  try {
    const contributor = await addContributor(story_id, user_id);
    res.status(200).json(contributor);
  } catch (error) {
    res.status(500).json({ message: 'Error adding contributor' });
  }
};

export const getContributorsController = async (req: Request, res: Response): Promise<void> => {
  const { story_id } = req.params;
  try {
    const contributors = await getContributors(story_id);
    res.status(200).json(contributors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contributors' });
  }
};

export const removeContributorController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await removeContributor(id);
    res.status(200).json({ message: 'Contributor removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing contributor' });
  }
};