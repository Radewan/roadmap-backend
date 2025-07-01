import { z, ZodType } from "zod";

export class TodoValidation{
  static create: ZodType = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
  });
}