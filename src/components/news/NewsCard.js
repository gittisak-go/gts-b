import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const NewsCard = ({ title, summary, date, category, image, highlights }) => {
  return (
    <motion.article
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      viewport={{ once: true }}
      className="relative flex flex-col bg-light dark:bg-dark border-2 border-dark dark:border-light rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
    >
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-gradient-to-r from-indigo-900 to-purple-900 dark:from-indigo-800 dark:to-purple-800 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
          {category}
        </span>
      </div>

      {/* Image */}
      {image && (
        <div className="relative w-full h-64 bg-gradient-to-br from-primary/20 to-primaryDark/20 flex items-center justify-center overflow-hidden">
          <div className="text-6xl opacity-20">🚨</div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Date */}
        <time className="text-sm text-dark/60 dark:text-light/60 mb-2">
          {date}
        </time>

        {/* Title */}
        <h3 className="text-2xl font-bold text-dark dark:text-light mb-3 line-clamp-2 hover:text-primary dark:hover:text-primaryDark transition-colors">
          {title}
        </h3>

        {/* Summary */}
        <p className="text-dark/80 dark:text-light/80 mb-4 line-clamp-3 flex-1">
          {summary}
        </p>

        {/* Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {highlights.map((item, index) => (
              <span
                key={index}
                className="text-xs bg-dark/5 dark:bg-light/5 px-3 py-1 rounded-full border border-dark/10 dark:border-light/10"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Read More Button */}
        <button className="mt-auto text-primary dark:text-primaryDark font-semibold hover:underline underline-offset-4 text-left">
          อ่านต่อ →
        </button>
      </div>
    </motion.article>
  );
};

export default NewsCard;
