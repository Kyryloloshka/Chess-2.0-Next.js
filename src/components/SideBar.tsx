"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export const sideBarLinks = [
  {
    route: "/",
    label: "Home",
    icon: "home.svg",
  },
  {
    route: "/play",
    label: "Play game",
    icon: "horse.svg",
  }
]

const SideBar = () => {
  const [isNavigationActive, setNavigationActive] = useState(false);

  const toggleNavigation = () => {
    setNavigationActive(!isNavigationActive);
  };

  const activateLink = (event: React.MouseEvent<HTMLLIElement>) => {
    const clickedItem = event.currentTarget;
    const updatedList = Array.from(document.querySelectorAll('.navigation__item'));

    updatedList.forEach((item) => {
      item.classList.remove('_active');
    });

    clickedItem.classList.add('_active');
  };
  const pathname = usePathname();
  return (
    <section className="py-1 min-h-[100%] primary-shadow">
      <div className={`${isNavigationActive ? ' _active' : ''}`}>
        <div className="" onClick={toggleNavigation}></div>
        <ul className="flex flex-col">
          {sideBarLinks.map((link) => {
            return (
              <li key={link.route} className={`hover:bg-dark-4 px-3 py-1.5 transition ${pathname == link.route && "_active"}`} onClick={activateLink}>
                <Link href={link.route} className="flex items-center gap-3">
                <span className="">
                  <img className='w-8 h-8' src={`/assets/sideBarIcons/${link.icon}`}/>
                </span>
                <span className='whitespace-nowrap'>{link.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default SideBar