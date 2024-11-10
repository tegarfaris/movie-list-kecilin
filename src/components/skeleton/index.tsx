import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="bg-base-300 h-[400px] rounded-lg"></div>
      <div className="bg-base-300 h-6 rounded w-3/4"></div>
      <div className="bg-base-300 h-4 rounded w-full"></div>
      <div className="bg-base-300 h-4 rounded w-1/2"></div>
    </div>
  );
};

export default SkeletonCard;
