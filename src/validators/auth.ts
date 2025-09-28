import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح' }),
  password: z.string().min(1, { message: 'كلمة المرور مطلوبة' }),
});

export const signupSchema = z.object({
  name: z.string().min(1, { message: 'الاسم مطلوب' }),
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح' }),
  password: z.string().min(8, { message: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل' }),
});
