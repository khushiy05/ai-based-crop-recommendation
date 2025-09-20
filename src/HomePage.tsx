import React from 'react';
import { MapPin, Sprout, Bug, MessageCircle, Phone, Globe, Leaf, User } from 'lucide-react';

interface HomePageProps {
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  location: {lat: number, lng: number} | null;
  onRequestLocation: () => void;
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  selectedLanguage,
  setSelectedLanguage,
  location,
  onRequestLocation,
  onNavigate
}) => {
  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  ];

  const translations = {
    en: {
      title: 'AI Crop Advisory',
      subtitle: 'Smart farming solutions for better yields',
      selectLanguage: 'Select Language',
      location: 'Location',
      getLocation: 'Get My Location',
      locationDetected: 'Location Detected',
      services: 'Our Services',
      cropRec: 'Crop Recommendation',
      cropRecDesc: 'Get AI-powered crop suggestions based on your soil and weather',
      diseaseDetect: 'Disease Detection',
      diseaseDetectDesc: 'Upload crop images to identify diseases and get treatment advice',
      chatbot: 'Ask AI Assistant',
      chatbotDesc: 'Get instant answers to your farming questions',
      callSupport: 'Expert Support',
      callSupportDesc: 'Talk to agricultural experts directly',
      farmerProfile: 'Farmer Profile',
      farmerProfileDesc: 'Manage your personal information and farming details',
    },
    hi: {
      title: 'AI फसल सलाहकार',
      subtitle: 'बेहतर उत्पादन के लिए स्मार्ट खेती समाधान',
      selectLanguage: 'भाषा चुनें',
      location: 'स्थान',
      getLocation: 'मेरा स्थान प्राप्त करें',
      locationDetected: 'स्थान का पता लगाया गया',
      services: 'हमारी सेवाएं',
      cropRec: 'फसल सिफारिश',
      cropRecDesc: 'अपनी मिट्टी और मौसम के आधार पर AI-संचालित फसल सुझाव प्राप्त करें',
      diseaseDetect: 'रोग का पता लगाना',
      diseaseDetectDesc: 'रोगों की पहचान करने और उपचार सलाह पाने के लिए फसल की छवियां अपलोड करें',
      chatbot: 'AI सहायक से पूछें',
      chatbotDesc: 'अपने खेती के सवालों के तुरंत जवाब पाएं',
      callSupport: 'विशेषज्ञ सहायता',
      callSupportDesc: 'कृषि विशेषज्ञों से सीधे बात करें',
      farmerProfile: 'किसान प्रोफ़ाइल',
      farmerProfileDesc: 'अपनी व्यक्तिगत जानकारी और खेती के विवरण प्रबंधित करें',
    },
    mr: {
      title: 'AI पीक सल्लागार',
      subtitle: 'चांगल्या उत्पादनासाठी स्मार्ट शेती समाधाने',
      selectLanguage: 'भाषा निवडा',
      location: 'स्थान',
      getLocation: 'माझे स्थान मिळवा',
      locationDetected: 'स्थान शोधले',
      services: 'आमच्या सेवा',
      cropRec: 'पीक शिफारस',
      cropRecDesc: 'तुमच्या मातीच्या आणि हवामानाच्या आधारे AI-चालित पीक सूचना मिळवा',
      diseaseDetect: 'रोग शोध',
      diseaseDetectDesc: 'रोगांची ओळख करण्यासाठी आणि उपचार सल्ला मिळविण्यासाठी पिकांच्या प्रतिमा अपलोड करा',
      chatbot: 'AI सहाय्यकाला विचारा',
      chatbotDesc: 'तुमच्या शेतीच्या प्रश्नांची तत्काळ उत्तरे मिळवा',
      callSupport: 'तज्ञ सहाय्य',
      callSupportDesc: 'कृषी तज्ञांशी थेट बोला',
      farmerProfile: 'शेतकरी प्रोफाइल',
      farmerProfileDesc: 'तुमची वैयक्तिक माहिती आणि शेतीचे तपशील व्यवस्थापित करा',
    },
    bn: {
      title: 'AI ফসল পরামর্শদাতা',
      subtitle: 'ভাল ফলনের জন্য স্মার্ট কৃষি সমাধান',
      selectLanguage: 'ভাষা নির্বাচন করুন',
      location: 'অবস্থান',
      getLocation: 'আমার অবস্থান পান',
      locationDetected: 'অবস্থান সনাক্ত করা হয়েছে',
      services: 'আমাদের সেবা',
      cropRec: 'ফসল সুপারিশ',
      cropRecDesc: 'আপনার মাটি এবং আবহাওয়ার উপর ভিত্তি করে AI-চালিত ফসল পরামর্শ পান',
      diseaseDetect: 'রোগ সনাক্তকরণ',
      diseaseDetectDesc: 'রোগ সনাক্ত করতে এবং চিকিৎসার পরামর্শ পেতে ফসলের ছবি আপলোড করুন',
      chatbot: 'AI সহায়ককে জিজ্ঞাসা করুন',
      chatbotDesc: 'আপনার কৃষি প্রশ্নের তাৎক্ষণিক উত্তর পান',
      callSupport: 'বিশেষজ্ঞ সহায়তা',
      callSupportDesc: 'কৃষি বিশেষজ্ঞদের সাথে সরাসরি কথা বলুন',
      farmerProfile: 'কৃষক প্রোফাইল',
      farmerProfileDesc: 'আপনার ব্যক্তিগত তথ্য এবং কৃষি বিবরণ পরিচালনা করুন',
    },
    te: {
      title: 'AI పంట సలహాదారు',
      subtitle: 'మెరుగైన దిగుబడి కోసం స్మార్ట్ వ్యవసాయ పరిష్కారాలు',
      selectLanguage: 'భాష ఎంచుకోండి',
      location: 'స్థానం',
      getLocation: 'నా స్థానం పొందండి',
      locationDetected: 'స్థానం గుర్తించబడింది',
      services: 'మా సేవలు',
      cropRec: 'పంట సిఫార్సు',
      cropRecDesc: 'మీ మట్టి మరియు వాతావరణం ఆధారంగా AI-శక్తితో కూడిన పంట సూచనలు పొందండి',
      diseaseDetect: 'వ్యాధి గుర్తింపు',
      diseaseDetectDesc: 'వ్యాధులను గుర్తించడానికి మరియు చికిత్స సలహా పొందడానికి పంట చిత్రాలను అప్‌లోడ్ చేయండి',
      chatbot: 'AI సహాయకుడిని అడగండి',
      chatbotDesc: 'మీ వ్యవసాయ ప్రశ్నలకు తక్షణ సమాధానాలు పొందండి',
      callSupport: 'నిపుణుల మద్దతు',
      callSupportDesc: 'వ్యవసాయ నిపుణులతో నేరుగా మాట్లాడండి',
      farmerProfile: 'రైతు ప్రొఫైల్',
      farmerProfileDesc: 'మీ వ్యక్తిగత సమాచారం మరియు వ్యవసాయ వివరాలను నిర్వహించండి',
    },
    ta: {
      title: 'AI பயிர் ஆலோசகர்',
      subtitle: 'சிறந்த விளைச்சலுக்கான ஸ்மார்ட் விவசாய தீர்வுகள்',
      selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
      location: 'இடம்',
      getLocation: 'என் இடத்தைப் பெறுக',
      locationDetected: 'இடம் கண்டறியப்பட்டது',
      services: 'எங்கள் சேவைகள்',
      cropRec: 'பயிர் பரிந்துரை',
      cropRecDesc: 'உங்கள் மண் மற்றும் வானிலையின் அடிப்படையில் AI-இயங்கும் பயிர் பரிந்துரைகளைப் பெறுங்கள்',
      diseaseDetect: 'நோய் கண்டறிதல்',
      diseaseDetectDesc: 'நோய்களைக் கண்டறிந்து சிகிச்சை ஆலோசனை பெற பயிர் படங்களை பதிவேற்றவும்',
      chatbot: 'AI உதவியாளரிடம் கேளுங்கள்',
      chatbotDesc: 'உங்கள் விவசாய கேள்விகளுக்கு உடனடி பதில்களைப் பெறுங்கள்',
      callSupport: 'நிபுணர் ஆதரவு',
      callSupportDesc: 'விவசாய நிபுணர்களுடன் நேரடியாக பேசுங்கள்',
      farmerProfile: 'விவசாயி சுயவிவரம்',
      farmerProfileDesc: 'உங்கள் தனிப்பட்ட தகவல் மற்றும் விவசாய விவரங்களை நிர்வகிக்கவும்',
    }
  };

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Leaf className="h-12 w-12 text-green-600 mr-3" />
          <h1 className="text-4xl font-bold text-green-800">{t.title}</h1>
        </div>
        <p className="text-lg text-green-600 mb-6">{t.subtitle}</p>
      </div>

      {/* Language Selection */}
      <div className="max-w-md mx-auto mb-8">
        <label className="block text-sm font-medium text-green-700 mb-2">
          <Globe className="inline h-4 w-4 mr-1" />
          {t.selectLanguage}
        </label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.native} ({lang.name})
            </option>
          ))}
        </select>
      </div>

      {/* Location Section */}
      <div className="max-w-md mx-auto mb-8">
        <label className="block text-sm font-medium text-green-700 mb-2">
          <MapPin className="inline h-4 w-4 mr-1" />
          {t.location}
        </label>
        {location ? (
          <div className="p-3 bg-green-100 border border-green-300 rounded-lg text-green-800">
            ✅ {t.locationDetected}
          </div>
        ) : (
          <button
            onClick={onRequestLocation}
            className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
          >
            {t.getLocation}
          </button>
        )}
      </div>

      {/* Services Grid */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-green-800 text-center mb-6">{t.services}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            icon={<Sprout className="h-8 w-8" />}
            title={t.cropRec}
            description={t.cropRecDesc}
            color="bg-green-500"
            onClick={() => onNavigate('crop-recommendation')}
          />
          <ServiceCard
            icon={<Bug className="h-8 w-8" />}
            title={t.diseaseDetect}
            description={t.diseaseDetectDesc}
            color="bg-red-500"
            onClick={() => onNavigate('disease-detection')}
          />
          <ServiceCard
            icon={<MessageCircle className="h-8 w-8" />}
            title={t.chatbot}
            description={t.chatbotDesc}
            color="bg-blue-500"
            onClick={() => onNavigate('chatbot')}
          />
          <ServiceCard
            icon={<Phone className="h-8 w-8" />}
            title={t.callSupport}
            description={t.callSupportDesc}
            color="bg-orange-500"
            onClick={() => onNavigate('call-support')}
          />
          <ServiceCard
            icon={<User className="h-8 w-8" />}
            title={t.farmerProfile}
            description={t.farmerProfileDesc}
            color="bg-purple-500"
            onClick={() => onNavigate('farmer-profile')}
          />
        </div>
      </div>
    </div>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
    >
      <div className={`${color} rounded-full p-4 w-16 h-16 flex items-center justify-center`}>

        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default HomePage;