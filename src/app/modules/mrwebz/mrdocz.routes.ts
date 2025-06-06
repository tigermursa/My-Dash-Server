import express from 'express';
import {
  createWebsiteHandler,
  getAllWebsitesHandler,
  getWebsiteByIdHandler,
  updateWebsiteHandler,
  deleteWebsiteHandler,
  softDeleteWebsiteHandler,
} from './mrdocz.controller';

const MrWebzRoutes = express.Router();

MrWebzRoutes.post('/', createWebsiteHandler);
MrWebzRoutes.get('/', getAllWebsitesHandler);
MrWebzRoutes.get('/:id', getWebsiteByIdHandler);
MrWebzRoutes.patch('/:id', updateWebsiteHandler);
MrWebzRoutes.delete('/:id', deleteWebsiteHandler);
MrWebzRoutes.patch('/:id/soft-delete', softDeleteWebsiteHandler);
export default MrWebzRoutes;
