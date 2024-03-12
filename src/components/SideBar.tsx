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
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const toggleIsOpenBurger = () => {
    setIsOpenBurger(prevState => !prevState);
  }
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
    <section className="min-h-[100%] primary-shadow bg-dark-5">
      <div className={`flex justify-between`}>
        <header className='md:hidden z-20'>
          <label className="hamburger" >
            <input type="checkbox" onClick={() => toggleIsOpenBurger()}/>
            <svg viewBox="0 0 32 32">
              <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
              <path className="line" d="M7 16 27 16"></path>
            </svg>
          </label>
          <div className=""></div>
        </header>
        <ul className={`flex pt-12 flex-col absolute select-none md:block md:relative h-[100dvh] z-10 transition-all bg-dark-5 ${isOpenBurger ? "left-0" : "left-[-100%]"} md:left-0`}>
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