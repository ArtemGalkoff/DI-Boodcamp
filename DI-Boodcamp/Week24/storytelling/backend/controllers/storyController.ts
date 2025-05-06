import { Request, Response } from 'express';
import { createStory, getAllStories, updateStory, deleteStory } from '../models/storyModel';

export const getStories = async (req: Request, res: Response) => {
  try {
    const stories = await getAllStories();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stories' });
  }
};

export const createStoryController = async (req: Request, res: Response) => {
  const { title, content, author_id } = req.body;
  try {
    const newStory = await createStory(title, content, author_id);
    res.status(201).json(newStory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating story' });
  }
};

export const updateStoryController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedStory = await updateStory(id, title, content);
    res.status(200).json(updatedStory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating story' });
  }
};

export const deleteStoryController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteStory(id);
    res.status(200).json({ message: 'Story deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting story' });
  }
};