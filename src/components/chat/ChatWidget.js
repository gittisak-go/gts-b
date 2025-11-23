import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { findBestMatch } from '@/utils/chatLogic';
import { supabase } from '@/utils/supabaseClient';
import { callGeminiAPI, callOpenAIAPI, callLocalLLM } from '@/utils/chatService';
import { initLocalLLM } from '@/utils/localLLMService';

// Messenger-style ChatWidget - Updated UI
const ChatWidget = () => {
  const [session, setSession] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', type: 'text', content: 'สวัสดี! ยินดีต้อนรับ 😊' },
    { id: 2, sender: 'bot', type: 'text', content: 'เราพร้อมคุยทุกเรื่อง เหมือนเพื่อนในครอบครัว' },
  ]);
  const [input, setInput] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [showStickers, setShowStickers] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [initProgress, setInitProgress] = useState('');
  const bottomRef = useRef(null);
  const chatName = 'Gts';

  const suggestions = [
    "ตรวจสอบข้อมูลผู้ต้องสงสัย",
    "ขั้นตอนการแจ้งเบาะแส",
    "ติดต่อเจ้าหน้าที่ด่วน",
    "ภารกิจหลักของหน่วยงาน"
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isOpen && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleLogin = async (provider) => {
    await supabase.auth.signInWithOAuth({
      provider: provider,
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const sendText = (textOverride) => {
    if (!session && messageCount >= 3) {
      setShowLoginModal(true);
      return;
    }

    const text = typeof textOverride === 'string' ? textOverride : input.trim();
    if (!text) return;
    
    setMessages((m) => [...m, { id: Date.now(), sender: 'me', type: 'text', content: text }]);
    if (typeof textOverride !== 'string') setInput('');
    
    if (!session) {
      setMessageCount(prev => prev + 1);
    }

    // Smart Retrieval Response (Simulated RAG) or Real API
    setTimeout(async () => {
      const savedProvider = localStorage.getItem('chat_provider');
      const savedKey = localStorage.getItem('chat_api_key');
      const savedModel = localStorage.getItem('chat_model');

      let reply = '';

      if (savedProvider === 'local') {
        // Local LLM Logic
        const modelId = savedModel || 'TinyLlama-1.1B-Chat-v1.0-q4f16_1-MLC';
        setInitProgress('Initializing Local AI... (Downloading weights...)');
        
        try {
          await initLocalLLM(modelId, (report) => {
            setInitProgress(report.text);
          });
          setInitProgress(''); // Clear progress
          reply = await callLocalLLM(text);
        } catch (err) {
          console.error(err);
          reply = "Error loading local model: " + err.message;
          setInitProgress('');
        }

      } else if (savedKey && savedProvider) {
        // Use Real API
        if (savedProvider === 'google') {
          reply = await callGeminiAPI(savedKey, text);
        } else if (savedProvider === 'openai') {
          reply = await callOpenAIAPI(savedKey, savedModel || 'gpt-3.5-turbo', text);
        } else {
          // Fallback or other providers
          reply = findBestMatch(text);
        }
      } else {
        // Use Local Logic (Fallback)
        reply = findBestMatch(text);
      }
      
      setMessages((m) => [...m, { id: Date.now() + 1, sender: 'bot', type: 'text', content: reply }]);
    }, 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendText();
    }
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = ev.target.result;
      setMessages((m) => [...m, { id: Date.now(), sender: 'me', type: 'image', content: data }]);
    };
    reader.readAsDataURL(file);
    e.target.value = null;
  };

  const sendSticker = (sticker) => {
    setMessages((m) => [...m, { id: Date.now(), sender: 'me', type: 'sticker', content: sticker }]);
    setShowStickers(false);
  };

  const startCall = () => {
    setIsCalling(true);
    // simulate a short call
    setTimeout(() => setIsCalling(false), 4000);
  };

  return (
    <>
      {/* Messenger Floating Button */}
      <motion.button
        onClick={() => setIsOpen((s) => !s)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-shadow hover:shadow-xl"
        style={{ backgroundColor: '#0084FF' }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 28 28" fill="white">
            <path d="M14 0C6.268 0 0 5.962 0 13.316c0 4.193 2.05 7.915 5.36 10.365-.236 3.28-2.08 6.02-2.13 6.09-.11.16-.06.38.11.49.06.04.13.06.2.06.11 0 .22-.05.29-.14 2.88-3.16 6.18-4.35 6.34-4.4.6.16 1.23.25 1.87.25 7.732 0 14-5.962 14-13.316S21.732 0 14 0zm1.47 17.85l-3.62-3.87-7.06 3.87 7.76-8.24 3.66 3.87 7.02-3.87-7.76 8.24z"/>
          </svg>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[90vw] h-[500px] bg-white rounded-t-2xl rounded-b-xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 font-sans"
          >
            {showLoginModal && !session ? (
              <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6">
                <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-4 border-gray-50 shadow-sm">
                   <img src="/images/chat-gts.jpg" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display='none'} />
                   <div className="w-full h-full bg-gray-200"></div>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">เข้าสู่ระบบเพื่อคุยต่อ</h3>
                <p className="text-sm text-gray-500 mb-6 text-center">กรุณายืนยันตัวตนเพื่อสนทนากับเจ้าหน้าที่<br/>และเข้าถึงข้อมูลเชิงลึก</p>
                
                <button
                  onClick={() => handleLogin('google')}
                  className="w-full py-2.5 px-4 mb-3 bg-white border border-gray-200 rounded-full flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm text-sm font-medium text-gray-700"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  เข้าสู่ระบบด้วย Google
                </button>

                <button
                  onClick={() => handleLogin('line')}
                  className="w-full py-2.5 px-4 bg-[#06C755] text-white rounded-full flex items-center justify-center gap-3 hover:bg-[#05b34c] transition-all shadow-sm text-sm font-medium"
                >
                  <img src="/images/logo/Line-Logo.png" className="w-5 h-5" alt="LINE" />
                  เข้าสู่ระบบด้วย LINE
                </button>
              </div>
            ) : null}

            {/* Messenger Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 relative rounded-full overflow-hidden border border-gray-100">
                  <img
                    src="/images/chat-gts.jpg"
                    alt="avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                  />
                  {/* Fallback circle if image fails */}
                  <div className="absolute inset-0 bg-gray-200 -z-10"></div>
                </div>
                <div>
                  <div className="font-bold text-black text-base leading-tight">{chatName}</div>
                  <div className="text-xs text-gray-500">Active now</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-red-500 font-medium">
                  Sign Out
                </button>
                <button onClick={startCall} className="text-[#0084FF]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0084FF"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.49-5.41-4.08-6.9-6.9l1.97-1.57c.26-.26.35-.65.24-1.01A11.36 11.36 0 018.59 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM5.03 5h1.5c.07.88.22 1.75.45 2.58l-1.2 1.21c-.4-1.21-.66-2.47-.75-3.79zM19 18.97c-1.32-.09-2.6-.35-3.8-.76l1.2-1.2c.85.24 1.72.39 2.6.45v1.51z"/></svg>
                </button>
                <button onClick={() => setIsOpen(false)} className="text-[#0084FF]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0084FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-3 overflow-y-auto bg-white">
              {messages.map((m) => (
                <div key={m.id} className={`mb-2 flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  {m.sender !== 'me' && (
                    <div className="w-7 h-7 mr-2 rounded-full overflow-hidden flex-shrink-0 self-end mb-1">
                       <img src="/images/chat-gts.jpg" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display='none'} />
                       <div className="w-full h-full bg-gray-200 -z-10"></div>
                    </div>
                  )}
                  <div 
                    className={`px-3 py-2 max-w-[75%] text-[15px] leading-snug ${
                      m.sender === 'me' 
                        ? 'bg-[#0084FF] text-white rounded-[18px] rounded-br-md' 
                        : 'bg-[#F0F2F5] text-black rounded-[18px] rounded-bl-md'
                    }`}
                  >
                    {m.type === 'text' && <div className="whitespace-pre-wrap">{m.content}</div>}
                    {m.type === 'image' && <img src={m.content} alt="upload" className="rounded-lg max-w-full" />}
                    {m.type === 'sticker' && <div className="text-4xl">{m.content}</div>}
                  </div>
                </div>
              ))}
              {initProgress && (
                <div className="p-2 mb-2 bg-blue-50 text-blue-700 text-xs rounded-lg text-center animate-pulse border border-blue-100">
                  <div className="font-semibold mb-1">กำลังโหลดโมเดล AI (ครั้งแรกจะนานหน่อย)...</div>
                  {initProgress}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions Area */}
            <div className="px-2 py-2 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
              {suggestions.map((s, i) => (
                <button 
                  key={i}
                  onClick={() => sendText(s)}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:bg-[#0084FF] hover:text-white hover:border-[#0084FF] transition-colors shadow-sm"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Messenger Composer */}
            <div className="p-2 flex items-center gap-2 border-t border-gray-100 bg-white">
              <button className="text-[#0084FF] p-1 hover:bg-gray-50 rounded-full">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#0084FF"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
              </button>
              
              <label className="text-[#0084FF] p-1 hover:bg-gray-50 rounded-full cursor-pointer">
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#0084FF"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
              </label>

              <button onClick={() => setShowStickers(!showStickers)} className="text-[#0084FF] p-1 hover:bg-gray-50 rounded-full">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#0084FF"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
              </button>

              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Aa"
                  className="w-full bg-[#F0F2F5] text-black rounded-full px-4 py-2 text-[15px] focus:outline-none"
                />
              </div>

              <button onClick={sendText} className="text-[#0084FF] p-1 hover:bg-gray-50 rounded-full">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#0084FF"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>

            {showStickers && (
              <div className="p-2 grid grid-cols-5 gap-2 bg-white border-t border-gray-100 h-32 overflow-y-auto">
                {['😀','😂','😍','👍','🎉','🙌','🔥','🤝','❤️','😢'].map((s) => (
                  <button key={s} onClick={() => sendSticker(s)} className="text-2xl hover:bg-gray-100 rounded p-1">{s}</button>
                ))}
              </div>
            )}
            
            {isCalling && (
              <div className="absolute inset-0 bg-black/80 z-50 flex flex-col items-center justify-center text-white">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-white">
                  <img src="/images/chat-gts.jpg" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display='none'} />
                </div>
                <div className="text-xl font-bold mb-1">{chatName}</div>
                <div className="text-sm opacity-80 mb-8">Calling...</div>
                <button onClick={() => setIsCalling(false)} className="bg-red-500 p-4 rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/></svg>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
