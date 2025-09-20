import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import CropRecommendation from './components/CropRecommendation';
import DiseaseDetection from './components/DiseaseDetection';
import ChatBot from './components/ChatBot';
import CallSupport from './components/CallSupport';
import Navigation from './components/Navigation';
import LocationModal from './components/LocationModal';
import FarmerProfile from './components/FarmerProfile';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [farmerData, setFarmerData] = useState<any>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load farmer data and language from localStorage on app start
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const savedFarmerData = localStorage.getItem('farmerData');
    
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
    
    if (savedFarmerData) {
      setFarmerData(JSON.parse(savedFarmerData));
    }
  }, []);

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedLanguage', selectedLanguage);
  }, [selectedLanguage]);

  const requestLocation = () => {
    setShowLocationModal(true);
  };

  const handleLocationPermission = (granted: boolean) => {
    setShowLocationModal(false);
    if (granted && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Location error:', error);
        }
      );
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            location={location}
            onRequestLocation={requestLocation}
            onNavigate={setCurrentPage}
          />
        );
      case 'crop-recommendation':
        return <CropRecommendation location={location} isOnline={isOnline} selectedLanguage={selectedLanguage} />;
      case 'disease-detection':
        return <DiseaseDetection isOnline={isOnline} selectedLanguage={selectedLanguage} />;
      case 'chatbot':
        return <ChatBot selectedLanguage={selectedLanguage} isOnline={isOnline} />;
      case 'call-support':
        return <CallSupport selectedLanguage={selectedLanguage} />;
      case 'farmer-profile':
        return <FarmerProfile selectedLanguage={selectedLanguage} farmerData={farmerData} setFarmerData={setFarmerData} />;
      default:
        return (
          <HomePage
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            location={location}
            onRequestLocation={requestLocation}
            onNavigate={setCurrentPage}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {!isOnline && (
        <div className="bg-orange-500 text-white p-2 text-center text-sm">
          📡 Offline Mode - Some features may be limited
        </div>
      )}
      
      {currentPage !== 'home' && (
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
      
      <main className="pb-16">
        {renderCurrentPage()}
      </main>
      
      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onPermissionResponse={handleLocationPermission}
      />
    </div>
  );
}

export default App;