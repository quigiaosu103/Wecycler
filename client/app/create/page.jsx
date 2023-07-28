import React from 'react'

const page = () => {
  return (
    <div className=" max-w-[1440px] mx-auto lg:w-10/12 pt-28">
        <form action="" className="flex flex-col">

            <span>Campain Title</span>
            <input type="text" placeholder='Enter the title of campaign' />
            <span>Description</span>
            <input type="text" placeholder='Enter the description about the program ' />
            <span>Goal amount</span>
            <input type="text" placeholder='Enter a number' />
            <span>Tokens amount</span>
            <input type="text" placeholder='' />
            <span>Start day</span>
            <input type="date" placeholder='' />
            <span>End date</span>
            <input type="date" placeholder='' />
            <span>Location</span>
            <input type="text" placeholder='' />
            <span>Description</span>
            <input type="text" placeholder='' />
            <span>Number of collector</span>
            <input type="number" placeholder='' />
            <button>Add collector</button>
            <button>Next</button>
        </form>
    </div>
  )
}

export default page
