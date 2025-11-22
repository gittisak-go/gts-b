import '@/styles/globals.css'
import ChatWidget from '@/components/chat/ChatWidget';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ChatWidget />
    </>
  );
}
