import { z } from 'zod';

export const ZodCreateTaskAndProduct = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  quantity: z.coerce.number().min(1),
  value: z.coerce.number().min(1),
});

export const ZodObservation = z.object({
  observation: z.string().min(3),
});

export const ZodLoginValidation = z.object({
  email: z.string().email('Verifique o email inserido'),
  password: z.string().min(3, 'Verifique a senha inserida'),
});
