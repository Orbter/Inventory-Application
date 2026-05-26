import { useState } from 'react';

interface FilterPopoverProps {
  categories: string[];
}

const FilterPopover = ({ categories }: FilterPopoverProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const filteredItems =
    selectedCategory === 'All'
      ? categories
      : categories.filter((item) => item === selectedCategory);
  return (
    <div>
      <div>filter somthing</div>
    </div>
  );
};
export { FilterPopover };
