"use client"
import useAuth from '@/contexts/authContext';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

const SideBar = () => {
  const user = useAuth();
  
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
          {[
            {
              route: "/",
              label: "Home",
              icon: "home.svg",
            },
            {
              route: "/play",
              label: "Play game",
              icon: "horse.svg",
            },
            user && {
              route: `/profile/${user.currentUser.uid}`,
              label: "Profile",
              icon: "profile.svg"
            }
          ].map((link) => {
            return (
              link && <li key={link.route} className={`hover:bg-dark-4 px-3 py-1.5 transition ${pathname == link.route && "bg-dark-4"}`} onClick={activateLink}>
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