import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const columnsRef = useRef([]);
  const columnItemsRef = useRef([]);
  const bottomRef = useRef(null);
  const socialLinksRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer container reveal
      gsap.from(footerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Column headers with stagger
      gsap.from(columnsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Column items with smooth stagger
      gsap.from(columnItemsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: {
          each: 0.03,
          from: "start",
        },
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      // Bottom section slide up
      gsap.from(bottomRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bottomRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Social links with individual delays
      gsap.from(socialLinksRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: bottomRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

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
              className="font-normal text-sm text-gray-400 mb-6"
            >
              For Clients
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/how-to-hire"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  How to hire
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/explore"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Talent Marketplace
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/project-catalog"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Project Catalog
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/hire-agency"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Hire an agency
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/enterprise"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Enterprise
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/any-hire"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Any Hire
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/contract-to-hire"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Contract-to-hire
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/direct-contracts"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Direct Contracts
                </Link>
              </li>
            </ul>
          </div>

          {/* For Talent */}
          <div className="space-y-5">
            <h3
              ref={(el) => (columnsRef.current[1] = el)}
              className="font-normal text-sm text-gray-400 mb-6"
            >
              For Talent
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/how-to-find-work"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  How to find work
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/direct-contracts"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Direct Contracts
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/find-freelance-jobs"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Find freelance jobs worldwide
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/find-freelance-jobs-usa"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Find freelance jobs in the USA
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/win-work"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Win work with ads
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/freelancer-plus"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Exclusive resources with Freelancer Plus
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-5">
            <h3
              ref={(el) => (columnsRef.current[2] = el)}
              className="font-normal text-sm text-gray-400 mb-6"
            >
              Resources
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/help"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Help & support
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/success-stories"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Success stories
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/reviews"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  QuickKaam reviews
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/resources"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Resources
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/blog"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Blog
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/affiliate"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Affiliate programme
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/free-tools"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Free Business Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h3
              ref={(el) => (columnsRef.current[3] = el)}
              className="font-normal text-sm text-gray-400 mb-6"
            >
              Company
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/about"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  About us
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/leadership"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Leadership
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/investor-relations"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Investor relations
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/careers"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Careers
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/impact"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Our impact
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/press"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Press
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/contact"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Contact us
                </Link>
              </li>
              <li ref={(el) => columnItemsRef.current.push(el)}>
                <Link
                  to="/trust-safety"
                  className="text-white hover:text-primary transition-colors block hover:translate-x-1 duration-200"
                >
                  Trust, safety & security
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
                href="#"
                className="text-gray-400 hover:text-white transition-colors hover:scale-110 duration-200 p-2"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                ref={(el) => (socialLinksRef.current[1] = el)}
                href="#"
                className="text-gray-400 hover:text-white transition-colors hover:scale-110 duration-200 p-2"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                ref={(el) => (socialLinksRef.current[2] = el)}
                href="#"
                className="text-gray-400 hover:text-white transition-colors hover:scale-110 duration-200 p-2"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                ref={(el) => (socialLinksRef.current[3] = el)}
                href="#"
                className="text-gray-400 hover:text-white transition-colors hover:scale-110 duration-200 p-2"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                ref={(el) => (socialLinksRef.current[4] = el)}
                href="#"
                className="text-gray-400 hover:text-white transition-colors hover:scale-110 duration-200 p-2"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            {/* Mobile App */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Mobile app</span>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Copyright and Legal */}
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 mt-10 gap-4">
            <p>&copy; 2015 - 2025 QuickKaam® Global LLC</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/terms"
                className="hover:text-gray-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="hover:text-gray-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/ca-notice"
                className="hover:text-gray-400 transition-colors"
              >
                CA Notice at Collection
              </Link>
              <Link
                to="/accessibility"
                className="hover:text-gray-400 transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
