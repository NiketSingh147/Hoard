import { FaWhatsapp } from "react-icons/fa";

function WhatsappFloat() {
  return (
    <a
      href="https://wa.me/919958705898"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-14 right-6 z-50 group"
    >
      <div className="flex items-center gap-2">

        {/* Text */}
        <span className="hidden md:block bg-white/10 backdrop-blur-md border border-white/10
        text-white text-sm px-4 py-2 rounded-full shadow-md
        opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0
        transition-all duration-300">
          Chat with us
        </span>

        {/* Icon */}
        <div className="bg-green-500 p-4 rounded-full shadow-lg
        hover:scale-110 hover:bg-green-600 transition duration-300">
          <FaWhatsapp size={22} className="text-white" />
        </div>

      </div>
    </a>
  );
}

export default WhatsappFloat;