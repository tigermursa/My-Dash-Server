import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { MyPurchasesService } from './mypurchases.services';

export const createPurchaseHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    const { name, url, purchaseDate, warranty, guarantee, price } = req.body;
    const created = await MyPurchasesService.create({
      name,
      url,
      purchaseDate,
      warranty,
      guarantee,
      price,
    });
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
};

export const getAllPurchasesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await MyPurchasesService.getAll();
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
};

export const getPurchaseByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await MyPurchasesService.getById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const updatePurchaseHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    const updated = await MyPurchasesService.updateById(
      req.params.id,
      req.body,
    );
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

export const deletePurchaseHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deleted = await MyPurchasesService.deleteById(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};
