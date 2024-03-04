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

export const ZodEditProfileValidation = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Verifique o email inserido'),
  mobilePhone: z
    .string()
    .min(14, 'Verifique o telefone inserido')
    .max(14, 'Verifique o telefone inserido')
    .optional(),
});

export const ZodCreateClientValidation = z.object({
  name: z.string(),
  mobile_phone: z.string(),
  address: z.string(),
  location: z.string().optional(),
  cpfCnpj: z.string().optional(),
});
