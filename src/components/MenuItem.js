import Image from "next/image";
import React from "react";

export default function MenuItem() {
  return (
    <div>
      <div className="bg-gray-100 p-4 rounded-lg text-center flex flex-col items-center justify-center hover:bg-white hover:shadow-xl hover:shadow-black/25 transition-all">
        <div className="text-center">
          <Image
            className="max-h-24 max-w-24 block mx-auto"
            src={"/pizza.png"}
            width={128}
            height={128}
            alt="menu item 1"
          />
        </div>
        <h4 className="font-semibold my-3 text-xl">Menu Item 1</h4>
        <p className="text-gray-500 text-sm">
          In a whimsical world of ziggles and zaggles, flibbertigibbets frolic
          while blibbering bloopity-bloop.
        </p>
        <button className="bg-primary text-white rounded-full px-4 py-2 mt-3">
          Add to cart
        </button>
      </div>
    </div>
  );
}
