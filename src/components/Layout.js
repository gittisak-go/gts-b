import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children, className = '' }) => {
  return (
    <>
      <NavBar />
      <div className={`w-full h-full inline-block z-0 bg-light dark:bg-dark ${className}`}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;