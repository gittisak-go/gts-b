import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-solid border-dark font-medium text-lg dark:text-light dark:border-light sm:text-base">
      <div className="py-8 flex items-center justify-between lg:flex-col lg:py-6 px-32 lg:px-16 md:px-12 sm:px-8">
        <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
        <div className="flex items-center lg:py-2">
          Build with <span className="text-primary dark:text-primaryDark text-2xl px-1">&#9825;</span> by&nbsp;
          <Link
            href="https://github.com/gtsalpha"
            className="underline underline-offset-2"
            target="_blank"
          >
            @gtsalpha
          </Link>
        </div>
        <Link href="mailto:gtsalpha@example.com" className="underline underline-offset-2">
          Say Hello
        </Link>
      </div>
    </footer>
  );
};

export default Footer;