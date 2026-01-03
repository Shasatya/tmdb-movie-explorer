import Image from "next/image";
import React from "react";

const CastCard = ({ cast, img }) => {
  return (
    <div className="w-28 shrink-0">
      <div className="relative w-28 h-36 rounded overflow-hidden bg-gray-100 dark:bg-slate-700">
        <Image
          src={img}
          alt={cast.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="auto"
        />
      </div>
      <div className="mt-2 text-sm font-semibold">{cast.name}</div>
      <div className="text-xs text-gray-500 dark:text-gray-300">
        {cast.character}
      </div>
    </div>
  );
};

export default CastCard;
