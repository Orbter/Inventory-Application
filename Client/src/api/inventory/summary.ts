export const fetchSummary = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/summary');
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Could not get summary:', error);
    return null;
  }
};
