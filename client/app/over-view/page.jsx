'use client';
import clsx from 'clsx'
import { Play, Amatic_SC } from "@next/font/google"
import { redirect, useSearchParams  } from "next/navigation";
import { useAppSelector } from "@/context/store";
import { selectWallet } from "@/features/walletSlice";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Button from "../../components/Button"
import ProgressBar from "../../components/ProgressBar"
import Image from "next/image"

import buttonRecycle from "/public/images/bt_recycle.svg"
import buttonDonate from "/public/images/bt_donate.svg"
import globe from "/public/images/Globe.svg"
import coin from "/public/images/coin.svg"

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

const IntroSection = ({ parsedData }) => {
    const dateObject = new Date(parsedData.deadline);
    const startDateObject = new Date(parsedData.init_time);
    const wallet = useAppSelector(selectWallet);
    const router = useRouter()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const txhash = urlParams.get("transactionHashes")

        if(txhash) {
            if(parsedData.status == "Active"){
                parsedData.status = "Done"
                router.replace("/over-view?data=" + JSON.stringify(parsedData))
            }

            if(parsedData.status == "Init"){
                parsedData.status = "Active"
                router.replace("/over-view?data=" + JSON.stringify(parsedData))
            }
        }
    }, [])

    const getDayWithOrdinalSuffix = (day) => {
        const suffixes = ["st", "nd", "rd"];
        const specialCases = [11, 12, 13]; // 11th, 12th, 13th are exceptions
      
        const digit = day % 10;
        const suffix = suffixes[digit - 1] || "th";
      
        if (specialCases.includes(day)) {
          return day + "th";
        }
      
        return day + suffix;
      };

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

    const getDaysLeft = (startDate, endDate) => {
        // Parse the date strings to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);
      
        // Calculate the difference between the dates in milliseconds
        const difference = end.getTime() - start.getTime();
      
        // Convert the difference to days
        const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
      
        return daysLeft;
    };

    // Get the day (1-31)
    const day = dateObject.getDate();

        // Get the month (0-11). Note: January is 0, February is 1, and so on.
    const monthIndex = dateObject.getMonth();
    const monthName = monthNames[monthIndex];
        // Get the year (4 digits)
    const year = dateObject.getFullYear();
    
    const updateStatus = async () => {

        await wallet.callMethod({contractId: "dev-1690642410974-51262377694618", method: "set_camp_status", args: {status: "Active", camp_id: parsedData?.id}})
    }

    return (
        <div className='flex flex-col'>
            <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12 mt-40 p-12 shadow-xl rounded-xl">
                <div className='flex flex-row justify-between'>
                    <div className=" flex flex-col ">
                        <h1  className={clsx("text-6xl tracking-wide font-bold", amatic_SC.className)}>
                            {parsedData?.meta_data.title}
                        </h1>
                        <p className={clsx("text-2xl tracking-wide my-2", amatic_SC.className)}>
                        {parsedData?.owner}                        
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
                        Date: {monthName} {getDayWithOrdinalSuffix(day)} {year}            
                        </h1>
                        <p className='text-2xl tracking-wide '>
                            {getDaysLeft(startDateObject,dateObject)} day left
                        </p>
                        <div className="flex space-x-3">
                            <p className=''>
                                Status: {parsedData?.status}
                            </p>
                            {wallet?.accountId === parsedData?.owner && (parsedData?.status == "Init" || parsedData?.status == "Active")  && (<button onClick={updateStatus} className="border-2 bg-[#FFE500] border-black rounded-lg px-3">Update</button>)}
                        </div>
                        <div className='flex flex-row'>
                            <Image
                            src={coin}
                            alt={"coin"}>
                            </Image>
                            <p className='text-2xl tracking-wide'>

                            {parsedData?.fund}
                        </p>
                        </div>
                        
                        <div className='pt-8'>
                            <div className='flex flex-row justify-between'>
                                <p>
                                    Goal
                                </p>
                                <p>
                                    {parsedData?.total_products}/{parsedData?.total_products_expected}
                                </p>
                            </div>
                            <ProgressBar value={parsedData?.total_products} max={parsedData?.total_products_expected}/>
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

const DesciptionSection = ({parsedData}) => {
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
                {parsedData?.meta_data.content}
                </p>
            </div>
        </div>
          
    )
  }
  

export default function Home() {
    const searchParams = useSearchParams()
    const data = searchParams.get("data")
    const parsedData = JSON.parse(data);
  return (
    <main>
      <div className={clsx("flex flex-col", play.className)}>
        <IntroSection parsedData={parsedData}/>
        <DesciptionSection parsedData={parsedData}/>

      </div>
    </main>
  );
}
