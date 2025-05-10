import { RequestHandler } from 'express';
import { WebsiteService } from './mrdocz.services';

export const createWebsiteHandler: RequestHandler = async (req, res, next) => {
  try {
    const { name, url, category } = req.body;
    const created = await WebsiteService.create({ name, url, category });
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
};

export const getAllWebsitesHandler: RequestHandler = async (req, res, next) => {
  try {
    const sites = await WebsiteService.getAll();
    res.json({ success: true, data: sites });
  } catch (err) {
    next(err);
  }
};

export const getWebsiteByIdHandler: RequestHandler = async (req, res, next) => {
  try {
    const site = await WebsiteService.getById(req.params.id);
    if (!site) {
      res.status(404).json({ success: false, message: 'Website not found' });
      return;
    }
    res.json({ success: true, data: site });
  } catch (err) {
    next(err);
  }
};

export const updateWebsiteHandler: RequestHandler = async (req, res, next) => {
  try {
    const updated = await WebsiteService.updateById(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, message: 'Website not found' });
      return;
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteWebsiteHandler: RequestHandler = async (req, res, next) => {
  try {
    const deleted = await WebsiteService.deleteById(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Website not found' });
      return;
    }
    res.json({ success: true, message: 'Website deleted' });
  } catch (err) {
    next(err);
  }
};
