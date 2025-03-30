import React from 'react';
import WaitlistCard from '@/components/WaitlistCard';
import FeaturedCollections from '@/components/FeaturedCollections';

const Home: React.FC = () => {
  return (
    <div className="checkered-bg min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side - Featured Collections (hidden on mobile) */}
          <div className="hidden md:flex flex-col space-y-6 animate-fade-in">
            <FeaturedCollections />
          </div>
          
          {/* Right side - Waitlist Form */}
          <div className="flex justify-center items-center">
            <WaitlistCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
