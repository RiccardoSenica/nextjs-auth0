import { z } from 'zod';

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

export const ContextSchema = z.object({
  params: z.object({
    id: z.string()
  })
});
