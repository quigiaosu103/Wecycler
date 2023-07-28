"use client"

import { useAppSelector } from "@/context/store";
import { selectWallet } from "@/features/walletSlice";
import { useState, useEffect } from "react";
import clsx from "clsx";

const initState = {
  account_balance: 100,
  fund: 0,
  title: "",
  content: "",
  image: "123",
  amount: 0,
  init_time:  "",
  deadline: ""
}

const page = () => {

  const [state, setState] = useState(initState)
  const [isSuccess, setIsSuccess] = useState(false)
  const wallet = useAppSelector(selectWallet);
  const isWalletConnected = !!wallet?.accountId;

  if(!isWalletConnected){
    if (!wallet)
      return {
        title: "Wallet not initialized",
        description: "Please try again later",
        status: "error",
      };

    if (wallet.accountId) {
      return {
        title: "Wallet already connected",
        status: "info",
      };
    }

    wallet.signIn();
  }

  function handleChange({target}){
    console.log(state)
    setState((prev) => ({
      ...prev,
      [target.getAttribute("name")]: target.value
    }))
  }

  async function createCampaign(e){
    e.preventDefault()
    if(isWalletConnected){
      await wallet.callMethod({contractId: 'dev-1690561706410-52327007706627', deposit: "1000000000000000000000000", method: 'new_campaign', state})
    }

  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const txhash = urlParams.get("transactionHashes")

    setIsSuccess(!!txhash)
  }, [])

  return (isSuccess ?
    (<div>Thành công!!!!!</div>
    ) : (
      <div className=" max-w-[1440px] mx-auto lg:w-10/12 pt-28">
          <form action="" className="flex flex-col">
              <span>Campain Title</span>
              <input name="title" type="text" placeholder='Enter the title of campaign' onChange={handleChange} value={state.title}/>
              <span>Description</span>
              <input name="content" type="text" placeholder='Enter the description about the program ' onChange={handleChange} value={state.content}/>
              <span>Goal amount</span>
              <input name="amount" type="number" placeholder='Enter a number' onChange={handleChange} value={state.amount}/>
              <span>Tokens amount</span>
              <input name="fund" type="number" placeholder='' onChange={handleChange} value={state.fund}/>
              <span>Start day</span>
              <input name="init_time" type="date" placeholder='' onChange={handleChange} value={state.init_time}/>
              <span>End date</span>
              <input name="deadline" type="date" placeholder='' onChange={handleChange} value={state.deadline}/>
              <button className="bg-lime-500">Add collector</button>
              <button onClick={createCampaign}>Create Campaign</button>
          </form>
      </div>
    )
  )
}

export default page
