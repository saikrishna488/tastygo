"use client"
import { userAtom } from "@/states/global_states"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { FaUtensils, FaClipboardList, FaBoxOpen, FaMoneyBillWaveAlt, FaChartBar } from "react-icons/fa"

const dashboardCards = [
  {
    icon: <FaUtensils className="text-3xl text-white" />,
    title: "Restaurant",
    desc: "View and edit your restaurant info",
    bg: "bg-red-600",
    path : '/restaurant'
  },
  {
    icon: <FaBoxOpen className="text-3xl text-white" />,
    title: "Items",
    desc: "Manage your menu items",
    bg: "bg-red-500",
    path : '/items'
  },
  {
    icon: <FaClipboardList className="text-3xl text-white" />,
    title: "Orders",
    desc: "Track and view customer orders",
    bg: "bg-red-400",
    path : '/orders'
  },
  {
    icon: <FaMoneyBillWaveAlt className="text-3xl text-white" />,
    title: "Earnings",
    desc: "Check your revenue reports",
    bg: "bg-red-500",
    path : '/earnings'
  },
  {
    icon: <FaChartBar className="text-3xl text-white" />,
    title: "Analytics",
    desc: "Analyze sales & customer data",
    bg: "bg-red-700",
    path : '/analytics'
  },
]

const Dashboard = () => {

  const router = useRouter()
  const [user] = useAtom(userAtom)


  if(!user?.name){
    return null
  }
  
  return (
    <section className="py-10 px-4 sm:px-6 md:px-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-8">Partner Dashboard</h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition border p-5 flex flex-col justify-between"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 flex items-center justify-center rounded-full ${card.bg}`}>
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.desc}</p>
                </div>
              </div>
              <button onClick={()=>router.push("/partners"+card.path)} className="mt-auto text-red-600 hover:text-red-800 text-sm font-medium underline">
                Go to {card.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Dashboard;
