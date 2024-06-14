'use client';
import { MoveLeft } from 'lucide-react';

const BackButton = () => {
  return (
    <button
      className={'flex items-center mb-5'}
      onClick={() => {
        window.history.back();
      }}
    >
      <MoveLeft className={'mr-2'} />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
