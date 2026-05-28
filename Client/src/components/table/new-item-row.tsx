import { useState } from 'react';
import type { Item } from '../../../../Server/src/validators/product.validators';
interface CategoryOption {
  id: number;
  name: string;
}

interface NewItemRowProps {
  item?: Item;
  categories: CategoryOption[];
  onSave: (payload: {
    name: string;
    quantity: number;
    category: string;
    price: number;
  }) => void;
  onCancel: () => void;
}

export function NewItemRow({
  item,
  categories,
  onSave,
  onCancel,
}: NewItemRowProps) {
  const [name, setName] = useState(item === undefined ? '' : item.name);
  const [quantity, setQuantity] = useState<number>(
    item === undefined ? 0 : item.quantity,
  );
  const [category, setCategory] = useState(
    item === undefined ? '' : item.category?.name,
  );
  const [price, setPrice] = useState<number>(
    item === undefined ? 0 : item.price,
  );

  const handleSubmission = () => {
    if (!name.trim()) return alert('Product Name is required');
    if (!category.trim()) return alert('Category is required');
    if (price <= 0) return alert('Price must be greater than 0');
    if (quantity < 0) return alert('Stock cannot be negative');

    // Pass the data up to the parent component
    onSave({ name, quantity, category, price });
  };

  return (
    <tr className='bg-white/5 border-b border-gray-main animate-fadeIn'>
      <td className='p-3 text-sm text-gray-500 italic font-mono'>
        {item === undefined ? 'Auto' : item.id}
      </td>
      <td className='p-3 text-sm'>
        <input
          type='text'
          placeholder='Enter item name...'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full p-1 text-sm text-white bg-white/5 border border-gray-main rounded focus:outline-none focus:border-gray-500 transition-colors'
        />
      </td>

      <td className='p-3 text-sm'>
        <input
          type='number'
          min='0'
          max='999'
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className='w-full p-1 text-sm text-white bg-white/5 border border-gray-main rounded focus:outline-none focus:border-gray-500 transition-colors'
        />
      </td>

      <td className='p-3 text-sm'>
        <input
          list='category-suggestions'
          type='text'
          placeholder='Select or type...'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='w-full p-1 text-sm text-white bg-white/5 border border-gray-main rounded focus:outline-none focus:border-gray-500 transition-colors'
        />
        <datalist id='category-suggestions'>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name} />
          ))}
        </datalist>
      </td>

      <td className='p-3 text-sm'>
        <div className='flex items-center gap-2 justify-between'>
          <div className='flex items-center bg-white/5 border border-gray-main rounded pl-1 max-w-[100px]'>
            <span className='text-gray-400 text-xs'>$</span>
            <input
              type='number'
              step='0.01'
              min='0'
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className='w-full p-1 text-sm text-white bg-transparent focus:outline-none'
            />
          </div>
        </div>
      </td>
      <td className='p-3 text-sm'>
        {' '}
        <div className='flex items-center gap-3'>
          <button
            onClick={handleSubmission}
            className='px-2 py-1 text-xs font-semibold bg-green-900/60 text-green-300 border border-green-700 rounded hover:bg-green-700 transition-colors cursor-pointer'
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className='px-2 py-1 text-xs font-semibold  bg-red-800/60 text-gray-300 border border-red-700 rounded hover:bg-red-700 transition-colors cursor-pointer'
          >
            Cancel
          </button>
        </div>
      </td>
    </tr>
  );
}
