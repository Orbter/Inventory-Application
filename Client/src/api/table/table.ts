interface fetchDefaultTableProps {
  searchQuery?: string;
  filterType?: string;
  pageNum: number;
}

const fetchDefaultTable = async ({
  searchQuery,
  filterType,
  pageNum,
}: fetchDefaultTableProps) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/inventory?search=${searchQuery}&filter=${filterType}&page=${pageNum}`,
    );
    if (!response.ok) throw new Error('Network response table not ok');
    return await response.json();
  } catch (error) {
    console.error('Could not get table data:', error);
    return null;
  }
};
const getCategories = async () => {
  try {
    const response = await fetch(`http://localhost:3001/api/categories`);
    if (!response.ok) throw new Error('Network response table not ok');
    return await response.json();
  } catch (error) {
    console.error('Could not get categories:', error);
    return null;
  }
};
const fetchSearchTable = async (searchQuery: string, pageNum: number) => {
  try {
    console.log(
      `http://localhost:3001/api/inventory/search?query=${searchQuery}&page=${pageNum}`,
    );
    const response = await fetch(
      `http://localhost:3001/api/inventory/search?query=${searchQuery}&page=${pageNum}`,
    );
    if (!response.ok) throw new Error('Network response search table not ok');
    return await response.json();
  } catch (error) {
    console.error('Could not get searched table dataset:', error);
    return null;
  }
};

export { fetchDefaultTable, fetchSearchTable, getCategories };
