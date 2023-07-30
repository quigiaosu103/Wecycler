"use client";

import Image from "next/image";
import { useFormik } from "formik";
import { Amatic_SC } from "next/font/google";
import * as Yup from "yup";
import fromImageRight from "/public/images/formImageRight.svg";
import fromImageLeft from "/public/images/formImageLeft.svg";
import fromImageLeft2 from "/public/images/formImageLeft2.svg";
import fromImageLeft3 from "/public/images/formImageLeft3.svg";
import completeImg from "/public/images/completeImg.svg";
import userImg from "/public/images/userImg.svg";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { useAppSelector } from "@/context/store";
import { selectWallet } from "@/features/walletSlice";
import { useEffect, useState } from "react";
import clsx from "clsx";
import {supabase} from "@/libs/supabase"

const amatic_SC = Amatic_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {

  const wallet = useAppSelector(selectWallet);
  const isWalletConnected = !!wallet?.accountId;
  const [isInsertImage, setIsInsertImage] = useState({state: false, file: null, fileURL: ""})
  const [isSuccess, setIsSuccess] = useState(false)

  const fileChangeHandle = (e) =>{
    const file = e.target.files[0]

    if(file){
      setIsInsertImage((prev) => ({...prev, file: file, fileURL: URL.createObjectURL(file)}))
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const txhash = urlParams.get("transactionHashes")

    if(txhash) setIsSuccess(true)
  }, [])

  const formik = useFormik({
    initialValues: {
      id: "",
      title: "",
      content: "",
      amount: 0,
      fund: 0,
      image: "",
      total_checkers: 0,
      init_time: "",
      deadline: "",
      location: "",
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required"),
      amount: Yup.number().required("Goal amount is required"),
      fund: Yup.number().required("Token amount is required"),
      init_time: Yup.date().required("Start date is required"),
      deadline: Yup.date().required("End date is required"),
    }),

  });

  const handleSubmit = async () => {

    const id = wallet.accountId + new Date().getTime();
    const typeFile = isInsertImage.file.type.split('/')[1]

    const { data, error } = await supabase
      .storage
      .from('Wecycler')
      .upload(`imgs/${id}.${typeFile}`, isInsertImage.file)

    const peposit = formik.values.fund + '000000000000000000000000'
    const args = {
      ...formik.values,
      id,
      fund: Number(formik.values.fund),
      amount: Number(formik.values.amount),
      total_checkers: Number(formik.values.total_checkers),
      init_time: Number(new Date(formik.values.init_time)),
      deadline: Number(new Date(formik.values.deadline)),
      image: "https://dvxchmddbtezvuifpjol.supabase.co/storage/v1/object/public/Wecycler/imgs/" + id + "." + typeFile
    }

    const response = await wallet.callMethod({contractId: "dev-1690642410974-51262377694618", method: 'new_campaign', deposit: peposit, args: args })
  }

  return (
    <div>
      <main className="items-center flex justify-center">
        <Image src={isSuccess ? fromImageLeft3 : (isInsertImage.state ? fromImageLeft2 : fromImageLeft)} alt={"..."} />

        {isSuccess ? (
          <div className={clsx("flex text-gray-700 py-24 px-32 flex-col items-center space-y-5 justify-center h-screen w-full")}>

            <div className="px-10 py-2 bg-[#FFE500] rounded-full border border-black font-semibold text-2xl">COMPLETE!</div>

            <Image
              src={completeImg}
              width={250}
              height={250}
            />

            <div className="flex flex-row">
              <Image src={userImg} alt="..." />
              <div className="flex flex-col ms-5 justify-center">
                <h1 className={clsx("font-bold text-5xl", amatic_SC.className)}>
                  BÁO QUÍ
                </h1>
                <p className={clsx("text-3xl", amatic_SC.className )}>
                  ACCOUNT: @{wallet?.accountId}
                </p>
              </div>
            </div>

            <button
              onClick={console.log("ok")}
              type="button"
              className="font-latoBold border-2 border-black text-black text-lg px-3 py-1 rounded-lg text-lg"
            >
              Return Home
            </button>
          </div>
        ) : (
          <div className={clsx("flex-1 text-gray-700 py-24 px-32 overflow-scroll h-screen")}>
            <div className={clsx(isInsertImage.state && "hidden")}>
              <div className="flex flex-row">
                <Image src={userImg} alt="..." />
                <div className="flex flex-col ms-5 justify-center">
                  <h1 className={clsx("font-bold text-5xl", amatic_SC.className)}>
                    BÁO QUÍ
                  </h1>
                  <p className={clsx("text-3xl", amatic_SC.className )}>
                    ACCOUNT: @{wallet?.accountId}
                  </p>
                </div>
              </div>

              <form
                className="bg-white flex rounded-lg w-full"
              >
                <div className="mt-6 w-full">
                  {/* Name input field */}
                  <div className="pb-4">
                    <label
                      htmlFor="name"
                      className={`block font-latoBold text-sm pb-2 ${
                        formik.touched.title && formik.errors.title
                          ? "text-red-400"
                          : ""
                      } `}
                    >
                      {formik.touched.title && formik.errors.title
                        ? formik.errors.title
                        : "Campaign Title"}
                    </label>
                    <p className="text-sm font-latoBold text-red-400 "></p>
                    <input
                      className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500 "
                      type="text"
                      name="title"
                      placeholder="Enter title of the campaign"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  {/* Desciption input field */}
                  <div className="pb-4">
                    <label
                      htmlFor="description"
                      className={`block font-latoBold text-sm pb-2 ${
                        formik.touched.content && formik.errors.content
                          ? "text-red-400"
                          : ""
                      } `}
                    >
                      {formik.touched.content && formik.errors.content
                        ? formik.errors.content
                        : "Desciption"}
                    </label>
                    <p className="text-sm font-latoBold text-red-400 "></p>
                    <textarea
                      className="border-2 border-gray-500 p-2 rounded-md w-full h-28 focus:border-teal-500 focus:ring-teal-500"
                      name="content"
                      placeholder="Enter short descriptions about idea of startup"
                      onChange={formik.handleChange}
                      value={formik.values.content}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  <div className="flex flex-row w-full space-x-3">
                    {/* Goal Amount input field */}
                    <div className="pb-4 w-1/2">
                      <label
                        htmlFor="goalAmount"
                        className={`block font-latoBold text-sm pb-2 ${
                          formik.touched.amount && formik.errors.amount
                            ? "text-red-400"
                            : ""
                        } `}
                      >
                        {formik.touched.amount && formik.errors.amount
                          ? formik.errors.amount
                          : "Goal Amount"}
                      </label>
                      <p className="text-sm font-latoBold text-red-400 "></p>
                      <input
                        className="border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:ring-teal-500 w-full"
                        type="number"
                        name="amount"
                        onChange={formik.handleChange}
                        value={formik.values.amount}
                        onBlur={formik.handleBlur}
                      />
                    </div>

                    <div className="pb-4 w-1/2">
                      <label
                        htmlFor="fund"
                        className={`block font-latoBold text-sm pb-2 ${
                          formik.touched.fund && formik.errors.fund
                            ? "text-red-400"
                            : ""
                        } `}
                      >
                        {formik.touched.fund && formik.errors.fund
                          ? formik.errors.fund
                          : "Token Amount"}
                      </label>
                      <p className="text-sm font-latoBold text-red-400 "></p>
                      <input
                        className="border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:ring-teal-500 w-full"
                        type="number"
                        name="fund"
                        onChange={formik.handleChange}
                        value={formik.values.fund}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>

                  <div className="flex flex-row space-x-3">
                    <div className="pb-4 w-1/2">
                      <label
                        htmlFor="startDate"
                        className={`block font-latoBold text-sm pb-2 ${
                          formik.touched.init_time && formik.errors.init_time
                            ? "text-red-400"
                            : ""
                        } `}
                      >
                        {formik.touched.init_time && formik.errors.init_time
                          ? formik.errors.init_time
                          : "Start Date"}
                      </label>
                      <p className="text-sm font-latoBold text-red-400 "></p>
                      <input
                        className="border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:ring-teal-500 w-full"
                        type="date"
                        name="init_time"
                        onChange={formik.handleChange}
                        value={formik.values.init_time}
                        onBlur={formik.handleBlur}
                      />
                    </div>

                    <div className="pb-4 w-1/2">
                      <label
                        htmlFor="endDate"
                        className={`block font-latoBold text-sm pb-2 ${
                          formik.touched.deadline && formik.errors.deadline
                            ? "text-red-400"
                            : ""
                        } `}
                      >
                        {formik.touched.deadline && formik.errors.deadline
                          ? formik.errors.deadline
                          : "End Date"}
                      </label>
                      <p className="text-sm font-latoBold text-red-400 "></p>
                      <input
                        className="border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:ring-teal-500 w-full"
                        type="date"
                        name="deadline"
                        onChange={formik.handleChange}
                        value={formik.values.deadline}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>

                  <div className="pb-4">
                    <label
                      htmlFor="location"
                      className={`block font-latoBold text-sm pb-2 ${
                        formik.touched.location && formik.errors.location
                          ? "text-red-400"
                          : ""
                      } `}
                    >
                      {formik.touched.location && formik.errors.location
                        ? formik.errors.location
                        : "Location"}
                    </label>
                    <p className="text-sm font-latoBold text-red-400 "></p>
                    <input
                      className="border-2 border-gray-500 p-2 rounded-md  w-full focus:border-teal-500 focus:ring-teal-500 "
                      type="text"
                      name="location"
                      onChange={formik.handleChange}
                      value={formik.values.location}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  <div className="pb-4">
                    <label
                      htmlFor="total_checkers"
                      className={`block font-latoBold text-sm pb-2 ${
                        formik.touched.total_checkers && formik.errors.total_checkers
                          ? "text-red-400"
                          : ""
                      } `}
                    >
                      {formik.touched.total_checkers && formik.errors.total_checkers
                        ? formik.errors.total_checkers
                        : "Total checker"}
                    </label>
                    <p className="text-sm font-latoBold text-red-400 "></p>
                    <input
                      className="border-2 border-gray-500 p-2 rounded-md  w-full focus:border-teal-500 focus:ring-teal-500 "
                      type="number"
                      name="total_checkers"
                      onChange={formik.handleChange}
                      value={formik.values.total_checkers}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {/* button submit */}
                  <div className="w-full flex justify-center mt-6">
                    <button
                      type="button"
                      onClick={() => {setIsInsertImage(prev => ({...prev, state: true}))}}
                      className="bg-[#FFE500] font-latoBold border-2 border-black text-black text-3xl p-3 rounded-full"
                    >
                      <BiChevronRight/>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className={clsx("h-full flex flex-col justify-center space-y-10", !isInsertImage.state && "hidden")}>
              <div className="w-full flex justify-center flex-col items-center space-y-5">
                <button
                  type="submit"
                  onClick={() => {setIsInsertImage(prev => ({...prev, state: false}))}}
                  className="font-latoBold border-2 border-black text-black text-3xl p-3 rounded-full"
                >
                  <BiChevronLeft/>
                </button>

                {isInsertImage.file == null ? 
                (
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input onChange={fileChangeHandle} id="dropzone-file" type="file" className="hidden" />
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                  <Image
                    src={isInsertImage.fileURL}
                    alt="..."
                    width={1500}
                    height={1500}
                    className="w-full h-full border-2 rounded-lg"
                  />
                  </div>
                )}
                
              </div>
              <div className="flex justify-center w-full">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="font-latoBold border-2 bg-[#FFE500] border-black text-black text-lg px-3 py-1 rounded-lg"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        <Image src={fromImageRight} alt={"..."} sizes="" />
      </main>
    </div>
  );
}
