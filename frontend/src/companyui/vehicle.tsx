// "use client";
// import React from 'react';
// import { IoIosHome } from "react-icons/io";
// import { FaUserTie } from "react-icons/fa";
// import { MdOutlineReportProblem } from "react-icons/md";
// import { MdOutlineForwardToInbox } from "react-icons/md";
// import { FaTruck } from "react-icons/fa";
// import { IoSettingsSharp } from "react-icons/io5";
// import { VehiclesSpecs } from '@/app/component/Vehicles';
// import VehicleRegistrationForm from '@/app/component/VehicleForm';
// import { useRegistration } from '@/app/component/VehicleContext';
// import { MdLocalShipping } from 'react-icons/md';

// const VehicleDashBoard = () => {
//     const { setShowRegistrationForm, showRegistrationForm } = useRegistration();
//     const [active, setActive] = React.useState("vehicle");
//     const divRef = React.useRef<HTMLDivElement>(null);

//     React.useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (
//                 divRef.current &&
//                 !divRef.current.contains(event.target as Node)
//             ) {
//                 setShowRegistrationForm(false); // hide the form when clicking outside
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);

//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     });



//     const tabs = [
//         {
//             label: "Dashboard",
//             key: "",
//             icon: <IoIosHome size={30} fill={active === "" ? "#27BBF5" : "grey"} />,
//         },
//         {
//             label: "Drivers",
//             key: "drivers",
//             icon: <FaUserTie size={30} color={active === "drivers" ? "#27BBF5" : "grey"} />,
//         },
//         {
//             label: "Delivery",
//             key: "delivery",
//             icon: <MdLocalShipping size={30} color={active === "delivery" ? "#27BBF5" : "grey"} />,
//         },
//         {
//             label: "Report",
//             key: "report",
//             icon: <MdOutlineReportProblem size={30} color={active === "report" ? "#27BBF5" : "grey"} />,
//         },
//         {
//             label: "Tracking",
//             key: "tracking",
//             icon: <MdOutlineForwardToInbox size={30} color={active === "tracking" ? "#27BBF5" : "grey"} />,
//         },
//         {
//             label: "Vehicle",
//             key: "vehicle",
//             icon: <FaTruck size={30} color={active === "vehicle" ? "#27BBF5" : "grey"} />,
//         },
//         {
//             label: "Settings",
//             key: "settings",
//             icon: <IoSettingsSharp size={30} color={active === "settings" ? "#27BBF5" : "grey"} />,
//         },
//     ];
//     const handleActivity = (key: string, route: string) => {
//         setActive(key);
//         if (route) {
//             window.location.href = route;
//         }

//     }


//     return (
//         <div className='flex flex-row gap-4 w-full'>
//      <div className="p-4 w-full max-w-[300px] hidden md:inline-block lg:max-w-[400px] border-r border-gray-300 bg-white shadow-sm">
//     <h1 className="text-3xl font-handwriting font-extrabold text-blue-700 cursor-pointer" onClick={() => handleActivity("drivers", "/")}>FleetOps</h1>

//     <div className="mt-6">
//       <h2 className="text-lg font-semibold text-gray-700 mb-4">Menu</h2>

//       <div className="flex flex-col gap-3">
//         {tabs.map((tab, index) => (
//           <div
//             key={index}
//             onClick={() => handleActivity(tab.key, `/companydashboard/${tab.key}`)}
//             className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 cursor-pointer ${active === tab.key ? "bg-blue-100" : "hover:bg-gray-100"}`}
//           >
//             {tab.icon}
//             <p className={`font-semibold ${active === tab.key ? "text-blue-600" : "text-gray-600"}`}>
//               {tab.label}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
//             <div>

//                 <VehiclesSpecs />
//             </div>
//             {
//                 showRegistrationForm && <div className='absolute top-6  left-1/2 transform -translate-x-1/2 w-full' ref={divRef}>
//                     <VehicleRegistrationForm />
//                 </div>

//             }


//         </div>
//     )
// }

// export default VehicleDashBoard;
