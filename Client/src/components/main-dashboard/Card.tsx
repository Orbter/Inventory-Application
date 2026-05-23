interface CardProps {
  title: string;
  amount: string;
  className?: string;
}

function Card({ title, amount, className }: CardProps) {
  return (
    <div className=' border border-gray-main bg-primary-color p-5 shadow-2xs rounded-lg  h-50 flex-1  text-white flex flex-col items-center justify-around'>
      <h3 className='text-white font-base text-center'>{title}</h3>
      <p className={`text-4xl font-semibold  ${className || ''}`}>{amount}</p>
    </div>
  );
}
export { Card };
