import { Search } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-20 relative w-full h-[300px] md:h-[400px] lg:h-[400px] flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-400">
      {/* Overlay Content */}
      <div className="relative text-center text-white z-10 px-4 md:px-8">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Savor Every Bite, Delivered Right!
        </h1>
        <p className="text-base md:text-lg mt-3">
          Discover the best restaurants near you.
        </p>

        {/* Search Bar */}
        <div className="mt-6 flex items-center justify-center w-full">
          <div className="bg-white text-gray-900 flex items-center px-2 py-2 rounded-full shadow-md w-[90%] max-w-[450px]">
            <Search className="text-gray-500 mr-2" size={20} />
            <input
              type="text"
              placeholder="Search restaurants or dishes..."
              className="outline-none bg-transparent w-full text-sm md:text-base"
            />
            <button className="bg-red-500 text-white px-4 py-2 rounded-full ml-2 hover:bg-red-600 text-sm md:text-base">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
