import { useAppSelector } from "@/context/store";
import { selectWallet } from "@/features/walletSlice";
import { Wallet } from "@near-wallet-selector/core";

import Search from "@/components/Search";

import ImageCard from "../../components/ImageCard"
import UserCard from "../../components/UserCard"


import clsx from 'clsx'
import { Play, Amatic_SC } from "@next/font/google"
import Button from "../../components/Button"
import Image from "next/image"

import AllMark from "/public/images/AllMark.png"
import ActiveMark from "/public/images/ActiveMark.png"
import  ProgressMark from "/public/images/ProgressMark.png"
import CancelMark from "/public/images/CancelMark.png"

import bg from "/public/images/img65.png"
import avatar from "/public/images/Avatar.png"

import {BiRocket,BiPlus} from "react-icons/bi";


const play = Play({
  subsets: ['latin'],
  weight: ['400', '700']
})

const amatic_SC = Amatic_SC({
  subsets: ['latin'],
  weight: ['400', '700']
})

const ProfileSection = (userData) => {

    
  return (
    <div className="flex flex-row justify-between text-black max-w-[1440px] mx-auto lg:w-10/12 mt-40 p-10 border border-2 border-grey rounded-xl">
      <div className="popup-content flex-col min-w-[1000px] min-h-[600px] flex ">
            <div className="flex flex-row justify-between pb-8">
                <p className="text-black text-4xl font-normal">
                    Your Profile
                </p>
                {/* <button className="text-red-500" onClick={onClose}>x</button> */}
            </div>
        
            <div className='flex flex-row justify-center items-center'>
                    <div className="w-1/3 flex justify-center">
                        <Image
                            className=" object-cover rounded-full w-28 h-28 border border-2 border-[#59EC7A] shadow-xl"
                            src={avatar}
                            alt="form-learn"
                        />
                    </div>
                    
                    <div className='flex flex-col font-light text-black tracking-wide w-2/3'>
                        <p className="text-4xl">
                            Name: {userData?.meta_data.name}
                        </p>
                        <p>
                            Acount id: {userData?.id}
                        </p>

                        <label
                        htmlFor="name"
                        className={'block font-latoBold'}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={newEmail}
                            placeholder= {userData?.meta_data.email_address}
                            onChange={handleEmailChange}
                            className="border-none border-gray-300 rounded-lg"
                            />
                        
                        <p>
                            Role: {userData?.role}
                        </p>
                        <p>
                            Token amount: {userData?.meta_data.balance}
                        </p>
                    </div>
            </div>

                
            <button className="text-green-400 rounded-lg mt-10 font-light border border-2 border-green-400" onClick={update}>Edit</button>

            <button className="text-green-400 rounded-lg mt-10 font-light border border-2 border-green-400" onClick={update}>Update</button>
            <button className="text-red-500 rounded-lg mt-10 font-light" onClick={signOut}>Sign Out</button>
            
        </div>

       
    </div>
  )
}



export default function Home() {
  return (
    <main>
      <div className={clsx("flex flex-col", play.className)}>
        <ProfileSection/>
      </div>
    </main>
  );
}
