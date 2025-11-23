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
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-primary to-primaryDark text-light rounded-full shadow-2xl flex items-center justify-center text-2xl hover:shadow-primary/50 transition-shadow"
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
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary to-primaryDark text-light">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 relative rounded-full overflow-hidden">
                  <Image src="/images/chat-bo.svg" alt="avatar" fill className="object-cover" />
                </div>
                <div>
                  <div className="font-semibold">เพื่อนแชท</div>
                  <div className="text-xs opacity-90">พร้อมคุยทุกเรื่อง</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={startCall} className="px-3 py-1 rounded-md bg-white/20 text-light text-sm">📞 โทร</button>
                <button onClick={() => setIsOpen(false)} className="px-2 py-1 rounded-md bg-white/10 text-light">ปิด</button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto bg-[rgba(0,0,0,0.02)] dark:bg-[rgba(255,255,255,0.02)]">
              {messages.map((m) => (
                <div key={m.id} className={`mb-3 flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${m.sender === 'me' ? 'bg-primary text-white' : 'bg-white dark:bg-dark text-dark dark:text-light'} p-2 rounded-lg max-w-[70%] shadow-sm`}>
                    {m.type === 'text' && <div className="whitespace-pre-wrap">{m.content}</div>}
                    {m.type === 'image' && <img src={m.content} alt="user-upload" className="max-w-full rounded-md" />}
                    {m.type === 'sticker' && <div className="text-3xl">{m.content}</div>}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Composer */}
            <div className="p-3 border-t border-dark/10 dark:border-light/10 bg-white dark:bg-dark">
              <div className="flex items-center gap-2">
                <button onClick={() => setShowStickers((s) => !s)} className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800">😊</button>
                <label className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 cursor-pointer">
                  📎
                  <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="พิมพ์ข้อความ... (Enter เพื่อส่ง)"
                  className="flex-1 p-2 rounded-md resize-none h-10 text-sm bg-gray-50 dark:bg-black/20"
                />
                <button onClick={sendText} className="ml-2 px-3 py-2 rounded-md bg-gradient-to-r from-primary to-primaryDark text-white">ส่ง</button>
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
