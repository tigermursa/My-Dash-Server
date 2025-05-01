// app/modules/mrdocs/mrdocz.controller.ts

import { RequestHandler } from 'express';
import { DocumentService } from './mrdocz.services';

export const createDocumentHandler: RequestHandler = async (req, res, next) => {
  try {
    const { name, url, category } = req.body;
    const created = await DocumentService.create({ name, url, category });
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
};

export const getAllDocumentsHandler: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const docs = await DocumentService.getAll();
    res.json({ success: true, data: docs });
  } catch (err) {
    next(err);
  }
};

export const getDocumentByIdHandler: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const doc = await DocumentService.getById(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, message: 'Document not found' });
      return;
    }
    res.json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
};

export const updateDocumentHandler: RequestHandler = async (req, res, next) => {
  try {
    const updated = await DocumentService.updateById(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, message: 'Document not found' });
      return;
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteDocumentHandler: RequestHandler = async (req, res, next) => {
  try {
    const deleted = await DocumentService.deleteById(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Document not found' });
      return;
    }
    res.json({ success: true, message: 'Document deleted' });
  } catch (err) {
    next(err);
  }
};
