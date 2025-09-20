import React, { useState, useEffect } from 'react';
import { User, MapPin, Phone, Mail, Sprout, Calendar, Save, Edit3, Camera } from 'lucide-react';

interface FarmerProfileProps {
  selectedLanguage: string;
  farmerData: any;
  setFarmerData: (data: any) => void;
}

const FarmerProfile: React.FC<FarmerProfileProps> = ({ selectedLanguage, farmerData, setFarmerData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    farmSize: '',
    farmType: '',
    experience: '',
    primaryCrops: '',
    soilType: '',
    irrigationType: '',
    profileImage: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150'
  });

  const translations = {
    en: {
      title: 'Farmer Profile',
      personalInfo: 'Personal Information',
      farmingInfo: 'Farming Information',
      editProfile: 'Edit Profile',
      saveProfile: 'Save Profile',
      cancel: 'Cancel',
      name: 'Full Name',
      phone: 'Phone Number',
      email: 'Email Address',
      address: 'Address',
      farmSize: 'Farm Size (acres)',
      farmType: 'Farm Type',
      experience: 'Years of Experience',
      primaryCrops: 'Primary Crops',
      soilType: 'Soil Type',
      irrigationType: 'Irrigation Type',
      profileSaved: 'Profile saved successfully!',
      changePhoto: 'Change Photo',
      farmTypes: {
        organic: 'Organic',
        conventional: 'Conventional',
        mixed: 'Mixed',
        greenhouse: 'Greenhouse'
      },
      soilTypes: {
        clay: 'Clay',
        sandy: 'Sandy',
        loamy: 'Loamy',
        silt: 'Silt'
      },
      irrigationTypes: {
        drip: 'Drip Irrigation',
        sprinkler: 'Sprinkler',
        flood: 'Flood Irrigation',
        rainfed: 'Rain-fed'
      }
    },
    hi: {
      title: 'किसान प्रोफ़ाइल',
      personalInfo: 'व्यक्तिगत जानकारी',
      farmingInfo: 'खेती की जानकारी',
      editProfile: 'प्रोफ़ाइल संपादित करें',
      saveProfile: 'प्रोफ़ाइल सहेजें',
      cancel: 'रद्द करें',
      name: 'पूरा नाम',
      phone: 'फोन नंबर',
      email: 'ईमेल पता',
      address: 'पता',
      farmSize: 'खेत का आकार (एकड़)',
      farmType: 'खेत का प्रकार',
      experience: 'अनुभव के वर्ष',
      primaryCrops: 'मुख्य फसलें',
      soilType: 'मिट्टी का प्रकार',
      irrigationType: 'सिंचाई का प्रकार',
      profileSaved: 'प्रोफ़ाइल सफलतापूर्वक सहेजी गई!',
      changePhoto: 'फोटो बदलें',
      farmTypes: {
        organic: 'जैविक',
        conventional: 'पारंपरिक',
        mixed: 'मिश्रित',
        greenhouse: 'ग्रीनहाउस'
      },
      soilTypes: {
        clay: 'चिकनी मिट्टी',
        sandy: 'रेतीली मिट्टी',
        loamy: 'दोमट मिट्टी',
        silt: 'गाद मिट्टी'
      },
      irrigationTypes: {
        drip: 'ड्रिप सिंचाई',
        sprinkler: 'स्प्रिंकलर',
        flood: 'बाढ़ सिंचाई',
        rainfed: 'वर्षा आधारित'
      }
    },
    mr: {
      title: 'शेतकरी प्रोफाइल',
      personalInfo: 'वैयक्तिक माहिती',
      farmingInfo: 'शेतीची माहिती',
      editProfile: 'प्रोफाइल संपादित करा',
      saveProfile: 'प्रोफाइल जतन करा',
      cancel: 'रद्द करा',
      name: 'पूर्ण नाव',
      phone: 'फोन नंबर',
      email: 'ईमेल पत्ता',
      address: 'पत्ता',
      farmSize: 'शेताचा आकार (एकर)',
      farmType: 'शेताचा प्रकार',
      experience: 'अनुभवाची वर्षे',
      primaryCrops: 'मुख्य पिके',
      soilType: 'मातीचा प्रकार',
      irrigationType: 'सिंचनाचा प्रकार',
      profileSaved: 'प्रोफाइल यशस्वीरित्या जतन केली!',
      changePhoto: 'फोटो बदला',
      farmTypes: {
        organic: 'सेंद्रिय',
        conventional: 'पारंपरिक',
        mixed: 'मिश्र',
        greenhouse: 'ग्रीनहाऊस'
      },
      soilTypes: {
        clay: 'चिकणमाती',
        sandy: 'वालुकामय माती',
        loamy: 'दोमट माती',
        silt: 'गाळमाती'
      },
      irrigationTypes: {
        drip: 'ड्रिप सिंचन',
        sprinkler: 'स्प्रिंकलर',
        flood: 'पूर सिंचन',
        rainfed: 'पावसावर अवलंबून'
      }
    },
    bn: {
      title: 'কৃষক প্রোফাইল',
      personalInfo: 'ব্যক্তিগত তথ্য',
      farmingInfo: 'কৃষি তথ্য',
      editProfile: 'প্রোফাইল সম্পাদনা করুন',
      saveProfile: 'প্রোফাইল সংরক্ষণ করুন',
      cancel: 'বাতিল',
      name: 'পূর্ণ নাম',
      phone: 'ফোন নম্বর',
      email: 'ইমেইল ঠিকানা',
      address: 'ঠিকানা',
      farmSize: 'খামারের আকার (একর)',
      farmType: 'খামারের ধরন',
      experience: 'অভিজ্ঞতার বছর',
      primaryCrops: 'প্রধান ফসল',
      soilType: 'মাটির ধরন',
      irrigationType: 'সেচের ধরন',
      profileSaved: 'প্রোফাইল সফলভাবে সংরক্ষিত হয়েছে!',
      changePhoto: 'ছবি পরিবর্তন করুন',
      farmTypes: {
        organic: 'জৈব',
        conventional: 'প্রচলিত',
        mixed: 'মিশ্র',
        greenhouse: 'গ্রিনহাউস'
      },
      soilTypes: {
        clay: 'কাদামাটি',
        sandy: 'বালুকাময়',
        loamy: 'দোআঁশ',
        silt: 'পলি'
      },
      irrigationTypes: {
        drip: 'ড্রিপ সেচ',
        sprinkler: 'স্প্রিংকলার',
        flood: 'বন্যা সেচ',
        rainfed: 'বৃষ্টিনির্ভর'
      }
    },
    te: {
      title: 'రైతు ప్రొఫైల్',
      personalInfo: 'వ్యక్తిగత సమాచారం',
      farmingInfo: 'వ్యవసాయ సమాచారం',
      editProfile: 'ప్రొఫైల్ సవరించండి',
      saveProfile: 'ప్రొఫైల్ సేవ్ చేయండి',
      cancel: 'రద్దు చేయండి',
      name: 'పూర్తి పేరు',
      phone: 'ఫోన్ నంబర్',
      email: 'ఇమెయిల్ చిరునామా',
      address: 'చిరునామా',
      farmSize: 'వ్యవసాయ భూమి పరిమాణం (ఎకరాలు)',
      farmType: 'వ్యవసాయ రకం',
      experience: 'అనుభవ సంవత్సరాలు',
      primaryCrops: 'ప్రధాన పంటలు',
      soilType: 'మట్టి రకం',
      irrigationType: 'నీటిపారుదల రకం',
      profileSaved: 'ప్రొఫైల్ విజయవంతంగా సేవ్ చేయబడింది!',
      changePhoto: 'ఫోటో మార్చండి',
      farmTypes: {
        organic: 'సేంద్రీయ',
        conventional: 'సంప్రదాయ',
        mixed: 'మిశ్రమ',
        greenhouse: 'గ్రీన్‌హౌస్'
      },
      soilTypes: {
        clay: 'బంకమట్టి',
        sandy: 'ఇసుకరేణు',
        loamy: 'మట్టిరేణు',
        silt: 'సిల్ట్'
      },
      irrigationTypes: {
        drip: 'డ్రిప్ నీటిపారుదల',
        sprinkler: 'స్ప్రింక్లర్',
        flood: 'వరద నీటిపారుదల',
        rainfed: 'వర్షాధార'
      }
    },
    ta: {
      title: 'விவசாயி சுயவிவரம்',
      personalInfo: 'தனிப்பட்ட தகவல்',
      farmingInfo: 'விவசாய தகவல்',
      editProfile: 'சுயவிவரத்தை திருத்தவும்',
      saveProfile: 'சுயவிவரத்தை சேமிக்கவும்',
      cancel: 'ரத்து செய்யவும்',
      name: 'முழு பெயர்',
      phone: 'தொலைபேசி எண்',
      email: 'மின்னஞ்சல் முகவரி',
      address: 'முகவரி',
      farmSize: 'பண்ணையின் அளவு (ஏக்கர்)',
      farmType: 'பண்ணை வகை',
      experience: 'அனுபவ ஆண்டுகள்',
      primaryCrops: 'முதன்மை பயிர்கள்',
      soilType: 'மண் வகை',
      irrigationType: 'நீர்ப்பாசன வகை',
      profileSaved: 'சுயவிவரம் வெற்றிகரமாக சேமிக்கப்பட்டது!',
      changePhoto: 'புகைப்படத்தை மாற்றவும்',
      farmTypes: {
        organic: 'இயற்கை',
        conventional: 'வழக்கமான',
        mixed: 'கலப்பு',
        greenhouse: 'பசுமை இல்லம்'
      },
      soilTypes: {
        clay: 'களிமண்',
        sandy: 'மணல்',
        loamy: 'களிமண் கலந்த மண்',
        silt: 'வண்டல்'
      },
      irrigationTypes: {
        drip: 'சொட்டு நீர்ப்பாசனம்',
        sprinkler: 'தெளிப்பான்',
        flood: 'வெள்ள நீர்ப்பாசனம்',
        rainfed: 'மழை சார்ந்த'
      }
    }
  };

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  useEffect(() => {
    if (farmerData) {
      setFormData(farmerData);
    }
  }, [farmerData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setFarmerData(formData);
    localStorage.setItem('farmerData', JSON.stringify(formData));
    setIsEditing(false);
    alert(t.profileSaved);
  };

  const handleCancel = () => {
    if (farmerData) {
      setFormData(farmerData);
    }
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-white text-green-600 rounded-full p-1 shadow-md">
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{t.title}</h1>
                <p className="text-green-100">{formData.name || 'Complete your profile'}</p>
              </div>
            </div>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 flex items-center"
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {t.saveProfile}
                </>
              ) : (
                <>
                  <Edit3 className="h-4 w-4 mr-2" />
                  {t.editProfile}
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-green-600" />
              {t.personalInfo}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label={t.name}
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
                disabled={!isEditing}
                icon={<User className="h-4 w-4" />}
              />
              <InputField
                label={t.phone}
                value={formData.phone}
                onChange={(value) => handleInputChange('phone', value)}
                disabled={!isEditing}
                icon={<Phone className="h-4 w-4" />}
                type="tel"
              />
              <InputField
                label={t.email}
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                disabled={!isEditing}
                icon={<Mail className="h-4 w-4" />}
                type="email"
              />
              <InputField
                label={t.address}
                value={formData.address}
                onChange={(value) => handleInputChange('address', value)}
                disabled={!isEditing}
                icon={<MapPin className="h-4 w-4" />}
              />
            </div>
          </div>

          {/* Farming Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Sprout className="h-5 w-5 mr-2 text-green-600" />
              {t.farmingInfo}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label={t.farmSize}
                value={formData.farmSize}
                onChange={(value) => handleInputChange('farmSize', value)}
                disabled={!isEditing}
                icon={<Sprout className="h-4 w-4" />}
                type="number"
              />
              <SelectField
                label={t.farmType}
                value={formData.farmType}
                onChange={(value) => handleInputChange('farmType', value)}
                disabled={!isEditing}
                options={[
                  { value: 'organic', label: t.farmTypes.organic },
                  { value: 'conventional', label: t.farmTypes.conventional },
                  { value: 'mixed', label: t.farmTypes.mixed },
                  { value: 'greenhouse', label: t.farmTypes.greenhouse }
                ]}
              />
              <InputField
                label={t.experience}
                value={formData.experience}
                onChange={(value) => handleInputChange('experience', value)}
                disabled={!isEditing}
                icon={<Calendar className="h-4 w-4" />}
                type="number"
              />
              <InputField
                label={t.primaryCrops}
                value={formData.primaryCrops}
                onChange={(value) => handleInputChange('primaryCrops', value)}
                disabled={!isEditing}
                icon={<Sprout className="h-4 w-4" />}
                placeholder="Rice, Wheat, Tomato..."
              />
              <SelectField
                label={t.soilType}
                value={formData.soilType}
                onChange={(value) => handleInputChange('soilType', value)}
                disabled={!isEditing}
                options={[
                  { value: 'clay', label: t.soilTypes.clay },
                  { value: 'sandy', label: t.soilTypes.sandy },
                  { value: 'loamy', label: t.soilTypes.loamy },
                  { value: 'silt', label: t.soilTypes.silt }
                ]}
              />
              <SelectField
                label={t.irrigationType}
                value={formData.irrigationType}
                onChange={(value) => handleInputChange('irrigationType', value)}
                disabled={!isEditing}
                options={[
                  { value: 'drip', label: t.irrigationTypes.drip },
                  { value: 'sprinkler', label: t.irrigationTypes.sprinkler },
                  { value: 'flood', label: t.irrigationTypes.flood },
                  { value: 'rainfed', label: t.irrigationTypes.rainfed }
                ]}
              />
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex space-x-4 justify-end">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                {t.saveProfile}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  icon: React.ReactNode;
  type?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  disabled, 
  icon, 
  type = 'text',
  placeholder 
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      <span className="flex items-center">
        {icon}
        <span className="ml-1">{label}</span>
      </span>
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
        disabled ? 'bg-gray-50 text-gray-600' : 'bg-white'
      }`}
    />
  </div>
);

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  options: { value: string; label: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  disabled, 
  options 
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
        disabled ? 'bg-gray-50 text-gray-600' : 'bg-white'
      }`}
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default FarmerProfile;