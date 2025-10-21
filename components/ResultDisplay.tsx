
import React from 'react';
import Spinner from './Spinner';

interface ResultDisplayProps {
  image: string | null;
  isLoading: boolean;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ image, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="w-full mt-10 p-8 bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-center h-96">
        <Spinner />
        <p className="mt-4 text-lg font-medium text-gray-700">Re-unifying your past and present...</p>
        <p className="text-gray-500">This may take a moment. Please wait.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mt-10 p-8 bg-red-50 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-bold text-red-700">An Error Occurred</h3>
        <p className="mt-2 text-red-600 bg-red-100 p-3 rounded">{error}</p>
      </div>
    );
  }

  if (image) {
    return (
      <div className="w-full mt-10 p-4 sm:p-8 bg-white rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Re-Unify Photo</h3>
        <div className="max-w-2xl mx-auto">
           <img src={image} alt="Generated result" className="rounded-lg shadow-lg w-full h-auto" />
        </div>
      </div>
    );
  }

  return null;
};

export default ResultDisplay;
