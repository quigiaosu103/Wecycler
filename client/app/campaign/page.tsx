'use client';
import {useState} from "react";
import Search from "@/components/Search";

import ImageCard from "../../components/ImageCard"
import UserCard from "../../components/UserCard"


import clsx from 'clsx'
import { Play, Amatic_SC } from "@next/font/google"
import Button from "../../components/Button"
import Image from "next/image"

import AllMark from "/public/images/AllMark.svg"
import ActiveMark from "/public/images/ActiveMark.png"
import  ProgressMark from "/public/images/ProgressMark.png"
import CancelMark from "/public/images/CancelMark.png"

import bg from "/public/images/img65.png"
import avatar from "/public/images/Avatar.png"

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
    <div className="flex flex-row justify-between text-black max-w-[1440px] mx-auto lg:w-10/12">
      <div className="flex flex-col justify-center items-start h-96">
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
        <Button href={"/start-form"} classes={"text-white bg-[#59EC7A] rounded-xl"} content={"Start Campaign"}></Button>  

      </div>
    </div>
  )
}

const CampaignSection = () => {
  return (
    <div className="flex flex-col justify-between text-black max-w-[1440px] mx-auto lg:w-10/12 my-8">
        <div className="grid grid-cols-4 gap-8 ">
            <div className="flex flex-row bg-[#D7FFDB] rounded-2xl h-24 items-center">
              <Image
                  src={AllMark}
                  alt={"image"}
                  className="h-1/2 mx-6"
                  ></Image>
                  <div className="flex flex-col">
                    <p className="text-2xl tracking-wide font-bold">500 </p>
                    <p className="">All </p>

                  </div>
                
            </div>
            
            <div className="flex flex-row bg-[#D7FFDB] rounded-2xl h-24 items-center">
              <Image
                  src={ActiveMark}
                  alt={"image"}
                  className="h-1/2 mx-6"
                  ></Image>
                  <div className="flex flex-col">
                    <p className="text-2xl tracking-wide font-bold">100 </p>
                    <p className="">Active </p>

                  </div>
                
            </div>

            <div className="flex flex-row bg-[#D7FFDB] rounded-2xl h-24 items-center">
              <Image
                  src={ProgressMark}
                  alt={"image"}
                  className="h-1/2 mx-6"
                  ></Image>
                  <div className="flex flex-col">
                    <p className="text-2xl tracking-wide font-bold">200 </p>
                    <p className="">In Progress</p>

                  </div>
                
            </div>

            <div className="flex flex-row bg-[#D7FFDB] rounded-2xl h-24 items-center">
              <Image
                  src={CancelMark}
                  alt={"image"}
                  className="h-1/2 mx-6"
                  ></Image>
                  <div className="flex flex-col">
                    <p className="text-2xl tracking-wide font-bold">89 </p>
                    <p className="">Canceled </p>

                  </div>
                
            </div>
        </div>
      
    </div>
  )
}

const VolunteSection = () => {
  return (
    <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12 my-8">

        <div className=" flex flex-row mb-8">
            <p className="text-3xl tracking-wide font-bold text-[#2bd03b]">
            3 Active 
            </p>
            <p  className="text-3xl tracking-wide mx-2">Campaigns</p>
        </div>

        <div className="flex flex-row justify-between px-16">
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
      <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12 my-8">
  
          <div className="text-[#2bd03b] mb-8">
              <p className="text-3xl tracking-wide font-bold">
              News
              </p>
          </div>
  
          <div className="flex flex-row justify-between px-16">
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
          <div className="w-full flex justify-center mt-16">
            <Button href={"/"} classes={"text-white bg-[#174931] rounded-md text-2xl"} content={"See More Campaign"}></Button>  
          </div>
      </div>
          
    )
  }

  const TableSection = () => {
    return (
        <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12 my-8">
          <div >
              <p className="text-3xl tracking-wide font-bold">
              Recycle
              </p>
          </div>
            <table className="table-auto w-full text-left text-xl ">
              <thead>
                  <tr>
                      <th className=" ">No</th>
                      <th className=" ">Item List</th>
                      <th className=" ">Open Price</th>
                      <th className=" ">Your Offer</th>
                      <th className=" ">Recent Offer</th>
                      <th className=" ">Time left</th>
                  </tr>
              </thead>
              <tbody>
                  <tr >
                      <td>1</td>
                      <td className=" "> 
                        <div className="flex flex-row">
                            <Image
                              src={bg}
                              alt={"image"}
                              className="rounded-full h-8 w-14"
                            ></Image>
                            Item List
                        </div>
                      </td>
                      <td className=" ">Item List</td>
                      <td className=" ">Item List</td>
                      <td className=" ">Item List</td>
                      <td className=" ">Item List</td>
                  </tr>
                  <tr >
                      <td>2</td>
                      <td className=" "> 
                        <div className="flex flex-row">
                            <Image
                              src={bg}
                              alt={"image"}
                              className="rounded-full h-8 w-14"
                            ></Image>
                            Item List
                        </div>
                      </td>
                      <td className=" ">Item List</td>
                      <td className=" ">Item List</td>
                      <td className=" ">Item List</td>
                      <td className=" ">Item List</td>
                  </tr>
                  <tr >
                      <td>3</td>
                      <td className=" "> 
                        <div className="flex flex-row">
                            <Image
                              src={bg}
                              alt={"image"}
                              className="rounded-full h-8 w-14"
                            ></Image>
                            Item List
                        </div>
                      </td>
                      <td className=" ">Item List</td>
                      <td className=" ">Item List</td>
                      <td className=" ">Item List</td>
                      <td className=" ">Item List</td>
                  </tr>
              </tbody>
            </table>
        
      </div>
          
    )
  }

  const TopSection = () => {
    const rocketIcon = <i className="fas fa-rocket"></i>;
    return (
      <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12 my-8">
        <div className="flex flex-row">
          <div className="text-[#0b3d16] whitespace-nowrap">
              <p className="text-4xl tracking-wide font-bold my-4">
              Top Collector
              </p>
              <p className="text-2xl tracking-wide">
                Checkout Our Top Rated Collector
              </p>
          </div>
          <div className="w-full h-1/2 flex justify-end mt-auto">
            <Button href={"/"} classes={"text-black bg-white rounded-2xl text-xl border border-2 border-black"} content={"View Rankings"}  ></Button>  
          </div>
        </div>
          
  
          <div className="grid grid-cols-4 gap-8 mx-28 my-8">
            <div>
              <UserCard
                src={avatar} alt="Image 65" title={"@better step"} 
                description={"34.53 ETH"} />
            </div>
            <div>
              <UserCard
                src={avatar} alt="Image 65" title={"@better step"} 
                description={"34.53 ETH"} />
            </div>
            <div>
              <UserCard
                src={avatar} alt="Image 65" title={"@better step"} 
                description={"34.53 ETH"} />
            </div>
            <div>
              <UserCard
                src={avatar} alt="Image 65" title={"@better step"} 
                description={"34.53 ETH"} />
            </div>
            <div>
              <UserCard
                src={avatar} alt="Image 65" title={"@better step"} 
                description={"34.53 ETH"} />
            </div>
            <div>
              <UserCard
                src={avatar} alt="Image 65" title={"@better step"} 
                description={"34.53 ETH"} />
            </div>
            <div>
              <UserCard
                src={avatar} alt="Image 65" title={"@better step"} 
                description={"34.53 ETH"} />
            </div>
            <div>
              <UserCard
                src={avatar} alt="Image 65" title={"@better step"} 
                description={"34.53 ETH"} />
            </div>
          </div>
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
        <TopSection/>

      </div>
    </main>
  );
}
