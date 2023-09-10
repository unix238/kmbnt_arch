import { Router } from 'express';
import authMiddleware from './middleware/authMiddleware.js';
import adminMiddleware from './middleware/adminMiddleware.js';
import ItemController from './controller.js';

const ItemRouter = Router();

ItemRouter.get('/get', ItemController.getItems);
ItemRouter.get('/get/:id', ItemController.getByID);
ItemRouter.get('/tags', ItemController.getAllTags);
ItemRouter.get('/tag/:id', ItemController.getTagByID);
ItemRouter.get('/categories', ItemController.getAllCategories);
ItemRouter.get('/get/tag', ItemController.getItemsByTag);
ItemRouter.get('/get/category/:id', ItemController.getItemsByCategory);
ItemRouter.get('/brands', ItemController.getBrands);

ItemRouter.post('/categories/add', ItemController.addCategory);
ItemRouter.post(
  '/add',
  [authMiddleware, adminMiddleware],
  ItemController.addItem
);

ItemRouter.post('/tag/add', ItemController.addTag);

ItemRouter.post('/brands/add', ItemController.addBrand);

ItemRouter.post('/get/filters', ItemController.getFilteredItems);

ItemRouter.get('/basket-items', ItemController.getBasketItems);

export default ItemRouter;
