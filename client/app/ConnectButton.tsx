"use client";

import { memo, useEffect, useRef,useState  } from "react";
import { useAppSelector } from "@/context/store";
import { selectWallet } from "@/features/walletSlice";
import Popup from "../components/PopUp";
import { Wallet } from "@near-wallet-selector/core";
 
function ConnectWalletButton() {
  const wallet = useAppSelector(selectWallet);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
 
  if (isWalletConnected){
    wallet.viewMethod({contractId:"dev-1690642410974-51262377694618", method: "check_new_user", })
  }

  return isWalletConnected ? (
    <>
      <button
        onClick={handleOpenPopup}
        className="border border-gray-600 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-300 hover:border-b-4 hover:border-r-4 transition-all duration-100 font-medium ease-in-out"
      >
        {wallet.accountId?.split(".")[0]}
      </button>
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} signOut={signOutClick}/>

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
