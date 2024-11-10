/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { SiThemoviedatabase } from "react-icons/si";

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load theme preference from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  // Effect to update theme on toggle and save to localStorage
  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkMode);
    document.body.classList.toggle("light-theme", !isDarkMode);

    // Save theme preference to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="flex justify-between items-center w-full py-5 bg-transparent color-white bg-red-500">
      <span>
        <SiThemoviedatabase size={60} />
      </span>
      <p className="text-4xl font-semibold">KEFLIX</p>

      <div className="flex items-center gap-3">
        <label className="flex cursor-pointer gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            value="synthwave"
            className="toggle theme-controller"
            checked={isDarkMode}
            onChange={handleThemeToggle}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="keflix-avatar-profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
