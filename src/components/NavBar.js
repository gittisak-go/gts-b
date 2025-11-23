import Link from 'next/link';
import { useRouter } from 'next/router';
import { TwitterIcon, GithubIcon, LinkedInIcon, PinterestIcon, DribbbleIcon, SunIcon, MoonIcon } from './Icons';
import { motion } from 'framer-motion';
import Image from 'next/image';
import useThemeSwitcher from './hooks/useThemeSwitcher';
import { useState } from 'react';

const CustomLink = ({ href, title, className = '' }) => {
  const router = useRouter();
  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`h-[1px] inline-block bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
          router.asPath === href ? 'w-full' : 'w-0'
        } dark:bg-light`}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const CustomMobileLink = ({ href, title, className = '', toggle }) => {
  const router = useRouter();

  const handleClick = () => {
    toggle();
    router.push(href);
  };

  return (
    <button
      className={`${className} relative group text-light dark:text-dark my-2`}
      onClick={handleClick}
    >
      {title}
      <span
        className={`h-[1px] inline-block bg-light absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
          router.asPath === href ? 'w-full' : 'w-0'
        } dark:bg-dark`}
      >
        &nbsp;
      </span>
    </button>
  );
};

const NavBar = () => {
  const [mode, setMode] = useThemeSwitcher();
  const [isOpen, setIsOpen] = useState(false);
  const [newsDropdownOpen, setNewsDropdownOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full px-32 py-8 font-medium flex items-center justify-between dark:text-light relative z-10 lg:px-16 md:px-12 sm:px-8">
      {/* Hamburger Menu Button */}
      <button
        className="flex-col justify-center items-center hidden lg:flex"
        onClick={handleClick}
      >
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
          }`}
        ></span>
      </button>

      {/* Desktop Navigation */}
      <nav className="flex items-center justify-center flex-wrap lg:hidden">
        <CustomLink href="/" title="Home" className="mr-4" />
        <CustomLink href="/about" title="About" className="mx-4" />
        <CustomLink href="/projects" title="Projects" className="mx-4" />
        
        {/* Dropdown Menu สำหรับข่าวสาร */}
        <div
          className="relative mx-4"
          onMouseEnter={() => setNewsDropdownOpen(true)}
          onMouseLeave={() => setNewsDropdownOpen(false)}
        >
          <button className="relative group">
            ข่าวสาร ▾
            <span
              className={`h-[1px] inline-block bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 w-0 dark:bg-light`}
            >
              &nbsp;
            </span>
          </button>
          {newsDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 mt-2 bg-light dark:bg-dark border-2 border-dark dark:border-light rounded-lg shadow-xl py-2 min-w-[200px] z-50"
            >
              <Link
                href="/news"
                className="block px-6 py-3 hover:bg-primary/10 dark:hover:bg-primaryDark/10 transition-colors"
              >
                📰 ข่าวอัพเดท
              </Link>
              <Link
                href="/stories"
                className="block px-6 py-3 hover:bg-primary/10 dark:hover:bg-primaryDark/10 transition-colors"
              >
                📖 เรื่องราว & งานเขียน
              </Link>
            </motion.div>
          )}
        </div>
        
        <CustomLink href="/articles" title="Articles" className="ml-4" />
      </nav>

      {/* Desktop Social Icons */}
      <nav className="flex items-center justify-center flex-wrap lg:hidden">
        <motion.a
          href="https://twitter.com/gtsalpha"
          target="_blank"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="w-6 mr-3"
        >
          <TwitterIcon className="fill-[#1DA1F2]" />
        </motion.a>
        <motion.a
          href="https://github.com/gtsalpha"
          target="_blank"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="w-6 mx-3"
        >
          <GithubIcon />
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/gtsalpha"
          target="_blank"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="w-6 mx-3"
        >
          <LinkedInIcon />
        </motion.a>
        <motion.a
          href="https://pinterest.com/gtsalpha"
          target="_blank"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="w-6 mx-3"
        >
          <PinterestIcon className="fill-[#E60023] bg-white rounded-full" />
        </motion.a>
        <motion.a
          href="https://dribbble.com/gtsalpha"
          target="_blank"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="w-6 ml-3"
        >
          <DribbbleIcon className="fill-[#EA4C89]" />
        </motion.a>

        <button
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          className={`ml-3 flex items-center justify-center rounded-full p-1 ${
            mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'
          }`}
        >
          {mode === 'dark' ? <SunIcon className="fill-dark" /> : <MoonIcon className="fill-dark" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen ? (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
          animate={{ scale: 1, opacity: 1 }}
          className="min-w-[70vw] flex flex-col justify-between z-30 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-32"
        >
          <nav className="flex items-center flex-col justify-center">
            <CustomMobileLink href="/" title="Home" className="" toggle={handleClick} />
            <CustomMobileLink href="/about" title="About" className="" toggle={handleClick} />
            <CustomMobileLink href="/projects" title="Projects" className="" toggle={handleClick} />
            <CustomMobileLink href="/news" title="📰 ข่าวอัพเดท" className="" toggle={handleClick} />
            <CustomMobileLink href="/stories" title="📖 เรื่องราว" className="" toggle={handleClick} />
            <CustomMobileLink href="/articles" title="Articles" className="" toggle={handleClick} />
          </nav>

          <nav className="flex items-center justify-center flex-wrap mt-2">
            <motion.a
              href="https://twitter.com/gtsalpha"
              target="_blank"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mr-3 sm:mx-1"
            >
              <TwitterIcon className="fill-[#1DA1F2]" />
            </motion.a>
            <motion.a
              href="https://github.com/gtsalpha"
              target="_blank"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3 bg-light rounded-full dark:bg-dark sm:mx-1"
            >
              <GithubIcon />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/gtsalpha"
              target="_blank"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3 sm:mx-1"
            >
              <LinkedInIcon />
            </motion.a>
            <motion.a
              href="https://pinterest.com/gtsalpha"
              target="_blank"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3 sm:mx-1"
            >
              <PinterestIcon className="fill-[#E60023] bg-white rounded-full" />
            </motion.a>
            <motion.a
              href="https://dribbble.com/gtsalpha"
              target="_blank"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 ml-3 sm:mx-1"
            >
              <DribbbleIcon className="fill-[#EA4C89]" />
            </motion.a>

            <button
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
              className={`ml-3 flex items-center justify-center rounded-full p-1 ${
                mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'
              } sm:mx-1`}
            >
              {mode === 'dark' ? <SunIcon className="fill-dark" /> : <MoonIcon className="fill-dark" />}
            </button>
          </nav>
        </motion.div>
      ) : null}

      <div className="absolute left-[50%] top-2 translate-x-[-50%]">
        <Link href="/" className="flex items-center justify-center hover:opacity-80 transition-opacity">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/7/70/Narcotics_Suppression_Bureau_Logo.png"
            alt="กองบัญชาการตำรวจปราบปรามยาเสพติด"
            width={64}
            height={64}
            className="w-16 h-16 md:w-12 md:h-12 object-contain"
            unoptimized
          />
        </Link>
      </div>
    </header>
  );
};

export default NavBar;