
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Re-Unify
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Bring your past and present together in one photo.
        </p>
      </div>
    </header>
  );
};

export default Header;
