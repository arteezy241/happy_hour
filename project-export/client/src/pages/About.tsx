import { MapPin, Clock, ExternalLink, Map, Navigation } from "lucide-react";

export default function About() {
  const mapLink = "https://www.google.com/maps/place/Dasmari%C3%B1as+City,+Cavite"; // Placeholder Link
  const wazeLink = "https://www.waze.com/live-map/directions?lat=14.3734&lon=120.9328"; // Placeholder Link

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-['Playfair_Display'] text-4xl font-bold mb-8 text-center dark:text-white border-b pb-4 dark:border-gray-800">
          Our Story
        </h1>

        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
            {/* LOCATION IMAGE OF HAPPY HOUR - Placeholder */}
            <div className="w-full h-96 mb-6 overflow-hidden rounded-xl">
            <img
                // Assuming your file is named 'store_location.jpg' and is in the public folder.
                src="/store_location.png"
                alt="Happy Hour Liquors Store Location"
                className="w-full h-full object-cover" 
            />
        </div>
            
            <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-4 dark:text-white">
              Happy Hour Liquors: Quality Beverages, Effortless Shopping.
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We specialize in providing a meticulously curated selection of the best wines, spirits, and beers available, all in one easy-to-navigate location.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our team focuses on quality over quantity, ensuring every bottle on our shelf delivers on taste and value. Whether you’re stocking your home bar, searching for a gift, or just need a cold beer after work, we make your shopping experience simple, reliable, and enjoyable.
            </p>
            <p className="font-['Playfair_Display'] text-xl font-bold text-[#333333] dark:text-white">
              Great Drinks Start Here.
            </p>
          </div>

          {/* Location & Hours Section */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white flex items-center gap-2">
                <MapPin size={24} /> Find Us
              </h3>
              <div className="space-y-4">
    <a href={wazeLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
        {/* WAZE ICON: Using Navigation for directions */}
        <Navigation size={22} className="text-green-600 dark:text-green-400" /> 
        <span className="font-['Poppins']">Waze: Happy Hour Liquors</span>
        <ExternalLink size={18} />
    </a>
    <a href={mapLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
        {/* GOOGLE MAPS ICON: Using Map for mapping service */}
        <Map size={22} className="text-blue-600 dark:text-blue-400" />
        <span className="font-['Poppins']">Google Maps: Happy Hour Liquors</span>
        <ExternalLink size={18} />
    </a>
    <p className="text-gray-600 dark:text-gray-300 mt-2">Tirona Ave, Dasmarinas City, Cavite</p>
</div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white flex items-center gap-2">
                <Clock size={24} /> Hours
              </h3>
              <p className="text-lg dark:text-white">Monday - Sunday</p>
              <p className="text-xl font-bold text-[#333333] dark:text-white">2:00 PM to 1:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}