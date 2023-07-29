import clsx from 'clsx'
import { Play, Amatic_SC } from "@next/font/google"
import Button from "../../components/Button"
import ProgressBar from "../../components/ProgressBar"

import Image from "next/image"

import buttonRecycle from "/public/images/bt_recycle.svg"
import buttonDonate from "/public/images/bt_donate.svg"
import globe from "/public/images/Globe.svg"

import pj_title from "/public/images/pj_title.png"

import {BiSolidStar,BiMap} from "react-icons/bi";

const play = Play({
  subsets: ['latin'],
  weight: ['400', '700']
})

const amatic_SC = Amatic_SC({
  subsets: ['latin'],
  weight: ['400', '700']
})



const IntroSection = () => {
    const progressValue = 50;

    return (
        <div className='flex flex-col'>
            <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12 mt-40 p-12 shadow-xl rounded-xl">
                <div className='flex flex-row justify-between'>
                    <div className=" flex flex-col ">
                        <h1  className={clsx("text-6xl tracking-wide font-bold", amatic_SC.className)}>
                        PROJECT TITLE
                        </h1>
                        <p className={clsx("text-2xl tracking-wide my-2", amatic_SC.className)}>
                        Insert short description about project
                        </p>
                    </div>
                    <div>
                        <Image
                            src={globe}
                            alt={"globe"}
                            layout="responsive"
                            className="h-1/2"
                            ></Image>
                    </div>
                </div>
                
                <div className="flex flex-row justify-center items-start gap-y-8">
                    <div className="grid grid-cols-3 gap-3 w-1/2">
                        <Image
                        src={pj_title}
                        alt={"image"}
                        layout="responsive"
                        // objectFit='contain'
                        className="w-1/3 h-1/2"
                        ></Image>
                        <Image
                        src={pj_title}
                        alt={"image"}
                        layout="responsive"
                        // objectFit='contain'
                        ></Image>
                        <Image
                        src={pj_title}
                        alt={"image"}
                        layout="responsive"
                        // objectFit='contain'
                        className=""
                        ></Image>
                        <Image
                        src={pj_title}
                        alt={"image"}
                        layout="responsive"
                        // objectFit='contain'
                        className=""
                        ></Image>
                    </div>
                    <div className="flex flex-col w-1/2 ml-20">
                        <h1  className={clsx("text-6xl tracking-wide font-bold text-[#73d88b]", amatic_SC.className)}>
                        Date: July 24th 2023                 
                        </h1>
                        <p className='text-2xl tracking-wide '>
                            30 day left
                        </p>
                        <p className=''>
                            Recycles: 50
                        </p>
                        <p className=''>
                            1000
                        </p>
                        <div className='pt-8'>
                            <div className='flex flex-row justify-between'>
                                <p>
                                    Goal
                                </p>
                                <p>
                                    {progressValue}/100
                                </p>
                            </div>
                            <ProgressBar value={progressValue} />
                            <div className='flex flex-row justify-around pt-8'>

                            {/* <Button href={"/"} classes={"text-white"} content={<Image src={buttonDonate} alt="buttonApply"/>}></Button>   */}

                            <Button href={"/"} classes={"text-white"} content={<Image src={buttonRecycle} alt="buttonApply"/>}></Button>  


                            </div>

                        </div>
                    </div>
                </div> 
            </div>
            
        </div>
    )
}

const DesciptionSection = () => {
    return (
        <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12 mt-8 p-8 ">
            <div className=" flex flex-row justify-between">
                <div>
                    <h1  className={"text-4xl tracking-wide mb-8"}>
                        <BiMap className='text-[#73d88b] text-6xl'/>
                        District 7, HoChiMinh City                  
                    </h1>
                </div>
               
                <div className='flex flex-col '>
                    <div className='flex flex-row'>
                        <BiSolidStar size={24} className="text-yellow-500"/>
                        <BiSolidStar size={24} className="text-yellow-500"/>
                        <BiSolidStar size={24} className="text-yellow-500"/>
                        <BiSolidStar size={24} className="text-yellow-500"/>
                        <BiSolidStar size={24} className="text-yellow-500"/>
                    </div>
                    <div>
                        <p className='text-xl'>
                            10 reviews
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <p className='text-justify'>
                17-year-old Hoang Mai is a proud contributor to Vietnam’s Youth Union volunteer campaign. In a run-up to World Environment Day and its global theme, “Only One Earth” on June 5, she will connect with millions of other young citizens who are taking action to clean up the environment. The Youth Union has focused increasing attention on environmental protection through tree planting and eco-campaigns like “for a green Vietnam,” “let’s clean up the seas,” and “anti-plastic waste,” and recently marked the start of its ‘Green Summer’ campaign.
                <br />

In 1986 the Vietnam Communist Party adopted economic reforms or “doi moi.” It was the Youth Union, joined by international non-profit organizations like the United Nations Volunteers (UNV), that also mobilized nation-building efforts. In December 2021, UNESCO in Vietnam and the Communist Youth Union also signed a letter of understanding for the period of 2021 to 2025. This is a milestone for the strategic and close cooperation between the two organizations since they share common ground in promoting student engagement with their communities. <br />
Dr. Le Thu Mach, a lecturer at Ho Chi Minh National Academy of Politics, recalls her social work volunteerism twenty years ago in Sapa, in the Lao Cai province, where the Vietnam Youth Federation awarded her a national certificate of merit. She says, “today student volunteerism is all year round, not just in the summer and it is community-based.”
While some non-state actors in the form of non-government organizations (NGOs) in Vietnam continue to face challenges, there’s no turning back the actions and voices of community-based youth volunteers since they are future agents for a changing environment. <br />

NGOs like PanNature continue to be engaged in World Environment Day by planting trees in Van Ho Commune in Son La, where the population of Northern white-cheeked gibbon lives and the endangered rare Northern white-cheeked gibbon. This volunteer activity is part of a long-term plan to restore 630 hectares of forest and conserve the rare Gibbon species. “While we do not have any formal partnership with the National Youth Union, we do work with the local Youth Union through capacity building and other initiatives says executive director Trinh Le Nguyen. <br />

The government’s national directive about the importance of conservation and sustainability of the environment is reflected in the Ministry of Natural Resources and Environment’s (MONRE) upcoming June 4 environmental awards program to organizations, individuals, and communities with excellent performances in environmental protection.
                </p>
            </div>
        </div>
          
    )
  }
  


export default function Home() {
  return (
    <main>
      <div className={clsx("flex flex-col", play.className)}>
        <IntroSection/>
        <DesciptionSection/>

      </div>
    </main>
  );
}
