import React from 'react';
import { Home, Sprout, Bug, MessageCircle, Phone, ArrowLeft, User } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'crop-recommendation', icon: Sprout, label: 'Crops' },
    { id: 'disease-detection', icon: Bug, label: 'Disease' },
    { id: 'chatbot', icon: MessageCircle, label: 'Chat' },
    { id: 'call-support', icon: Phone, label: 'Call' },
    { id: 'farmer-profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm p-4 flex items-center">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center text-green-600 hover:text-green-700"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-medium">Back to Home</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                currentPage === id
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;