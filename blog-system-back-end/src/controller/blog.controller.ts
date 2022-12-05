import { Blog } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { IUser } from '../middleware/auth';
import { deleteBlogSchemaType } from '../zod_schema/blog.schema';

export const getAllBlogHandler = async (req: Request, res: Response) => {
  const user = res.locals.user as IUser;

  const blogList = await prisma.blog.findMany({
    where: { user_id: user.id },
  });

  return res.status(200).json(blogList);
};

export const addBlogHandler = async (req: Request, res: Response) => {
  try {
    const { title, message } = req.body as Blog;
    const user = res.locals.user as IUser;

    await prisma.blog.create({
      data: {
        title,
        message,
        user_id: user.id,
      },
    });
    return res
      .status(201)
      .json({ msg: 'New blog has created for user : ' + user.id });
  } catch (error) {
    console.log(error);
    const prismaError = error as PrismaClientKnownRequestError;
    return res.status(400).json({
      message: prismaError.message,
    });
  }
};

export const deleteBlogHandler = async (req: Request, res: Response) => {
  const user = res.locals.user as IUser;
  const { blogid } = req.params as deleteBlogSchemaType;

  const deleteCount = await prisma.blog.deleteMany({
    where: {
      id: blogid,
      user_id: user.id,
    },
  });

  if (deleteCount.count == 0) {
    return res.status(400).json({ msg: 'Invalid blog id !' });
  }
  return res.status(200).json({ msg: 'Blog has deleted' });
};
