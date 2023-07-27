import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import ConnectButton from "../app/ConnectButton";

interface IHeaderProps {}

const Header = (props: IHeaderProps) => {
  return (
    <header className="fixed bg-white w-full">
      <div className="grid grid-cols-2 gap-x-4 max-w-[1440px] mx-auto lg:w-10/12 px-2 py-4 z-10">
        {/* Left */}
        <div className="flex space-x-8 items-center justify-start">
          <Link href="/" className="flex items-center space-x-2 z-10">
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
              <Link
                href="/campaign"
                className="flex flex-col items-end justify-end group p-3"
              >
                <p>Campaign</p>
              </Link>
              <Link
                href="/"
                className="flex flex-col items-end justify-end group p-3"
              >
                <p>Collector</p>
              </Link>
              <Link
                href="/create"
                className="flex flex-col items-end justify-end group p-3"
              >
                <p>Create</p>
              </Link>
              <Link
                href="/"
                className="flex flex-col items-end justify-end group py-3 px-6 rounded-se-5xl rounded-es-5xl rounded-ss-full rounded-ee-full bg-[#F1FFC7] "
              >
                <p>Connect Wallet</p>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
