import React from "react";
import MenuItem from "../MenuItem";

export default function HomeMenu() {
  return (
    <section>
      <div className="text-center">
        <h3 className="text-4xl italic font-bld my-4">Menu</h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
      </div>
    </section>
  );
}
