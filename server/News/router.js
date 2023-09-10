import { Router } from 'express';
import NewsController from './controller.js';

const NewsRouter = Router();

NewsRouter.get('/get', NewsController.getNews);
NewsRouter.get('/get/:id', NewsController.getByID);

NewsRouter.post('/add', NewsController.addNews);

// module.exports = NewsRouter;
export default NewsRouter;
