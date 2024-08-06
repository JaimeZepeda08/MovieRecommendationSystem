import React from "react";

export default function NavBar() {
  const links = [{ name: "About", href: "/about" }];

  return (
    <nav className="bg-zinc-950 bg-opacity-60 backdrop-blur-md text-white p-6 flex justify-between items-center shadow-2xl fixed top-0 w-full z-50">
      <a href="/" className="text-xl font-bold m-2 text-yellow-600">
        WEBSITE TITLE
      </a>
      <ul className="flex">
        {links.map((link, index) => (
          <li key={index} className="mr-4 last:mr-0">
            <a
              href={link.href}
              className="m-4 text-xl hover:text-yellow-300/60 transition-colors duration-200"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
