import React from "react";
import Image from "next/image";

const UserCard = ({src, alt, title, description}) => {

  return (
    <div className="relative w-64 h-64 overflow-hidden rounded-xl bg-[#6fffcb]">
      <div className="flex flex-col justify-center items-center w-full h-full ">
        <Image
          src={src}
          alt={alt}
          className="w-1/2 h-1/2 object-cover rounded-full mb-4"
        />
        <p className="text-2xl font-semibold text-white">{title}</p>
        <p className=" text-white"> Total Sales: {description}</p>
      </div>
      
    </div>
  );
};

export default UserCard;