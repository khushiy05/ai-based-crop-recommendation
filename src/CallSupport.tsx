import React, { useState } from 'react';
import { Phone, Clock, User, MapPin, Languages, MessageSquare, PhoneCall, Mail } from 'lucide-react';

interface CallSupportProps {
  selectedLanguage: string;
}

const CallSupport: React.FC<CallSupportProps> = ({ selectedLanguage }) => {
  const [selectedExpert, setSelectedExpert] = useState<string>('');
  const [callType, setCallType] = useState<'voice' | 'video'>('voice');

  const experts = [
    {
      id: 'crop-specialist',
      name: 'Dr. Raj Kumar',
      specialty: 'Crop Specialist',
      languages: ['Hindi', 'English', 'Punjabi'],
      experience: '15 years',
      available: true,
      phone: '+91-9876543210',
      image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 'soil-expert',
      name: 'Dr. Priya Sharma',
      specialty: 'Soil & Nutrition Expert',
      languages: ['Hindi', 'English'],
      experience: '12 years',
      available: true,
      phone: '+91-9876543211',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 'pest-expert',
      name: 'Mr. Vikram Singh',
      specialty: 'Pest Control Expert',
      languages: ['Hindi', 'English', 'Marathi'],
      experience: '10 years',
      available: false,
      phone: '+91-9876543212',
      image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 'market-analyst',
      name: 'Ms. Anita Patel',
      specialty: 'Market Price Analyst',
      languages: ['Hindi', 'English', 'Gujarati'],
      experience: '8 years',
      available: true,
      phone: '+91-9876543213',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const emergencyNumbers = [
    { name: 'Kisan Call Centre', number: '1551', description: '24/7 Agricultural Helpline' },
    { name: 'Weather Helpline', number: '1588', description: 'Weather Advisory Services' },
    { name: 'Crop Insurance', number: '1800-180-1551', description: 'Insurance Related Queries' },
  ];

  const translations = {
    en: {
      title: 'Expert Support Center',
      emergencyHelplines: 'Emergency Helplines',
      chooseCallType: 'Choose Call Type',
      voiceCall: 'Voice Call',
      videoCall: 'Video Call',
      availableExperts: 'Available Experts',
      scheduleCallback: 'Schedule Callback',
      sendQueryEmail: 'Send Query via Email',
      faq: 'Frequently Asked Questions',
      callCharges: 'What are the call charges?',
      callChargesAnswer: 'All calls to our experts are free of charge for registered users.',
      availabilityHours: 'What are the availability hours?',
      availabilityAnswer: 'Our experts are available from 9 AM to 6 PM IST, Monday to Saturday.',
      localLanguage: 'Can I get support in my local language?',
      localLanguageAnswer: 'Yes, our experts speak multiple regional languages including Hindi, English, and various local dialects.',
      connectionTime: 'How quickly can I get connected?',
      connectionTimeAnswer: 'During business hours, you can typically connect with an expert within 2-5 minutes.',
      callNow: 'Call Now',
      available: 'Available',
      busy: 'Busy',
      call: 'Call',
      videoCallBtn: 'Video Call',
      scheduleCallbackDesc: 'Can\'t talk right now? Schedule a callback and our experts will reach out to you.',
      sendEmailDesc: 'Send detailed questions via email and get comprehensive answers within 24 hours.'
    },
    hi: {
      title: 'विशेषज्ञ सहायता केंद्र',
      emergencyHelplines: 'आपातकालीन हेल्पलाइन',
      chooseCallType: 'कॉल प्रकार चुनें',
      voiceCall: 'वॉयस कॉल',
      videoCall: 'वीडियो कॉल',
      availableExperts: 'उपलब्ध विशेषज्ञ',
      scheduleCallback: 'कॉलबैक शेड्यूल करें',
      sendQueryEmail: 'ईमेल के माध्यम से प्रश्न भेजें',
      faq: 'अक्सर पूछे जाने वाले प्रश्न',
      callCharges: 'कॉल शुल्क क्या हैं?',
      callChargesAnswer: 'पंजीकृत उपयोगकर्ताओं के लिए हमारे विशेषज्ञों को सभी कॉल निःशुल्क हैं।',
      availabilityHours: 'उपलब्धता के घंटे क्या हैं?',
      availabilityAnswer: 'हमारे विशेषज्ञ सोमवार से शनिवार सुबह 9 बजे से शाम 6 बजे तक उपलब्ध हैं।',
      localLanguage: 'क्या मुझे अपनी स्थानीय भाषा में सहायता मिल सकती है?',
      localLanguageAnswer: 'हां, हमारे विशेषज्ञ हिंदी, अंग्रेजी और विभिन्न स्थानीय बोलियों सहित कई क्षेत्रीय भाषाएं बोलते हैं।',
      connectionTime: 'मैं कितनी जल्दी जुड़ सकता हूं?',
      connectionTimeAnswer: 'व्यावसायिक घंटों के दौरान, आप आमतौर पर 2-5 मिनट के भीतर किसी विशेषज्ञ से जुड़ सकते हैं।',
      callNow: 'अभी कॉल करें',
      available: 'उपलब्ध',
      busy: 'व्यस्त',
      call: 'कॉल करें',
      videoCallBtn: 'वीडियो कॉल',
      scheduleCallbackDesc: 'अभी बात नहीं कर सकते? कॉलबैक शेड्यूल करें और हमारे विशेषज्ञ आपसे संपर्क करेंगे।',
      sendEmailDesc: 'ईमेल के माध्यम से विस्तृत प्रश्न भेजें और 24 घंटों के भीतर व्यापक उत्तर प्राप्त करें।'
    },
    mr: {
      title: 'तज्ञ सहाय्य केंद्र',
      emergencyHelplines: 'आपत्कालीन हेल्पलाइन',
      chooseCallType: 'कॉल प्रकार निवडा',
      voiceCall: 'व्हॉइस कॉल',
      videoCall: 'व्हिडिओ कॉल',
      availableExperts: 'उपलब्ध तज्ञ',
      scheduleCallback: 'कॉलबॅक शेड्यूल करा',
      sendQueryEmail: 'ईमेलद्वारे प्रश्न पाठवा',
      faq: 'वारंवार विचारले जाणारे प्रश्न',
      callCharges: 'कॉल शुल्क काय आहेत?',
      callChargesAnswer: 'नोंदणीकृत वापरकर्त्यांसाठी आमच्या तज्ञांना सर्व कॉल विनामूल्य आहेत.',
      availabilityHours: 'उपलब्धतेचे तास काय आहेत?',
      availabilityAnswer: 'आमचे तज्ञ सोमवार ते शनिवार सकाळी 9 ते संध्याकाळी 6 पर्यंत उपलब्ध आहेत.',
      localLanguage: 'मला माझ्या स्थानिक भाषेत सहाय्य मिळू शकते का?',
      localLanguageAnswer: 'होय, आमचे तज्ञ हिंदी, इंग्रजी आणि विविध स्थानिक बोलींसह अनेक प्रादेशिक भाषा बोलतात.',
      connectionTime: 'मी किती लवकर जोडू शकतो?',
      connectionTimeAnswer: 'व्यावसायिक तासांमध्ये, तुम्ही सामान्यतः 2-5 मिनिटांत तज्ञाशी जोडू शकता.',
      callNow: 'आता कॉल करा',
      available: 'उपलब्ध',
      busy: 'व्यस्त',
      call: 'कॉल करा',
      videoCallBtn: 'व्हिडिओ कॉल',
      scheduleCallbackDesc: 'आता बोलू शकत नाही? कॉलबॅक शेड्यूल करा आणि आमचे तज्ञ तुमच्याशी संपर्क साधतील.',
      sendEmailDesc: 'ईमेलद्वारे तपशीलवार प्रश्न पाठवा आणि 24 तासांत सर्वसमावेशक उत्तरे मिळवा.'
    },
    bn: {
      title: 'বিশেষজ্ঞ সহায়তা কেন্দ্র',
      emergencyHelplines: 'জরুরি হেল্পলাইন',
      chooseCallType: 'কল প্রকার নির্বাচন করুন',
      voiceCall: 'ভয়েস কল',
      videoCall: 'ভিডিও কল',
      availableExperts: 'উপলব্ধ বিশেষজ্ঞ',
      scheduleCallback: 'কলব্যাক সময়সূচী',
      sendQueryEmail: 'ইমেইলের মাধ্যমে প্রশ্ন পাঠান',
      faq: 'প্রায়শই জিজ্ঞাসিত প্রশ্ন',
      callCharges: 'কল চার্জ কি?',
      callChargesAnswer: 'নিবন্ধিত ব্যবহারকারীদের জন্য আমাদের বিশেষজ্ঞদের সমস্ত কল বিনামূল্যে।',
      availabilityHours: 'উপলব্ধতার সময় কি?',
      availabilityAnswer: 'আমাদের বিশেষজ্ঞরা সোমবার থেকে শনিবার সকাল ৯টা থেকে সন্ধ্যা ৬টা পর্যন্ত উপলব্ধ।',
      localLanguage: 'আমি কি আমার স্থানীয় ভাষায় সহায়তা পেতে পারি?',
      localLanguageAnswer: 'হ্যাঁ, আমাদের বিশেষজ্ঞরা হিন্দি, ইংরেজি এবং বিভিন্ন স্থানীয় উপভাষা সহ একাধিক আঞ্চলিক ভাষায় কথা বলেন।',
      connectionTime: 'আমি কত দ্রুত সংযুক্ত হতে পারি?',
      connectionTimeAnswer: 'ব্যবসায়িক সময়ে, আপনি সাধারণত ২-৫ মিনিটের মধ্যে একজন বিশেষজ্ঞের সাথে সংযুক্ত হতে পারেন।',
      callNow: 'এখনই কল করুন',
      available: 'উপলব্ধ',
      busy: 'ব্যস্ত',
      call: 'কল করুন',
      videoCallBtn: 'ভিডিও কল',
      scheduleCallbackDesc: 'এখন কথা বলতে পারছেন না? একটি কলব্যাক সময়সূচী করুন এবং আমাদের বিশেষজ্ঞরা আপনার সাথে যোগাযোগ করবেন।',
      sendEmailDesc: 'ইমেইলের মাধ্যমে বিস্তারিত প্রশ্ন পাঠান এবং ২৪ ঘন্টার মধ্যে ব্যাপক উত্তর পান।'
    },
    te: {
      title: 'నిపుణుల మద్దతు కేంద్రం',
      emergencyHelplines: 'అత్యవసర హెల్ప్‌లైన్‌లు',
      chooseCallType: 'కాల్ రకాన్ని ఎంచుకోండి',
      voiceCall: 'వాయిస్ కాల్',
      videoCall: 'వీడియో కాల్',
      availableExperts: 'అందుబాటులో ఉన్న నిపుణులు',
      scheduleCallback: 'కాల్‌బ్యాక్ షెడ్యూల్ చేయండి',
      sendQueryEmail: 'ఇమెయిల్ ద్వారా ప్రశ్న పంపండి',
      faq: 'తరచుగా అడిగే ప్రశ్నలు',
      callCharges: 'కాల్ ఛార్జీలు ఎంత?',
      callChargesAnswer: 'నమోదిత వినియోగదారులకు మా నిపుణులకు అన్ని కాల్‌లు ఉచితం.',
      availabilityHours: 'అందుబాటు గంటలు ఏమిటి?',
      availabilityAnswer: 'మా నిపుణులు సోమవారం నుండి శనివారం వరకు ఉదయం 9 నుండి సాయంత్రం 6 వరకు అందుబాటులో ఉంటారు.',
      localLanguage: 'నేను నా స్థానిక భాషలో మద్దతు పొందగలనా?',
      localLanguageAnswer: 'అవును, మా నిపుణులు హిందీ, ఇంగ్లీష్ మరియు వివిధ స్థానిక మాండలికాలతో సహా అనేక ప్రాంతీయ భాషలు మాట్లాడతారు.',
      connectionTime: 'నేను ఎంత త్వరగా కనెక్ట్ అవ్వగలను?',
      connectionTimeAnswer: 'వ్యాపార గంటలలో, మీరు సాధారణంగా 2-5 నిమిషాలలో నిపుణుడితో కనెక్ట్ అవ్వగలరు.',
      callNow: 'ఇప్పుడే కాల్ చేయండి',
      available: 'అందుబాటులో',
      busy: 'బిజీ',
      call: 'కాల్ చేయండి',
      videoCallBtn: 'వీడియో కాల్',
      scheduleCallbackDesc: 'ఇప్పుడు మాట్లాడలేకపోతున్నారా? కాల్‌బ్యాక్ షెడ్యూల్ చేయండి మరియు మా నిపుణులు మిమ్మల్ని సంప్రదిస్తారు.',
      sendEmailDesc: 'ఇమెయిల్ ద్వారా వివరణాత్మక ప్రశ్నలు పంపండి మరియు 24 గంటలలో సమగ్ర సమాధానాలు పొందండి.'
    },
    ta: {
      title: 'நிபுணர் ஆதரவு மையம்',
      emergencyHelplines: 'அவசர உதவி எண்கள்',
      chooseCallType: 'அழைப்பு வகையைத் தேர்ந்தெடுக்கவும்',
      voiceCall: 'குரல் அழைப்பு',
      videoCall: 'வீடியோ அழைப்பு',
      availableExperts: 'கிடைக்கும் நிபுணர்கள்',
      scheduleCallback: 'திரும்ப அழைப்பு திட்டமிடுங்கள்',
      sendQueryEmail: 'மின்னஞ்சல் மூலம் கேள்வி அனுப்பவும்',
      faq: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
      callCharges: 'அழைப்பு கட்டணங்கள் என்ன?',
      callChargesAnswer: 'பதிவு செய்யப்பட்ட பயனர்களுக்கு எங்கள் நிபுணர்களுக்கான அனைத்து அழைப்புகளும் இலவசம்.',
      availabilityHours: 'கிடைக்கும் நேரங்கள் என்ன?',
      availabilityAnswer: 'எங்கள் நிபுணர்கள் திங்கள் முதல் சனி வரை காலை 9 மணி முதல் மாலை 6 மணி வரை கிடைக்கிறார்கள்.',
      localLanguage: 'எனது உள்ளூர் மொழியில் ஆதரவு பெற முடியுமா?',
      localLanguageAnswer: 'ஆம், எங்கள் நிபுணர்கள் இந்தி, ஆங்கிலம் மற்றும் பல்வேறு உள்ளூர் பேச்சுவழக்குகள் உட்பட பல பிராந்திய மொழிகளைப் பேசுகிறார்கள்.',
      connectionTime: 'நான் எவ்வளவு விரைவாக இணைக்க முடியும்?',
      connectionTimeAnswer: 'வணிக நேரங்களில், நீங்கள் பொதுவாக 2-5 நிமிடங்களுக்குள் ஒரு நிபுணருடன் இணைக்க முடியும்.',
      callNow: 'இப்போது அழைக்கவும்',
      available: 'கிடைக்கிறது',
      busy: 'பிஸி',
      call: 'அழைக்கவும்',
      videoCallBtn: 'வீடியோ அழைப்பு',
      scheduleCallbackDesc: 'இப்போது பேச முடியவில்லையா? திரும்ப அழைப்பு திட்டமிட்டு எங்கள் நிபுணர்கள் உங்களை தொடர்பு கொள்வார்கள்.',
      sendEmailDesc: 'மின்னஞ்சல் மூலம் விரிவான கேள்விகளை அனுப்பி 24 மணி நேரத்திற்குள் விரிவான பதில்களைப் பெறுங்கள்.'
    }
  };

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  const initiateCall = (expert: any) => {
    // In a real app, this would initiate a call through WebRTC or phone system
    alert(Connecting you with ${expert.name} (${expert.specialty})...\nPhone: ${expert.phone});
  };

  const scheduleCallback = () => {
    alert('Callback scheduled! Our expert will call you within 2 hours.');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-orange-800 mb-6 text-center">
        📞 {t.title}
      </h1>

      {/* Emergency Numbers */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-red-800 mb-4">🚨 {t.emergencyHelplines}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {emergencyNumbers.map((emergency, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-red-500">
              <h3 className="font-semibold text-gray-900 mb-1">{emergency.name}</h3>
              <p className="text-2xl font-bold text-red-600 mb-1">{emergency.number}</p>
              <p className="text-sm text-gray-600">{emergency.description}</p>
              <a
                href={tel:${emergency.number}}
                className="inline-flex items-center mt-2 text-red-600 hover:text-red-800"
              >
                <Phone className="h-4 w-4 mr-1" />
                {t.callNow}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Call Type Selection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{t.chooseCallType}</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setCallType('voice')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              callType === 'voice' 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Phone className="h-4 w-4 mr-2" />
            {t.voiceCall}
          </button>
          <button
            onClick={() => setCallType('video')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              callType === 'video' 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <PhoneCall className="h-4 w-4 mr-2" />
            {t.videoCall}
          </button>
        </div>
      </div>

      {/* Expert Selection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">👨‍🌾 {t.availableExperts}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experts.map((expert) => (
            <ExpertCard
              key={expert.id}
              expert={expert}
              callType={callType}
              onCall={() => initiateCall(expert)}
              isSelected={selectedExpert === expert.id}
              onSelect={() => setSelectedExpert(expert.id)}
              translations={t}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">
            <MessageSquare className="inline h-5 w-5 mr-2" />
            {t.scheduleCallback}
          </h3>
          <p className="text-gray-600 mb-4">{t.scheduleCallbackDesc}</p>
          <button
            onClick={scheduleCallback}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            {t.scheduleCallback}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-green-800">
            <Mail className="inline h-5 w-5 mr-2" />
            {t.sendQueryEmail}
          </h3>
          <p className="text-gray-600 mb-4">{t.sendEmailDesc}</p>
          <button
            onClick={() => window.open('mailto:support@aicrop.com')}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium"
          >
            {t.sendQueryEmail}
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">❓ {t.faq}</h2>
        <div className="space-y-3">
          <FAQItem
            question={t.callCharges}
            answer={t.callChargesAnswer}
          />
          <FAQItem
            question={t.availabilityHours}
            answer={t.availabilityAnswer}
          />
          <FAQItem
            question={t.localLanguage}
            answer={t.localLanguageAnswer}
          />
          <FAQItem
            question={t.connectionTime}
            answer={t.connectionTimeAnswer}
          />
        </div>
      </div>
    </div>
  );
};

interface ExpertCardProps {
  expert: any;
  callType: 'voice' | 'video';
  onCall: () => void;
  isSelected: boolean;
  onSelect: () => void;
  translations: any;
}

const ExpertCard: React.FC<ExpertCardProps> = ({ expert, callType, onCall, isSelected, onSelect, translations }) => {
  return (
    <div 
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected 
          ? 'border-orange-500 bg-orange-50' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start space-x-3">
        <img
          src={expert.image}
          alt={expert.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{expert.name}</h3>
          <p className="text-sm text-gray-600 mb-1">{expert.specialty}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
            <span className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              {expert.experience}
            </span>
            <span className="flex items-center">
              <Languages className="h-3 w-3 mr-1" />
              {expert.languages.join(', ')}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className={`flex items-center text-xs ${
              expert.available ? 'text-green-600' : 'text-red-600'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-1 ${
                expert.available ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              {expert.available ? translations.available : translations.busy}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCall();
              }}
              disabled={!expert.available}
              className={`px-3 py-1 rounded text-xs font-medium ${
                expert.available
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {callType === 'voice' ? translations.call : translations.videoCallBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 pb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex justify-between items-center py-2 text-gray-900 hover:text-orange-600"
      >
        <span className="font-medium">{question}</span>
        <span className={transform transition-transform ${isOpen ? 'rotate-180' : ''}}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="pt-2">
          <p className="text-gray-600 text-sm">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default CallSupport;