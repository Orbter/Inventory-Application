import { Table } from '@tanstack/react-table';

interface CategorySelectProps {
  table: Table<any>;
  categories: string[]; // Pass your unique list of category names here
}

export function CategorySelectFilter({
  table,
  categories,
}: CategorySelectProps) {
  // Get the specific category column using the ID we defined
  const categoryColumn = table.getColumn('category_name');

  if (!categoryColumn) return null;

  const currentValue = (categoryColumn.getFilterValue() as string) ?? '';

  return (
    <div className='flex flex-col gap-1 mb-4'>
      <label className='text-sm font-medium text-gray-700'>
        Filter by Category:
      </label>
      <select
        value={currentValue}
        onChange={(e) => {
          // If they choose the empty option, pass undefined to reset the filter
          categoryColumn.setFilterValue(e.target.value || undefined);
        }}
        className='border border-gray-300 rounded px-3 py-1.5 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        <option value=''>All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
