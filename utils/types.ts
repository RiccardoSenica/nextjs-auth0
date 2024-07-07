import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  deleted: z.boolean(),
  createdAt: z.date().transform(date => date.toISOString()),
  updatedAt: z.date().transform(date => date.toISOString())
});

export type User = z.infer<typeof UserSchema>;

export const CustomerFormSchema = z.object({
  id: z.string(),
  type: z.string(),
  text: z.string(),
  createdAt: z.date().transform(date => date.toISOString()),
  updatedAt: z.date().transform(date => date.toISOString())
});

export const CustomerFormListSchema = z.array(CustomerFormSchema);

export type CustomerForm = z.infer<typeof CustomerFormSchema>;
