import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon,
  YoutubeIcon,
  MailIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const columnsRef = useRef([]);
  const columnItemsRef = useRef([]);
  const bottomRef = useRef(null);
  const socialLinksRef = useRef([]);

  return (
    <footer
      ref={footerRef}
      className="bg-[#1a1a1a] text-white w-full rounded-t-[48px] mt-16 min-h-[70vh] flex items-center"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-20">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* For Clients */}
          <div className="space-y-5">
            <h3
              ref={(el) => (columnsRef.current[0] = el)}
              className="font-normal text-base text-gray-400 mb-6"
            >
              For Clients
            </h3>
            <ul className="space-y-3.5 text-base">
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/explore"
                  className="text-white hover:underline transition-colors"
                >
                  Explore Services
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/dashboard/bookings"
                  className="text-white hover:underline transition-colors"
                >
                  My Bookings
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/dashboard/messages"
                  className="text-white hover:underline transition-colors"
                >
                  Messages
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/dashboard/profile"
                  className="text-white hover:underline transition-colors"
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* For Talent */}
          <div className="space-y-5">
            <h3
              ref={(el) => (columnsRef.current[1] = el)}
              className="font-normal text-base text-gray-400 mb-6"
            >
              For Talent
            </h3>
            <ul className="space-y-3.5 text-base">
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/become-service-provider"
                  className="text-white hover:underline transition-colors"
                >
                  Become a Provider
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/dashboard/services"
                  className="text-white hover:underline transition-colors"
                >
                  My Services
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/dashboard/bookings"
                  className="text-white hover:underline transition-colors"
                >
                  Service Requests
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/dashboard/settings"
                  className="text-white hover:underline transition-colors"
                >
                  Account Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-5">
            <h3
              ref={(el) => (columnsRef.current[2] = el)}
              className="font-normal text-base text-gray-400 mb-6"
            >
              Resources
            </h3>
            <ul className="space-y-3.5 text-base">
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/explore"
                  className="text-white hover:underline transition-colors"
                >
                  Browse Services
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/dashboard"
                  className="text-white hover:underline transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/admin"
                  className="text-white hover:underline transition-colors"
                >
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h3
              ref={(el) => (columnsRef.current[3] = el)}
              className="font-normal text-base text-gray-400 mb-6"
            >
              Company
            </h3>
            <ul className="space-y-3.5 text-base">
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/"
                  className="text-white hover:underline transition-colors"
                >
                  About QuickKaam
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/auth/login"
                  className="text-white hover:underline transition-colors"
                >
                  Login
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/auth/signup"
                  className="text-white hover:underline transition-colors"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div ref={bottomRef} className="border-t border-gray-800 pt-10 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 mr-4">Follow us</span>
              <a
                ref={(el) => (socialLinksRef.current[0] = el)}
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                ref={(el) => (socialLinksRef.current[1] = el)}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                ref={(el) => (socialLinksRef.current[2] = el)}
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a
                ref={(el) => (socialLinksRef.current[3] = el)}
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <YoutubeIcon className="w-5 h-5" />
              </a>
              <a
                ref={(el) => (socialLinksRef.current[4] = el)}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                ref={(el) => (socialLinksRef.current[5] = el)}
                href="mailto:contact@quickkaam.com"
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <MailIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Copyright and Legal */}
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 mt-10 gap-4">
            <p>&copy; 2015 - 2025 QuickKaam® Global LLC</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/"
                className="hover:text-gray-400 hover:underline transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/"
                className="hover:text-gray-400 hover:underline transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/dashboard/settings"
                className="hover:text-gray-400 hover:underline transition-colors"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
