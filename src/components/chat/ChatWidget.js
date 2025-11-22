import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'tip', // tip (แจ้งเบาะแส) or complaint (ร้องเรียน)
    name: '',
    phone: '',
    email: '',
    location: '',
    message: '',
    anonymous: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: ส่งข้อมูลไปยัง API
    alert('ข้อมูลของท่านถูกส่งแล้ว\nเราจะเก็บรักษาความลับของท่านอย่างเคร่งครัด');
    setIsOpen(false);
    setFormData({
      type: 'tip',
      name: '',
      phone: '',
      email: '',
      location: '',
      message: '',
      anonymous: false,
    });
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-primary to-primaryDark text-light rounded-full shadow-2xl flex items-center justify-center text-2xl hover:shadow-primary/50 transition-shadow"
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-28 right-8 z-40 w-96 max-w-[calc(100vw-4rem)] bg-light dark:bg-dark border-2 border-dark dark:border-light rounded-2xl shadow-2xl overflow-hidden md:w-80 sm:w-72"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primaryDark p-4 text-light">
              <h3 className="text-lg font-bold mb-1">
                🚨 แจ้งเบาะแส / ร้องเรียน
              </h3>
              <p className="text-xs opacity-90">
                เราเก็บรักษาความลับของท่านอย่างเคร่งครัด
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 max-h-[500px] overflow-y-auto">
              {/* Type Selection */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-dark dark:text-light">
                  ประเภท
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'tip' })}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                      formData.type === 'tip'
                        ? 'bg-primary text-light border-primary'
                        : 'border-dark/20 dark:border-light/20 text-dark dark:text-light'
                    }`}
                  >
                    🔍 แจ้งเบาะแส
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'complaint' })}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                      formData.type === 'complaint'
                        ? 'bg-primary text-light border-primary'
                        : 'border-dark/20 dark:border-light/20 text-dark dark:text-light'
                    }`}
                  >
                    📢 ร้องเรียน
                  </button>
                </div>
              </div>

              {/* Anonymous Checkbox */}
              <div className="mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.anonymous}
                    onChange={(e) =>
                      setFormData({ ...formData, anonymous: e.target.checked })
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-dark dark:text-light">
                    ✓ ไม่ต้องการเปิดเผยชื่อ (ไม่ระบุตัวตน)
                  </span>
                </label>
              </div>

              {/* Name */}
              {!formData.anonymous && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 text-dark dark:text-light">
                    ชื่อ-นามสกุล
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-2 border-2 border-dark/20 dark:border-light/20 rounded-lg bg-light dark:bg-dark text-dark dark:text-light focus:border-primary dark:focus:border-primaryDark outline-none"
                    placeholder="ระบุชื่อของท่าน"
                  />
                </div>
              )}

              {/* Phone */}
              {!formData.anonymous && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 text-dark dark:text-light">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full p-2 border-2 border-dark/20 dark:border-light/20 rounded-lg bg-light dark:bg-dark text-dark dark:text-light focus:border-primary dark:focus:border-primaryDark outline-none"
                    placeholder="08x-xxx-xxxx"
                  />
                </div>
              )}

              {/* Location */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-dark dark:text-light">
                  สถานที่เกิดเหตุ
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full p-2 border-2 border-dark/20 dark:border-light/20 rounded-lg bg-light dark:bg-dark text-dark dark:text-light focus:border-primary dark:focus:border-primaryDark outline-none"
                  placeholder="จังหวัด, อำเภอ, ตำบล"
                  required
                />
              </div>

              {/* Message */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-dark dark:text-light">
                  รายละเอียด
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full p-2 border-2 border-dark/20 dark:border-light/20 rounded-lg bg-light dark:bg-dark text-dark dark:text-light focus:border-primary dark:focus:border-primaryDark outline-none resize-none"
                  placeholder="กรุณาระบุรายละเอียดให้มากที่สุด..."
                  required
                />
              </div>

              {/* Info Box */}
              <div className="mb-4 p-3 bg-primary/10 dark:bg-primaryDark/10 rounded-lg border-l-4 border-primary dark:border-primaryDark">
                <p className="text-xs text-dark dark:text-light leading-relaxed">
                  ℹ️ <span className="font-semibold">คำสัญญา:</span>{' '}
                  เราจะเก็บรักษาข้อมูลของท่านเป็นความลับ
                  และนำไปใช้เพื่อการปฏิบัติการเท่านั้น
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary to-primaryDark text-light font-bold rounded-lg hover:shadow-lg transition-shadow"
              >
                ส่งข้อมูล
              </button>
            </form>

            {/* Footer */}
            <div className="p-3 bg-dark/5 dark:bg-light/5 text-center text-xs text-dark/60 dark:text-light/60">
              ตอบกลับภายใน 24-48 ชั่วโมง
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
