import express from 'express';
import {
  createDocumentHandler,
  getAllDocumentsHandler,
  getDocumentByIdHandler,
  updateDocumentHandler,
  deleteDocumentHandler,
} from './mrdocz.controller';

const MrDoczROutes = express.Router();

MrDoczROutes.post('/', createDocumentHandler);
MrDoczROutes.get('/', getAllDocumentsHandler);
MrDoczROutes.get('/:id', getDocumentByIdHandler);
MrDoczROutes.patch('/:id', updateDocumentHandler);
MrDoczROutes.delete('/:id', deleteDocumentHandler);

export default MrDoczROutes;
