import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#121212] text-white px-6 py-10 mt-10 border-t">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* COLUMN 1 — BRAND + NAV */}
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold text-yellow-400">OJ Movie</h2>

          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-yellow-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors">Contact / Sponsorship</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors">Movie Categories</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors">Help / FAQ</a></li>
          </ul>
        </div>

        {/* COLUMN 2 — SOCIALS */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-yellow-400">Follow Us</h3>

          <div className="flex space-x-5">
            <a href="#" className="hover:text-yellow-400 transition-all">
              Facebook
            </a>
            <a href="#" className="hover:text-yellow-400 transition-all">
              Twitter
            </a>
            <a href="#" className="hover:text-yellow-400 transition-all">
              Instagram
            </a>
          </div>
        </div>

        {/* PWA DOWNLOAD */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-yellow-400 text-left md:text-right">
            Download Our PWA
          </h3>

          <div className="flex md:justify-end">
            <div className="bg-gray-900 p-3 rounded-lg border border-gray-700 w-fit">
              <p className="text-gray-300 text-sm">Scan to download</p>

              {/* Placeholder QR */}
              <div className="w-28 h-28 bg-gray-600 mt-2 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT BAR */}
      <div className="text-center text-gray-400 text-sm mt-10 border-t border-gray-800 pt-4">
        © {new Date().getFullYear()} OJ Movie. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
