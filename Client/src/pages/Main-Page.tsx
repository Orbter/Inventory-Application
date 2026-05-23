import { Card } from '@/components/main-dashboard/Card';

function MainPage() {
  const components = [
    {
      title: 'inventory worth',
      text: '115,000$',
      colors: 'text-green-600',
    },
    {
      title: 'available items',
      text: '24',
      colors: '',
    },
  ];
  return (
    <div className='flex flex-col w-full h-screen text-2xl'>
      <div className='flex justify-around gap-20'>
        {components.map((onceCard) => (
          <Card
            title={onceCard.title}
            amount={onceCard.text}
            className={onceCard.colors}
          />
        ))}
      </div>
    </div>
  );
}
export default MainPage;
