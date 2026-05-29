import { Request, Response } from 'express';
import { prisma } from '@/prisma';

const handleSummary = async (req: Request, res: Response) => {
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
const createItem = async (req: Request, res: Response) => {
  try {
    const { name, quantity, category, price } = req.body;
    console.log(req.body);
    const categoryExist = await prisma.categories.findFirst({
      where: {
        name: {
          contains: category,
          mode: 'insensitive',
        },
      },
    });
    let categoryId: number;

    if (categoryExist !== null) {
      categoryId = categoryExist.id;
    } else {
      const newCategory = await prisma.categories.create({
        data: { name: category },
      });
      categoryId = newCategory.id;
    }

    const newItem = await prisma.items.create({
      data: { name, quantity, categoryId, price },
    });
    return res.status(200).json({ item: newItem });
  } catch (error) {
    console.error('Database creating item failed:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleEditItem = async (req: Request, res: Response) => {
  try {
    const { id, name, quantity, category, price } = req.body;
    const categoryExist = await prisma.categories.findFirst({
      where: {
        name: {
          contains: category,
          mode: 'insensitive',
        },
      },
    });
    let categoryId;
    if (categoryExist !== null) {
      categoryId = categoryExist.id;
    } else {
      const newCategory = await prisma.categories.create({
        data: { name: category },
      });
      categoryId = newCategory.id;
    }
    const updateUser = await prisma.items.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        quantity: quantity,
        categoryId: categoryId,
        price: price,
      },
    });
    return res.status(200).json({ item: updateUser });
  } catch (error) {
    console.error('Database editing item failed:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
const handleDeleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let idNum = Number(id);

    const deleteItem = await prisma.items.delete({
      where: { id: idNum },
    });
    return res.status(200).json(true);
  } catch (error) {
    console.error('Database delete item failed:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { handleSummary, createItem, handleEditItem, handleDeleteItem };
