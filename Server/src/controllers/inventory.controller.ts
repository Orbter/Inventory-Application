// server/src/controllers/inventory.controller.ts
import { Request, Response } from 'express';
import { prisma } from '@/prisma';

const handleInventory = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;
    const skip = (page - 1) * pageSize;

    const [itemsRaw, totalCount] = await prisma.$transaction([
      prisma.items.findMany({
        skip: skip,
        take: pageSize,
        orderBy: { id: 'asc' },
      }),
      prisma.items.count(),
    ]);

    const safeData = itemsRaw.map((item) => ({
      ...item,
      id: Number(item.id),
      categoryId: Number(item.categoryId),
      price: Number(item.price),
    }));
    const totalCountSafe = Number(totalCount);

    return res.status(200).json({
      data: safeData,
      meta: {
        totalCount: totalCountSafe,
        pageCount: Math.ceil(totalCountSafe / pageSize),
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

    const [itemsRaw, totalCount] = await prisma.$transaction([
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
    const safeData = itemsRaw.map((item) => ({
      ...item,
      id: Number(item.id),
      categoryId: Number(item.categoryId),
      price: Number(item.price),
    }));
    const totalCountSafe = Number(totalCount);
    return res.status(200).json({
      data: safeData,
      meta: {
        totalCount: totalCountSafe,
        pageCount: Math.ceil(totalCountSafe / pageSize),
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
