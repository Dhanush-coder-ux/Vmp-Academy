"use client" 

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    { label: "Home", href: '/'},
    { label: "About", href: '/about' },
    { label: "Courses", href: '/courses'},
]

const NavItems = () => {
    const pathname = usePathname();
  return (
    <nav className='flex items-center gap-4'>
      {/* hidden lg:flex items-center gap-4 */}
      {navItems.map(({ label, href })=>(
      <Link
          href={href}
          key={label}
          className= "text-blue-400 font-semibold"
          
        >
          <span>
            {label}
            <span className="underline" />
          </span>
        </Link>
      ))}
    </nav>
  )
}

export default NavItems