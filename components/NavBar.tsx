'use client'
import Link from "next/link"
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useEffect, useState } from "react";
import NavItems from "./NavItems";

const navItem = [
    { label: "Home", href: '/', img: "/images/home.svg" },
    { label: "About", href: '/about', img: "/images/about.svg" },
    { label: "Courses", href: '/courses', img: "/images/course.svg" },
]

const NavBar = () => {
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
        if (visible) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [visible]);

    return (
        <nav className='flex justify-between items-center p-4 px-5 md:px-20 shadow-md'>
            {/* Logo Section */}
            <div className="flex items-center">
                <Link href="/" className="flex items-center">
                    <span className="text-3xl font-bold">
                        <span className="text-white">V</span>
                        <span className="text-blue-600">M</span>
                        <span className="text-white">P</span>
                    </span>
                    <span className="ml-2 text-xl font-semibold text-gray-500 hidden sm:inline">
                        Academy
                    </span>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
                <div className="rounded-lg p-2 bg-accent">
                    <NavItems />
                </div>
            </div>

            {/* User Controls */}
            <div className="flex items-center gap-4">
                <SignedOut>
                    <SignInButton>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            Sign In
                        </button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
                
                {/* Mobile Menu Button */}
                <button 
                    className="w-8 h-8 sm:hidden focus:outline-none"
                    onClick={() => setVisible(true)}
                >
                    <img src="/images/burger.svg" alt="Menu" className="w-full h-full" />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {visible && (
                <div
                    className="fixed inset-0 bg-[rgba(0,0,0,0.2)] z-[90]"
                    onClick={() => setVisible(false)}
                ></div>
            )}

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 h-full duration-400 z-[100] bg-black shadow-lg transition-all ${visible ? 'w-[70%] max-w-xs p-6' : 'w-0 overflow-hidden'}`}>
                <div className="flex flex-col gap-4 mt-8">
                    {navItem.map((item, index) => (
                        <Link
                            href={item.href}
                            key={index}
                            onClick={() => setVisible(false)}
                            className="flex items-center gap-3 p-3 text-shadow-white-50 hover:bg-gray-500 rounded-md transition-colors"
                        >
                            <img src={item.img} width={20} height={20} alt={item.label} />
                            <span className="text-lg ">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default NavBar