"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between mx-12 mt-8">
      
      <nav className="flex text-gray-500 items-center font-semibold gap-8">
      <Link className="text-primary font-semibold text-2xl" href={""}>
        AK
      </Link>
        <Link className="" href={""}>
          Home
        </Link>
        <Link className="" href={""}>
          Menu
        </Link>
        <Link className="" href={""}>
          About
        </Link>
        <Link className="" href={""}>
          Contact
        </Link>
      </nav>
      <nav className="flex text-gray-500 items-center font-semibold gap-8">
        <Link href={"/register"}>Register</Link>
        <Link
          className="bg-primary rounded-full text-white px-4 py-2"
          href={"/login"}
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
