"use client";
import React from 'react';
import { IoIosHome } from "react-icons/io";
import { FaUserTie } from "react-icons/fa";
import { MdOutlineReportProblem } from "react-icons/md";
import { MdOutlineForwardToInbox } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLocalShipping } from 'react-icons/md';
import { useUserStore } from '../app/component/zustand';
import axios from 'axios';
import { Building2, MapPin, Mail, Calendar, Crown, Truck, Users, Package, Clock, Star, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useRouter } from 'next/navigation';

export interface CompanyData {
    id: string;
    name: string;
    address: string;
    adminEmail: string;
    averageDeliveryTime: string | null;
    createdAt: string;
    customerSatisfaction: string | null;
    driversOwned: number;
    pendingDeliveries: number;
    premium: boolean;
    totalDeliveries: number;
    type: string;
    uniqueClients: number;
    vehiclesOwned: number;
}

const CompanyDashBoard = () => {
    const [active, setActive] = React.useState("");
    const [newCompany, setNewCompany] = React.useState(false);
    const token = useUserStore((state) => state.token);
    const [companyData, setCompanyData] = React.useState<CompanyData | null>(null);
    const router = useRouter();

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

    React.useEffect(() => {
        const getMyCompany = async (token: string) => {
            try {
                if (!token) {
                    return;
                }

                const response = await axios.get("http://localhost:8080/company/myCompany", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log("Company Data:", response.data);
                return response.data;

            } catch (error) {
                console.error("Failed to fetch companyData?:", error);
                throw error;
            }
        };

        getMyCompany(token).then((data) => {
            setCompanyData(data);
        });

        if (companyData?.name == null) {
            setNewCompany(true);

        }
    }, [token]);

    // Enhanced UI Components
    const InfoItem = ({ icon: Icon, label, value, highlight = false }: {
        icon: React.ComponentType<any>,
        label: string,
        value: string | number | null,
        highlight?: boolean
    }) => (
        <div className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 ${highlight ? 'bg-blue-50 border border-blue-100' : ''}`}>
            <div className={`p-2 rounded-lg ${highlight ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                <Icon size={16} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
                <p className={`text-sm font-semibold ${highlight ? 'text-blue-700' : 'text-gray-900'} break-words`}>{value || "N/A"}</p>
            </div>
        </div>
    );

    const StatItem = ({ icon: Icon, label, value, color = "gray" }: {
        icon: React.ComponentType<any>,
        label: string,
        value: string | number,
        color?: string
    }) => {
        const colors: Record<string, string> = {
            blue: "bg-blue-50 border-blue-100 text-blue-700",
            green: "bg-green-50 border-green-100 text-green-700",
            orange: "bg-orange-50 border-orange-100 text-orange-700",
            purple: "bg-purple-50 border-purple-100 text-purple-700",
            red: "bg-red-50 border-red-100 text-red-700",
            gray: "bg-gray-50 border-gray-100 text-gray-700"
        };

        return (
            <div className={`p-4 rounded-xl border ${colors[color]} transition-all duration-200 hover:shadow-md hover:scale-105`}>
                <div className="flex items-center justify-between mb-2">
                    <Icon size={20} className="opacity-80" />
                    <span className="text-xs font-medium opacity-75 uppercase tracking-wide">{label}</span>
                </div>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        );
    };

    return (
        <div className='flex flex-row min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
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

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className='flex flex-row justify-between'>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Company Dashboard</h2>
                        <p className="text-gray-600">Overview of your company&apos;s information and operational metrics</p>
                    </div>
                    <div className='mt-4'>
                        {
                            newCompany ? (
                                <Button className='p-4 py-6 cursor-pointer' onClick={() => router.push("/registercompany")}>New Company</Button>
                            ) : (
                                <></>

                            )

                        }

                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Basic Information Card */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <Building2 className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Basic Information</h3>
                                    <p className="text-blue-100 text-sm">Company details and profile</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-2">
                            <InfoItem
                                icon={Building2}
                                label="Company Name"
                                value={companyData?.name || "Unknown"}
                                highlight={true}
                            />
                            <InfoItem
                                icon={TrendingUp}
                                label="Business Type"
                                value={companyData?.type || "Unknown"}
                            />
                            <InfoItem
                                icon={MapPin}
                                label="Address"
                                value={companyData?.address || "Unknown"}
                            />
                            <InfoItem
                                icon={Mail}
                                label="Admin Email"
                                value={companyData?.adminEmail || "Unknown"}
                            />
                            <InfoItem
                                icon={Calendar}
                                label="Established"
                                value={companyData?.createdAt || "Unknown"}
                            />
                            <InfoItem
                                icon={Crown}
                                label="Premium Status"
                                value={
                                    companyData?.premium === true
                                        ? "Active Premium"
                                        : companyData?.premium === false
                                            ? "Standard Plan"
                                            : "Unknown"
                                }
                                highlight={companyData?.premium === true}
                            />
                        </div>

                    </div>

                
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <TrendingUp className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Operational Stats</h3>
                                    <p className="text-green-100 text-sm">Key performance metrics</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <StatItem
                                    icon={Truck}
                                    label="Vehicles"
                                    value={companyData?.vehiclesOwned || 0}
                                    color="blue"
                                />
                                <StatItem
                                    icon={Users}
                                    label="Drivers"
                                    value={companyData?.driversOwned || 0}
                                    color="green"
                                />
                                <StatItem
                                    icon={Package}
                                    label="Total Deliveries"
                                    value={companyData?.totalDeliveries?.toLocaleString() || 0}
                                    color="purple"
                                />
                                <StatItem
                                    icon={Clock}
                                    label="Pending"
                                    value={companyData?.pendingDeliveries || 0}
                                    color="orange"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-600">Unique Clients</span>
                                        <Users size={16} className="text-blue-600" />
                                    </div>
                                    <p className="text-2xl font-bold text-blue-700">{companyData?.uniqueClients || "N/A"}</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Avg Delivery Time</span>
                                            <Clock size={14} className="text-green-600" />
                                        </div>
                                        <p className="text-lg font-bold text-green-700">{companyData?.averageDeliveryTime || "N/A"}</p>
                                    </div>

                                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Satisfaction</span>
                                            <Star size={14} className="text-yellow-600" />
                                        </div>
                                        <p className="text-lg font-bold text-yellow-700">{companyData?.customerSatisfaction || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        
                <div className="mt-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h4 className="text-lg font-semibold mb-1">Dashboard Overview</h4>
                            <p className="text-white/90 text-sm">Real-time insights into your company&apos;s performance and operations</p>
                        </div>
                        <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">Live Data</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyDashBoard;