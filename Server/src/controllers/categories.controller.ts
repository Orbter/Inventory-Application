import { Request, Response } from 'express';
import { prisma } from '@/prisma';
const handleCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.categories.findMany({
      orderBy: { name: 'asc' },
    });
    return res.status(200).json({ data: categories });
  } catch (error) {
    console.error('Database categories fetch failed:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
export { handleCategories };
