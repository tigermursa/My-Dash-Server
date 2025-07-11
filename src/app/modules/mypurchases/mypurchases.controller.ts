import { Request, Response, NextFunction } from 'express';
import { MyPurchasesService } from './mypurchases.services';
import { IProduct } from './mypurchases.interface';

// Handler to create a new purchase
const createPurchaseHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload: Omit<IProduct, 'id' | 'usingDays'> = req.body;
    const created = await MyPurchasesService.create(payload);
    return res.status(201).json({ success: true, data: created });
  } catch (error) {
    return next(error);
  }
};

// Handler to get all purchases
const getAllPurchasesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await MyPurchasesService.getAll();
    return res.json({ success: true, data: products });
  } catch (error) {
    return next(error);
  }
};

// Handler to get a purchase by ID
const getPurchaseByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = req.params.id;
    const product = await MyPurchasesService.getById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    return res.json({ success: true, data: product });
  } catch (error) {
    return next(error);
  }
};

// Handler to update a purchase by ID
const updatePurchaseHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = req.params.id;
    const updateData: Partial<Omit<IProduct, 'id' | 'usingDays'>> = req.body;
    const updated = await MyPurchasesService.updateById(productId, updateData);
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    return res.json({ success: true, data: updated });
  } catch (error) {
    return next(error);
  }
};

// Handler to delete a purchase by ID
const deletePurchaseHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = req.params.id;
    const deleted = await MyPurchasesService.deleteById(productId);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    return res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

export const PurchaseController = {
  createPurchaseHandler,
  getAllPurchasesHandler,
  getPurchaseByIdHandler,
  updatePurchaseHandler,
  deletePurchaseHandler,
};
