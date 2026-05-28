// server/src/controllers/inventory.controller.ts
import { Request, Response } from 'express';
import { prisma } from '@/prisma';

const handleInventory = async (req: Request, res: Response) => {
  try {
    const { search, filter, page } = req.query;
    const pageNum = parseInt(page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;
    const skip = (pageNum - 1) * pageSize;

    const where = {
      ...(search && {
        name: { contains: search as string, mode: 'insensitive' as const },
      }),
      ...(filter &&
        filter !== 'all' && { categoryId: { equals: Number(filter) } }),
    };

    const [items, totalCount] = await prisma.$transaction([
      prisma.items.findMany({
        skip,
        take: pageSize,
        where,
        orderBy: { id: 'asc' },
        include: {
          category: true,
        },
      }),
      prisma.items.count({ where }),
    ]);

    return res.status(200).json({
      data: items,
      meta: {
        totalCount,
        pageCount: Math.ceil(totalCount / pageSize),
        page: pageNum,
        pageSize,
      },
    });
  } catch (error) {
    console.error('Database table fetch failed:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { handleInventory };
