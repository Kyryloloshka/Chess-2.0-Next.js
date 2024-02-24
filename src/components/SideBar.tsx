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
    <section className="pb-[80px] mr-[52px] ">
      <div className={`navigation${isNavigationActive ? ' _active' : ''}`}>
        <div className="navigation__menuToggle" onClick={toggleNavigation}></div>
        <ul className="navigation__list">
          {sideBarLinks.map((link) => {
            return (
              <li key={link.route} className={`navigation__item ${pathname == link.route && "_active"}`} onClick={activateLink}>
                <Link href={link.route} className="navigation__link">
                <span className="navigation__icon">
                  <img src={`/assets/sideBarIcons/${link.icon}`}/>
                </span>
                <span className='navigation__text whitespace-nowrap'>{link.label}</span>
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