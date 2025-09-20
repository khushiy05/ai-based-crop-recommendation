import React, { useState } from 'react';
import { Thermometer, Droplets, Zap, TrendingUp, DollarSign, Leaf, Cloud, Calendar } from 'lucide-react';

interface CropRecommendationProps {
  location: {lat: number, lng: number} | null;
  isOnline: boolean;
  selectedLanguage: string;
}

const CropRecommendation: React.FC<CropRecommendationProps> = ({ location, isOnline, selectedLanguage }) => {
  const [soilData, setSoilData] = useState({
    ph: '',
    moisture: '',
    nitrogen: '',
    phosphorus: '',
    potassium: ''
  });
  const [dataSource, setDataSource] = useState<'manual' | 'sensor'>('manual');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const translations = {
    en: {
      title: 'Crop Recommendation System',
      dataSource: 'Data Source',
      manualEntry: 'Manual Entry',
      sensorData: 'Sensor/Satellite Data',
      fetchSensorData: 'Fetch Sensor Data',
      fetching: 'Fetching...',
      soilParameters: 'Soil Parameters',
      phLevel: 'pH Level',
      moisture: 'Moisture',
      nitrogen: 'Nitrogen (N)',
      phosphorus: 'Phosphorus (P)',
      potassium: 'Potassium (K)',
      generateRecommendations: 'Get Crop Recommendations',
      generating: 'Generating Recommendations...',
      recommendedCrops: 'Recommended Crops',
      yieldForecast: 'Yield Forecast',
      profitMargin: 'Profit Margin',
      season: 'Season',
      waterNeed: 'Water Need',
      whyThisCrop: 'Why this crop?',
      currentMarketPrice: 'Current Market Price',
      variety: 'Variety',
      sensorDataDesc: 'Fetch real-time soil data from sensors or satellite APIs',
      sensorDataRequired: 'Sensor data requires internet connection',
      rice: 'Rice',
      wheat: 'Wheat',
      tomato: 'Tomato',
      corn: 'Corn',
      cotton: 'Cotton',
      basmati: 'Basmati',
      hd2967: 'HD-2967',
      hybrid: 'Hybrid',
      dent: 'Dent Corn',
      bt: 'BT Cotton',
      kharif: 'Kharif',
      rabi: 'Rabi',
      yearRound: 'Year-round',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      optimalPh: 'Optimal pH level',
      goodMoisture: 'Good moisture content',
      suitableNpk: 'Suitable NPK ratio',
      goodNitrogen: 'Good nitrogen levels',
      favorableWeather: 'Favorable weather',
      marketDemand: 'Market demand',
      highMarketValue: 'High market value',
      goodSoilConditions: 'Good soil conditions',
      growingDemand: 'Growing demand',
      diseaseResistant: 'Disease resistant variety',
      waterEfficient: 'Water efficient'
    },
    hi: {
      title: 'फसल सिफारिश प्रणाली',
      dataSource: 'डेटा स्रोत',
      manualEntry: 'मैनुअल एंट्री',
      sensorData: 'सेंसर/सैटेलाइट डेटा',
      fetchSensorData: 'सेंसर डेटा प्राप्त करें',
      fetching: 'प्राप्त कर रहे हैं...',
      soilParameters: 'मिट्टी के पैरामीटर',
      phLevel: 'pH स्तर',
      moisture: 'नमी',
      nitrogen: 'नाइट्रोजन (N)',
      phosphorus: 'फास्फोरस (P)',
      potassium: 'पोटेशियम (K)',
      generateRecommendations: 'फसल सिफारिशें प्राप्त करें',
      generating: 'सिफारिशें तैयार कर रहे हैं...',
      recommendedCrops: 'सुझाई गई फसलें',
      yieldForecast: 'उत्पादन पूर्वानुमान',
      profitMargin: 'लाभ मार्जिन',
      season: 'मौसम',
      waterNeed: 'पानी की आवश्यकता',
      whyThisCrop: 'यह फसल क्यों?',
      currentMarketPrice: 'वर्तमान बाजार मूल्य',
      variety: 'किस्म',
      sensorDataDesc: 'सेंसर या सैटेलाइट APIs से वास्तविक समय मिट्टी डेटा प्राप्त करें',
      sensorDataRequired: 'सेंसर डेटा के लिए इंटरनेट कनेक्शन आवश्यक है',
      rice: 'चावल',
      wheat: 'गेहूं',
      tomato: 'टमाटर',
      corn: 'मक्का',
      cotton: 'कपास',
      basmati: 'बासमती',
      hd2967: 'एचडी-2967',
      hybrid: 'हाइब्रिड',
      dent: 'डेंट कॉर्न',
      bt: 'बीटी कॉटन',
      kharif: 'खरीफ',
      rabi: 'रबी',
      yearRound: 'साल भर',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कम',
      optimalPh: 'इष्टतम pH स्तर',
      goodMoisture: 'अच्छी नमी सामग्री',
      suitableNpk: 'उपयुक्त NPK अनुपात',
      goodNitrogen: 'अच्छे नाइट्रोजन स्तर',
      favorableWeather: 'अनुकूल मौसम',
      marketDemand: 'बाजार की मांग',
      highMarketValue: 'उच्च बाजार मूल्य',
      goodSoilConditions: 'अच्छी मिट्टी की स्थिति',
      growingDemand: 'बढ़ती मांग',
      diseaseResistant: 'रोग प्रतिरोधी किस्म',
      waterEfficient: 'पानी की बचत'
    },
    mr: {
      title: 'पीक शिफारस प्रणाली',
      dataSource: 'डेटा स्रोत',
      manualEntry: 'मॅन्युअल एंट्री',
      sensorData: 'सेन्सर/सॅटेलाइट डेटा',
      fetchSensorData: 'सेन्सर डेटा मिळवा',
      fetching: 'मिळवत आहे...',
      soilParameters: 'मातीचे पॅरामीटर',
      phLevel: 'pH पातळी',
      moisture: 'ओलावा',
      nitrogen: 'नायट्रोजन (N)',
      phosphorus: 'फॉस्फरस (P)',
      potassium: 'पोटॅशियम (K)',
      generateRecommendations: 'पीक शिफारसी मिळवा',
      generating: 'शिफारसी तयार करत आहे...',
      recommendedCrops: 'शिफारस केलेली पिके',
      yieldForecast: 'उत्पादन अंदाज',
      profitMargin: 'नफा मार्जिन',
      season: 'हंगाम',
      waterNeed: 'पाण्याची गरज',
      whyThisCrop: 'हे पीक का?',
      currentMarketPrice: 'सध्याची बाजार किंमत',
      variety: 'जात',
      sensorDataDesc: 'सेन्सर किंवा सॅटेलाइट APIs वरून रिअल-टाइम मातीचा डेटा मिळवा',
      sensorDataRequired: 'सेन्सर डेटासाठी इंटरनेट कनेक्शन आवश्यक आहे',
      rice: 'तांदूळ',
      wheat: 'गहू',
      tomato: 'टोमॅटो',
      corn: 'मका',
      cotton: 'कापूस',
      basmati: 'बासमती',
      hd2967: 'एचडी-2967',
      hybrid: 'हायब्रिड',
      dent: 'डेंट कॉर्न',
      bt: 'बीटी कॉटन',
      kharif: 'खरीप',
      rabi: 'रब्बी',
      yearRound: 'वर्षभर',
      high: 'जास्त',
      medium: 'मध्यम',
      low: 'कमी',
      optimalPh: 'इष्टतम pH पातळी',
      goodMoisture: 'चांगली ओलावा सामग्री',
      suitableNpk: 'योग्य NPK गुणोत्तर',
      goodNitrogen: 'चांगले नायट्रोजन पातळी',
      favorableWeather: 'अनुकूल हवामान',
      marketDemand: 'बाजारातील मागणी',
      highMarketValue: 'उच्च बाजार मूल्य',
      goodSoilConditions: 'चांगली मातीची परिस्थिती',
      growingDemand: 'वाढती मागणी',
      diseaseResistant: 'रोग प्रतिरोधी जात',
      waterEfficient: 'पाणी बचत'
    },
    bn: {
      title: 'ফসল সুপারিশ সিস্টেম',
      dataSource: 'ডেটা উৎস',
      manualEntry: 'ম্যানুয়াল এন্ট্রি',
      sensorData: 'সেন্সর/স্যাটেলাইট ডেটা',
      fetchSensorData: 'সেন্সর ডেটা আনুন',
      fetching: 'আনছি...',
      soilParameters: 'মাটির পরামিতি',
      phLevel: 'pH স্তর',
      moisture: 'আর্দ্রতা',
      nitrogen: 'নাইট্রোজেন (N)',
      phosphorus: 'ফসফরাস (P)',
      potassium: 'পটাসিয়াম (K)',
      generateRecommendations: 'ফসল সুপারিশ পান',
      generating: 'সুপারিশ তৈরি করছি...',
      recommendedCrops: 'সুপারিশকৃত ফসল',
      yieldForecast: 'ফলন পূর্বাভাস',
      profitMargin: 'লাভের মার্জিন',
      season: 'মৌসুম',
      waterNeed: 'পানির প্রয়োজন',
      whyThisCrop: 'কেন এই ফসল?',
      currentMarketPrice: 'বর্তমান বাজার দাম',
      variety: 'জাত',
      sensorDataDesc: 'সেন্সর বা স্যাটেলাইট APIs থেকে রিয়েল-টাইম মাটির ডেটা আনুন',
      sensorDataRequired: 'সেন্সর ডেটার জন্য ইন্টারনেট সংযোগ প্রয়োজন',
      rice: 'ধান',
      wheat: 'গম',
      tomato: 'টমেটো',
      corn: 'ভুট্টা',
      cotton: 'তুলা',
      basmati: 'বাসমতী',
      hd2967: 'এইচডি-২৯৬৭',
      hybrid: 'হাইব্রিড',
      dent: 'ডেন্ট কর্ন',
      bt: 'বিটি কটন',
      kharif: 'খরিফ',
      rabi: 'রবি',
      yearRound: 'সারা বছর',
      high: 'উচ্চ',
      medium: 'মাঝারি',
      low: 'কম',
      optimalPh: 'সর্বোত্তম pH স্তর',
      goodMoisture: 'ভাল আর্দ্রতা সামগ্রী',
      suitableNpk: 'উপযুক্ত NPK অনুপাত',
      goodNitrogen: 'ভাল নাইট্রোজেন স্তর',
      favorableWeather: 'অনুকূল আবহাওয়া',
      marketDemand: 'বাজারের চাহিদা',
      highMarketValue: 'উচ্চ বাজার মূল্য',
      goodSoilConditions: 'ভাল মাটির অবস্থা',
      growingDemand: 'ক্রমবর্ধমান চাহিদা',
      diseaseResistant: 'রোগ প্রতিরোধী জাত',
      waterEfficient: 'পানি সাশ্রয়ী'
    },
    te: {
      title: 'పంట సిఫార్సు వ్యవస్థ',
      dataSource: 'డేటా మూలం',
      manualEntry: 'మాన్యువల్ ఎంట్రీ',
      sensorData: 'సెన్సార్/శాటిలైట్ డేటా',
      fetchSensorData: 'సెన్సార్ డేటా తీసుకోండి',
      fetching: 'తీసుకుంటున్నాం...',
      soilParameters: 'మట్టి పారామీటర్లు',
      phLevel: 'pH స్థాయి',
      moisture: 'తేమ',
      nitrogen: 'నైట్రోజన్ (N)',
      phosphorus: 'ఫాస్ఫరస్ (P)',
      potassium: 'పొటాషియం (K)',
      generateRecommendations: 'పంట సిఫార్సులు పొందండి',
      generating: 'సిఫార్సులు రూపొందిస్తున్నాం...',
      recommendedCrops: 'సిఫార్సు చేయబడిన పంటలు',
      yieldForecast: 'దిగుబడి అంచనా',
      profitMargin: 'లాభ మార్జిన్',
      season: 'సీజన్',
      waterNeed: 'నీటి అవసరం',
      whyThisCrop: 'ఈ పంట ఎందుకు?',
      currentMarketPrice: 'ప్రస్తుత మార్కెట్ ధర',
      variety: 'రకం',
      sensorDataDesc: 'సెన్సార్ లేదా శాటిలైట్ APIs నుండి రియల్-టైమ్ మట్టి డేటా తీసుకోండి',
      sensorDataRequired: 'సెన్సార్ డేటా కోసం ఇంటర్నెట్ కనెక్షన్ అవసరం',
      rice: 'వరి',
      wheat: 'గోధుమ',
      tomato: 'టమాటో',
      corn: 'మొక్కజొన్న',
      cotton: 'పత్తి',
      basmati: 'బాస్మతి',
      hd2967: 'HD-2967',
      hybrid: 'హైబ్రిడ్',
      dent: 'డెంట్ కార్న్',
      bt: 'BT కాటన్',
      kharif: 'ఖరీఫ్',
      rabi: 'రబీ',
      yearRound: 'ఏడాది పొడవునా',
      high: 'అధిక',
      medium: 'మధ్యమ',
      low: 'తక్కువ',
      optimalPh: 'సరైన pH స్థాయి',
      goodMoisture: 'మంచి తేమ కంటెంట్',
      suitableNpk: 'అనుకూలమైన NPK నిష్పత్తి',
      goodNitrogen: 'మంచి నైట్రోజన్ స్థాయిలు',
      favorableWeather: 'అనుకూల వాతావరణం',
      marketDemand: 'మార్కెట్ డిమాండ్',
      highMarketValue: 'అధిక మార్కెట్ విలువ',
      goodSoilConditions: 'మంచి మట్టి పరిస్థితులు',
      growingDemand: 'పెరుగుతున్న డిమాండ్',
      diseaseResistant: 'వ్యాధి నిరోధక రకం',
      waterEfficient: 'నీటి ఆదా'
    },
    ta: {
      title: 'பயிர் பரிந்துரை அமைப்பு',
      dataSource: 'தரவு மூலம்',
      manualEntry: 'கையேடு நுழைவு',
      sensorData: 'சென்சார்/செயற்கைக்கோள் தரவு',
      fetchSensorData: 'சென்சார் தரவு பெறுக',
      fetching: 'பெறுகிறோம்...',
      soilParameters: 'மண் அளவுருக்கள்',
      phLevel: 'pH நிலை',
      moisture: 'ஈரப்பதம்',
      nitrogen: 'நைட்ரஜன் (N)',
      phosphorus: 'பாஸ்பரஸ் (P)',
      potassium: 'பொட்டாசியம் (K)',
      generateRecommendations: 'பயிர் பரிந்துரைகள் பெறுக',
      generating: 'பரிந்துரைகள் உருவாக்குகிறோம்...',
      recommendedCrops: 'பரிந்துரைக்கப்பட்ட பயிர்கள்',
      yieldForecast: 'விளைச்சல் முன்னறிவிப்பு',
      profitMargin: 'லாப வரம்பு',
      season: 'பருவம்',
      waterNeed: 'நீர் தேவை',
      whyThisCrop: 'ஏன் இந்த பயிர்?',
      currentMarketPrice: 'தற்போதைய சந்தை விலை',
      variety: 'வகை',
      sensorDataDesc: 'சென்சார் அல்லது செயற்கைக்கோள் APIs இலிருந்து நிகழ்நேர மண் தரவு பெறுக',
      sensorDataRequired: 'சென்சார் தரவுக்கு இணைய இணைப்பு தேவை',
      rice: 'அரிசி',
      wheat: 'கோதுமை',
      tomato: 'தக்காளி',
      corn: 'சோளம்',
      cotton: 'பருத்தி',
      basmati: 'பாஸ்மதி',
      hd2967: 'HD-2967',
      hybrid: 'கலப்பின',
      dent: 'டென்ட் கார்ன்',
      bt: 'BT பருத்தி',
      kharif: 'கரீப்',
      rabi: 'ரபி',
      yearRound: 'ஆண்டு முழுவதும்',
      high: 'அதிக',
      medium: 'நடுத்தர',
      low: 'குறைவு',
      optimalPh: 'உகந்த pH நிலை',
      goodMoisture: 'நல்ல ஈரப்பத உள்ளடக்கம்',
      suitableNpk: 'பொருத்தமான NPK விகிதம்',
      goodNitrogen: 'நல்ல நைட்ரஜன் நிலைகள்',
      favorableWeather: 'சாதகமான வானிலை',
      marketDemand: 'சந்தை தேவை',
      highMarketValue: 'அதிக சந்தை மதிப்பு',
      goodSoilConditions: 'நல்ல மண் நிலைமைகள்',
      growingDemand: 'வளர்ந்து வரும் தேவை',
      diseaseResistant: 'நோய் எதிர்ப்பு வகை',
      waterEfficient: 'நீர் சேமிப்பு'
    }
  };

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  const cropImages = {
    'Rice': 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=300',
    'Wheat': 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=300',
    'Tomato': 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=300',
    'Corn': 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=300',
    'Cotton': 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=300'
  };

  const handleInputChange = (field: string, value: string) => {
    setSoilData(prev => ({ ...prev, [field]: value }));
  };

  const fetchSensorData = async () => {
    if (!isOnline) {
      alert(t.sensorDataRequired);
      return;
    }
    setLoading(true);
    
    try {
      // Simulate real satellite/sensor API call
      const response = await fetch(https://api.example.com/soil-data?lat=${location?.lat}&lng=${location?.lng});
      
      // For demo purposes, we'll simulate the API response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock satellite data based on location
      const mockSatelliteData = {
        ph: (6.0 + Math.random() * 1.5).toFixed(1),
        moisture: (50 + Math.random() * 30).toFixed(0),
        nitrogen: (30 + Math.random() * 40).toFixed(0),
        phosphorus: (20 + Math.random() * 30).toFixed(0),
        potassium: (15 + Math.random() * 35).toFixed(0)
      };
      
      setSoilData(mockSatelliteData);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      // Fallback to mock data
      setSoilData({
        ph: '6.5',
        moisture: '65',
        nitrogen: '45',
        phosphorus: '32',
        potassium: '28'
      });
    }
    
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const generateRecommendations = async () => {
    setLoading(true);
    // Simulate AI recommendation generation
    setTimeout(() => {
      const mockRecommendations = [
        {
          crop: t.rice,
          cropKey: 'rice',
          image: cropImages['Rice'],
          variety: t.basmati,
          yieldForecast: '4.2 tons/hectare',
          profitMargin: '₹45,000 - ₹65,000',
          sustainabilityScore: 85,
          season: t.kharif,
          waterRequirement: t.high,
          marketPrice: '₹32/kg',
          reasons: [t.optimalPh, t.goodMoisture, t.suitableNpk]
        },
        {
          crop: t.wheat,
          cropKey: 'wheat',
          image: cropImages['Wheat'],
          variety: t.hd2967,
          yieldForecast: '3.8 tons/hectare',
          profitMargin: '₹38,000 - ₹52,000',
          sustainabilityScore: 78,
          season: t.rabi,
          waterRequirement: t.medium,
          marketPrice: '₹28/kg',
          reasons: [t.goodNitrogen, t.favorableWeather, t.marketDemand]
        },
        {
          crop: t.tomato,
          cropKey: 'tomato',
          image: cropImages['Tomato'],
          variety: t.hybrid,
          yieldForecast: '25 tons/hectare',
          profitMargin: '₹75,000 - ₹1,20,000',
          sustainabilityScore: 72,
          season: t.yearRound,
          waterRequirement: t.medium,
          marketPrice: '₹18/kg',
          reasons: [t.highMarketValue, t.goodSoilConditions, t.growingDemand]
        }
      ];
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
        🌾 {t.title}
      </h1>

      {/* Data Source Selection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{t.dataSource}</h2>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setDataSource('manual')}
            className={`px-4 py-2 rounded-lg ${
              dataSource === 'manual' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {t.manualEntry}
          </button>
          <button
            onClick={() => setDataSource('sensor')}
            className={`px-4 py-2 rounded-lg ${
              dataSource === 'sensor' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {t.sensorData}
          </button>
        </div>

        {dataSource === 'sensor' && (
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-blue-800 mb-2">📡 {t.sensorDataDesc}</p>
            <button
              onClick={fetchSensorData}
              disabled={loading || !isOnline}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? t.fetching : t.fetchSensorData}
            </button>
          </div>
        )}
      </div>

      {/* Soil Data Input */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{t.soilParameters}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label={t.phLevel}
            icon={<Thermometer className="h-4 w-4" />}
            value={soilData.ph}
            onChange={(value) => handleInputChange('ph', value)}
            placeholder="6.0 - 7.5"
            unit="pH"
          />
          <InputField
            label={t.moisture}
            icon={<Droplets className="h-4 w-4" />}
            value={soilData.moisture}
            onChange={(value) => handleInputChange('moisture', value)}
            placeholder="0 - 100"
            unit="%"
          />
          <InputField
            label={t.nitrogen}
            icon={<Zap className="h-4 w-4" />}
            value={soilData.nitrogen}
            onChange={(value) => handleInputChange('nitrogen', value)}
            placeholder="0 - 100"
            unit="mg/kg"
          />
          <InputField
            label={t.phosphorus}
            icon={<Zap className="h-4 w-4" />}
            value={soilData.phosphorus}
            onChange={(value) => handleInputChange('phosphorus', value)}
            placeholder="0 - 100"
            unit="mg/kg"
          />
          <InputField
            label={t.potassium}
            icon={<Zap className="h-4 w-4" />}
            value={soilData.potassium}
            onChange={(value) => handleInputChange('potassium', value)}
            placeholder="0 - 100"
            unit="mg/kg"
          />
        </div>
      </div>

      {/* Generate Recommendations Button */}
      <div className="text-center mb-6">
        <button
          onClick={generateRecommendations}
          disabled={loading}
          className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 🔄 ${t.generating} : 🎯 ${t.generateRecommendations}}
        </button>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-green-800 mb-4">📊 {t.recommendedCrops}</h2>
          {recommendations.map((crop, index) => (
            <CropCard key={index} crop={crop} translations={t} />
          ))}
        </div>
      )}
    </div>
  );
};

interface InputFieldProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  unit: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, icon, value, onChange, placeholder, unit }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      <span className="flex items-center">
        {icon}
        <span className="ml-1">{label}</span>
      </span>
    </label>
    <div className="relative">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
      />
      <span className="absolute right-3 top-3 text-gray-500 text-sm">{unit}</span>
    </div>
  </div>
);

interface CropCardProps {
  crop: any;
  translations: any;
}

const CropCard: React.FC<CropCardProps> = ({ crop, translations }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
    <div className="flex items-start space-x-4 mb-4">
      <img
        src={crop.image}
        alt={crop.crop}
        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
      />
      <div>
        <h3 className="text-xl font-bold text-gray-900">{crop.crop}</h3>
        <p className="text-gray-600">Variety: {crop.variety}</p>
      </div>
      <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
        <Leaf className="h-4 w-4 text-green-600 mr-1" />
        <span className="text-green-800 font-medium">{crop.sustainabilityScore}%</span>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <MetricCard
        icon={<TrendingUp className="h-4 w-4" />}
        label={translations.yieldForecast}
        value={crop.yieldForecast}
        color="text-blue-600"
      />
      <MetricCard
        icon={<DollarSign className="h-4 w-4" />}
        label={translations.profitMargin}
        value={crop.profitMargin}
        color="text-green-600"
      />
      <MetricCard
        icon={<Calendar className="h-4 w-4" />}
        label={translations.season}
        value={crop.season}
        color="text-orange-600"
      />
      <MetricCard
        icon={<Droplets className="h-4 w-4" />}
        label={translations.waterNeed}
        value={crop.waterRequirement}
        color="text-blue-600"
      />
    </div>

    <div className="mb-4">
      <h4 className="font-semibold text-gray-800 mb-2">{translations.whyThisCrop}</h4>
      <div className="flex flex-wrap gap-2">
        {crop.reasons.map((reason: string, index: number) => (
          <span
            key={index}
            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
          >
            ✓ {reason}
          </span>
        ))}
      </div>
    </div>

    <div className="text-right">
      <span className="text-sm text-gray-600">{translations.currentMarketPrice}: </span>
      <span className="font-bold text-green-600">{crop.marketPrice}</span>
    </div>
  </div>
);

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, color }) => (
  <div className="text-center">
    <div className={flex items-center justify-center mb-1 ${color}}>
      {icon}
    </div>
    <p className="text-xs text-gray-600 mb-1">{label}</p>
    <p className="font-semibold text-sm text-gray-900">{value}</p>
  </div>
);

export default CropRecommendation;