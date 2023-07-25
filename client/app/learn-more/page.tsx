import clsx from 'clsx'
import { Play, Amatic_SC } from "@next/font/google"
import Button from "../../components/Button"
import Image from "next/image"

import rightImage from "/public/images/page2.png"
import imgSection2 from "/public/images/Posters.png"
import imgSection3 from "/public/images/road.png"
import hand from "/public/images/hand.png"
import crump from "/public/images/crumpled.png"
import group from "/public/images/Group 175.png"
import background from "/public/images/OBJECTS.png"


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
        <h1 className="text-4xl tracking-wide font-bold">
          OUR COLLECTOR PROGRAMS
        </h1>
        <p className="text-3xl">
          Be a recycle collector
        </p>
        <p className="text-3xl">
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
    <div className="relative flex flex-row text-[#59EC7A] max-w-[1440px] mx-auto lg:w-10/12">
        <div className="absolute z-10 bottom-0">
        <Image
            src={imgSection3}
            alt={"image"}
        ></Image>
        </div>
      <div className=" w-1/2 flex items-center z-30">
        <Image
          src={imgSection2}
          alt={"image"}
          // layout='fill'
          // objectFit='contain'
          className="w-full h-3/4"
        ></Image>
      </div>


      <div className=" flex-col w-1/2 justify-center items-end h-screen gap-y-8 z-30 top-0">
        <h1 className="text-6xl tracking-wide font-bold ">
        Attend Campaigns
        </h1>
        <p className="text-2xl">
        While its important to tell everyone about recyclcling, we also need to show them how it is done. Join us as we pick up papers and plastics around communities. This can be done individually or with the team. 
        </p>
      </div>

      
    </div>
  )
}

const VolunteSection = () => {
  return (
    <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12 py-10">
      <div className="topBlock flex flex-row space-x-20">
        <div className="blockLeft w-1/2 flex flex-col items-center bg-[#10b981] ">
          <p className={clsx("text-6xl tracking-wide font-bold m-8", amatic_SC.className)}>"Community development"</p>
          <p className={clsx("text-2xl tracking-wide font-bold m-8", amatic_SC.className)}>"As a community development volunteer, you'll join our charity and give your time to disadvantaged communities to help distribute food, shelter and clothing and provide education. As you can imagine, this type of volunteering is one of the most challenging and diverse, while also being extremely rewarding."</p>
        </div>
        <div className="blockRight w-1/2 flex items-end">
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
          className="w-full h-3/4"
        ></Image>
        <p className={clsx(amatic_SC.className, "text-4xl font-bold mt-6")}>collector of the month</p>
        </div>
      <div className="left flex flex-col w-1/2 justify-center items-start h-screen gap-y-8">
          <h1 className={clsx("text-8xl tracking-wide font-bold", amatic_SC.className)}>
            volunteering
          </h1>
          <p className="text-lg font-light">
          Our Collector are passionate about saving the earth and contributing to a sustainable environment. Through our exciting volunteer activities and programs you will get to work the talk by attending recycling campaigns and being a recycle advocate and educator. Join us to “work the talk” when you apply to be part of the Reuse Volunteer team.           </p>
        </div>
      
    </div>
  )
}

const RegisterSection = () => {
  return (
    <div className=" flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12">
      
      <Button href={"/"} classes={"text-white"} content={<Image src={buttonApply} alt="buttonApply"/>}></Button>  
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
        <RegisterSection/>
      </div>
    </main>
  );
}
