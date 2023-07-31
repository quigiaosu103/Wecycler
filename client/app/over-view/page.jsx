"use client";
import clsx from "clsx";
import { Play, Amatic_SC } from "@next/font/google";
import { redirect, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/context/store";
import { selectWallet } from "@/features/walletSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProgressBar from "../../components/ProgressBar";
import Image from "next/image";
import globe from "/public/images/Globe.svg";
import coin from "/public/images/coin.svg";
import pj_title from "/public/images/pj_title.png";
import { BiSolidStar, BiMap } from "react-icons/bi";
import Popup2 from "@/components/Popup2";
import recycleImg from "/public/images/recycle.png"
import { FaCheck, FaTimes } from "react-icons/fa";

const play = Play({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const amatic_SC = Amatic_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const IntroSection = ({ parsedData, setOpenForm }) => {
  const dateObject = new Date(parsedData?.deadline);
  const startDateObject = new Date(parsedData?.init_time);
  const wallet = useAppSelector(selectWallet);

  const getDayWithOrdinalSuffix = (day) => {
    const suffixes = ["st", "nd", "rd"];
    const specialCases = [11, 12, 13]; // 11th, 12th, 13th are exceptions

    const digit = day % 10;
    const suffix = suffixes[digit - 1] || "th";

    if (specialCases.includes(day)) {
      return day + "th";
    }

    return day + suffix;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysLeft = (startDate, endDate) => {
    // Parse the date strings to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    const currentTime = new Date();

    // Calculate the difference between the dates in milliseconds
    const difference = end.getTime() - currentTime.getTime();

    // Convert the difference to days
    const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
    if(daysLeft<1)
    {
      return 0;
    }
    return daysLeft
    };

  // Get the day (1-31)
  const day = dateObject.getDate();

  // Get the month (0-11). Note: January is 0, February is 1, and so on.
  const monthIndex = dateObject.getMonth();
  const monthName = monthNames[monthIndex];
  // Get the year (4 digits)
  const year = dateObject.getFullYear();

  const updateStatus = async () => {
    let status
    if(parsedData?.status === "Active") status = "Done"
    if(parsedData?.status === "Init") status = "Active"

    await wallet.callMethod({
      contractId: "dev-1690642410974-51262377694618",
      method: "set_camp_status",
      args: { status: status || "Done", camp_id: parsedData?.id },
    });
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12 mt-40 p-12 shadow-xl rounded-xl">
        <div className="flex flex-row justify-between">
          <div className=" flex flex-col ">
            <h1
              className={clsx(
                "text-6xl tracking-wide font-bold",
                amatic_SC.className
              )}
            >
              {parsedData?.meta_data.title}
            </h1>
            <p
              className={clsx(
                "text-2xl tracking-wide my-2",
                amatic_SC.className
              )}
            >
              {parsedData?.owner}
            </p>
          </div>
          <div>
            <Image
              src={globe}
              alt={"globe"}
              layout="responsive"
              className="h-1/2"
            ></Image>
          </div>
        </div>

        <div className="flex flex-row justify-center items-start gap-y-8 h-96">
          <div className="flex w-1/2 justify-center h-full">
            <Image
              src={
                isValidUrl(parsedData?.meta_data.image)
                  ? parsedData?.meta_data.image
                  : pj_title
              }
              alt={"image"}
              width={400}
              height={400}
              layout="responsive"
              objectFit='contain'
              className="w-1/3 h-1/2 rounded-xl"
            ></Image>
          </div>
          <div className="flex flex-col w-1/2 ml-20 test">
            <h1
              className={clsx(
                "text-6xl tracking-wide font-bold text-[#73d88b]",
                amatic_SC.className
              )}
            >
              Date: {monthName} {getDayWithOrdinalSuffix(day)} {year}
            </h1>
            <p className="text-2xl tracking-wide ">
              {getDaysLeft(startDateObject, dateObject)} day left
            </p>
            <div className="flex space-x-3">
              <p className="">Status: {parsedData?.status}</p>
              {wallet?.accountId === parsedData?.owner &&
                (parsedData?.status == "Init" ||
                  parsedData?.status == "Active") && (
                  <button
                    onClick={updateStatus}
                    className="border-2 bg-[#FFE500] border-black rounded-lg px-3"
                  >
                    Update
                  </button>
                )}
            </div>
            <div className="flex flex-row">
              <Image src={coin} alt={"coin"}></Image>
              <p className="text-2xl tracking-wide">{parsedData?.fund}</p>
            </div>

            <div className="pt-8">
              <div className="flex flex-row justify-between">
                <p>Goal</p>
                <p>
                  {parsedData?.total_products}/
                  {parsedData?.total_products_expected}
                </p>
              </div>
              <ProgressBar
                value={parsedData?.total_products}
                max={parsedData?.total_products_expected}
              />
              <div className="flex flex-row justify-around pt-8">
                {/* <Button href={"/"} classes={"text-white"} content={<Image src={buttonDonate} alt="buttonApply"/>}></Button>   */}
                  
                <button
                  type="button"
                  onClick={() => {
                    setOpenForm(true);
                  }}                  
                  className={`text-black rounded-lg px-5 py-2 ${
                    parsedData?.status === "Active"
                      ? "bg-[#FFE500] border-2 border-black"
                      : "bg-gray-400 border-2 border-gray-500 cursor-not-allowed"
                  }`}
                  disabled={parsedData?.status !== "Active"}
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DesciptionSection = ({ parsedData }) => {
  return (
    <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12 mt-8 p-8 ">
      <div className=" flex flex-row justify-between">
        <div>
          <h1 className={"text-4xl tracking-wide mb-8"}>
            <BiMap className="text-[#73d88b] text-6xl" />
            District 7, HoChiMinh City
          </h1>
        </div>

        <div className="flex flex-col ">
          <div className="flex flex-row">
            <BiSolidStar size={24} className="text-yellow-500" />
            <BiSolidStar size={24} className="text-yellow-500" />
            <BiSolidStar size={24} className="text-yellow-500" />
            <BiSolidStar size={24} className="text-yellow-500" />
            <BiSolidStar size={24} className="text-yellow-500" />
          </div>
          <div>
            <p className="text-xl">10 reviews</p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-justify">{parsedData?.meta_data.content}</p>
      </div>
    </div>
  );
};

const ValidatorSection = ({ data, wallet, userData }) => {

    const [productData, setProductData] = useState(data?.products.filter(product => {
        console.log(userData.id, data?.campaign.owner)
        if(userData.id === data?.campaign.owner){
            return product.state == "Validated"
        }

        if(userData.role === "Collector"){
            return product.state == "Init"
        }

        return true
    }))

    useEffect(() => {
        setProductData(data?.products.filter(product => {
            if(userData.id === data?.campaign.owner){
                return product.state == "Validated"
            }
    
            if(userData.role === "Collector"){
                return product.state == "Init"
            }
    
            return true
        }))
    }, [data])

    const handleClick = async (target, id, camp_id) => {

        let type = null
        while(type === null){
            target = target.parentElement
            type = target.getAttribute('data-type')
        }

        if(type === "cancel"){
            await wallet.callMethod({contractId: "dev-1690642410974-51262377694618", method: "set_state_product", args: {id, camp_id, is_valid: false}})
        }

        if(type === "accept"){
            await wallet.callMethod({contractId: "dev-1690642410974-51262377694618", method: "set_state_product", args: {id, camp_id, is_valid: true}})
        }
    }

    return (
        <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12 mt-8 p-8">
            <h1 className="text-5xl font-bold">Validation</h1>
            <div className="p-5 mt-10 grid grid-cols-4 gap-4">
                {productData?.map((product, index) => {
                    return (
                        <div key={index} className="border py-3 border-black px-3 xy-5 rounded-lg flex flex-row items-center space-x-2 justify-center">
                            <Image src={recycleImg} alt="..." width={50} height={50}/>
                            <h1 className="me-20">{product.meta_data.name}</h1>
                            {
                                (userData.id === data.campaign.owner || userData.role === "Collector") && 
                                <div className="" id={product.id} >
                                    <button data-type="cancel" onClick={(e) => {handleClick(e.target, product.id, product.campaign_id)}} className="border border-black rounded-full p-1 bg-[#EC5959] me-2"><FaTimes/></button>
                                    <button data-type="accept" onClick={(e) => {handleClick(e.target, product.id, product.campaign_id)}} className="border border-black rounded-full p-1 bg-[#59EC7A]"><FaCheck/></button>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

function ProductForm({ data }) {
  const wallet = useAppSelector(selectWallet);
  const [state, setState] = useState({
    description: "",
    image: "",
    camp_id: data.id,
  });

  const handleClick = async () => {
    wallet.callMethod({
      contractId: "dev-1690642410974-51262377694618",
      method: "new_product",
      args: { ...state, total_supply: Number(state.total_supply) },
    });
  };

  const handleChange = ({ target }) => {
    setState((prev) => ({
      ...prev,
      [target.getAttribute("name")]: target.value,
    }));
  };

  return (
    <div className="flex flex-col space-y-5">
      <div className="bg-[#59EC7A] border border-black rounded-full px-5 py-2 w-1/3 text-center">
        Baos Qui
      </div>
      <span className="flex flex-col text-base">
        <label>Product's name</label>
        <input
          name="name"
          type="text"
          className="border-2 border-black rounded-lg"
          onChange={handleChange}
          value={state.name}
        />
      </span>
      <span className="flex flex-col text-base">
        <label>Location</label>
        <input
          name="location"
          type="text"
          className="border-2 border-black rounded-lg"
          onChange={handleChange}
          value={state.location}
        />
      </span>
      <div className="flex flex-row space-x-10 items-end">
        <span className="flex flex-col text-base">
          <label>Amount</label>
          <input
            name="total_supply"
            type="number"
            className="border-2 border-black rounded-lg"
            onChange={handleChange}
            value={state.total_supply}
          />
        </span>

        <button
          onClick={handleClick}
          className="rounded-lg bg-[#59EC7A] h-10 px-10"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const parsedData = JSON.parse(data);
  const [addProductForm, setAddProductForm] = useState(false);
  const wallet = useAppSelector(selectWallet);
  const [information, setInformation] = useState();
  const [userData, setUserData] = useState()

  useEffect(() => {
    async function fetchData() {
        const data = await wallet?.viewMethod({
            contractId: "dev-1690642410974-51262377694618",
            method: "get_camp_data",
            args: { camp_id: parsedData.id },
        })
    
        const dataUser = await wallet?.viewMethod({contractId:"dev-1690642410974-51262377694618", method: "get_user_by_id",args: {id: wallet.accountId}  })
    
        setInformation(data)
        setUserData(dataUser)
      }
    fetchData()
  }, [wallet])

  console.log(information)

  return (
    <main>
      <div className={clsx("flex flex-col", play.className)}>
        <IntroSection parsedData={information?.campaign || parsedData} setOpenForm={setAddProductForm} />
        <DesciptionSection parsedData={information?.campaign || parsedData} />
        {/* <h1 className='text-5xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tra'>heloooooooooooooooooooooooo</h1> */}
        <Popup2
          isOpen={addProductForm}
          setIsOpen={setAddProductForm}
          content={<ProductForm data={information?.campaign || parsedData} />}
        />
        <ValidatorSection data={information} wallet={wallet} userData={userData}/>
      </div>
    </main>
  );
}
