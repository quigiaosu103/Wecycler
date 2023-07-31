"use client";

import { memo, useEffect, useRef,useState  } from "react";
import { useAppSelector } from "@/context/store";
import { selectWallet } from "@/features/walletSlice";
import { Wallet } from "@near-wallet-selector/core";
import Popup from "../components/PopUp";
import Button from "../components/Button"

import { date } from "yup";

function ConnectWalletButton() {
  const wallet = useAppSelector(selectWallet);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const onConnectWalletClicked = async () => {
    if (!wallet)
      return {
        title: "Wallet not initialized",
        description: "Please try again later",
        status: "error",
      };

    if (wallet.accountId) {
      return {
        title: "Wallet already connected",
        status: "info",
      };
    }

    wallet.signIn();
  };

  const signOutClick = async () => {
    if (!wallet)
      return {
        title: "Wallet not initialized",
        description: "Please try again later",
        status: "error",
      };

    wallet.signOut();
  };

  const isWalletConnected = !!wallet?.accountId;

  // if (isWalletConnected){
  //   wallet.viewMethod({contractId:"dev-1690642410974-51262377694618", method: "check_new_user", })
  // }

  if (isWalletConnected){
    wallet.viewMethod({contractId:"dev-1690642410974-51262377694618", method: "check_new_user",args: {id: wallet.accountId} })
    .then((data)=>{
      if(!data)
      {
        wallet.callMethod({contractId:"dev-1690642410974-51262377694618",method:"new_user" })
      }
    })
    wallet.viewMethod({contractId:"dev-1690642410974-51262377694618", method: "get_user_by_id",args: {id: wallet.accountId}  })
    .then((data)=>{console.log(data)})

  }

  const update_user_info = async () => {
    if(wallet)
    {
      wallet.callMethod({contractId:"dev-1690642410974-51262377694618", method: "update_user",args: {name: "helo", email_address: "ha@gmail.com", image: "aaaaa" }  })
      .then((data)=>{console.log(data)})
    }

  };

  useEffect(() => {
    if (isWalletConnected) {
      fetchData();
    }
  }, [isWalletConnected]);

  const fetchData = async () => {
    try {
      const checkNewUserResponse = await wallet.viewMethod({
        contractId: "dev-1690642410974-51262377694618",
        method: "check_new_user",
        args: { id: wallet.accountId }
      });

      if (!checkNewUserResponse) {
        await wallet.callMethod({
          contractId: "dev-1690642410974-51262377694618",
          method: "new_user"
        });
      }

      const getUserResponse = await wallet.viewMethod({
        contractId: "dev-1690642410974-51262377694618",
        method: "get_user_by_id",
        args: { id: wallet.accountId }
      });

      setUserData(getUserResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return isWalletConnected ? (
    <>
    {/* <Button href={"/profile"} classes={"border border-gray-600 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-300 hover:border-b-4 hover:border-r-4 transition-all duration-100 font-medium ease-in-out"} content={wallet.accountId?.split(".")[0]}></Button>   */}
      <button
        onClick={handleOpenPopup}
        className="border border-gray-600 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-300 hover:border-b-4 hover:border-r-4 transition-all duration-100 font-medium ease-in-out"
      >
        {wallet.accountId?.split(".")[0]}
      </button>
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} signOut={signOutClick} update={update_user_info} userData={userData}/>

    </>
  ) : (
    <button
      onClick={onConnectWalletClicked}
      className="border border-gray-600 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-300 hover:border-b-4 hover:border-r-4 transition-all duration-100 font-medium ease-in-out"
    >
      Connect
    </button>
  );
}

export default ConnectWalletButton;