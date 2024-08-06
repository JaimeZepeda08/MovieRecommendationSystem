import React from "react";

export default function NavBar() {
  const links = [{ name: "About", href: "." }];

  return (
    <nav className="bg-zinc-950 bg-opacity-60 backdrop-blur-md text-white p-6 flex justify-between items-center shadow-2xl fixed top-0 w-full z-50">
      <h1 className="text-xl m-2">Movie Recommendation System</h1>
      <ul className="flex">
        {links.map((link, index) => (
          <li key={index} className="mr-4 last:mr-0">
            <a
              href={link.href}
              className="m-4 text-xl hover:text-sky-600 transition-colors duration-200 underline-effect"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
