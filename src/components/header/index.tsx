/* eslint-disable @next/next/no-img-element */
import React from "react";

const Header: React.FC = () => {
  return (
    <div className="flex justify-between w-full py-5 bg-transparent color-white bg-red-500 justify-between">
      <p className="text-3xl font-semibold">KEFLIX</p>

      <div className="flex items-center gap-3">
        <input type="checkbox" className="toggle toggle-sm" defaultChecked />
        <div className="avatar">
          <div className="w-10 rounded-full">
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
