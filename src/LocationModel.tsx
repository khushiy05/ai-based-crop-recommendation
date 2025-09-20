import React from 'react';
import { MapPin, X } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPermissionResponse: (granted: boolean) => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onPermissionResponse }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Location Permission</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="text-center mb-6">
          <MapPin className="h-12 w-12 text-green-600 mx-auto mb-3" />
          <p className="text-gray-600 mb-2">
            We need your location to provide accurate crop recommendations and weather data for your area.
          </p>
          <p className="text-sm text-gray-500">
            Your location data is only used to improve our recommendations and is not shared with third parties.
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => onPermissionResponse(false)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Not Now
          </button>
          <button
            onClick={() => onPermissionResponse(true)}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Allow Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;