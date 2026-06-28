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
    <nav className="border-b border-white/10 bg-[#0f0f1a]/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-indigo-400 tracking-tight">
          Campus<span className="text-white"> Challenges</span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.href}href={l.href} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${path === l.href ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-white hover:bg-white/5'}`} > {l.label} </Link>
          ))}
        </div>

      </div>
    </nav>
  )
}
