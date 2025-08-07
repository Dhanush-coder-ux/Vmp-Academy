'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { label: "Home", href: '/' },
  { label: "About", href: '/about' },
  { label: "Courses", href: '/courses' },
]

const NavItems = () => {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-6">
      {navItems.map(({ label, href }) => {
        const isActive = pathname === href
        return (
          <Link
            href={href}
            key={label}
            className="text-black font-semibold flex flex-col items-center"
          >
            <span>{label}</span>
            {/* Show underline only for active link */}
            <hr
              className={`w-2/4 h-[2px] bg-black mt-1 transition-all duration-300 ${
                isActive ? '' : 'invisible'
              }`}
            />
          </Link>
        )
      })}
    </nav>
  )
}

export default NavItems
