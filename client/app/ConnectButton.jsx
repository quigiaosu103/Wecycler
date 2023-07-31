"use client";

import { memo, useEffect, useRef,useState  } from "react";
import { useAppSelector } from "@/context/store";
import { selectWallet } from "@/features/walletSlice";
import Popup from "../components/PopUp";
import avatar from "/public/images/Avatar.png";
import Image from "next/image";
import Popup2 from "@/components/Popup2";


import { date } from "yup";

const Profile = ({ signOut, userData }) => {

  const wallet = useAppSelector(selectWallet);
  
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const update_user_info = async () => {
    if(wallet)
    {
      wallet.callMethod({contractId:"dev-1690642410974-51262377694618", method: "update_user",args: {name: newName, email_address: newEmail, image: "aaaaa" }  })
    }

  };

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleBackClick = () => {
    setIsEditing(false);
  };

  const handleUpdateClick = () => {
    // Call the update_user_info function here with newName and newEmail
    update_user_info();
    setIsEditing(false);
  };

  return (
    <div className="popup-content flex-col min-w-[1000px] min-h-[600px] flex">
            <div className="flex flex-row justify-between pb-8">
                <p className="text-black text-4xl font-normal">
                    Your Profile
                </p>
            </div>
        <div className="flex flex-row justify-center items-center">
            <div className="w-1/3 flex justify-center">
                <Image
                className=" object-cover rounded-full w-28 h-28 border border-2 border-[#59EC7A] shadow-xl"
                src={avatar}
                alt="form-learn"
                />
            </div>

            <div className="flex flex-col font-light text-black tracking-wide w-2/3">
                <label htmlFor="name" className={"block"}>
                Account Name
                </label>
                <input
                type="text"
                value={newName}
                name="name"
                placeholder={userData?.meta_data.name}
                onChange={handleNameChange}
                className={`border-none border-gray-300 rounded-lg ${
                    isEditing ? "bg-gray-100" : ""
                }`}
                disabled={!isEditing}
                />
                <p>Acount id: {userData?.id}</p>

                <label htmlFor="email" className={"block"}>
                Email
                </label>
                <input
                type="email"
                value={newEmail}
                name="email"
                placeholder={userData?.meta_data.email_address}
                onChange={handleEmailChange}
                className={`border-none border-gray-300 rounded-lg ${
                    isEditing ? "bg-gray-100" : ""
                }`}
                disabled={!isEditing}
                />

                <p>Role: {userData?.role}</p>
                <p>Token amount: {userData?.meta_data.balance}</p>
            </div>
        </div>

        {!isEditing ? (
          <button
            className="text-green-400 rounded-lg mt-10 font-light border border-2 border-green-400"
            onClick={handleEditClick}
          >
            Edit
          </button>
        ) : (
          <>

            <button
              className="text-green-400 rounded-lg mt-10 font-light border border-2 border-green-400"
              onClick={handleUpdateClick}
            >
              Update
            </button>
            <button
              className="text-red-500 rounded-lg mt-10 font-light border border-2 border-gray-400"
              onClick={handleBackClick}
            >
              Back
            </button>
          </>
        )}
            <button
              className="text-red-500 rounded-lg mt-10 font-light border border-2 border-red-400"
              onClick={signOut}
            >
              Sign Out
            </button>
      </div>
  )
}

function ConnectWalletButton() {
  const wallet = useAppSelector(selectWallet);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
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

    //localStorage.setItem("walletData", JSON.stringify(wallet))
    wallet.signIn();
  };

  const signOutClick = async () => {
    if (!wallet)
      return {
        title: "Wallet not initialized",
        description: "Please try again later",
        status: "error",
      };

    localStorage.removeItem("userData");

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
      const savedData = localStorage.getItem("userData");
      if (savedData) {
        setUserData(JSON.parse(savedData));
      } else {
        fetchData();
      }
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
      localStorage.setItem("userData", JSON.stringify(getUserResponse));
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
      <Popup2 isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} content={<Profile signOut={signOutClick} userData={userData}/>}/>
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