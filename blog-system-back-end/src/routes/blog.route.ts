import express from 'express';
import {
  addBlogHandler,
  deleteBlogHandler,
  getAllBlogHandler,
} from '../controller/blog.controller';

import { protect } from '../middleware/auth';
import validate from '../middleware/validate';
import { addBlogSchema, deleteBlogSchema } from '../zod_schema/blog.schema';

const router = express.Router();

router.get('/', protect, getAllBlogHandler);
router.post('/', protect, validate(addBlogSchema), addBlogHandler);
router.delete(
  '/:blogid',
  protect,
  validate(deleteBlogSchema),
  deleteBlogHandler
);

export default router;
