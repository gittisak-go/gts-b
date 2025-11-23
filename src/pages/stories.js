import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import AnimatedText from '@/components/AnimatedText';

// Timeline Data - ผลงานสำคัญรอบ 10-20 ปี
const timelineData = [
  {
    year: '2565',
    title: 'ปฏิบัติการทลายแก๊งกุนซือเมืองสิงห์',
    description:
      'การบูรณาการข้อมูลครั้งใหญ่ที่สุดในรอบปี ครอบคลุม 10 จังหวัด จับกุมผู้ต้องหา 8 ราย ยึดไอซ์ 50 กิโลกรัม ยาบ้า 60,000 เม็ด และทรัพย์สิน 50 ล้านบาท',
    impact: 'ทำลายเครือข่ายยาเสพติดข้ามชาติ ตัดเส้นทางลำเลียงหลัก',
    highlight: true,
  },
  {
    year: '2564',
    title: 'โครงการ Data-Driven Policing',
    description:
      'นำระบบวิเคราะห์ข้อมูลขนาดใหญ่มาใช้ในการปราบปรามยาเสพติด พัฒนาระบบติดตามทรัพย์สินและการเงินของผู้ต้องหา',
    impact: 'เพิ่มประสิทธิภาพการจับกุมขึ้น 150% ในปีแรก',
    highlight: false,
  },
  {
    year: '2563',
    title: 'ความร่วมมือระหว่างหน่วยงาน',
    description:
      'สร้างเครือข่ายความร่วมมือกับหน่วยงานต่างประเทศ แลกเปลี่ยนข่าวกรอง และประสานการปฏิบัติการข้ามพรมแดน',
    impact: 'จับกุมผู้ต้องหาระดับภูมิภาค 15 ราย',
    highlight: false,
  },
  {
    year: '2558-2562',
    title: 'การพัฒนาระบบ Incident Management',
    description:
      'พัฒนาระบบรับแจ้งเหตุและประสานงานแบบ Real-time ทำให้สามารถเข้าถึงเหตุการณ์ได้รวดเร็วขึ้น',
    impact: 'ลดเวลาตอบสนองเหตุการณ์เหลือเพียง 30 นาที',
    highlight: false,
  },
  {
    year: '2555-2557',
    title: 'ปฏิบัติการพื้นที่ชายแดนภาคเหนือ',
    description:
      'ประจำการในพื้นที่ชายแดนไทย-พม่า ดำเนินการสกัดกั้นและปิดล้อมเส้นทางลำเลียงยาเสพติดหลัก',
    impact: 'ยึดยาเสพติดรวมมูลค่ากว่า 200 ล้านบาท ในระยะ 3 ปี',
    highlight: false,
  },
];

// Core Values
const coreValues = [
  {
    icon: '🎯',
    title: 'Citizen-Centric',
    description:
      'ประชาชนเป็นศูนย์กลาง ทุกการปฏิบัติการเพื่อความปลอดภัยของสังคม',
  },
  {
    icon: '📊',
    title: 'Data-Driven',
    description: 'ใช้ข้อมูลเป็นตัวตัดสินใจ วิเคราะห์ลึก ตรงจุด มีประสิทธิภาพ',
  },
  {
    icon: '🤝',
    title: 'Collaboration',
    description:
      'ความร่วมมือคือกุญแจสำคัญ ทำงานเป็นทีม บูรณาการข้ามหน่วยงาน',
  },
  {
    icon: '💡',
    title: 'Innovation',
    description: 'ปรับตัวตามยุคสมัย นำเทคโนโลยีมาช่วยการทำงาน',
  },
];

const Stories = () => {
  return (
    <>
      <Head>
        <title>เรื่องราว & งานเขียน | พ.ต.ท. กิจติศักดิ์ วรรณคีรี</title>
        <meta
          name="description"
          content="สรุปผลงานและเรื่องราวสำคัญรอบ 10-20 ปีในการทำงาน การมีส่วนร่วม และความร่วมมือ"
        />
      </Head>
      <Layout>
        <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
          <div className="pt-16 w-full">
            <AnimatedText
              text="เรื่องราวจากการทำงาน"
              className="mb-8 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
            />

            {/* Intro */}
            <div className="max-w-4xl mx-auto mb-20 text-center">
              <p className="text-xl text-dark/80 dark:text-light/80 leading-relaxed">
                สรุปผลงานและประสบการณ์สำคัญที่สั่งสมมากว่า{' '}
                <span className="text-primary dark:text-primaryDark font-bold">
                  10 ปี
                </span>{' '}
                ในการทำงาน
                <br />
                เรื่องราวเหล่านี้เป็นมากกว่าตัวเลขและรายงาน...
                <br />
                <span className="font-semibold">
                  มันคือการมีส่วนร่วม ความร่วมมือ และความมุ่งมั่นที่จะทำให้สังคมปลอดภัย
                </span>
              </p>
            </div>

            {/* Core Values */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-center text-dark dark:text-light">
                💎 หัวใจของการทำงาน
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coreValues.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 bg-light dark:bg-dark border-2 border-dark dark:border-light rounded-2xl text-center hover:shadow-xl transition-shadow"
                  >
                    <div className="text-5xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-dark dark:text-light">
                      {value.title}
                    </h3>
                    <p className="text-sm text-dark/70 dark:text-light/70">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-12 text-center text-dark dark:text-light">
                ⏳ Timeline: ผลงานสำคัญ
              </h2>
              <div className="relative max-w-5xl mx-auto">
                {/* Vertical Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-primaryDark md:block hidden" />

                {timelineData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`relative mb-12 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'
                    }`}
                  >
                    {/* Year Badge */}
                    <div
                      className={`absolute top-0 ${
                        index % 2 === 0 ? 'md:-right-6' : 'md:-left-6'
                      } md:left-auto md:right-auto left-0 transform md:translate-x-0 bg-primary dark:bg-primaryDark text-light px-4 py-2 rounded-full font-bold text-lg shadow-lg z-10`}
                    >
                      {item.year}
                    </div>

                    {/* Content Card */}
                    <div
                      className={`mt-12 md:mt-0 p-6 rounded-2xl border-2 ${
                        item.highlight
                          ? 'bg-gradient-to-br from-primary/10 to-primaryDark/10 border-primary dark:border-primaryDark shadow-2xl'
                          : 'bg-light dark:bg-dark border-dark dark:border-light'
                      }`}
                    >
                      <h3 className="text-2xl font-bold mb-3 text-dark dark:text-light">
                        {item.highlight && '⭐ '}
                        {item.title}
                      </h3>
                      <p className="text-dark/80 dark:text-light/80 mb-3 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="p-4 bg-dark/5 dark:bg-light/5 rounded-lg border-l-4 border-primary dark:border-primaryDark">
                        <p className="text-sm font-semibold text-dark dark:text-light">
                          📈 ผลกระทบ: {item.impact}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Personal Note */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-dark to-dark/90 dark:from-light dark:to-light/90 text-light dark:text-dark rounded-2xl shadow-2xl"
            >
              <h3 className="text-3xl font-bold mb-6 text-center">
                💭 บันทึกส่วนตัว
              </h3>
              <p className="text-lg leading-relaxed mb-4">
                การทำงานปราบปรามยาเสพติดไม่ใช่แค่การจับกุมผู้กระทำผิด
                แต่เป็นการต่อสู้เพื่อ<span className="font-bold">อนาคตที่ดีกว่า</span>ของสังคม
              </p>
              <p className="text-lg leading-relaxed mb-4">
                ตลอด 10 กว่าปีที่ผ่านมา ผมได้เรียนรู้ว่า...
                <span className="font-bold block mt-2">
                  &quot;ความสำเร็จที่ยั่งยืนไม่ได้มาจากการทำงานคนเดียว
                  แต่มาจากความร่วมมือ ความไว้วางใจ และการสนับสนุนจากทุกภาคส่วน&quot;
                </span>
              </p>
              <p className="text-lg leading-relaxed">
                เรื่องราวเหล่านี้เป็นเพียงส่วนหนึ่งของการเดินทาง
                และยังมีอีกหลายเรื่องที่รออยู่ข้างหน้า...
              </p>
              <div className="mt-6 text-right">
                <p className="font-semibold text-xl">
                  - พ.ต.ท. กิจติศักดิ์ วรรณคีรี
                </p>
                <p className="text-sm opacity-80">
                  หัวหน้านายปราบปรามเมืองเอก กก.1 บก.ปส.3
                </p>
              </div>
            </motion.div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Stories;
