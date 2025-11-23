import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import AnimatedText from '@/components/AnimatedText';
import HireMe from '@/components/HireMe';
import profilePic from '../../public/images/profile/developer-pic-1.png';
import lightBulb from '../../public/images/svgs/miscellaneous_icons_1.svg';
import { LinkArrow } from '@/components/Icons';

export default function Home() {
  return (
    <>
      <Head>
        <title>พันตำรวจโท กิจติศักดิ์ วรรณคีรี - Portfolio</title>
        <meta
          name="description"
          content="เจ้าหน้าที่ตำรวจที่มุ่งมั่นเปลี่ยนแนวคิดด้านความยุติธรรมและความมั่นคงให้เป็นแผนงานและปฏิบัติการที่เป็นจริง"
        />
      </Head>
      <Layout>
        <main className="flex items-center text-dark w-full min-h-screen dark:text-light">
          <div className="pt-0 w-full h-full inline-block z-0 bg-light p-32 dark:bg-dark xl:p-24 lg:p-16 md:p-12 sm:p-8">
            <div className="flex items-center justify-between w-full lg:flex-col">
              <div className="w-1/2 md:w-full">
                <Image
                  src={profilePic}
                  alt="พันตำรวจโท กิจติศักดิ์ วรรณคีรี"
                  className="w-full h-auto lg:hidden md:inline-block md:w-full"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                />
              </div>
              <div className="w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center">
                <AnimatedText
                  text="เปลี่ยนแนวคิดด้านความยุติธรรมให้เป็นจริง"
                  className="!text-6xl !text-left xl:!text-5xl lg:!text-center lg:!text-5xl md:!text-4xl sm:!text-3xl xs:!text-2xl"
                />
                <p className="my-4 text-base font-medium md:text-sm sm:text-xs leading-relaxed">
                  สวัสดีครับ ผม <strong>พันตำรวจโท กิจติศักดิ์ วรรณคีรี</strong> ในฐานะเจ้าหน้าที่ตำรวจ ผมมุ่งมั่นที่จะนำความละเอียดรอบคอบของการวางแผนเชิงกลยุทธ์ 
                  และหลักการทำงานด้านเทคโนโลยี มาประยุกต์ใช้ในงานรักษาความสงบเรียบร้อย ผมอุทิศตนเพื่อเปลี่ยนแนวคิดด้านความยุติธรรมและความมั่นคงให้เป็นแผนงานและปฏิบัติการที่เป็นจริง
                  <br /><br />
                  ผมใช้แนวคิดเชิงนวัตกรรมและการสร้างประสบการณ์ที่เน้นผู้ใช้เป็นศูนย์กลาง (Citizen-Centric) เพื่อค้นหาวิธีการใหม่ๆ ในการยกระดับวิสัยทัศน์แห่งการบริการให้มีประสิทธิภาพสูงสุด
                </p>
                <div className="flex items-center self-start mt-2 lg:self-center">
                                  <Link
                  href="/WarrantDashboardDesign.pdf"
                  target={'_blank'}
                  className="flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base"
                  download={true}
                >
                  ดาวน์โหลด Resume <LinkArrow className={'w-6 ml-1'} />
                </Link>
                  <a
                    href="mailto:gtsalpha@example.com"
                    className="ml-4 text-lg font-medium text-dark underline hover:text-primary dark:text-light dark:hover:text-primaryDark md:text-base transition-colors duration-300"
                  >
                    ติดต่อเรา
                  </a>
                </div>
              </div>
            </div>
          </div>
          <HireMe />
          <div className="absolute right-8 bottom-8 inline-block w-24 md:hidden">
            <Image src={lightBulb} alt="Innovation" className="w-full h-auto" />
          </div>
        </main>
      </Layout>
    </>
  );
}
