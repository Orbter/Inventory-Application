import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ButtonProps {
  onClick: () => void;
}
const EditButton = ({ onClick }: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className='flex items-center gap-2 bg-blue-900 hover:bg-blue-700 px-4 py-2.5 rounded-lg cursor-pointer transition-colors'
    >
      <Pencil size={14} />
      <p className='text-sm'>Edit</p>
    </Button>
  );
};

const DeleteButton = ({ onClick }: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className='flex items-center justify-center bg-white/5 hover:bg-red-400/40 p-2.5 rounded-lg cursor-pointer transition-colors'
    >
      <Trash size={14} />
    </Button>
  );
};

export { EditButton, DeleteButton };
