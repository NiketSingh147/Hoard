import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";

function Footer({ themeName }) {
  return (
    <footer
      className={`text-white/80 px-6 md:px-12 py-16 mt-20 border-t tracking-wide ${
        themeName === "dark" ? "bg-gradient-to-b from-gray-900 to-black" : ""
      }`}
      style={{
        backgroundColor: themeName === "dark" ? undefined : "rgb(0 0 0 / 81%)",
        borderColor: "var(--border)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <img src="/images/logo2.png" alt="HOARD" className="w-32 mb-4" />
          <p className="text-base text-white/80">
            HOARD creates stylish, energy-efficient lighting products that brighten homes
            with a soft, reliable glow, blending comfort, safety, charm, and modern
            design for every space daily with easecare.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>

          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 text-base mb-2 hover:text-[#f45e29] transition"
          >
            <Phone size={16} /> +91 995870 5898
          </a>

          <a
            href="https://wa.me/919958705898"
            target="_blank"
            className="flex items-center gap-2 text-base mb-2 hover:text-[#f45e29] transition"
          >
            <FaWhatsapp size={16} /> Chat on WhatsApp
          </a>

          <a
            href="mailto:support@hoard.com"
            className="flex items-center gap-2 text-base mb-2 hover:text-[#f45e29] transition"
          >
            <Mail size={18} /> support@hoard.com
          </a>

          <a
            href="https://www.google.com/maps?q=TOWER+9+EXOTICA+DREAMVILLE+SECTOR+16C+GREATER+NOIDA"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 text-base mt-3 hover:text-[#f45e29] transition duration-300"
          >
            <MapPin size={16} className="mt-1" />
            <span className="text-white/80 hover:text-[#f45e29] transition duration-300">
              TOWER 9, FLAT NO 1702, EXOTICA DREAMVILLE SECTOR 16C,
              <br />
              NEAR GAUR CITY 2, GREATER NOIDA,
              <br />
              Gautam Buddha Nagar, Uttar Pradesh - 201308
            </span>
          </a>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>

          <ul className="space-y-2 text-base mb-6">
            <li className="hover:text-[#f45e29] transition duration-300 cursor-pointer">About Us</li>
            <li className="hover:text-[#f45e29] transition duration-300 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-[#f45e29] transition duration-300 cursor-pointer">Return Policy</li>
            <li className="hover:text-[#f45e29] transition duration-300 cursor-pointer">Shipping Policy</li>
            <li className="hover:text-[#f45e29] transition duration-300 cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Follow Us</h3>

          <div className="flex gap-4 mb-6">
            {[FaInstagram, FaFacebook, FaTwitter].map((Icon, i) => (
              <div
                key={i}
                className="p-3 text-xl rounded-full bg-white/10 border border-white/20
                hover:scale-110 hover:bg-[#f45e29] transition cursor-pointer"
              >
                <Icon size={18} />
              </div>
            ))}
          </div>

          <h3 className="text-white font-semibold mb-3 text-lg">We Accept</h3>

          <div className="flex flex-wrap gap-4 items-center">
            <img src="/paymentIcons/paytm.png" className="h-6 hover:scale-110 transition" />
            <img src="/paymentIcons/phonepay.webp" className="h-6 hover:scale-110 transition" />
            <img src="/paymentIcons/gpay.png" className="h-6 hover:scale-110 transition" />
            <img src="/paymentIcons/upi.webp" className="h-6 hover:scale-110 transition" />
            <img src="/paymentIcons/rupay.png" className="h-6 hover:scale-110 transition" />
            <img src="/paymentIcons/mastercard.png" className="h-6 hover:scale-110 transition" />
            <img src="/paymentIcons/visa.svg" className="h-6 hover:scale-110 transition" />
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent my-10"></div>

      <div className="text-center text-base text-white/80">
        © {new Date().getFullYear()} HOARD. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

