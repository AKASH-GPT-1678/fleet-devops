"use client";
import React from 'react'
import { IoIosHome } from "react-icons/io";
import { FaUserTie } from "react-icons/fa";
import { MdOutlineReportProblem } from "react-icons/md";
import { MdOutlineForwardToInbox } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLocalShipping } from 'react-icons/md';

const Report = () => {
  const [active, setActive] = React.useState("report");

  const tabs = [
    {
      label: "Dashboard",
      key: "",
      icon: <IoIosHome size={30} fill={active === "" ? "#27BBF5" : "grey"} />,
    },
    {
      label: "Drivers",
      key: "drivers",
      icon: <FaUserTie size={30} color={active === "drivers" ? "#27BBF5" : "grey"} />,
    },
    {
      label: "Delivery",
      key: "delivery",
      icon: <MdLocalShipping size={30} color={active === "delivery" ? "#27BBF5" : "grey"} />,
    },
    {
      label: "Report",
      key: "report",
      icon: <MdOutlineReportProblem size={30} color={active === "report" ? "#27BBF5" : "grey"} />,
    },
    {
      label: "Tracking",
      key: "tracking",
      icon: <MdOutlineForwardToInbox size={30} color={active === "tracking" ? "#27BBF5" : "grey"} />,
    },
    {
      label: "Vehicle",
      key: "vehicle",
      icon: <FaTruck size={30} color={active === "vehicle" ? "#27BBF5" : "grey"} />,
    },
    {
      label: "Settings",
      key: "settings",
      icon: <IoSettingsSharp size={30} color={active === "settings" ? "#27BBF5" : "grey"} />,
    },
  ];
      const handleActivity = (key: string, route: string) => {
        setActive(key);
        if (route) {
            window.location.href = route;
        }
    };
  return (
    <div className='flex flex-row w-full'>

      <div className="p-4 w-full max-w-[300px] hidden md:inline-block lg:max-w-[400px] border-r border-gray-300 bg-white shadow-sm">
    <h1 className="text-3xl font-handwriting font-extrabold text-blue-700 cursor-pointer" onClick={() => handleActivity("drivers", "/")}>FleetOps</h1>

    <div className="mt-6">
    
      <div className="flex flex-col gap-3">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => handleActivity(tab.key, `/companydashboard/${tab.key}`)}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 cursor-pointer ${active === tab.key ? "bg-blue-100" : "hover:bg-gray-100"}`}
          >
            {tab.icon}
            <p className={`font-semibold ${active === tab.key ? "text-blue-600" : "text-gray-600"}`}>
              {tab.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
    </div>
  )
}

export default Report;
