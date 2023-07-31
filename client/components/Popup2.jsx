import React, { useState } from "react";
import clsx from 'clsx'
import { FaTimes } from "react-icons/fa";

const Popup = ({ isOpen, setIsOpen, content }) => {

    const closePopUp = ({target}) => {
        if(target.id === "overlay")
            setIsOpen(false);
    }

    return (
        <div onClick={closePopUp} id={"overlay"} className={clsx(isOpen ? "" : "hidden", "fixed z-20 top-0 left-0 h-screen w-screen bg-gray-800/75")}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-5">
                <div className="flex justify-end">
                    <span onClick={() => {setIsOpen(false)}} className="cursor-pointer hover:text-black"><FaTimes/></span>
                </div>
                <div className="p-3">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default Popup;
