import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Friendly messenger-style ChatWidget
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', type: 'text', content: 'สวัสดี! ยินดีต้อนรับ 😊' },
    { id: 2, sender: 'bot', type: 'text', content: 'เราพร้อมคุยทุกเรื่อง เหมือนเพื่อนในครอบครัว' },
  ]);
  const [input, setInput] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [showStickers, setShowStickers] = useState(false);
  const bottomRef = useRef(null);

  // Chat name and running counters (user requested numbers to run up)
  const chatName = 'Gts';
  const [displayedCash, setDisplayedCash] = useState(50000000); // 50,000,000
  const [displayedSeized, setDisplayedSeized] = useState(300000000); // 300,000,000
  const cashTargetRef = useRef(displayedCash);
  const seizedTargetRef = useRef(displayedSeized);

  const fmt = (n) => new Intl.NumberFormat('th-TH').format(n);

  useEffect(() => {
    // periodically increase the targets and step displayed numbers towards them
    const incInterval = setInterval(() => {
      cashTargetRef.current += Math.floor(Math.random() * 200000 + 100000); // increase by 100k-300k
      seizedTargetRef.current += Math.floor(Math.random() * 500000 + 200000); // increase by 200k-700k

      // step displayed values toward targets for smooth-ish animation
      setDisplayedCash((prev) => {
        const diff = cashTargetRef.current - prev;
        if (diff <= 0) return prev;
        const delta = Math.max(10000, Math.ceil(diff * 0.14));
        return prev + delta;
      });
      setDisplayedSeized((prev) => {
        const diff = seizedTargetRef.current - prev;
        if (diff <= 0) return prev;
        const delta = Math.max(20000, Math.ceil(diff * 0.12));
        return prev + delta;
      });
    }, 1400);

    return () => clearInterval(incInterval);
  }, []);

  useEffect(() => {
    if (isOpen && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendText = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: Date.now(), sender: 'me', type: 'text', content: text }]);
    setInput('');
    // fake bot reply for demo
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, sender: 'bot', type: 'text', content: 'ขอบคุณที่บอกนะ 😄' }]);
    }, 900);
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
      <motion.button
        onClick={() => setIsOpen((s) => !s)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Open chat"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl hover:shadow-lg transition-shadow"
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ duration: 0.16 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[92vw] h-[520px] bg-white dark:bg-dark border-2 border-dark dark:border-light rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 relative rounded-full overflow-hidden flex-shrink-0">
                  {/* Use <img> so we can fallback from PNG to SVG if the user-supplied file isn't present */}
                  <img
                    src="/images/chat-bo.png"
                    alt="avatar"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/chat-bo.svg'; }}
                  />
                </div>
                <div>
                  <div className="font-semibold">{chatName}</div>
                  <div className="text-xs opacity-90">
                    <span className="mr-2">{fmt(displayedCash)} บาท</span>
                    <span>ทรัพย์สินอายัด {fmt(displayedSeized)}+ บาท</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={startCall} className="px-3 py-1 rounded-md bg-white/20 text-light text-sm">📞 โทร</button>
                <button onClick={() => setIsOpen(false)} className="px-2 py-1 rounded-md bg-white/10 text-light">ปิด</button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto bg-[rgba(240,248,255,0.6)]">
              {messages.map((m) => (
                <div key={m.id} className={`mb-3 flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${m.sender === 'me' ? 'bg-blue-600 text-white' : 'bg-white text-black'} p-2 rounded-lg max-w-[70%] shadow-sm`}>
                    {m.type === 'text' && <div className="whitespace-pre-wrap">{m.content}</div>}
                    {m.type === 'image' && <img src={m.content} alt="user-upload" className="max-w-full rounded-md" style={{ borderRadius: 10 }} />}
                    {m.type === 'sticker' && <div className="text-3xl">{m.content}</div>}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Composer */}
            <div className="p-3 border-t border-dark/10 dark:border-light/10 bg-white dark:bg-dark">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowStickers((s) => !s)}
                  title="สติกเกอร์"
                  className="px-2 py-1 rounded-md bg-sky-100 text-sky-700 hover:bg-sky-200"
                >
                  😊
                </button>

                <label title="แนบรูป" className="px-2 py-1 rounded-md bg-sky-100 text-sky-700 hover:bg-sky-200 cursor-pointer flex items-center gap-1">
                  📎
                  <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                </label>

                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="พิมพ์ข้อความ... (Enter เพื่อส่ง)"
                  className="flex-1 p-2 rounded-md resize-none h-10 text-sm bg-white border border-gray-200"
                />

                <button onClick={sendText} className="ml-2 px-3 py-2 rounded-md bg-blue-600 text-white">ส่ง</button>
              </div>

              {showStickers && (
                <div className="mt-2 grid grid-cols-8 gap-2">
                  {['😀','😂','😍','👍','🎉','🙌','🔥','🤝'].map((s) => (
                    <button key={s} onClick={() => sendSticker(s)} className="p-1 bg-white rounded-md text-xl">{s}</button>
                  ))}
                </div>
              )}

              {isCalling && <div className="mt-2 text-sm text-center text-primary">กำลังโทร... ☎️</div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
