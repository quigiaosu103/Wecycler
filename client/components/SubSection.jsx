"use client"

const SubSection = () => {
  return (
    <div className="flex flex-col text-black max-w-[1440px] mx-auto lg:w-10/12">
      <div className="topBlock flex flex-row">
        <div className="blockLeft w-1/2">
          <p className="text-7xl font-bold">"Recycling make better us"</p>
        </div>
        <div className="blockRight w-1/2">
          <video controls className="w-full">
            <source src="../public/videos/recycle.mp4" type="video/mp4"/>
          </video>
        </div>
      </div>
    </div>
  )
}

export default SubSection
