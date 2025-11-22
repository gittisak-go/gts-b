import React, { useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue } from 'framer-motion';
import Layout from '@/components/Layout';
import AnimatedText from '@/components/AnimatedText';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import article1 from '../../public/images/articles/pagination component in reactjs.jpg';
import article2 from '../../public/images/articles/create loading screen in react js.jpg';
import article3 from '../../public/images/articles/form validation in reactjs using custom react hook.png';
import article4 from '../../public/images/articles/smooth scrolling in reactjs.png';
import article5 from '../../public/images/articles/create modal component in react using react portals.png';
import article6 from '../../public/images/articles/todo list app built using react redux and framer motion.png';
import article7 from '../../public/images/articles/What is Redux with easy explanation.png';
import article8 from '../../public/images/articles/What is higher order component in React.jpg';

const FramerImage = motion(Image);

const MovingImg = ({ title, img, link }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgRef = useRef(null);

  function handleMouse(event) {
    imgRef.current.style.display = 'inline-block';
    x.set(event.pageX);
    y.set(-10);
  }

  function handleMouseLeave(event) {
    imgRef.current.style.display = 'none';
    x.set(0);
    y.set(0);
  }

  return (
    <Link
      href={link}
      target="_blank"
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="capitalize text-xl font-semibold hover:underline">
        {title}
      </h2>
      <FramerImage
        style={{ x: x, y: y }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
        ref={imgRef}
        src={img}
        alt={title}
        className="z-10 w-96 h-auto hidden absolute rounded-lg md:!hidden"
      />
    </Link>
  );
};

const Article = ({ img, title, date, link }) => {
  return (
    <motion.li
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      viewport={{ once: true }}
      className="relative w-full p-4 py-6 my-4 rounded-xl flex items-center justify-between bg-light text-dark first:mt-0 border border-solid border-dark border-r-4 border-b-4 dark:border-light dark:bg-dark dark:text-light sm:flex-col"
    >
      <MovingImg title={title} img={img} link={link} />
      <span className="text-primary font-semibold pl-4 dark:text-primaryDark sm:self-start sm:pl-0 xs:text-sm">
        {date}
      </span>
    </motion.li>
  );
};

const FeaturedArticle = ({ img, title, time, summary, link }) => {
  return (
    <li className="relative col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl dark:bg-dark dark:border-light">
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl" />
      <Link
        href={link}
        target="_blank"
        className="w-full inline-block cursor-pointer overflow-hidden rounded-lg"
      >
        <FramerImage
          src={img}
          alt={title}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
      </Link>
      <Link href={link} target="_blank">
        <h2 className="capitalize text-2xl font-bold my-2 mt-4 hover:underline xs:text-lg">
          {title}
        </h2>
      </Link>
      <p className="text-sm mb-2">{summary}</p>
      <span className="text-primary font-semibold dark:text-primaryDark">
        {time}
      </span>
    </li>
  );
};

const Articles = () => {
  return (
    <>
      <Head>
        <title>บทความ</title>
        <meta name="description" content="สำรวจบทความและโพสต์บล็อกของเรา" />
      </Head>
      <Layout>
        <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
          <div className="pt-16 w-full">
            <AnimatedText
              text="คำพูดสามารถเปลี่ยนแปลงโลกได้!"
              className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
            />
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-full px-12 sm:px-8 mb-16"
            >
              <CarouselContent className="-ml-4">
                <CarouselItem className="md:basis-1/2 pl-4">
                  <FeaturedArticle
                    title="สร้างคอมโพเนนต์ Pagination แบบกำหนดเองใน ReactJS ตั้งแต่เริ่มต้น"
                    summary="เรียนรู้วิธีสร้างคอมโพเนนต์ Pagination แบบกำหนดเองใน ReactJS ตั้งแต่เริ่มต้น ทำตามคู่มือทีละขั้นตอนเพื่อผสานคอมโพเนนต์ Pagination ในโปรเจกต์ ReactJS ของคุณ"
                    time="อ่าน 9 นาที"
                    link="https://devdreaming.com/blogs/create-pagination-component-reactjs"
                    img={article1}
                  />
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 pl-4">
                  <FeaturedArticle
                    title="สร้างหน้าจอโหลดสุดตระการตาใน React: สร้าง 3 ประเภทของหน้าจอโหลด"
                    summary="เรียนรู้วิธีสร้างหน้าจอโหลดสุดตระการตาใน React ด้วย 3 วิธีที่แตกต่างกัน ค้นพบวิธีใช้ React-Loading, React-Lottie และสร้างหน้าจอโหลดแบบกำหนดเอง ปรับปรุงประสบการณ์ผู้ใช้"
                    time="อ่าน 10 นาที"
                    link="https://devdreaming.com/blogs/create-3-different-types-of-loading-screens-in-react"
                    img={article2}
                  />
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 pl-4">
                  <FeaturedArticle
                    title="การตรวจสอบฟอร์มใน ReactJS: Custom Hook สำหรับ Input"
                    summary="เรียนรู้วิธีสร้าง Custom Hook ที่นำกลับมาใช้ได้สำหรับการตรวจสอบฟอร์มใน ReactJS พร้อมการจัดการข้อผิดพลาดอย่างมีประสิทธิภาพ"
                    time="อ่าน 8 นาที"
                    link="https://devdreaming.com/blogs/react-form-validation-custom-hook"
                    img={article3}
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <h2 className="font-bold text-4xl w-full text-center my-16 mt-32">
              บทความทั้งหมด
            </h2>
            <ul>
              <Article
                title="การตรวจสอบฟอร์มใน ReactJS: สร้าง Custom Hook ที่นำกลับมาใช้ได้สำหรับ Input และการจัดการข้อผิดพลาด"
                date="27 มกราคม 2566"
                link="https://devdreaming.com/blogs/react-form-validation-custom-hook"
                img={article3}
              />
              <Article
                title="การเลื่อนหน้าจออย่างนุ่มนวลใน ReactJS: คู่มือทีละขั้นตอนสำหรับนักพัฒนา React"
                date="30 มกราคม 2566"
                link="https://devdreaming.com/blogs/smooth-scrolling-in-react-js"
                img={article4}
              />
              <Article
                title="สร้างคอมโพเนนต์ Modal ที่มีประสิทธิภาพใน React โดยใช้ Hooks และ Portals"
                date="29 มกราคม 2566"
                link="https://devdreaming.com/blogs/create-efficient-modal-react-portals"
                img={article5}
              />
              <Article
                title="สร้างแอป Todo List สุดยอดด้วย React, Redux และ Framer-Motion"
                date="28 มกราคม 2566"
                link="https://devdreaming.com/blogs/build-react-redux-framer-motion-todo-app"
                img={article6}
              />
              <Article
                title="Redux อย่างง่าย: คู่มือสำหรับผู้เริ่มต้นสำหรับนักพัฒนาเว็บ"
                date="31 มกราคม 2566"
                link="https://devdreaming.com/blogs/redux-simply-explained"
                img={article7}
              />
              <Article
                title="Higher Order Component (HOC) ใน React คืออะไร?"
                date="4 มกราคม 2566"
                link="https://devdreaming.com/blogs/higher-order-component-hoc-react"
                img={article8}
              />
            </ul>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Articles;
