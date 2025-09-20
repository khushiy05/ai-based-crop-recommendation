import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader2, CheckCircle, AlertTriangle, Leaf, Pill } from 'lucide-react';

interface DiseaseDetectionProps {
  isOnline: boolean;
  selectedLanguage: string;
}

const DiseaseDetection: React.FC<DiseaseDetectionProps> = ({ isOnline, selectedLanguage }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const translations = {
    en: {
      title: 'Disease Detection System',
      uploadCropImage: 'Upload Crop Image',
      uploadFromGallery: 'Upload from Gallery',
      takePhoto: 'Take Photo',
      analyzeDisease: 'Analyze Disease',
      analyzingImage: 'Analyzing Image...',
      diseaseIdentified: 'Disease Identified',
      diseaseName: 'Disease Name',
      confidence: 'Confidence',
      severity: 'Severity',
      cause: 'Cause',
      organicTreatment: 'Organic Treatment Solutions',
      fertilizerRecommendations: 'Fertilizer Recommendations',
      preventiveMeasures: 'Preventive Measures',
      offlineMode: 'Limited functionality in offline mode. Upload images for basic analysis.'
    },
    hi: {
      title: 'रोग निदान प्रणाली',
      uploadCropImage: 'फसल की छवि अपलोड करें',
      uploadFromGallery: 'गैलरी से अपलोड करें',
      takePhoto: 'फोटो लें',
      analyzeDisease: 'रोग का विश्लेषण करें',
      analyzingImage: 'छवि का विश्लेषण कर रहे हैं...',
      diseaseIdentified: 'रोग की पहचान',
      diseaseName: 'रोग का नाम',
      confidence: 'विश्वास',
      severity: 'गंभीरता',
      cause: 'कारण',
      organicTreatment: 'जैविक उपचार समाधान',
      fertilizerRecommendations: 'उर्वरक सिफारिशें',
      preventiveMeasures: 'निवारक उपाय',
      offlineMode: 'ऑफ़लाइन मोड में सीमित कार्यक्षमता। बुनियादी विश्लेषण के लिए छवियां अपलोड करें।'
    },
    mr: {
      title: 'रोग निदान प्रणाली',
      uploadCropImage: 'पिकाची प्रतिमा अपलोड करा',
      uploadFromGallery: 'गॅलरीतून अपलोड करा',
      takePhoto: 'फोटो काढा',
      analyzeDisease: 'रोगाचे विश्लेषण करा',
      analyzingImage: 'प्रतिमेचे विश्लेषण करत आहे...',
      diseaseIdentified: 'रोगाची ओळख',
      diseaseName: 'रोगाचे नाव',
      confidence: 'विश्वास',
      severity: 'तीव्रता',
      cause: 'कारण',
      organicTreatment: 'सेंद्रिय उपचार समाधाने',
      fertilizerRecommendations: 'खत शिफारसी',
      preventiveMeasures: 'प्रतिबंधात्मक उपाय',
      offlineMode: 'ऑफलाइन मोडमध्ये मर्यादित कार्यक्षमता। मूलभूत विश्लेषणासाठी प्रतिमा अपलोड करा।'
    },
    bn: {
      title: 'রোগ নির্ণয় সিস্টেম',
      uploadCropImage: 'ফসলের ছবি আপলোড করুন',
      uploadFromGallery: 'গ্যালারি থেকে আপলোড করুন',
      takePhoto: 'ছবি তুলুন',
      analyzeDisease: 'রোগ বিশ্লেষণ করুন',
      analyzingImage: 'ছবি বিশ্লেষণ করছি...',
      diseaseIdentified: 'রোগ সনাক্ত করা হয়েছে',
      diseaseName: 'রোগের নাম',
      confidence: 'আস্থা',
      severity: 'তীব্রতা',
      cause: 'কারণ',
      organicTreatment: 'জৈব চিকিৎসা সমাধান',
      fertilizerRecommendations: 'সার সুপারিশ',
      preventiveMeasures: 'প্রতিরোধমূলক ব্যবস্থা',
      offlineMode: 'অফলাইন মোডে সীমিত কার্যকারিতা। মৌলিক বিশ্লেষণের জন্য ছবি আপলোড করুন।'
    },
    te: {
      title: 'వ్యాధి నిర్ధారణ వ్యవస్థ',
      uploadCropImage: 'పంట చిత్రాన్ని అప్‌లోడ్ చేయండి',
      uploadFromGallery: 'గ్యాలరీ నుండి అప్‌లోడ్ చేయండి',
      takePhoto: 'ఫోటో తీయండి',
      analyzeDisease: 'వ్యాధిని విశ్లేషించండి',
      analyzingImage: 'చిత్రాన్ని విశ్లేషిస్తున్నాం...',
      diseaseIdentified: 'వ్యాధి గుర్తించబడింది',
      diseaseName: 'వ్యాధి పేరు',
      confidence: 'విశ్వాసం',
      severity: 'తీవ్రత',
      cause: 'కారణం',
      organicTreatment: 'సేంద్రీయ చికిత్స పరిష్కారాలు',
      fertilizerRecommendations: 'ఎరువుల సిఫార్సులు',
      preventiveMeasures: 'నివారణ చర్యలు',
      offlineMode: 'ఆఫ్‌లైన్ మోడ్‌లో పరిమిత కార్యాచరణ। ప్రాథమిక విశ్లేషణ కోసం చిత్రాలను అప్‌లోడ్ చేయండి।'
    },
    ta: {
      title: 'நோய் கண்டறிதல் அமைப்பு',
      uploadCropImage: 'பயிர் படத்தை பதிவேற்றவும்',
      uploadFromGallery: 'கேலரியிலிருந்து பதிவேற்றவும்',
      takePhoto: 'புகைப்படம் எடுக்கவும்',
      analyzeDisease: 'நோயை பகுப்பாய்வு செய்யவும்',
      analyzingImage: 'படத்தை பகுப்பாய்வு செய்கிறோம்...',
      diseaseIdentified: 'நோய் கண்டறியப்பட்டது',
      diseaseName: 'நோயின் பெயர்',
      confidence: 'நம்பிக்கை',
      severity: 'தீவிரம்',
      cause: 'காரணம்',
      organicTreatment: 'இயற்கை சிகிச்சை தீர்வுகள்',
      fertilizerRecommendations: 'உர பரிந்துரைகள்',
      preventiveMeasures: 'தடுப்பு நடவடிக்கைகள்',
      offlineMode: 'ஆஃப்லைன் பயன்முறையில் வரையறுக்கப்பட்ட செயல்பாடு। அடிப்படை பகுப்பாய்விற்கு படங்களை பதிவேற்றவும்।'
    }
  };

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      const mockResult = {
        disease: 'Bacterial Blight',
        confidence: 87,
        severity: 'Moderate',
        cause: 'Xanthomonas oryzae pathogen',
        organicSolutions: [
          'Apply neem oil spray (10ml per liter)',
          'Remove affected leaves immediately',
          'Improve field drainage',
          'Use copper-based fungicide'
        ],
        fertilizerSuggestions: [
          'Potassium sulphate - 25kg/hectare',
          'Zinc sulphate - 10kg/hectare',
          'Bio-fertilizer - 2kg/hectare'
        ],
        preventiveMeasures: [
          'Maintain proper plant spacing',
          'Avoid overhead irrigation',
          'Use disease-resistant varieties',
          'Regular field inspection'
        ]
      };
      setResult(mockResult);
      setAnalyzing(false);
    }, 3000);
  };

  const captureFromCamera = () => {
    // In a real app, this would access the device camera
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-red-800 mb-6 text-center">
        🔍 {t.title}
      </h1>

      {!isOnline && (
        <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
            <span className="text-orange-800">
              {t.offlineMode}
            </span>
          </div>
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{t.uploadCropImage}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center p-8 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 transition-colors"
          >
            <div className="text-center">
              <Upload className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-green-600 font-medium">{t.uploadFromGallery}</p>
            </div>
          </button>
          
          <button
            onClick={captureFromCamera}
            className="flex items-center justify-center p-8 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 transition-colors"
          >
            <div className="text-center">
              <Camera className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-blue-600 font-medium">{t.takePhoto}</p>
            </div>
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {selectedImage && (
          <div className="text-center">
            <img
              src={selectedImage}
              alt="Uploaded crop"
              className="max-w-full h-64 object-contain mx-auto rounded-lg border mb-4"
            />
            <button
              onClick={analyzeImage}
              disabled={analyzing}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 flex items-center mx-auto"
            >
              {analyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t.analyzingImage}
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {t.analyzeDisease}
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Disease Identification */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-red-800">🦠 {t.diseaseIdentified}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{t.diseaseName}</p>
                <p className="text-lg font-bold text-red-800">{result.disease}</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{t.confidence}</p>
                <p className="text-lg font-bold text-orange-600">{result.confidence}%</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{t.severity}</p>
                <p className="text-lg font-bold text-yellow-600">{result.severity}</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">{t.cause}</p>
              <p className="text-gray-800">{result.cause}</p>
            </div>
          </div>

          {/* Organic Solutions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-800">
              <Leaf className="inline h-5 w-5 mr-2" />
              {t.organicTreatment}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.organicSolutions.map((solution: string, index: number) => (
                <div key={index} className="flex items-start p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-green-800">{solution}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fertilizer Suggestions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">
              <Pill className="inline h-5 w-5 mr-2" />
              {t.fertilizerRecommendations}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.fertilizerSuggestions.map((fertilizer: string, index: number) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-blue-800 font-medium">{fertilizer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Preventive Measures */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-purple-800">
              🛡 {t.preventiveMeasures}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.preventiveMeasures.map((measure: string, index: number) => (
                <div key={index} className="flex items-start p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-600 mr-2">•</span>
                  <span className="text-purple-800">{measure}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseDetection;