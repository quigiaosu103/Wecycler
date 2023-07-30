import clsx from 'clsx'
import { Play, Amatic_SC } from "@next/font/google"
import Button from "../../components/Button"
import Image from "next/image"

import rightImage from "/public/images/page2.png"
import road from "/public/images/road.png"
import hand from "/public/images/hand.png"
import crump from "/public/images/crumpled.png"
import group from "/public/images/Group 175.svg"
import background from "/public/images/OBJECTS.png"
import arrow2 from "/public/images/arrow2.svg"

import buttonRegister from "/public/images/buttonRegister.png"

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
    <div className="flex flex-row text-black max-w-[1440px] mx-auto lg:w-10/12">
      <div className="left flex flex-col w-1/2 justify-center items-start h-screen gap-y-8">
        <h1  className={clsx("text-8xl tracking-wide font-bold", amatic_SC.className)}>
          OUR COLLECTOR PROGRAMS
        </h1>
        <p className={clsx("text-3xl tracking-wide font-bold", amatic_SC.className)}>
          Be a recycle collector
        </p>
        <p className={clsx("text-2xl tracking-wide", amatic_SC.className)}>
        Educate people about recycling and its benefit to the planet. Visit schools, markets and various organizations and encourage people to be more eco-friendly and conscious of their environment
        </p>
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
    <div className="relative flex flex-row justify-end text-black max-w-[1440px] mx-auto lg:w-10/12">
        <div className="absolute z-10">
        <Image
            src={road}
            alt={"image"}
        ></Image>
        </div>
      

      <div className="flex flex-col w-1/2 justify-start h-screen gap-y-8 z-20 ">
        <div className='flex flex-row'>
          <h1 className={clsx("text-8xl tracking-wide font-bold", amatic_SC.className)} >
          Attend Campaigns
          </h1>
          <Image
            src={arrow2}
            alt={"image"}
            className="pl-8"
          ></Image>
        </div>
        
        <p className={clsx("text-2xl tracking-wide font-bold", amatic_SC.className)}>
        While its important to tell everyone about recyclcling, we also need to show them how it is done. Join us as we pick up papers and plastics around communities. This can be done individually or with the team. 
        </p>
      </div>

      
    </div>
  )
}

const VolunteSection = () => {
  return (
    <div className="flex flex-col  text-black max-w-[1440px] mx-auto lg:w-10/12 py-10">
      <div className="topBlock flex flex-row justify-center space-x-20 ">
        <div className="blockLeft w-1/2 flex flex-col items-center bg-[#73d88b] ">
          <p className={clsx("text-6xl tracking-wide font-bold m-8", amatic_SC.className)}>"Community development"</p>
          <p className={clsx("text-2xl tracking-wide font-bold m-8", amatic_SC.className)}>"As a community development volunteer, you'll join our charity and give your time to disadvantaged communities to help distribute food, shelter and clothing and provide education. As you can imagine, this type of volunteering is one of the most challenging and diverse, while also being extremely rewarding."</p>
          
        </div>
        <div className="blockRight w-1/2 flex items-end pl-20">
        <Image
          src={hand}
          alt={"image"}
          className="w-2/4 h-3/4"
        ></Image>
        </div>
      </div>
    </div>
  )
}

const Volunte2Section = () => {
  return (
    <div className="flex flex-row text-black max-w-[1440px] mx-auto lg:w-10/12 py-10">
      
        <div className="right w-1/2 flex flex-col items-center">
        <Image
          src={crump}
          alt={"image"}
          className="w-3/4 h-3/4"
        ></Image>
        <p className={clsx(amatic_SC.className, "text-4xl font-bold mt-6")}>collector of the month</p>
        </div>
      <div className="left flex flex-col w-1/2 items-start h-screen gap-y-8 mx-8">
        <div className='flex flex-row'>
          <h1 className={clsx("text-8xl tracking-wide font-bold", amatic_SC.className)}>
            volunteering
          </h1>
          <Image
            src={arrow2}
            alt={"image"}
            className="pl-8"
          ></Image>
        </div>
          
          <p className="text-lg font-light text-justify ">
          Our Collector are passionate about saving the earth and contributing to a sustainable environment. Through our exciting volunteer activities and programs you will get to work the talk by attending recycling campaigns and being a recycle advocate and educator. Join us to “work the talk” when you apply to be part of the Reuse Volunteer team.           </p>
        </div>
      
    </div>
  )
}
const PlanSection = () => {
  return (
    <div className=" flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12">
      <div className="topBlock flex">
        <Image
            src={group}
            alt={"image"}
            className="w-full h-3/4"
          ></Image>
      </div>
    </div>
  )
}

const RegisterSection = () => {
  return (
    <div className=" relative flex-col text-black max-w-[1440px] mx-auto lg:w-10/12 my-20 ">
      <div className=' -z-10'>
      <Image
            src={background}
            alt={"image"}
            className=""
          ></Image>
      </div>
      
      <div className='absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
      <Button href={"/"} classes={"text-white"} content={<Image src={buttonRegister} alt="buttonApply"/>}></Button>  

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
        <VolunteSection/>
        <Volunte2Section/>
        <PlanSection/>
        <RegisterSection/>
      </div>
    </main>
  );
}
