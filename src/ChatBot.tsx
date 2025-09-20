import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Bot, User, Volume2 } from 'lucide-react';

interface ChatBotProps {
  selectedLanguage: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot: React.FC<ChatBotProps> = ({ selectedLanguage, isOnline }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: selectedLanguage === 'hi' 
        ? 'नमस्ते! मैं आपका AI कृषि सहायक हूं। मैं खेती, फसल, बीमारी नियंत्रण और बाज़ार की कीमतों के बारे में आपकी मदद कर सकता हूं।'
        : 'Hello! I\'m your AI farming assistant. I can help you with farming tips, crop advice, disease control, and market prices.',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    en: {
      greeting: "Hello! How can I help you with your farming needs today?",
      rice: "Rice cultivation tips: Maintain 2-5cm water level, use 25-30 kg seeds per hectare, and apply NPK fertilizer in 3 splits. Harvest when 80% grains are golden yellow.",
      wheat: "Wheat farming advice: Sow during November-December, use 100-125 kg seeds per hectare, irrigate 4-6 times during growth period. Apply 120:60:40 NPK kg/hectare.",
      disease: "For disease identification, please use our Disease Detection feature by uploading a clear image of the affected plant part.",
      weather: "Weather information is integrated with our crop recommendations. Enable location services for accurate local weather data.",
      market: "Current market prices vary by region. Rice: ₹20-25/kg, Wheat: ₹22-28/kg, Tomato: ₹15-30/kg. Prices are updated daily when online.",
      default: "I can help with farming techniques, crop selection, pest control, irrigation, fertilizers, and market information. What specific topic interests you?"
    },
    hi: {
      greeting: "नमस्ते! आज मैं आपकी खेती की जरूरतों में कैसे मदद कर सकता हूं?",
      rice: "चावल की खेती की सलाह: 2-5 सेमी पानी बनाए रखें, प्रति हेक्टेयर 25-30 किलो बीज का उपयोग करें, और NPK उर्वरक को 3 भागों में दें। जब 80% दाने सुनहरे हो जाएं तो कटाई करें।",
      wheat: "गेहूं की खेती की सलाह: नवंबर-दिसंबर में बुआई करें, प्रति हेक्टेयर 100-125 किलो बीज का उपयोग करें, विकास अवधि में 4-6 बार सिंचाई करें। 120:60:40 NPK किलो प्रति हेक्टेयर डालें।",
      disease: "बीमारी की पहचान के लिए, कृपया प्रभावित पौधे के हिस्से की स्पष्ट तस्वीर अपलोड करके हमारे रोग निदान फीचर का उपयोग करें।",
      weather: "मौसम की जानकारी हमारी फसल सिफारिशों के साथ एकीकृत है। सटीक स्थानीय मौसम डेटा के लिए स्थान सेवाओं को सक्षम करें।",
      market: "वर्तमान बाजार मूल्य क्षेत्र के अनुसार अलग-अलग हैं। चावल: ₹20-25/किलो, गेहूं: ₹22-28/किलो, टमाटर: ₹15-30/किलो। ऑनलाइन होने पर कीमतें दैनिक अपडेट होती हैं।",
      default: "मैं खेती की तकनीकों, फसल चयन, कीट नियंत्रण, सिंचाई, उर्वरक और बाजार की जानकारी में मदद कर सकता हूं। आपको कौन सा विषय दिलचस्प लगता है?"
    },
    mr: {
      greeting: "नमस्कार! आज मी तुमच्या शेतीच्या गरजांमध्ये कशी मदत करू शकतो?",
      rice: "तांदळाच्या लागवडीच्या टिप्स: 2-5 सेमी पाण्याची पातळी राखा, प्रति हेक्टर 25-30 किलो बियाणे वापरा, आणि NPK खत 3 भागांत द्या। 80% दाणे सोनेरी झाल्यावर कापणी करा.",
      wheat: "गव्हाच्या शेतीचा सल्ला: नोव्हेंबर-डिसेंबरमध्ये पेरणी करा, प्रति हेक्टर 100-125 किलो बियाणे वापरा, वाढीच्या काळात 4-6 वेळा पाणी द्या। 120:60:40 NPK किलो प्रति हेक्टर टाका.",
      disease: "रोगाच्या ओळखीसाठी, कृपया प्रभावित झाडाच्या भागाचा स्पष्ट फोटो अपलोड करून आमचे रोग निदान वैशिष्ट्य वापरा.",
      weather: "हवामानाची माहिती आमच्या पीक शिफारशींसह एकत्रित आहे. अचूक स्थानिक हवामान डेटासाठी स्थान सेवा सक्षम करा.",
      market: "सध्याच्या बाजार किमती प्रदेशानुसार बदलतात. तांदूळ: ₹20-25/किलो, गहू: ₹22-28/किलो, टोमॅटो: ₹15-30/किलो. ऑनलाइन असताना किमती दररोज अपडेट होतात.",
      default: "मी शेतीच्या तंत्रांमध्ये, पीक निवड, कीड नियंत्रण, सिंचन, खते आणि बाजार माहितीमध्ये मदत करू शकतो. तुम्हाला कोणता विषय मनोरंजक वाटतो?"
    },
    bn: {
      greeting: "নমস্কার! আজ আমি আপনার কৃষি প্রয়োজনে কীভাবে সাহায্য করতে পারি?",
      rice: "ধান চাষের টিপস: ২-৫ সেমি পানির স্তর বজায় রাখুন, প্রতি হেক্টরে ২৫-৩০ কেজি বীজ ব্যবহার করুন, এবং NPK সার ৩ ভাগে প্রয়োগ করুন। ৮০% দানা সোনালি হলে কাটুন।",
      wheat: "গম চাষের পরামর্শ: নভেম্বর-ডিসেম্বরে বপন করুন, প্রতি হেক্টরে ১০০-১২৫ কেজি বীজ ব্যবহার করুন, বৃদ্ধির সময় ৪-৬ বার সেচ দিন। ১২০:৬০:৪০ NPK কেজি/হেক্টর প্রয়োগ করুন।",
      disease: "রোগ সনাক্তকরণের জন্য, অনুগ্রহ করে আক্রান্ত গাছের অংশের স্পষ্ট ছবি আপলোড করে আমাদের রোগ নির্ণয় বৈশিষ্ট্য ব্যবহার করুন।",
      weather: "আবহাওয়ার তথ্য আমাদের ফসল সুপারিশের সাথে একীভূত। সঠিক স্থানীয় আবহাওয়া ডেটার জন্য অবস্থান সেবা সক্ষম করুন।",
      market: "বর্তমান বাজার দাম অঞ্চল অনুযায়ী ভিন্ন। ধান: ₹২০-২৫/কেজি, গম: ₹২২-২৮/কেজি, টমেটো: ₹১৫-৩০/কেজি। অনলাইনে থাকলে দাম দৈনিক আপডেট হয়।",
      default: "আমি কৃষি কৌশল, ফসল নির্বাচন, কীটপতঙ্গ নিয়ন্ত্রণ, সেচ, সার এবং বাজার তথ্যে সাহায্য করতে পারি। কোন নির্দিষ্ট বিষয় আপনার আগ্রহের?"
    },
    te: {
      greeting: "నమస్కారం! ఈరోజు మీ వ్యవసాయ అవసరాలలో నేను ఎలా సహాయం చేయగలను?",
      rice: "వరి సాగు చిట్కాలు: 2-5 సెమీ నీటి స్థాయిని నిర్వహించండి, హెక్టారుకు 25-30 కిలోల విత్తనాలు వాడండి, మరియు NPK ఎరువులను 3 భాగాలుగా వేయండి. 80% గింజలు బంగారు రంగులో మారినప్పుడు కోయండి.",
      wheat: "గోధుమ వ్యవసాయ సలహా: నవంబర్-డిసెంబర్‌లో విత్తనాలు వేయండి, హెక్టారుకు 100-125 కిలోల విత్తనాలు వాడండి, పెరుగుదల కాలంలో 4-6 సార్లు నీరు పెట్టండి. 120:60:40 NPK కిలోలు/హెక్టారు వేయండి.",
      disease: "వ్యాధి గుర్తింపు కోసం, దయచేసి ప్రభావిత మొక్క భాగం యొక్క స్పష్టమైన చిత్రాన్ని అప్‌లోడ్ చేసి మా వ్యాధి నిర్ధారణ ఫీచర్‌ను ఉపయోగించండి.",
      weather: "వాతావరణ సమాచారం మా పంట సిఫార్సులతో కలిసి ఉంది. ఖచ్చితమైన స్థానిక వాతావరణ డేటా కోసం స్థాన సేవలను ప్రారంభించండి.",
      market: "ప్రస్తుత మార్కెట్ ధరలు ప్రాంతం ప్రకారం మారుతాయి. వరి: ₹20-25/కిలో, గోధుమ: ₹22-28/కిలో, టమాటో: ₹15-30/కిలో. ఆన్‌లైన్‌లో ఉన్నప్పుడు ధరలు రోజువారీ అప్‌డేట్ అవుతాయి.",
      default: "నేను వ్యవసాయ పద్ధతులు, పంట ఎంపిక, కీటక నియంత్రణ, నీటిపారుదల, ఎరువులు మరియు మార్కెట్ సమాచారంలో సహాయం చేయగలను. మీకు ఏ నిర్దిష్ట అంశం ఆసక్తికరంగా అనిపిస్తుంది?"
    },
    ta: {
      greeting: "வணக்கம்! இன்று உங்கள் விவசாய தேவைகளில் நான் எப்படி உதவ முடியும்?",
      rice: "அரிசி சாகுபடி குறிப்புகள்: 2-5 செமீ நீர் மட்டத்தை பராமரிக்கவும், ஹெக்டேருக்கு 25-30 கிலோ விதைகளை பயன்படுத்தவும், மற்றும் NPK உரத்தை 3 பகுதிகளாக பயன்படுத்தவும். 80% தானியங்கள் தங்க நிறமாக மாறும்போது அறுவடை செய்யவும்.",
      wheat: "கோதுமை விவசாய ஆலோசனை: நவம்பர்-டிசம்பரில் விதைக்கவும், ஹெக்டேருக்கு 100-125 கிலோ விதைகளை பயன்படுத்தவும், வளர்ச்சி காலத்தில் 4-6 முறை நீர்ப்பாசனம் செய்யவும். 120:60:40 NPK கிலோ/ஹெக்டேர் பயன்படுத்தவும்.",
      disease: "நோய் கண்டறிதலுக்கு, தயவுசெய்து பாதிக்கப்பட்ட தாவர பகுதியின் தெளிவான படத்தை பதிவேற்றி எங்கள் நோய் கண்டறிதல் அம்சத்தை பயன்படுத்தவும்.",
      weather: "வானிலை தகவல் எங்கள் பயிர் பரிந்துரைகளுடன் ஒருங்கிணைக்கப்பட்டுள்ளது. துல்லியமான உள்ளூர் வானிலை தரவுக்கு இடம் சேவைகளை இயக்கவும்.",
      market: "தற்போதைய சந்தை விலைகள் பகுதியின் அடிப்படையில் மாறுபடும். அரிசி: ₹20-25/கிலோ, கோதுமை: ₹22-28/கிலோ, தக்காளி: ₹15-30/கிலோ. ஆன்லைனில் இருக்கும்போது விலைகள் தினசரி புதுப்பிக்கப்படும்.",
      default: "நான் விவசாய நுட்பங்கள், பயிர் தேர்வு, பூச்சி கட்டுப்பாடு, நீர்ப்பாசனம், உரங்கள் மற்றும் சந்தை தகவல்களில் உதவ முடியும். எந்த குறிப்பிட்ட தலைப்பு உங்களுக்கு ஆர்வமாக உள்ளது?"
    }
  };

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    const responses = predefinedResponses[selectedLanguage as keyof typeof predefinedResponses] || predefinedResponses.en;

    if (message.includes('rice') || message.includes('चावल')) return responses.rice;
    if (message.includes('wheat') || message.includes('गेहूं')) return responses.wheat;
    if (message.includes('disease') || message.includes('बीमारी')) return responses.disease;
    if (message.includes('weather') || message.includes('मौसम')) return responses.weather;
    if (message.includes('price') || message.includes('market') || message.includes('कीमत')) return responses.market;
    if (message.includes('hello') || message.includes('hi') || message.includes('नमस्ते')) return responses.greeting;
    
    return responses.default;
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would start/stop voice recognition
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInputText("How do I control pests in my tomato crop?");
      }, 3000);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const quickQuestions = {
    en: [
      "What crops should I plant this season?",
      "How to control pests naturally?",
      "What is the current market price?",
      "How much water does rice need?",
    ],
    hi: [
      "इस सीज़न में मुझे कौन सी फसल लगानी चाहिए?",
      "कीटों को प्राकृतिक रूप से कैसे नियंत्रित करें?",
      "वर्तमान बाजार मूल्य क्या है?",
      "चावल को कितने पानी की जरूरत होती है?",
    ],
    mr: [
      "या हंगामात मी कोणती पिके लावावीत?",
      "कीटकांना नैसर्गिकरित्या कसे नियंत्रित करावे?",
      "सध्याची बाजार किंमत काय आहे?",
      "तांदळाला किती पाण्याची गरज आहे?",
    ],
    bn: [
      "এই মৌসুমে আমার কোন ফসল রোপণ করা উচিত?",
      "কীভাবে প্রাকৃতিকভাবে কীটপতঙ্গ নিয়ন্ত্রণ করবেন?",
      "বর্তমান বাজার দাম কত?",
      "ধানের কত পানি প্রয়োজন?",
    ],
    te: [
      "ఈ సీజన్‌లో నేను ఏ పంటలు నాటాలి?",
      "సహజంగా కీటకాలను ఎలా నియంత్రించాలి?",
      "ప్రస్తుత మార్కెట్ ధర ఎంత?",
      "వరికి ఎంత నీరు అవసరం?",
    ],
    ta: [
      "இந்த பருவத்தில் நான் எந்த பயிர்களை நடவேண்டும்?",
      "இயற்கையாக பூச்சிகளை எப்படி கட்டுப்படுத்துவது?",
      "தற்போதைய சந்தை விலை என்ன?",
      "அரிசிக்கு எவ்வளவு தண்ணீர் தேவை?",
    ]
  };

  const questions = quickQuestions[selectedLanguage as keyof typeof quickQuestions] || quickQuestions.en;

  return (
    <div className="max-w-4xl mx-auto p-6 h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-blue-800 mb-4 text-center">
        🤖 AI Farming Assistant
      </h1>

      {!isOnline && (
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mb-4 text-center">
          <span className="text-yellow-800 text-sm">
            📱 Offline mode - Using cached responses
          </span>
        </div>
      )}

      {/* Quick Questions */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Questions:</h3>
        <div className="flex flex-wrap gap-2">
          {questions.map((question, index) => (
            <button
              key={index}
              onClick={() => setInputText(question)}
              className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-white rounded-lg shadow-md overflow-y-auto p-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}}
          >
            <div className={flex max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}}>
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' ? 'bg-green-600 ml-2' : 'bg-blue-600 mr-2'
              }`}>
                {message.sender === 'user' ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4 text-white" />
                )}
              </div>
              <div className={`px-4 py-2 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{message.text}</p>
                {message.sender === 'bot' && (
                  <button
                    onClick={() => speakText(message.text)}
                    className="mt-2 text-xs text-gray-500 hover:text-gray-700 flex items-center"
                  >
                    <Volume2 className="h-3 w-3 mr-1" />
                    Listen
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="flex">
              <div className="bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center mr-2">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex items-center space-x-2 bg-white rounded-lg shadow-md p-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder={selectedLanguage === 'hi' ? 'अपना सवाल पूछें...' : 'Ask your farming question...'}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <button
          onClick={toggleRecording}
          className={`p-2 rounded-lg ${
            isRecording 
              ? 'bg-red-600 text-white animate-pulse' 
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>
        
        <button
          onClick={sendMessage}
          disabled={!inputText.trim()}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;