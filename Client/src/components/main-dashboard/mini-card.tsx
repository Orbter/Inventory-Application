import type { Item } from '../../../../Server/src/validators/product.validators';

interface MiniCardProps {
  item: Item;
  categoryName: string;
}

const MiniCard = ({ item, categoryName }: MiniCardProps) => {
  return (
    <div className='border border-gray-main bg-primary-color rounded-xl shadow-md flex flex-col text-white text-sm overflow-hidden'>
      <div className='flex items-center justify-between px-4 py-3 bg-white/5'>
        <p className='font-semibold truncate'>{item.name}</p>
        <span className='text-xs text-gray-400 shrink-0 ml-2'>{`#${item.id}`}</span>
      </div>

      <div className='flex flex-col divide-y divide-gray-main px-4'>
        <div className='flex items-center justify-between py-2'>
          <p className='text-gray-400 text-xs uppercase tracking-wide'>
            Quantity
          </p>
          <p className='font-medium'>{item.quantity}</p>
        </div>
        <div className='flex items-center justify-between py-2'>
          <p className='text-gray-400 text-xs uppercase tracking-wide'>Worth</p>
          <p className='font-medium text-green-500'>{`$${item.price}`}</p>
        </div>
        <div className='flex items-center justify-between py-2'>
          <p className='text-gray-400 text-xs uppercase tracking-wide'>
            Category
          </p>
          <p className='font-medium'>{categoryName}</p>
        </div>
      </div>
    </div>
  );
};

export { MiniCard };
