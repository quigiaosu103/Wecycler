import React from "react";
import Image from "next/image";
import Button from "./Button";

const ImageCard = ({src, alt, title, description}) => {

  return (
    <div className="relative max-w-xs overflow-hidden rounded-2xl shadow-lg group ">
      <div className="group-hover:scale-110 transform transition-transform">
        <Image
          src={src}
          alt={alt}
          className=""
        />
        <div className="p-8 bg-[#d7ffdb]">
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          <p className="text-gray-500">{description}</p>
          <div className="flex flex-row justify-around pt-4 pb-8" >
            <div >
              <Button href={"/"} classes={" text-white bg-black rounded-full px-8"} content={"Donate"}></Button>
            </div>
            <div >
              <Button href={"/"} classes={"text-white bg-[#3580ef] rounded-full px-8"} content={"Recycle"}></Button>
            </div>
          </div>
        </div>
      </div>
      

    </div>
  );
};

export default ImageCard;