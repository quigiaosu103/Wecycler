"use client"

import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import ConnectButton from "../app/ConnectButton";
import { useState, useEffect } from "react";
import clsx from "clsx";

interface IHeaderProps {}

const Header = (props: IHeaderProps) => {

  const [isShow, setIsShow] = useState(true)

  let lastScrollTop = 0;

  //change status of navbar when scroll
  function headerChange() {
    let st = window.scrollY || document.documentElement.scrollTop
    //scroll down
    if (st > lastScrollTop) {
      setIsShow(false)
    }
    //scroll up
    else if (st < lastScrollTop) {
      setIsShow(true)
    }
    lastScrollTop = st <= 0 ? 0 : st;
  }

  useEffect(() => {
    window.addEventListener('scroll', headerChange)

    return () => {
      window.removeEventListener('scroll', headerChange)
    }
  }, [])
  return (
    <header className={clsx("fixed bg-white w-full z-10", isShow ? "animate-slide_in_top" : "animate-slide_out_top")}>
      <div className="grid grid-cols-2 gap-x-4 max-w-[1440px] mx-auto lg:w-10/12 px-2 py-2 z-50">
        {/* Left */}
        <div className="flex space-x-8 items-center justify-start">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              width={50}
              height={50}
              alt="logo"
              className="rounded-full"
            />
            <h2 className="font-extrabold hidden lg:flex text-3xl leading-[24px] text-black items-center">
              Wecycler
            </h2>
          </Link>
        </div>

        {/* Right */}
        <div className="flex space-x-4 items-center justify-end">
          <nav>
            <ul className="hidden lg:flex items-center justify-between space-x-5 text-[#59EC7A] text-xl font-bold">
              <Link href="/campaign" className="flex flex-col items-end justify-end group p-3">
                <p>Campaign</p>
              </Link>
              <Link href="/learn-more" className="flex flex-col items-end justify-end group p-3">
                <p>Collector</p>
              </Link>
              <Link href="/create" className="flex flex-col items-end justify-end group p-3">
                <p>Create</p>
              </Link>
              <ConnectButton />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
