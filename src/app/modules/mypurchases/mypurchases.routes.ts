import { Router, RequestHandler } from 'express';
import { PurchaseController } from './mypurchases.controller';

const MyPurchases = Router();

const {
  createPurchaseHandler,
  getAllPurchasesHandler,
  getPurchaseByIdHandler,
  updatePurchaseHandler,
  deletePurchaseHandler,
} = PurchaseController;

MyPurchases.post('/purchases', createPurchaseHandler as RequestHandler);

MyPurchases.get('/purchases', getAllPurchasesHandler as RequestHandler);

MyPurchases.get('/purchases/:id', getPurchaseByIdHandler as RequestHandler);

MyPurchases.put('/purchases/:id', updatePurchaseHandler as RequestHandler);

MyPurchases.delete('/purchases/:id', deletePurchaseHandler as RequestHandler);

export default MyPurchases;
