import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Campus Challenges',
  description: 'Mini-plateforme de défis pour étudiants',
}

export default function RootLayout({children, }: {
  children: React.ReactNode
}) {


  return (
    <html lang="fr">
      <body className="layout-body">
        <Navbar />
        <main className="layout-main">{children}</main>
      </body>
    </html>
  )
  
}
