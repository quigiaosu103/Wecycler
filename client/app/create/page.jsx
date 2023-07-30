"use client"

import { useAppSelector } from "@/context/store";
import { selectWallet } from "@/features/walletSlice";
import { useState, useEffect, memo } from "react";
import clsx from "clsx";

const initState = {
  account_balance: 100,
  fund: 0,
  title: "",
  content: "",
  image: "123",
  amount: 0,
  init_time:  "",
  deadline: "",
}

const page = () => {

  const [state, setState] = useState(initState)
  const [isSuccess, setIsSuccess] = useState(false)
  const wallet = useAppSelector(selectWallet);
  const isWalletConnected = !!wallet?.accountId;

  function handleChange({target}){
    console.log(state)
    setState((prev) => ({
      ...prev,
      [target.getAttribute("name")]: target.value
    }))
  }

  async function createCampaign(e){
    e.preventDefault()
    const args = {...state, fund: Number(state.fund), amount: Number(state.amount), deadline: new Date(state.deadline).getTime(), init_time: new Date(state.init_time).getTime()}
    if(isWalletConnected){
      const data = await wallet.viewMethod({contractId: "dev-1690642410974-51262377694618", method: 'get_all_campaigns' })
      console.log(data)
    }

  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const txhash = urlParams.get("transactionHashes")

    setIsSuccess(!!txhash)
    if(txhash) alert("thành công!!!!")
  }, [])

  return <>
    {isSuccess ?
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
    )}
  </>
}

export default memo(page)
