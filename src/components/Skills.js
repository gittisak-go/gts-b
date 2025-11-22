import React from 'react';

const Skills = () => {
  return (
    <>
      <h2 className="font-bold text-8xl mt-64 w-full text-center md:text-6xl md:mt-32 mb-16">
        สถานที่ตั้ง
      </h2>
      <div className="w-full flex items-center justify-center mb-32">
        <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border-4 border-solid border-dark dark:border-light">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15494.038449227128!2d100.577588!3d13.868449!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29d2b1fa52d95%3A0xb7277fe37aedd887!2z4LiB4Lit4LiH4Lia4Lix4LiN4LiK4Liy4LiB4Liy4Lij4LiV4Liz4Lij4Lin4LiI4Lib4Lij4Liy4Lia4Lib4Lij4Liy4Lih4Lii4Liy4LmA4Liq4Lie4LiV4Li04LiU!5e0!3m2!1sth!2sus!4v1763844542717!5m2!1sth!2sus" 
            width="100%" 
            height="300" 
            style={{ border: 0 }}
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="md:h-64 sm:h-56"
          />
        </div>
      </div>
    </>
  );
};

export default Skills;
