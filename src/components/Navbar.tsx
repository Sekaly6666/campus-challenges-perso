'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const path = usePathname()

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/challenges/create', label: '+ Défi' },
    { href: '/participate', label: 'Participation' },
    { href: '/profile/create', label: 'Mon profil' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-brand">
          Campus<span className="navbar-brand-highlight"> Challenges</span>
        </Link>

        <div className="navbar-links">
          {links.map((l) => (
            <Link key={l.href}href={l.href} className={`navbar-link ${path === l.href ? 'active' : ''}`} > {l.label} </Link>
          ))}
        </div>

      </div>
    </nav>
  )
}
