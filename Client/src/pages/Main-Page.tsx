// client/src/pages/Main-Page.tsx
import { useEffect, useState } from 'react';
import { Card } from '@/components/main-dashboard/Card';
import { fetchSummary } from '@/api/inventory/summary';
import { MiniCard } from '@/components/main-dashboard/mini-card';
// Define a type for your state so TypeScript can help you!
interface SummaryState {
  totalWorth: number;
  totalUniqueItems: number;
}

function MainPage() {
  const [cardData, setCardData] = useState<SummaryState | null>(null);

  useEffect(() => {
    const getDashboardData = async () => {
      const data = await fetchSummary();
      if (data) {
        setCardData(data);
      }
    };

    getDashboardData();
  }, []);

  if (!cardData) {
    return (
      <div className='flex h-screen items-center justify-center text-2xl'>
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full h-screen text-2xl p-10 gap-20'>
      <div className='flex flex-wrap justify-between gap-6'>
        <Card
          title='Inventory Worth'
          amount={`$${cardData.totalWorth}`}
          className='text-green-500'
        />
        <Card
          title='available items'
          amount={cardData.totalUniqueItems.toString()}
        />
      </div>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-1'>
          <h3 className='text-xl font-bold tracking-wider text-gray-100 uppercase '>
            Most Popular Items
          </h3>
          <p className='text-sm text-gray-400'>
            Top performing items across your inventory categories.
          </p>
        </div>{' '}
        <div className='grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4'>
          {' '}
          {cardData.popularItems.map((singleCard) => (
            <MiniCard
              key={singleCard.id}
              item={singleCard}
              categoryName={singleCard.category.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
