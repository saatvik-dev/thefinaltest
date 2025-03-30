import React from 'react';

interface CollectionItem {
  id: number;
  name: string;
  imageUrl: string;
}

const collections: CollectionItem[] = [
  {
    id: 1,
    name: 'Spring Collection',
    imageUrl: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Summer Essentials',
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Autumn Selection',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Winter Collection',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  }
];

const FeaturedCollections: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {collections.map(item => (
          <div key={item.id} className="relative overflow-hidden rounded-lg shadow-md group">
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <p className="text-white font-medium text-sm">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <h2 className="font-serif text-2xl text-gray-800 mb-2">
          Exclusive Fashion for Discerning Tastes
        </h2>
        <p className="text-gray-600">
          Be the first to access our curated collections of timeless elegance and contemporary design.
        </p>
      </div>
    </>
  );
};

export default FeaturedCollections;
