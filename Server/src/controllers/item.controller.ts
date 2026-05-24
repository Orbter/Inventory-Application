import { Request, Response } from 'express';
import { prisma } from '@/prisma';

export const handleSummary = async (req: Request, res: Response) => {
  try {
    const financialResult = await prisma.$queryRaw<
      Array<{ totalWorth: number; totalUniqueItems: number }>
    >`
      SELECT 
        COALESCE(SUM(price * quantity), 0) AS "totalWorth",
        COALESCE(SUM(quantity), 0) AS "totalUniqueItems"
      FROM "Items"
    `;

    const popularItems = await prisma.items.findMany({
      take: 4,
      orderBy: {
        quantity: 'desc',
      },
      select: {
        id: true,
        name: true,
        quantity: true,
        categoryId: true,
        price: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    const dashboardPayload = {
      totalWorth: Number(financialResult[0].totalWorth).toFixed(2),
      totalUniqueItems: Number(financialResult[0].totalUniqueItems),
      popularItems: popularItems.map((item) => ({
        ...item,
        id: Number(item.id),
        categoryId: Number(item.categoryId),
        price: Number(item.price),
      })),
    };
    console.log(dashboardPayload);
    return res.status(200).json(dashboardPayload);
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    return res.status(500).json({ message: 'Error fetching items from DB' });
  }
};
