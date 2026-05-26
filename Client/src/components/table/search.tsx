// client/src/components/table/search.tsx
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchInputProps {
  onSearchChange: (value: string) => void;
}

const SearchInput = ({ onSearchChange }: SearchInputProps) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    onSearchChange(debouncedQuery);
  }, [debouncedQuery, onSearchChange]);

  return (
    <div className='relative w-full max-w-sm mb-2'>
      <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
      <input
        type='text'
        placeholder='Search items (e.g. milk)...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='w-full pl-10 pr-4 py-2 text-sm bg-primary-color border border-gray-main rounded-lg
                   text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors'
      />
    </div>
  );
};

export { SearchInput };
