import { z, ZodType } from "zod";

export class PostValidation {
  static create: ZodType = z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1),
    category: z.string().min(1).max(255),
    tags: z.array(z.string().min(1).max(255)),
  });
}
