'use client';
import {useState} from "react";
import Search from "@/components/Search";

import ImageCard from "../../components/ImageCard"

import clsx from 'clsx'
import { Play, Amatic_SC } from "@next/font/google"
import Button from "../../components/Button"
import Image from "next/image"

import AllMark from "/public/images/AllMark.png"
import ActiveMark from "/public/images/ActiveMark.png"
import  ProgressMark from "/public/images/ProgressMark.png"
import CancelMark from "/public/images/CancelMark.png"

import bg from "/public/images/img65.png"







const play = Play({
  subsets: ['latin'],
  weight: ['400', '700']
})

const amatic_SC = Amatic_SC({
  subsets: ['latin'],
  weight: ['400', '700']
})

const SearchSection = () => {

    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value: string) => {
        // Here, you can access the search value when Enter is pressed
        console.log(value);
        setSearchValue(value);
    };

  return (
    <div className="flex flex-row justify-around text-black max-w-[1440px] mx-auto lg:w-10/12">
      <div className="flex flex-col  justify-center items-start h-screen">
        <h1  className={clsx("text-3xl tracking-wide font-bold", amatic_SC.className)}>
          Welcome Báo con
        </h1>
        <p className={clsx("text-2xl tracking-wide", amatic_SC.className)}>
        Manage your active Campaign from here.        
        </p>
        
      </div>

        <div className="flex items-center w-80">
            <div className="z-10 w-full max-w-md items-center justify-between font-mono text-sm lg:flex-inline">
                <Search onSearch={handleSearch} />
                {/* <h2 className={'text-2xl mt-20 mx-2 underline'}>Searched for:</h2>
                <p className={'text-2xl m-2'}> {searchValue}</p> */}
            </div>
        </div>
      <div className="flex items-center ">
        <Button href={"/"} classes={"text-white bg-[#59EC7A] rounded-xl"} content={"Start Campaign"}></Button>  

      </div>
    </div>
  )
}

const CampaignSection = () => {
  return (
    <div className="flex flex-row justify-around text-black max-w-[1440px] mx-auto lg:w-10/12">
        <div className="flex flex-row bg-[#D7FFDB]">
            <div>
            <Image
                src={AllMark}
                alt={"image"}
                className=""
                ></Image>
            </div>
            <div className="flex flex-col">
                <p>500</p>
                <p>ALL</p>
            </div>
        </div>
      
        <div className="flex flex-row bg-[#D7FFDB]">
            <div>
            <Image
                src={ActiveMark}
                alt={"image"}
                className=""
                ></Image>
            </div>
            <div className="flex flex-col">
                <p>500</p>
                <p>Active</p>
            </div>
        </div>
      
        <div className="flex flex-row bg-[#D7FFDB]">
            <div>
            <Image
                src={ProgressMark}
                alt={"image"}
                className=""
                ></Image>
            </div>
            <div className="flex flex-col">
                <p>500</p>
                <p>In Progress</p>
            </div>
        </div>

        <div className="flex flex-row bg-[#D7FFDB]">
            <div>
            <Image
                src={CancelMark}
                alt={"image"}
                className=""
                ></Image>
            </div>
            <div className="flex flex-col">
                <p>500</p>
                <p>Cancel</p>
            </div>
        </div>
    </div>
  )
}

const VolunteSection = () => {
  return (
    <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12">

        <div className="text-[#59EC7A]">
            <p className="text-2xl tracking-wide font-bold">
            3 Active Campaigns
            </p>
        </div>

        <div className="flex flex-row justify-between">
            <div className="">
                <div>
                    <ImageCard src={bg} alt="Image 65" title={"@better step"} 
                    description={"Turn your steps into earnings and create your art-filled collection with our Shoe NFTs."} />
                </div>
            </div>
            <div className="">
                <div>
                    <ImageCard src={bg} alt="Image 65" title={"@better step"} 
                    description={"Turn your steps into earnings and create your art-filled collection with our Shoe NFTs."} />
                </div>
            </div>
            <div className="">
                <div>
                    <ImageCard src={bg} alt="Image 65" title={"@better step"} 
                    description={"Turn your steps into earnings and create your art-filled collection with our Shoe NFTs."} />
                </div>
            </div>    
        </div>
    </div>
        
  )
}

const NewsSection = () => {
    return (
      <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12">
  
          <div className="text-[#59EC7A]">
              <p className="text-2xl tracking-wide font-bold">
              News
              </p>
          </div>
  
          <div className="flex flex-row justify-between">
              <div className="">
                  <div>
                      <ImageCard src={bg} alt="Image 65" title={"@better step"} 
                      description={"Turn your steps into earnings and create your art-filled collection with our Shoe NFTs."} />
                  </div>
              </div>
              <div className="">
                  <div>
                      <ImageCard src={bg} alt="Image 65" title={"@better step"} 
                      description={"Turn your steps into earnings and create your art-filled collection with our Shoe NFTs."} />
                  </div>
              </div>
              <div className="">
                  <div>
                      <ImageCard src={bg} alt="Image 65" title={"@better step"} 
                      description={"Turn your steps into earnings and create your art-filled collection with our Shoe NFTs."} />
                  </div>
              </div>    
          </div>
          <div className="w-1/2 ">
            <Button href={"/"} classes={"text-white bg-[#174931] rounded-xl"} content={"See More Campaign"}></Button>  
          </div>
      </div>
          
    )
  }

  const TableSection = () => {
    return (
        <div className="flex flex-row text-black max-w-[1440px] mx-auto lg:w-10/12">
       
            <table className="border-collapse border border-gray-400">
        
                <tr>
                    <th className="border border-gray-400 px-4 py-2">Name</th>
                    <th className="border border-gray-400 px-4 py-2">Price</th>
                    <th className="border border-gray-400 px-4 py-2">Time</th>
                </tr>
            
        
            </table>
        
      </div>
          
    )
  }
export default function Home() {
  return (
    <main>
      <div className={clsx("flex flex-col", play.className)}>
        <SearchSection/>
        <CampaignSection/>
        <VolunteSection/>
        <NewsSection/>
        <TableSection/>        
      </div>
    </main>
  );
}
