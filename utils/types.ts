import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  deleted: z.boolean(),
  createdAt: z.string().transform(arg => new Date(arg)),
  updatedAt: z.string().transform(arg => new Date(arg))
});

export type User = z.infer<typeof UserSchema>;

export const CustomerFormCreateSchema = z.object({
  type: z.string(),
  text: z.string()
});

export type CustomerFormCreate = z.infer<typeof CustomerFormCreateSchema>;

export const CustomerFormSchema = z.object({
  id: z.string(),
  type: z.string(),
  text: z.string(),
  createdAt: z.string().transform(arg => new Date(arg)),
  updatedAt: z.string().transform(arg => new Date(arg))
});

export const CustomerFormListSchema = z.array(CustomerFormSchema);

export type CustomerForm = z.infer<typeof CustomerFormSchema>;
