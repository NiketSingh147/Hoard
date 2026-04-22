import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";

function Footer({ themeName }) {
  const hoverClass = themeName === "orange" ? "hover:text-[#f45e29]" : "hover:text-violet-300";

  return (
    <footer
      className={`text-white/80 px-4 md:px-8 lg:px-12 py-10 md:py-14 mt-16 md:mt-20 border-t tracking-wide ${
        themeName === "dark" ? "bg-gradient-to-b from-gray-900 to-black" : ""
      }`}
      style={{
        backgroundColor: themeName === "dark" ? undefined : "rgb(0 0 0 / 81%)",
        borderColor: "var(--border)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
        <div>
          <img src="/images/logo2.png" alt="HOARD" className="w-24 md:w-32 mb-3 md:mb-4" />
          <p className="text-sm md:text-base text-white/80">
            HOARD creates stylish, energy-efficient lighting products that brighten homes
            with a soft, reliable glow, blending comfort, safety, charm, and modern
            design for every space daily with easecare.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 md:mb-4 text-base md:text-lg">Contact</h3>

          <a
            href="tel:+919876543210"
            className={`flex items-center gap-2 text-sm md:text-base mb-2 transition ${hoverClass}`}
          >
            <Phone size={14} className="md:size-[16px]" /> +91 995870 5898
          </a>

          <a
            href="https://wa.me/919958705898"
            target="_blank"
            className={`flex items-center gap-2 text-sm md:text-base mb-2 transition ${hoverClass}`}
          >
            <FaWhatsapp size={14} className="md:size-[16px]" /> Chat on WhatsApp
          </a>

          <a
            href="mailto:support@hoard.com"
            className={`flex items-center gap-2 text-sm md:text-base mb-2 transition ${hoverClass}`}
          >
            <Mail size={14} className="md:size-[18px]" /> support@hoard.com
          </a>

          <a
            href="https://www.google.com/maps?q=TOWER+9+EXOTICA+DREAMVILLE+SECTOR+16C+GREATER+NOIDA"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-start gap-2 text-sm md:text-base mt-2 md:mt-3 transition duration-300 ${hoverClass}`}
          >
            <MapPin size={14} className="md:size-[16px] mt-0.5 md:mt-1 flex-shrink-0" />
            <span className={`text-white/80 transition duration-300 text-xs md:text-sm leading-snug ${hoverClass}`}>
              TOWER 9, FLAT NO 1702, EXOTICA DREAMVILLE SECTOR 16C,
              <br />
              NEAR GAUR CITY 2, GREATER NOIDA,
              <br />
              Gautam Buddha Nagar, Uttar Pradesh - 201308
            </span>
          </a>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 md:mb-4 text-base md:text-lg">Quick Links</h3>

          <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base mb-4 md:mb-6">
            <li className={`transition duration-300 cursor-pointer ${hoverClass}`}>About Us</li>
            <li className={`transition duration-300 cursor-pointer ${hoverClass}`}>Privacy Policy</li>
            <li className={`transition duration-300 cursor-pointer ${hoverClass}`}>Return Policy</li>
            <li className={`transition duration-300 cursor-pointer ${hoverClass}`}>Shipping Policy</li>
            <li className={`transition duration-300 cursor-pointer ${hoverClass}`}>Terms & Conditions</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 md:mb-4 text-base md:text-lg">Follow Us</h3>

          <div className="flex gap-3 md:gap-4 mb-4 md:mb-6">
            {[FaInstagram, FaFacebook, FaTwitter].map((Icon, i) => (
              <div
                key={i}
                className="p-2 md:p-3 text-lg rounded-full bg-white/10 border border-white/20
                hover:scale-110 transition cursor-pointer"
                onMouseEnter={(event) => {
                  event.currentTarget.style.backgroundColor =
                    themeName === "orange" ? "#f45e29" : "rgba(139, 92, 246, 0.6)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.backgroundColor = "";
                }}
              >
                <Icon size={14} className="md:size-[18px]" />
              </div>
            ))}
          </div>

          <h3 className="text-white font-semibold mb-2 md:mb-3 text-base md:text-lg">We Accept</h3>

          <div className="flex flex-wrap gap-2 md:gap-4 items-center">
            <img src="/paymentIcons/paytm.png" className="h-5 md:h-6 hover:scale-110 transition" />
            <img src="/paymentIcons/phonepay.webp" className="h-5 md:h-6 hover:scale-110 transition" />
            <img src="/paymentIcons/gpay.png" className="h-5 md:h-6 hover:scale-110 transition" />
            <img src="/paymentIcons/upi.webp" className="h-5 md:h-6 hover:scale-110 transition" />
            <img src="/paymentIcons/rupay.png" className="h-5 md:h-6 hover:scale-110 transition" />
            <img src="/paymentIcons/mastercard.png" className="h-5 md:h-6 hover:scale-110 transition" />
            <img src="/paymentIcons/visa.svg" className="h-5 md:h-6 hover:scale-110 transition" />
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent my-6 md:my-8 lg:my-10"></div>

      <div className="text-center text-sm md:text-base text-white/80">
        © {new Date().getFullYear()} HOARD. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
