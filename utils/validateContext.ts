import { ContextSchema } from '@utils/types';

export function validateContext(context: any) {
  const validatedContext = ContextSchema.safeParse(context);
  if (!validatedContext.success) {
    throw new Error('Invalid context');
  }

  const { id } = validatedContext.data.params;

  return id;
}
