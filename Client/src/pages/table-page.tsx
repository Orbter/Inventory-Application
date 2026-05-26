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
import { useDebounce } from '@/hooks/useDebounce';
const columnHelper = createColumnHelper<Item>();

const columns = [
  columnHelper.accessor('id', { header: 'ID' }),
  columnHelper.accessor('name', { header: 'Product Name' }),
  columnHelper.accessor('quantity', { header: 'Stock' }),
  columnHelper.accessor('price', {
    header: 'Price',
    cell: (info) => `$${Number(info.getValue()).toFixed(2)}`,
  }),
];

function TablePage() {
  const [data, setData] = useState<Item[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [searchRaw, setSearchRaw] = useState('');
  const [loading, setLoading] = useState(true);
  const pagination = useMemo(() => ({ pageIndex, pageSize: 20 }), [pageIndex]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const apiPage = pageIndex + 1;
      let userType;
      if (searchRaw.trim() === '') {
        userType = await fetchDefaultTable(apiPage);
      } else {
        setPageIndex(0);
        userType = await fetchSearchTable(searchRaw, apiPage);
      }
      if (userType) {
        setData(userType.data);
        setPageCount(userType.meta.pageCount);
      }
      setLoading(false);
    };
    getData();
  }, [pageIndex, searchRaw]);

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount,
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
    <div className='p-6 pt-0 text-white w-full h-full max-w-5xl mx-auto '>
      <div className='relative w-full max-w-sm mb-2'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
        <input
          type='text'
          placeholder='Search items (e.g. milk)...'
          value={searchRaw}
          onChange={(e) => setSearchRaw(e.target.value)}
          className='w-full pl-10 pr-4 py-2 text-sm bg-primary-color border border-gray-main rounded-lg
                     text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors'
        />
      </div>

      <table className='w-full   border border-gray-main bg-primary-color overflow-hidden'>
        <thead className=' bg-background-main text-left '>
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
              <td colSpan={columns.length} className='text-center p-6 '>
                Loading inventory stock...
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
