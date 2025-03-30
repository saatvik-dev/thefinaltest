import React from 'react';
import WaitlistCard from '@/components/WaitlistCard';

const Home: React.FC = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-center items-center">
          <WaitlistCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
