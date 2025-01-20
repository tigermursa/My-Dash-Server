import { Request, Response } from 'express';
import {
  getContentNotePad,
  getContentIdea,
  updateContentNotePad,
  updateContentIdea,
  clearContentNotePad,
  clearContentIdea,
} from './notepad.service';

export const getContentNotePadController = async (
  req: Request,
  res: Response,
) => {
  const { userId } = req.params;
  try {
    const data = await getContentNotePad(userId);
    res.json(data || { contentNotePad: '' });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contentNotePad' });
  }
};

export const getContentIdeaController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const data = await getContentIdea(userId);
    res.json(data || { contentIdea: '' });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contentIdea' });
  }
};

export const updateContentNotePadController = async (
  req: Request,
  res: Response,
) => {
  const { userId } = req.params;
  const { contentNotePad } = req.body;
  try {
    const updated = await updateContentNotePad(userId, contentNotePad);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error updating contentNotePad' });
  }
};

export const updateContentIdeaController = async (
  req: Request,
  res: Response,
) => {
  const { userId } = req.params;
  const { contentIdea } = req.body;
  try {
    const updated = await updateContentIdea(userId, contentIdea);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error updating contentIdea' });
  }
};

export const clearContentNotePadController = async (
  req: Request,
  res: Response,
) => {
  const { userId } = req.params;
  try {
    const cleared = await clearContentNotePad(userId);
    res.json(cleared);
  } catch (error) {
    res.status(500).json({ error: 'Error clearing contentNotePad' });
  }
};

export const clearContentIdeaController = async (
  req: Request,
  res: Response,
) => {
  const { userId } = req.params;
  try {
    const cleared = await clearContentIdea(userId);
    res.json(cleared);
  } catch (error) {
    res.status(500).json({ error: 'Error clearing contentIdea' });
  }
};
