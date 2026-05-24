import { number, z } from 'zod';

const ItemSchema = z.object({
  id: z.number().positive(),
  quantity: z.number().positive().max(999),
  name: z.string(),
  categoryId: z.number(),
  price: z.number().positive(),
  createdAt: z.date(),
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
type Item = z.infer<typeof ItemSchema>;
type Category = z.infer<typeof CategorySchema>;
type Summery = z.infer<typeof SummerySchema>;

export { Item, Category, Summery };
