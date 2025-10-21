
import React, { useState, useRef } from 'react';
import type { ImageFile } from '../types';

interface ImageUploaderProps {
  id: string;
  label: string;
  onImageUpload: (file: ImageFile | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ id, label, onImageUpload }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setPreviewUrl(reader.result as string);
        onImageUpload({ base64: base64String, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
      onImageUpload(null);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-lg font-medium text-gray-700 mb-2">{label}</h3>
      <div
        className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-100 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
        onClick={handleClick}
      >
        <input
          type="file"
          id={id}
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="h-full w-full object-contain rounded-lg p-2" />
        ) : (
          <div className="text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2">Click to upload a photo</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
