/* eslint-disable @next/next/no-img-element */
import React from "react";
import { SiThemoviedatabase } from "react-icons/si";

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center w-full py-5 bg-transparent color-white bg-red-500 justify-between">
      <span>
        <SiThemoviedatabase size={60} />
      </span>
      <p className="text-4xl font-semibold">KEFLIX</p>

      <div className="flex items-center gap-3">
        <input type="checkbox" className="toggle toggle-sm" defaultChecked />
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
