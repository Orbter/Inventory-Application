// client/src/pages/table-page.tsx
import { useState, useEffect, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { fetchDefaultTable, fetchSearchTable } from '@/api/table/table';
import { Search } from 'lucide-react';
import type { Item } from '../../../Server/src/validators/product.validators';

const columnHelper = createColumnHelper<Item>();

// ✅ Name column now has text-red-400 via cell renderer
const columns = [
  columnHelper.accessor('id', { header: 'ID' }),
  columnHelper.accessor('name', {
    header: 'Product Name',
    cell: (info) => <span className='text-white'>{info.getValue()}</span>,
  }),
  columnHelper.accessor('quantity', { header: 'Stock' }),
  columnHelper.accessor('category.name', {
    id: 'category_name',
    header: 'Category',
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    cell: (info) => {
      const formattedPrice = `$${Number(info.getValue()).toFixed(2)}`;
      return <span className='text-green-300'>{formattedPrice}</span>;
    },
  }),
];

const CATEGORIES = ['All', 'Dairy', 'Produce', 'Meat', 'Bakery', 'Beverages'];

function TablePage() {
  const [data, setData] = useState<Item[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [searchRaw, setSearchRaw] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const pagination = useMemo(() => ({ pageIndex, pageSize: 20 }), [pageIndex]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const apiPage = pageIndex + 1;
      const activeCategory =
        categoryFilter !== 'All' ? categoryFilter : undefined;

      let userType;
      if (searchRaw.trim() === '') {
        userType = await fetchDefaultTable(apiPage, activeCategory);
      } else {
        setPageIndex(0);
        userType = await fetchSearchTable(searchRaw, apiPage, activeCategory);
      }

      if (userType) {
        setData(userType.data);
        setPageCount(userType.meta.pageCount);
      }
      setLoading(false);
    };
    getData();
  }, [pageIndex, searchRaw, categoryFilter]);

  const handleCategoryChange = (value: string) => {
    setPageIndex(0);
    setCategoryFilter(value);
  };

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: { pagination },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const nextState = updater({ pageIndex, pageSize: 20 });
        setPageIndex(nextState.pageIndex);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div className='p-6 pt-0 text-white w-full h-full max-w-5xl mx-auto'>
      <div className='bg-primary-color p-4 rounded-t-lg border border-gray-main border-b-0'>
        <div className='flex items-center gap-3 flex-wrap'>
          <div className='flex w-full max-w-sm border border-gray-main rounded-lg bg-white/5 pl-2'>
            <Search className='translate-y-1/2 text-gray-400 w-4 h-4 mr-1' />
            <input
              type='text'
              placeholder='Search items (e.g. milk)...'
              value={searchRaw}
              onChange={(e) => setSearchRaw(e.target.value)}
              className='w-full p-2 text-sm text-white placeholder-gray-light focus:outline-none focus:border-gray-500 transition-colors bg-transparent'
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className='p-2 text-sm rounded-lg border border-gray-main bg-white/5 text-white focus:outline-none cursor-pointer'
          >
            {CATEGORIES.map((cat) => (
              <option
                key={cat}
                value={cat}
                className='bg-primary-color text-white'
              >
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className='w-full border border-gray-main bg-primary-color overflow-hidden text-gray-subtle'>
        <thead className='bg-background-main text-left'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className='border border-gray-main p-3 font-semibold'
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className='text-center p-6 text-gray-400 font-medium'
              >
                getting inventory data...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className='text-center p-6'>
                No items found.
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className='hover:bg-white/5 transition-colors border-b border-gray-main'
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='p-3 text-sm'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className='flex items-center justify-between mt-4 text-sm'>
        <div className='flex gap-2'>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className='px-3 py-1 bg-gray-700 rounded disabled:opacity-30 cursor-pointer'
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className='px-3 py-1 bg-gray-700 rounded disabled:opacity-30 cursor-pointer'
          >
            Next
          </button>
        </div>
        <span className='text-gray-400'>
          Page {pageIndex + 1} of {table.getPageCount() || 1}
        </span>
      </div>
    </div>
  );
}

export default TablePage;
