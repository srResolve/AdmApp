import { ZodError, z } from 'zod';

export const ZodCreateTaskAndProduct = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  quantity: z.coerce.number().min(1),
  value: z.coerce.number(),
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

export const ZodCreateBudgetValidation = z.object({
  client_id: z.string(),
  due_date: z.coerce.date(),
  observation: z.string().optional(),
  execution_period: z.coerce.number().optional(),
  photo: z
    .array(
      z.object({
        photo_key: z.string(),
        photo_location: z.string(),
      })
    )
    .optional(),
  tasks: z.array(
    z.object({
      name: z.string(),
      value: z.number(),
      quantity: z.number(),
      description: z.string().optional(),
      photo_key: z.string().optional(),
      photo_location: z.string().optional(),
    })
  ),
  products: z
    .array(
      z.object({
        name: z.string(),
        value: z.number(),
        quantity: z.number(),
      })
    )
    .optional(),
});

export const ZodUpdateBudgetValidation = z.object({
  due_date: z.coerce.date().optional(),
  observation: z.string().optional(),
  photo: z
    .array(
      z.object({
        photo_key: z.string(),
        photo_location: z.string(),
      })
    )
    .optional(),
  tasks: z
    .array(
      z.object({
        id: z.string().optional(),
        action: z.enum(['CREATE', 'UPDATE', 'DELETE']),
        name: z.string(),
        value: z.number(),
        quantity: z.number(),
        description: z.string().optional(),
        photo_key: z.string().optional(),
        photo_location: z.string().optional(),
      })
    )
    .optional(),
  products: z
    .array(
      z.object({
        id: z.string(),
        action: z.enum(['CREATE', 'UPDATE', 'DELETE']),
        name: z.string(),
        value: z.number(),
        quantity: z.number(),
      })
    )
    .optional(),
});

export const ZodCreateSchedulePaymentValidation = z.object({
  date: z.coerce.date(),
  name: z.string(),
  value: z.coerce.number(),
  type: z.enum(['INCOME', 'OUTCOME']),
  categoryId: z.string(),
});
export const ZodCreateBankAccountValidation = z.object({
  name: z.string(),
  initialBalance: z.coerce.number(),
});

export const ZodCreateCollaboratorWageValidation = z.object({
  user_id: z.string(),
  value: z.coerce.number(),
  date: z.coerce.date(),
});

export const ZodCreateServiceValidation = z.object({
  date: z.coerce.date(),
  start_time: z.string(),
  end_time: z.string(),
  client_id: z.string(),
  user_id: z.string().optional(),
  description: z.string().optional(),
  category_id: z.string(),
  serviceTask: z.array(
    z.object({
      name: z.string(),
      description: z.string().optional(),
      quantity: z.number(),
    })
  ),
});

export const ZodCreateEntrancePaymentValidation = z.object({
  date: z.coerce.date(),
  description: z.string(),
  value: z.coerce.number(),
  type: z.enum(['INCOME', 'OUTCOME']),
  category_id: z.string(),
  account_id: z.string(),
});

export const zodErrorHandler = (error: ZodError) => {
  const field = errorList.find((field) => field.name === error.issues[0].path[0]);
  return field?.message || 'Verifique os dados inseridos';
};

const errorList = [
  {
    name: 'client_id',
    message: 'Selecione um cliente',
  },
  {
    name: 'due_date',
    message: 'Selecione uma data de vencimento',
  },
  {
    name: 'tasks',
    message: 'Adicione pelo menos uma tarefa',
  },
  {
    name: 'products',
    message: 'Adicione pelo menos um produto',
  },
  {
    name: 'name',
    message: 'Adicione um nome',
  },
];
