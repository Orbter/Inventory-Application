import { number, z } from 'zod';

const ItemSchema = z.object({
  id: z.number().positive(),
  quantity: z.number().positive().max(999),
  name: z.string(),
  categoryId: z.number(),
  price: z.number().positive(),
  createdAt: z.date(),
  category: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
});

const CategorySchema = z.object({
  id: z.number().positive(),
  name: z.string(),
});

const SummerySchema = z.object({
  totalWorth: z.string(),
  totalUniqueItems: z.number(),
  popularItems: z.array(ItemSchema),
});

const ItemCreateSchema = z.object({
  name: z.string(),
  quantity: z.number().positive().max(999),
  category: z.string(),
  price: z.number().positive(),
});

type Item = z.infer<typeof ItemSchema>;
type Category = z.infer<typeof CategorySchema>;
type Summery = z.infer<typeof SummerySchema>;

export { Item, Category, Summery, ItemCreateSchema };
