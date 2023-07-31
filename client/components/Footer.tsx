interface IFooterProps {}
import Image from "next/image"
import Link from "next/link"
import earthImage from "../public/images/earth.svg"
import { BiLogoFacebookCircle, BiLogoTwitter, BiLogoInstagram } from "react-icons/bi";

const Footer = (props: IFooterProps) => {
    return (
        <footer className="max-w-[1440px] flex flex-col mx-auto lg:w-3/4 flex text-gray-800 px-2 py-2 z-10 text-center justify-center">
            <div className="blockTop flex flex-row py-5">
                <div className="flex w-1/3 flex-col items-start text-2xl font-bold">
                    <h1>Team size</h1>
                    <span className="flex flex-row space-x-4">
                        <p>Hiển</p>
                        <p>Quí</p>
                        <p>Tiến</p>
                        <p>Hải</p>
                        <p>Long</p>
                    </span>
                </div>
                <div className="flex w-1/3 justify-center">
                    <Image src={earthImage} alt={"earth"}/>
                </div>
                <div className="flex w-1/3 justify-end items-end text-4xl space-x-4">
                    <Link href="/">{<BiLogoFacebookCircle/>}</Link>
                    <Link href="/">{<BiLogoTwitter/>}</Link>
                    <Link href="/">{<BiLogoInstagram/>}</Link>
                </div>
            </div>
            <div className="blockBottom border-t-2 border-t-gray-600 w-full py-10 text-end text-2xl font-bold">
                <p>Team ve chai</p>
            </div>
        </footer>
    )
}

export default Footer
