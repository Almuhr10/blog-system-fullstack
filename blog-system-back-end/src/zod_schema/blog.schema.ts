import { z } from 'zod';

export const addBlogSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required !',
        invalid_type_error: 'Title must be a string',
      })
      .min(2, 'Title must be more than 2 characters'),
    message: z
      .string({
        required_error: 'Message is required !',
        invalid_type_error: 'Message must be a string',
      })
      .min(4, 'Message must be more than 4 characters'),
  }),
});

export const deleteBlogSchema = z.object({
  params: z.object({
    blogid: z.string({
      required_error: 'id is required !',
      invalid_type_error: 'Blog id must be a string',
    }),
  }),
});

export type deleteBlogSchemaType = z.infer<typeof deleteBlogSchema>['params'];
