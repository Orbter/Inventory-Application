interface CreateItemProps {
  newItem: {
    name: string;
    quantity: number;
    categoryText: string;
    price: number;
  };
}
export const createItem = async ({ newItem }: CreateItemProps) => {
  try {
    const response = await fetch('http://localhost:3001/api/item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Could not post item', error);
    return null;
  }
};
