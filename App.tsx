
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import { generateReunifyImage } from './services/geminiService';
import type { ImageFile } from './types';

function App() {
  const [childImage, setChildImage] = useState<ImageFile | null>(null);
  const [adultImage, setAdultImage] = useState<ImageFile | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!childImage || !adultImage) {
      setError("Please upload both a child and an adult photo.");
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);

    try {
      const result = await generateReunifyImage(childImage, adultImage);
      setGeneratedImage(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [childImage, adultImage]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ImageUploader id="child-photo" label="1. Upload Child Photo" onImageUpload={setChildImage} />
            <ImageUploader id="adult-photo" label="2. Upload Adult Photo" onImageUpload={setAdultImage} />
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleGenerate}
              disabled={!childImage || !adultImage || isLoading}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              {isLoading ? 'Generating...' : 'Re-Unify Photos'}
            </button>
          </div>
        </div>

        <ResultDisplay 
          image={generatedImage}
          isLoading={isLoading}
          error={error}
        />
      </main>
       <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Gemini. For entertainment purposes only.</p>
      </footer>
    </div>
  );
}

export default App;
