interface CardProps {
  title: string;
  amount: string;
  className?: string;
}

function Card({ title, amount, className }: CardProps) {
  return (
    <div className=' border border-gray-main bg-primary-color p-5 shadow-2xs rounded-lg  h-50 flex-[1_1_250px] min-w-62.5 max-w-105 text-white flex flex-col items-center justify-around 2xl:h-80 2xl:max-w-xl'>
      <h3 className='text-white font-base text-center 2xl:text-3xl'>{title}</h3>
      <p className={`text-4xl font-semibold 2xl:text-5xl  ${className || ''}`}>
        {amount}
      </p>
    </div>
  );
}
export { Card };
