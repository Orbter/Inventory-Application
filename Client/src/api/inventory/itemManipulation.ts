interface CreateItemProps {
  newItem: {
    name: string;
    quantity: number;
    category: string;
    price: number;
  };
}
interface editItemProps {
  newItem: {
    id: number;
    name: string;
    quantity: number;
    category: string;
    price: number;
  };
}

const createItem = async ({ newItem }: CreateItemProps) => {
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

const editItem = async ({ newItem }: editItemProps) => {
  try {
    const response = await fetch(`http://localhost:3001/api/item/edit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Could not edit item', error);
    return null;
  }
};
const deleteItem = async ({ itemId }: number) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/item/delete/${itemId}`,
      {
        method: 'DELETE',
      },
    );
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Could not delete item', error);
    return null;
  }
};
export { createItem, editItem, deleteItem };
