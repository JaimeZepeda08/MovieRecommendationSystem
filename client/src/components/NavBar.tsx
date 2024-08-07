import React from "react";

export default function NavBar() {
  const links = [{ name: "About", href: "/about" }];
  const title = "Fakeflix";
  const titleArray = title.split("");

  return (
    <nav className="bg-zinc-950 bg-opacity-60 backdrop-blur-md text-white p-4 px-6 flex justify-between items-center shadow-2xl fixed top-0 w-full z-50">
      <a
        href="/"
        className="text-2xl font-bold m-2 text-yellow-600 curved-title"
        style={{ textShadow: "1px 1px 3px rgba(150, 120, 0, 0.7)" }}
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
              className="m-4 text-lg hover:text-yellow-300/60 transition-colors duration-200"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
