import React from "react";
import avatar from "/public/images/Avatar.png"
import Image from "next/image";
import { useAppSelector } from "@/context/store";
import { selectWallet } from "@/features/walletSlice";

const Popup = ({ isOpen, onClose , signOut}) => {
    const wallet = useAppSelector(selectWallet);

  return (
    <div className={`popup ${isOpen ? "open" : ""}`}>
        <div className="popup-content flex-col min-w-[700px]">
            <div className="flex flex-row justify-between pb-8">
                <p className="text-black text-2xl font-normal">
                    Profile
                </p>
                <button className="text-red-500" onClick={onClose}>x</button>
            </div>
        
            <div className='flex flex-row'>
                    
                    <Image
                        className=" object-cover rounded-full w-48 h-48"
                        src={avatar}
                        alt="form-learn"
                    />
                    <div className='flex flex-col ml-10 font-light text-black tracking-wide'>
                        <p>
                            Name: Test name
                        </p>
                        <p>
                            Acount id: @testname.testnet
                        </p>
                        <p>
                            Email: test@gmail.com
                        </p>
                        <p>
                            Token amount: balance
                        </p>
                        <p>
                            Role: Collector
                        </p>
                    </div>
            </div>
            {/* <button className="text-green-400 rounded-lg mt-10 font-light" onClick={signOut}>Update</button> */}
            <button className="text-red-500 rounded-lg mt-10 font-light" onClick={signOut}>Sign Out</button>
        </div>
        
    </div>
  );
};

export default Popup;
