"use client";

import React from "react";

export default function NavBar() {
  const links = [
    {
      name: "About",
      href: "https://github.com/JaimeZepeda08/MovieRecommendationSystem",
    },
  ];
  const title = "Fakeflix";
  const titleArray = title.split("");

  return (
    <nav className="bg-zinc-950 bg-opacity-60 backdrop-blur-md text-white p-4 px-6 flex justify-between items-center shadow-2xl fixed top-0 w-full z-50">
      <a
        href="/"
        className="text-2xl font-bold py-3 px-4 text-yellow-600 curved-title"
      >
        {titleArray.map((letter, index) => (
          <span key={index} className={`letter-${index}`}>
            {letter}
          </span>
        ))}
      </a>
      <ul className="flex">
        {links.map((link, index) => (
          <li key={index} className="mr-4 last:mr-0">
            <a
              href={link.href}
              className="m-4 text-lg hover:text-yellow-300/70 transition-colors duration-200"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
