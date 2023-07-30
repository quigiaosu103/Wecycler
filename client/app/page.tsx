import clsx from 'clsx'
import { Play, Amatic_SC } from "next/font/google"
import Button from "../components/Button"
import Image from "next/image"

import rightImage from "/public/images/Vectors.png"
import imgSection2 from "/public/images/People.svg"
import handsImg from "/public/images/hands.svg"
import handsGiveMoneyImg from "/public/images/handsGiveMoney.svg"
import handsAndMoneyImg from "/public/images/handsAndMoney.svg"
import step1Img from "/public/images/step1.svg"
import step2Img from "/public/images/step2.svg"
import step3Img from "/public/images/step3.svg"
import axeManImg from "/public/images/axeMan.svg"
import buttonApply from "/public/images/buttonApply.svg"

const play = Play({
  subsets: ['latin'],
  weight: ['400', '700']
})

const amatic_SC = Amatic_SC({
  subsets: ['latin'],
  weight: ['400', '700']
})

const IntroSection = () => {
  return (
    <div className="flex flex-row text-[#59EC7A] max-w-[1440px] mx-auto lg:w-10/12">
      <div className="left flex flex-col w-1/2 justify-center items-start h-screen gap-y-8">
        <h1 className="text-8xl tracking-wide font-bold">
          Wecycler
        </h1>
        <p className="text-3xl">
          Let Save The World
        </p>
        <Button href={"/"} classes={"text-white bg-[#59EC7A] rounded-xl"} content={"Let's Get Started"}></Button>
      </div>

      <div className="right w-1/2 flex items-center">
        <Image
          src={rightImage}
          alt={"image"}
          // layout='fill'
          // objectFit='contain'
          className="w-full h-3/4"
        ></Image>
      </div>
    </div>
  )
}

const CampaignSection = () => {
  return (
    <div className="flex flex-row text-[#59EC7A] max-w-[1440px] mx-auto lg:w-10/12">
      <div className="right w-1/2 flex items-center">
        <Image
          src={imgSection2}
          alt={"image"}
          className="w-full h-3/4"
        ></Image>
      </div>

      <div className="left flex flex-col w-1/2 justify-center items-end h-screen gap-y-8">
        <h1 className="text-8xl tracking-wide font-bold text-end">
        Our Campaigns
        </h1>
        <p className="text-2xl">
          Thay đổi cách ta nhìn về Recycle
        </p>
        <Button href={"/"} classes={"text-white bg-[#59EC7A] rounded-xl"} content={"Learn More"}></Button>
      </div>

      
    </div>
  )
}

const SubSection = () => {
  return (
    <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12 py-10">
      <div className="topBlock flex flex-row">
        <div className="blockLeft w-1/2 flex items-center">
          <p className="text-7xl font-bold">"Recycling make better us"</p>
        </div>
        <div className="blockRight w-1/2">
          <video controls className="w-full">
            <source src="../public/videos/recycle.mp4" type="video/mp4"/>
          </video>
        </div>
      </div>
      <div className="bottomBlock flex flex-row py-10 justify-between">
        <div className="subS_item space-x-3 flex flex-row">
          <Image
            src={handsImg}
            alt='picture'
          />
          <div className="flex flex-col items-center">
            <p className='font-bold text-lg'>Become a collector</p>
            <p className='text-regular'>Become a collector</p>
          </div>
        </div>
        <div className="subS_item space-x-3 flex flex-row">
          <Image
            src={handsGiveMoneyImg}
            alt='picture'
          />
          <div className="flex flex-col items-center">
            <p className='font-bold text-lg'>Quick transaction</p>
            <p className='text-regular'>Become a collector</p>
          </div>
        </div>
        <div className="subS_item space-x-3 flex flex-row">
          <Image
            src={handsAndMoneyImg}
            alt='picture'
          />
          <div className="flex flex-col items-center">
            <p className='font-bold text-lg'>Start Recycling</p>
            <p className='text-regular'>Become a collector</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const StepSection = () => {
  return (
    <div className="flex flex-col text-[#59EC7A] max-w-[1440px] mx-auto lg:w-10/12 py-10">
      <div className="w-full text-center text-6xl font-extrabold mb-10">
        <h1>Earn while recycling</h1>
      </div>
      <div className="flex flex-row justify-between py-10">
        <div className="flex flex-col items-center space-y-3">
          <Image
            src={step3Img}
            alt=''
          />
          <p className='text-2xl font-semibold text-black'>Collect</p>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <Image
            src={step1Img}
            alt=''
          />
          <p className='text-2xl font-semibold text-black'>Earn</p>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <Image
            src={step2Img}
            alt=''
          />
          <p className='text-2xl font-semibold text-black'>Complete</p>
        </div>
      </div>
    </div>
  )
}

const ApplySection = () => {
  return (
    <div className="flex flex-row text-black max-w-[1440px] mx-auto lg:w-10/12">
        <div className="right w-1/2 flex flex-col items-center">
          <Image
            src={axeManImg}
            alt={"image"}
            className="w-full h-3/4"
          ></Image>
          <p className={clsx(amatic_SC.className, "text-6xl font-bold mt-6")}>collector</p>
        </div>

        <div className="left flex flex-col w-1/2 justify-center items-start h-screen gap-y-8">
          <h1 className={clsx("text-8xl tracking-wide font-bold", amatic_SC.className)}>
            BE A COLLECTOR
          </h1>
          <p className="text-lg font-light">
            Our volunteers are passionate about saving the earth and contributing to a sustainable environment. Through our exciting volunteer activities and programs you will get to work the talk by attending recycling campaigns and being a recycle advocate and educator. Join us to “work the talk” when you apply to be part of the Reuse Volunteer team. 
          </p>
          <Button href={"/learn-more"} classes={"text-white"} content={<Image src={buttonApply} alt="buttonApply"/>}></Button>  
        </div>
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <div className={clsx("flex flex-col", play.className)}>
        <IntroSection/>
        <CampaignSection/>
        <SubSection/>
        <StepSection/>
        <ApplySection/>
      </div>
    </main>
  );
}
