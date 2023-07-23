"use client"

import Button from "./Button"
import Image from "next/image"
import rightImage from "/public/images/Vectors.png"

const IntroSection = () => {
  return (
    <div className="flex flex-row text-[#59EC7A] max-w-[1440px] mx-auto lg:w-10/12">
      <div className="left flex flex-col w-1/2 justify-center items-start h-screen gap-y-8">
        <h1 className="text-8xl tracking-wide font-bold">
          Wecycler
        </h1>
        <p className="text-3xl">
          Let Save The World
        </p>
        <Button href={"/"} classes={"text-white bg-[#59EC7A]"} content={"Let's Get Started"}></Button>
      </div>

      <div className="right w-1/2 flex items-center">
        <Image
          src={rightImage}
          alt={"image"}
          // layout='fill'
          // objectFit='contain'
          className="w-full h-3/4"
        ></Image>
      </div>
    </div>
  )
}

export default IntroSection
