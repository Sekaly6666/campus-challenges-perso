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
      <div className="text-center py-16 mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-sm text-indigo-400 mb-6"> Plateforme étudiante</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"> Relève des défis <br />
          <span className="text-indigo-400">et participe</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
          Publie des défis, participe à ceux des autres
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Défis publiés', value: challenges.length, href: '/challenges' },
          { label: 'Participations', value: challenges.reduce((a, c) => a + c._count.participations, 0), href: '/participations' },
          { label: 'Profils', value: studentCount, href: '/profiles' },

        ].map((s) => (
          <Link key={s.label} href={s.href} className="card text-center hover:bg-white/5 transition-colors cursor-pointer block">
            <div className="text-3xl font-bold text-indigo-400">{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </Link>
        ))}

      </div>

      <div id="defis" className="flex items-center justify-between mb-5 scroll-mt-20">
        <h2 className="text-lg font-semibold text-white">Tous les défis</h2>
        <span className="text-sm text-slate-500">{challenges.length} défi{challenges.length !== 1 ? 's' : ''}</span>
      </div>

      {challenges.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-slate-400">Aucun défi pour l'instant</p>
        </div>

      ) : (

        <div className="grid gap-4 md:grid-cols-2">
          {challenges.map((c) => (
            <ChallengeCard key={c.id} id={c.id} title={c.title} description={c.description}  authorName={c.author.name}  participationCount={c._count.participations} createdAt={c.createdAt.toISOString()} />
          ))}
        </div>
        
      )}

    </div>
  )
}
