import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const footerSections = {
  "For Clients": ["How to hire", "Talent Marketplace", "Contract-to-hire"],
  "For Talent": ["How to find work", "Direct Contracts", "Find freelance jobs"],
  Resources: ["Help & support", "Success stories", "Quickkam reviews"],
  Company: ["About us", "Careers", "Contact us"],
};

export default function Footer() {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className="bg-[#141111] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Logo Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <img src="/logo-m.svg" alt="Quickkam Logo" className="w-9 h-9" />
              <span className="text-lg font-semibold">Quickkam</span>
            </div>
          </div>

          {/* Footer Links Sections */}
          {Object.entries(footerSections).map(([section, links]) => (
            <div key={section} className="hidden md:block">
              <h3 className="font-medium mb-3.5 text-gray-300 text-sm">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white hover:text-gray-300 hover:underline transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Footer Links - Dropdown Accordions */}
        <div className="md:hidden mb-8 space-y-3">
          {Object.entries(footerSections).map(([section, links]) => (
            <div key={section} className="border-b border-gray-800 pb-3">
              <button
                onClick={() => toggleSection(section)}
                className="w-full flex justify-between items-center text-left"
              >
                <h3 className="font-medium text-white text-sm">{section}</h3>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform ${
                    openSections[section] ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSections[section] && (
                <ul className="mt-3 space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-white hover:text-gray-300 hover:underline transition-colors text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Social Icons - Above Copyright */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-gray-400">Follow us</span>
          <a
            href="#"
            className="text-white hover:text-gray-300 transition-colors"
          >
            <FaFacebook size={18} />
          </a>
          <a
            href="#"
            className="text-white hover:text-gray-300 transition-colors"
          >
            <FaXTwitter size={18} />
          </a>
          <a
            href="#"
            className="text-white hover:text-gray-300 transition-colors"
          >
            <FaInstagram size={18} />
          </a>
        </div>

        {/* Copyright and Terms Section */}
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-400">
            © 2025 Quickkam. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a
              href="#"
              className="text-xs text-white hover:text-gray-300 hover:underline transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-white hover:text-gray-300 hover:underline transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
