import React from "react";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

const ImageCard = ({src, alt, title,owner, description, linkTo, dataToSend}) => {

  return (
    <Link href={{ pathname: linkTo, query: { data: JSON.stringify(dataToSend) } }}>
    <div className="relative max-w-xs overflow-hidden rounded-2xl shadow-lg group">  
          <div className="group-hover:scale-110 transform transition-transform ">
            <div className="">
              <Image
                src={src}
                alt={alt}
                className=""
                width={400} 
                height={200}
                
              />
            </div>
            <div className="p-8 bg-[#d7ffdb] flex flex-col justify-between">
              <h2 className="text-lg font-bold mb-2">{title}</h2>
              <p className="text-gray-500">{owner}</p>
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
    </Link>
  );
};

export default ImageCard;