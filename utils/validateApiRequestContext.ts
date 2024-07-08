import { ApiResponseContextSchema } from '@utils/types';

export function validateApiRequestContext(context: any) {
  const validatedContext = ApiResponseContextSchema.safeParse(context);

  if (!validatedContext.success) {
    throw new Error('Invalid context');
  }

  return validatedContext.data.params;
}
