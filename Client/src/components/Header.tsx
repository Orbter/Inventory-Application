import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  const text =
    location.pathname === '/'
      ? 'Good Morning'
      : location.pathname.slice(1).toUpperCase();

  return (
    <header className='bg-primary-color text-white font-semibold w-full h-20 p-4 text-2xl flex items-center'>
      <h1>{text}</h1>
    </header>
  );
}
export { Header };
