'use client';
import {useEffect, useState} from "react";
import { useAppSelector } from "@/context/store";
import { selectWallet } from "@/features/walletSlice";

import Search from "@/components/Search";

import ImageCard from "../../components/ImageCard"
import UserCard from "../../components/UserCard"
import Tab from '../../components/Tabs';
import TabContent from '../../components/TabsContent';

import clsx from 'clsx'
import { Play, Amatic_SC } from "@next/font/google"
import Button from "../../components/Button"
import Image from "next/image"

import AllMark from "/public/images/AllMark.svg"
import ActiveMark from "/public/images/ActiveMark.svg"
import ProgressMark from "/public/images/ProgressMark.svg"
import CancelMark from "/public/images/CancelMark.svg"
import coin from "/public/images/coin.svg";

import bg from "/public/images/img65.png"
import avatar from "/public/images/Avatar.png"

import {BiRocket,BiPlus} from "react-icons/bi";
// import { Wallet } from "@near-wallet-selector/core";
// import { Wallet } from "@/utils/near-wallet";


const play = Play({
  subsets: ['latin'],
  weight: ['400', '700']
})

const amatic_SC = Amatic_SC({
  subsets: ['latin'],
  weight: ['400', '700']
})

const SearchSection = () => {

    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value) => {
        // Here, you can access the search value when Enter is pressed
        console.log(value);
        setSearchValue(value);
    };

  return (
    <div className="flex flex-row justify-between text-black max-w-[1440px] mx-auto lg:w-10/12 mt-40 p-10 border-2 border-grey rounded-xl">
      <div className="flex flex-col justify-center items-start">
        <h1  className={"text-2xl tracking-wide font-bold"}>
          Welcome
        </h1>
        <p className={"text-lg tracking-wide"}>
        Manage your active Campaign from here.        
        </p>
        
      </div>

        <div className="flex items-center w-80">
            <div className=" w-full max-w-md items-center justify-between font-mono text-sm lg:flex-inline">
                <Search onSearch={handleSearch} />
                {/* <h2 className={'text-2xl mt-20 mx-2 underline'}>Searched for:</h2>
                <p className={'text-2xl m-2'}> {searchValue}</p> */}
            </div>
        </div>
      <div className="flex items-center ">
        <Button href={"/create"} classes={"text-white bg-[#174931] rounded-xl"} content={"Start Campaign"} icon={<BiPlus/>}></Button>  
      </div>
    </div>
  )
}

const CampaignSection = ( { campaignData }) => {
  

  const activeCampaignsCount = campaignData ? campaignData.filter(campaign => campaign.status === "Active").length : 0;
  const initCampaignsCount = campaignData ? campaignData.filter(campaign => campaign.status === "Init").length : 0;
  const doneCampaignsCount = campaignData ? campaignData.filter(campaign => campaign.status === "Done").length : 0;


  return (
    <div className="flex flex-col justify-between text-black max-w-[1440px] mx-auto lg:w-10/12 my-8">
        <div className="grid grid-cols-4 gap-8 ">
            <div className="flex flex-row bg-[#D7FFDB] rounded-2xl h-24 items-center">
              <Image
                  src={AllMark}
                  alt={"image"}
                  className="h-1/2 mx-6"
                  ></Image>
                  <div className="flex flex-col">
                    <p className="text-2xl tracking-wide font-bold">{campaignData?.length} </p>
                    <p className="font-light">All </p>
                  </div>
                
            </div>
            
            <div className="flex flex-row bg-[#D7FFDB] rounded-2xl h-24 items-center">
              <Image
                  src={ActiveMark}
                  alt={"image"}
                  className="h-1/2 mx-6"
                  ></Image>
                  <div className="flex flex-col">
                    <p className="text-2xl tracking-wide font-bold">{activeCampaignsCount} </p>
                    <p className="font-light">Active </p>

                  </div>
                
            </div>

            <div className="flex flex-row bg-[#D7FFDB] rounded-2xl h-24 items-center">
              <Image
                  src={ProgressMark}
                  alt={"image"}
                  className="h-1/2 mx-6"
                  ></Image>
                  <div className="flex flex-col">
                    <p className="text-2xl tracking-wide font-bold">{initCampaignsCount} </p>
                    <p className="font-light">In Progress</p>

                  </div>
                
            </div>

            <div className="flex flex-row bg-[#D7FFDB] rounded-2xl h-24 items-center">
              <Image
                  src={CancelMark}
                  alt={"image"}
                  className="h-1/2 mx-6"
                  ></Image>
                  <div className="flex flex-col">
                    <p className="text-2xl tracking-wide font-bold">{doneCampaignsCount} </p>
                    <p className="font-light">Done </p>

                  </div>
                
            </div>
        </div>
      
    </div>
  )
}

const VolunteSection = ({ campaignData }) => {

  const activeCampaigns = campaignData ? campaignData.filter(campaign => campaign.status === "Active") : [];
  const maxDisplayedCampaigns = 6;
  activeCampaigns.sort((a, b) => new Date(b.init_time) - new Date(a.init_time));

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12 my-8">
        <div className=" flex flex-row mb-8">
          
            <p className="text-3xl tracking-wide font-bold text-[#2bd03b]">
            {activeCampaigns?.length} Active 
            </p>
            <p  className="text-3xl tracking-wide mx-2">Campaigns</p>
        </div>

        <div className="grid grid-cols-3 gap-6 justify-between px-16">
            {activeCampaigns.slice(0, maxDisplayedCampaigns).map(campaign => (
              <div key={campaign.id}>
                <ImageCard
                  src={ isValidUrl(campaign.meta_data.image) ? campaign.meta_data.image : bg}
                  alt="Image 65"
                  title={campaign?.meta_data.title}
                  owner = {campaign.owner}
                  description={campaign?.meta_data.content}
                  linkTo={"/over-view"} 
                  dataToSend={campaign}
                />
              </div>
            ))}
         </div>
    </div>
  )
}

const NewsSection = ({ campaignData }) => {
  const initCampaigns = campaignData ? campaignData.filter(campaign => campaign.status === "Init") : [];
  const maxDisplayedCampaigns = 6;

  initCampaigns.sort((a, b) => new Date(b.init_time) - new Date(a.init_time));

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
    return (
      <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12 my-8">
  
          <div className="text-[#2bd03b] mb-8">
              <p className="text-3xl tracking-wide font-semibold">
              News
              </p>
          </div>
  
          <div className="grid grid-cols-3 gap-6 justify-between px-16">
            {initCampaigns.slice(0, maxDisplayedCampaigns).map(campaign => (
              <div key={campaign.id}>
                <ImageCard
                  src={ isValidUrl(campaign.meta_data.image) ? campaign.meta_data.image : bg}
                  alt="Image 65"
                  title={campaign?.meta_data.title}
                  owner = {campaign.owner}
                  description={campaign?.meta_data.content}
                  linkTo={"/over-view"}
                  dataToSend={campaign}
                />
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center mt-16">
            <Button href={"/"} classes={"text-white bg-[#174931] rounded-md text-2xl"} content={"See More Campaign"}></Button>  
          </div>
      </div>
          
    )
  }

  const CollectorSection = ({ campaignData }) => {
    const wallet = useAppSelector(selectWallet);
    const initCampaigns = campaignData ? campaignData.filter(campaign => campaign.status === "Init") : [];
    const maxDisplayedCampaigns = 10;
    initCampaigns.sort((a, b) => new Date(b.init_time) - new Date(a.init_time));

    const [userData, setUserData] = useState(null);

    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    };

    const fetchData = async () => {
      try {
        const getUserResponse = await wallet.viewMethod({
          contractId: "dev-1690642410974-51262377694618",
          method: "get_user_by_id",
          args: { id: wallet.accountId }
        });
  
        setUserData(getUserResponse);
        
      } catch (error) {
        console.error("Error fetching data:");
      }
    };

    const change_role = async(camp) =>{
      await fetchData();
      const deposit = camp?.fund+'00000000000000000000000'

      await wallet.callMethod({contractId:"dev-1690642410974-51262377694618", method: "apply_collector_in_camp",deposit: deposit,args: {camp_id: camp?.id} })
    }
    

      return (
        <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-9/12 my-8">
          <div className="flex flex-col justify-between px-16 space-y-8">
            {initCampaigns.slice(0, maxDisplayedCampaigns).map(campaign => (
              <div key={campaign.id} className="flex flex-row border border-2 rounded-xl border-[#59ec7a] justify-center items-center">
                <div className="flex justify-center items-center  w-2/5">
                  <Image
                    src={ isValidUrl(campaign.meta_data.image) ? campaign.meta_data.image : bg}
                    alt={"image"}
                    className="w-1/2 h-1/2 rounded-lg p-4"
                    width={400} 
                    height={200}
                    >
                  </Image>
                </div>
                
                <div className="flex flex-col w-1/5 ">
                  <p className={clsx("text-4xl tracking-wide font-bold", amatic_SC.className)} >{campaign?.meta_data.title}</p>
                  <div className="flex flex-row">
                  <p className="text-lg">Pool: {campaign?.fund}               
                  </p>
                  <Image src={coin} alt={"coin"}></Image>

                  </div>
                  
                </div>
                <div className="flex w-2/5 justify-center items-center">
                {/* <Button href={"/"} classes={"text-white bg-[#174931] rounded-md text-2xl"} content={"Aply collector"}></Button>   */}
                  <button      
                    onClick={() =>{ change_role(campaign)}}
                    className="text-white bg-[#50bb25] rounded-md text-2xl px-4 py-2"
                  >
                    Apply collector
                  </button>
                </div>
                
              </div>
            ))}
          </div>
            
        </div>
            
      )
    }

  const TableSection = () => {
    return (
        <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12 my-8">
          <div >
              <p className="text-3xl tracking-wide font-bold">
              Recycle
              </p>
          </div>
            <table className="table-auto w-full text-left text-xl ">
              <thead>
                  <tr>
                      <th className=" ">No</th>
                      <th className=" ">Item List</th>
                      <th className=" ">Open Price</th>
                      <th className=" ">Your Offer</th>
                      <th className=" ">Recent Offer</th>
                      <th className=" ">Time left</th>
                  </tr>
              </thead>
              <tbody>
                  <tr >
                      <td>1</td>
                      <td className=" "> 
                        <div className="flex flex-row">
                            <Image
                              src={bg}
                              alt={"image"}
                              className="rounded-full h-8 w-14"
                            ></Image>
                            Item List
                        </div>
                      </td>
                      <td className=" ">Item List</td>
                      <td className=" ">Item List</td>
                      <td className=" ">Item List</td>
                      <td className=" ">Item List</td>
                  </tr>
                  <tr >
                      <td>2</td>
                      <td className=" "> 
                        <div className="flex flex-row">
                            <Image
                              src={bg}
                              alt={"image"}
                              className="rounded-full h-8 w-14"
                            ></Image>
                            Item List
                        </div>
                      </td>
                      <td className=" ">Item List</td>
                      <td className=" ">Item List</td>
                      <td className=" ">Item List</td>
                      <td className=" ">Item List</td>
                  </tr>
                  <tr >
                      <td>3</td>
                      <td className=" "> 
                        <div className="flex flex-row">
                            <Image
                              src={bg}
                              alt={"image"}
                              className="rounded-full h-8 w-14"
                            ></Image>
                            Item List
                        </div>
                      </td>
                      <td className=" ">Item List</td>
                      <td className=" ">Item List</td>
                      <td className=" ">Item List</td>
                      <td className=" ">Item List</td>
                  </tr>
              </tbody>
            </table>
        
      </div>
          
    )
  }

  const TopSection = () => {
    return (
      <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12 my-8">
        <div className="flex flex-row">
          <div className="text-[#0b3d16] whitespace-nowrap">
              <p className="text-4xl tracking-wide font-bold my-4">
              Top Collector
              </p>
              <p className="text-2xl tracking-wide">
                Checkout Our Top Rated Collector
              </p>
          </div>
          <div className="w-full h-1/2 flex justify-end mt-auto">
            <Button href={"/"} classes={"text-black bg-white rounded-2xl text-xl border border-2 border-black"} content={"View Rankings"} icon={<BiRocket/>}></Button>  
          </div>
        </div>
          
  
          <div className="grid grid-cols-4 gap-8 mx-28 my-8">
            <div>
              <UserCard
                src={avatar} alt="Image 65" title={"@better step"} 
                description={"34.53 ETH"} />
            </div>
            <div>
              <UserCard
                src={avatar} alt="Image 65" title={"@better step"} 
                description={"34.53 ETH"} />
            </div>
            <div>
              <UserCard
                src={avatar} alt="Image 65" title={"@better step"} 
                description={"34.53 ETH"} />
            </div>
            <div>
              <UserCard
                src={avatar} alt="Image 65" title={"@better step"} 
                description={"34.53 ETH"} />
            </div>
            <div>
              <UserCard
                src={avatar} alt="Image 65" title={"@better step"} 
                description={"34.53 ETH"} />
            </div>
            <div>
              <UserCard
                src={avatar} alt="Image 65" title={"@better step"} 
                description={"34.53 ETH"} />
            </div>
            <div>
              <UserCard
                src={avatar} alt="Image 65" title={"@better step"} 
                description={"34.53 ETH"} />
            </div>
            <div>
              <UserCard
                src={avatar} alt="Image 65" title={"@better step"} 
                description={"34.53 ETH"} />
            </div>
          </div>
      </div>
          
    )
  }

export default function Home() {
  const wallet = useAppSelector(selectWallet);
  const [campaignData, setCampaignData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("campaignData");
    if (savedData!="undefined"&&savedData) {
      setCampaignData(JSON.parse(savedData));
    } else {
      get_campaigns();
    }
    window.addEventListener('beforeunload', handlePageUnload);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handlePageUnload);
    };
  }, []);
  
const handlePageUnload = () => {
    // Clear the data from localStorage when the page is reloaded
    get_campaigns();
  };

  const get_campaigns = async () => {
    const data = await wallet?.viewMethod({
      contractId: "dev-1690642410974-51262377694618",
      method: "get_all_campaigns"
    });
    localStorage.setItem("campaignData", JSON.stringify(data));
    setCampaignData(data);
  };
  const [activeTab, setActiveTab] = useState('User');

  const change =()=>{
    const savedData = localStorage.getItem("userData");
    
    const data = JSON.parse(savedData);
    if(data.role!="Collector")
    {
      wallet.callMethod({contractId:"dev-1690642410974-51262377694618", method: "new_collector" })
    }
  }

  const handleTabClick = (tabLabel) => {
    if(tabLabel=="Collector")
    {change();}
    setActiveTab(tabLabel);

  };

  return (
    <main>
      <div className={clsx("flex flex-col", play.className)}>
        <SearchSection/>
        <CampaignSection campaignData={campaignData}/>
        <div className="flex flex-row  justify-center">
          <div className="flex space-x-4 justify-center p-3 border border-2 rounded-lg">
            <Tab label="User" activeTab={activeTab} onClick={handleTabClick} 
            className={` border ${activeTab === "User" ? "border-[#174931]" : "border-white"} px-4 py-2 rounded-md text-2xl ${activeTab === "User" ? "bg-[#174931] text-white" : "text-[#174931]"} `}
            />
            <Tab label="Collector" activeTab={activeTab} onClick= {handleTabClick}
            className={` border ${activeTab === "Collector" ? "border-[#174931]" : "border-white"} px-4 py-2 rounded-md text-2xl ${activeTab === "Collector" ? "bg-[#174931] text-white" : "text-[#174931]"} `}

            />
          </div>
          
        </div>
        <div>
          <TabContent label="User" activeTab={activeTab}>
            {/* User Section */}
            <VolunteSection campaignData={campaignData}/>
            <NewsSection campaignData={campaignData}/>
          </TabContent>
          <TabContent label="Collector" activeTab={activeTab}>
            {/* Collector Section */}
            <CollectorSection campaignData={campaignData}/>
          </TabContent>          
        </div>
        
        
        
        <TableSection/>   
        <TopSection/>

      </div>
    </main>
  );
}
