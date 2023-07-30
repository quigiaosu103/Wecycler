import React, { useState } from "react";
import avatar from "/public/images/Avatar.png";
import Image from "next/image";
import { useAppSelector } from "@/context/store";
import { selectWallet } from "@/features/walletSlice";

const Popup = ({ isOpen, onClose, signOut, userData }) => {
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
    <div className={`popup ${isOpen ? "open" : ""}`}>
      <div className="popup-content flex-col min-w-[1000px] min-h-[600px] flex">
            <div className="flex flex-row justify-between pb-8">
                <p className="text-black text-4xl font-normal">
                    Your Profile
                </p>
                <button className="text-red-500" onClick={onClose}>x</button>
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
    </div>
  );
};

export default Popup;
