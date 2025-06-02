import { useAppSelector } from '../hooks';
import { MapPin } from 'lucide-react';
import React from 'react';

const GeoLocationIndicator = () => {
  const { city, status } = useAppSelector((state) => state.location);

  if (status !== 'succeeded' || !city) {
    return null;
  }

  return (
    <div className="flex items-center text-sm text-gray-500 gap-1">
      <MapPin className="w-4 h-4 text-red-500" />
      <span>{city}</span>
    </div>
  );
};

export default GeoLocationIndicator;