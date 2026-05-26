// server/src/controllers/inventory.controller.ts
import { Request, Response } from 'express';
import { prisma } from '@/prisma';

const handleInventory = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;
    const skip = (page - 1) * pageSize;

    const [item, totalCount] = await prisma.$transaction([
      prisma.items.findMany({
        skip: skip,
        take: pageSize,
        orderBy: { id: 'asc' },
        include: {
          category: true,
        },
      }),
      prisma.items.count(),
    ]);

    return res.status(200).json({
      data: item,
      meta: {
        totalCount: totalCount,
        pageCount: Math.ceil(totalCount / pageSize),
        page,
        pageSize,
      },
    });
  } catch (error) {
    console.error('Database table fetch failed:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleSearch = async (req: Request, res: Response) => {
  try {
    const query = (req.query.query as string) || '';
    const page = Number(req.query.page) || 1;
    const pageSize = 20;
    const skip = (page - 1) * pageSize;

    const [items, totalCount] = await prisma.$transaction([
      prisma.items.findMany({
        skip: skip,
        take: pageSize,
        where: {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        orderBy: { id: 'asc' },
        include: {
          category: true,
        },
      }),
      prisma.items.count({
        where: {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
      }),
    ]);

    return res.status(200).json({
      data: items,
      meta: {
        totalCount: totalCount,
        pageCount: Math.ceil(totalCount / pageSize),
        page,
        pageSize,
      },
    });
  } catch (error) {
    console.error('Database table search fetch failed:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { handleInventory, handleSearch };
