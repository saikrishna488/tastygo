"use client"
import { userAtom } from '@/states/global_states'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaTruck, FaBullhorn, FaMoneyBillWave, FaGift, FaChartLine } from 'react-icons/fa'

const benefits = [
  {
    icon: <FaMoneyBillWave className="text-white text-2xl" />,
    title: "Tax Benefits",
    desc: "Eligible tax cuts for registered partners with proper documentation."
  },
  {
    icon: <FaGift className="text-white text-2xl" />,
    title: "Partner Bonuses",
    desc: "Earn seasonal and milestone-based bonuses by staying active."
  },
  {
    icon: <FaBullhorn className="text-white text-2xl" />,
    title: "Restaurant Marketing",
    desc: "We promote your restaurant through in-app banners and ads."
  },
  {
    icon: <FaTruck className="text-white text-2xl" />,
    title: "Delivery Services",
    desc: "TastyGo provides affordable delivery agents & logistics."
  },
  {
    icon: <FaChartLine className="text-white text-2xl" />,
    title: "Business Growth",
    desc: "Analytics tools & regular insights to scale up your restaurant."
  },
]

const Hero = () => {

  const router = useRouter()
  const [user, setUser] = useAtom(userAtom)


  if (user.name) {
    return null
  }

  return (
    <section className="bg-red-50 text-gray-800 py-10 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-600 mb-4">
            Grow Your Business with TastyGo
          </h1>
          <p className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto">
            Join our partner network and unlock exclusive benefits designed to help your restaurant thrive in the online delivery space.
          </p>
          <Link href="/partners/register" className="mt-6 inline-block bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base px-6 py-3 rounded-lg font-medium">
            Become a Partner
          </Link>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
              <div className="flex items-center justify-center w-12 h-12 bg-red-600 rounded-full mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold mb-1 text-red-700">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero;
