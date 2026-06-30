import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import ChallengeCard from '@/components/ChallengeCard'

export const dynamic = 'force-dynamic'

export default async function HomePage() {

  const challenges=await prisma.challenge.findMany({
    include: { author: true,_count: { select: { participations: true } }, },
    orderBy: { createdAt: 'desc' },

  })

  const studentCount= await prisma.student.count()

  return (

    <div>
      <div className="hero-section">
        <div className="hero-badge"> Plateforme étudiante</div>
        <h1 className="hero-title"> Relève des défis <br />
          <span className="hero-highlight">et participe</span>
        </h1>
        <p className="hero-subtitle">
          Publie des défis, participe à ceux des autres
        </p>
      </div>

      <div className="stats-grid">
        {[
          { label: 'Défis publiés', value: challenges.length, href: '/challenges' },
          { label: 'Participations', value: challenges.reduce((a, c) => a + c._count.participations, 0), href: '/participations' },
          { label: 'Profils', value: studentCount, href: '/profiles' },

        ].map((s) => (
          <Link key={s.label} href={s.href} className="stat-card">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </Link>
        ))}

      </div>

      <div className="section-header">
        <h2 className="section-title">Tous les défis</h2>
      </div>

      {challenges.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-text">Aucun défi pour l'instant</p>
        </div>

      ) : (

        <div className="challenges-grid">
          {challenges.map((c) => (
            <ChallengeCard key={c.id} id={c.id} title={c.title} description={c.description}  authorName={c.author.name}  participationCount={c._count.participations} createdAt={c.createdAt.toISOString()} />
          ))}
        </div>
        
      )}

    </div>
  )
}
