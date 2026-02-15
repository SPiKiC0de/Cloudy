'use client'
import { Children } from "react"
import { useState } from "react"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'


type SearchBoxProps = {
    onSearch: (city: string) => void;
};


export default function Navbar({ onSearch }: SearchBoxProps){

    const navItems = [
        {name:"Home",href:"/"}
    ]
    const [city,setCity] = useState("");



    return (
        <div>
            <nav className="block w-full max-w-screen py-2 mx-auto bg-white bg-opacity-90 sticky top-3 shadow lg:px-8 backdrop-blur-lg backdrop-saturate-150 z-[9999] rounded-b-4xl">
                <div>
                    <a href="/" className="absolute text-black text-4xl font-bold">Cloudy</a>
                    {/*search-box*/}
                    <div className="flex inset-x-0 top-0 justify-center">
                        <input className= "outline-2 outline-black rounded-2xl text-center bg-white text-black pl-12 pr-12 pt-2 pb-2 mr-2 top-8" 
                            placeholder={`Search City...`}
                            value={city} 
                            onChange={(e)=>{setCity(e.target.value)}}>
                        </input>
                        <button className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-base text-sm px-7 py-3 text-center leading-5 rounded-3xl" onClick={() => onSearch(city)}>
                          {<MagnifyingGlassIcon className="text-white size-5"></MagnifyingGlassIcon>}
                        </button>
                    </div>
                    {/*login*/}
                        <Menu as="div" className="absolute right-7 top-3">
                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/5 hover:bg-black/70">
                                Account
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-white" />
                            </MenuButton>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-black outline outline-1 -outline-offset-1 outline-white/10 transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="py-1">
                                <MenuItem>
                                    <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-300 data-[focus]:bg-white/5 data-[focus]:text-white data-[focus]:outline-none"
                                    >
                                    Sign In
                                    </a>
                                </MenuItem>
                                </div>
                            </MenuItems>
                            </Menu>         
                </div>
            </nav>
        </div>
    )
}