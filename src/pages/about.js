import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import Layout from '@/components/Layout';
import AnimatedText from '@/components/AnimatedText';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import profilePic from '../../public/images/profile/developer-pic-2.jpg';

const AnimatedNumbers = ({ value }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current && latest.toFixed(0) <= value) {
        ref.current.textContent = latest.toFixed(0);
      }
    });
  }, [springValue, value]);

  return <span ref={ref}></span>;
};

const About = () => {
  return (
    <>
      <Head>
        <title>เกี่ยวกับเรา</title>
        <meta name="description" content="เรียนรู้เพิ่มเติมเกี่ยวกับ GTS Alpha" />
      </Head>
      <Layout>
        <main className="flex w-full flex-col items-center justify-center dark:text-light">
          <div className="pt-16 w-full">
            <AnimatedText
              text="ผลสัมฤทธิ์และบทบาทสำคัญ"
              className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
            />
            <div className="grid w-full grid-cols-8 gap-16 sm:gap-8 px-8 sm:px-4">
              {/* Card ปฏิบัติการสำคัญ */}
              <div className="col-span-6 xl:col-span-8 md:order-2 md:col-span-8">
                <div className="relative rounded-2xl border-2 border-solid border-dark bg-gradient-to-br from-light to-light/80 dark:from-dark dark:to-dark/80 dark:border-light shadow-2xl overflow-hidden">
                  <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark dark:bg-light" />
                  
                  {/* Header */}
                  <div className="bg-gradient-to-r from-indigo-900 to-purple-900 dark:from-indigo-800 dark:to-purple-800 p-6 sm:p-4">
                    <div className="mb-2">
                      <h2 className="text-2xl font-bold text-white sm:text-xl">
                        ปฏิบัติการสำคัญ
                      </h2>
                    </div>
                    <p className="text-white/90 text-sm sm:text-xs">
                      การบูรณาการข้อมูลเพื่อการปราบปราม
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-8 sm:p-4 space-y-6">
                    {/* หัวข้อข่าว */}
                    <div className="bg-primary/10 dark:bg-primaryDark/10 p-4 rounded-lg border-l-4 border-primary dark:border-primaryDark">
                      <p className="font-bold text-lg sm:text-base leading-relaxed">
                        "ปส.ทลายแก๊ง กุนซือ เมืองสิงห์ ยึดยาไอซ์ 50 กก. ยาบ้า 6 หมื่นเม็ด อายัดทรัพย์กว่า 50 ล้านบาท"
                      </p>
                    </div>

                    {/* รายละเอียดปฏิบัติการ */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 mb-4 p-3 bg-white dark:bg-dark/80 rounded-lg border border-dark/10 dark:border-light/10">
                        <div className="w-12 h-12 flex-shrink-0 bg-white rounded-full p-1 border-2 border-primary dark:border-primaryDark">
                          <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/7/70/Narcotics_Suppression_Bureau_Logo.png" 
                            alt="กองบัญชาการตำรวจปราบปรามยาเสพติด" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-sm sm:text-xs text-primary dark:text-primaryDark">กองบัญชาการตำรวจปราบปรามยาเสพติด</p>
                          <p className="text-xs text-dark/60 dark:text-light/60">Narcotics Suppression Bureau</p>
                        </div>
                      </div>
                      <p className="text-base sm:text-sm leading-relaxed">
                        ในบทบาท <strong className="text-primary dark:text-primaryDark">พ.ต.ต. กิจติศักดิ์ วรรณคีรี</strong> หัวหน้านายปราบปรามเมืองเอก กองกำกับการ 1 บก.ปส.3 ผมมีส่วนร่วมในปฏิบัติการ (วันที่ 1-7 มิ.ย. 2565) ซึ่งเป็นการขยายผลจากการวิเคราะห์ฐานข้อมูลจากระบบ <strong className="text-primary dark:text-primaryDark">Big Data</strong> เพื่อนำไปสู่การปิดล้อมจับกุมเครือข่ายยาเสพติดรายใหญ่ใน 10 จังหวัด
                      </p>
                    </div>

                    {/* ผลสำเร็จ */}
                    <div className="bg-light dark:bg-dark/50 p-5 rounded-xl border border-dark/10 dark:border-light/10">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-primary dark:text-primaryDark sm:text-base">
                        <span>✅</span> ผลสำเร็จของปฏิบัติการ
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-start gap-3 p-3 bg-white dark:bg-dark rounded-lg shadow-sm">
                          <span className="text-2xl flex-shrink-0">👮</span>
                          <div>
                            <p className="font-semibold text-base sm:text-sm">จับกุมผู้ต้องหา</p>
                            <p className="text-dark/70 dark:text-light/70 text-sm sm:text-xs">ครบทั้งแก๊ง รวม <strong>8 ราย</strong></p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-white dark:bg-dark rounded-lg shadow-sm">
                          <span className="text-2xl flex-shrink-0">💊</span>
                          <div>
                            <p className="font-semibold text-base sm:text-sm">ยึดของกลาง</p>
                            <p className="text-dark/70 dark:text-light/70 text-sm sm:text-xs">ยาไอซ์ <strong>50 กก.</strong> • ยาบ้า <strong>6 หมื่นเม็ด</strong></p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-white dark:bg-dark rounded-lg shadow-sm">
                          <span className="text-2xl flex-shrink-0">💰</span>
                          <div>
                            <p className="font-semibold text-base sm:text-sm">อายัดทรัพย์สิน</p>
                            <p className="text-dark/70 dark:text-light/70 text-sm sm:text-xs">มูลค่ากว่า <strong className="text-primary dark:text-primaryDark">50 ล้านบาท</strong></p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Takeaway */}
                    <div className="bg-primary/5 dark:bg-primaryDark/5 p-5 rounded-xl border-2 border-dashed border-primary/30 dark:border-primaryDark/30">
                      <h4 className="font-bold text-base mb-2 text-primary dark:text-primaryDark sm:text-sm">
                        💡 จุดเด่นของปฏิบัติการ
                      </h4>
                      <ul className="space-y-2 text-sm sm:text-xs">
                        <li className="flex items-start gap-2">
                          <span className="text-primary dark:text-primaryDark mt-0.5">▪</span>
                          <span>การใช้การวิเคราะห์ข้อมูลเชิงลึก (Data-Driven Approach)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary dark:text-primaryDark mt-0.5">▪</span>
                          <span>การบริหารจัดการและประสานงานในพื้นที่ขนาดใหญ่ (Incident/Project Management)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary dark:text-primaryDark mt-0.5">▪</span>
                          <span>สร้างผลกระทบที่ชัดเจนต่อความมั่นคงของประเทศ</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-2 flex justify-center xl:col-span-8 md:order-1 md:col-span-8">
                <div className="relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-3 dark:bg-dark dark:border-light sm:p-2" style={{maxWidth: '280px'}}>
                  <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light" />
                  <Image
                    src={profilePic}
                    alt="พ.ต.ต. กิจติศักดิ์ วรรณคีรี"
                    className="w-full h-auto rounded-2xl"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 35vw, 20vw"
                  />
                </div>
              </div>

              <div className="col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row xl:items-center md:order-3">
                <div className="flex flex-col items-end justify-center xl:items-center">
                  <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                    <AnimatedNumbers value={10} />+
                  </span>
                  <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                    จังหวัดในปฏิบัติการ
                  </h2>
                </div>

                <div className="flex flex-col items-end justify-center xl:items-center">
                  <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                    50
                  </span>
                  <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                    ล้านบาท ทรัพย์สินที่อายัด
                  </h2>
                </div>

                <div className="flex flex-col items-end justify-center xl:items-center">
                  <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                    <AnimatedNumbers value={8} />
                  </span>
                  <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                    ผู้ต้องหาที่จับกุม
                  </h2>
                </div>
              </div>
            </div>

            <Skills />
            <Experience />
            <Education />
          </div>
        </main>
      </Layout>
    </>
  );
};

export default About;
