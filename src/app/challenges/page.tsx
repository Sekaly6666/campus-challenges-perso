import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import ChallengeCard from '@/components/ChallengeCard'
export const dynamic = 'force-dynamic'


export default async function ChallengesPage() {

  const challenges=await prisma.challenge.findMany({
    include: { author: true, _count: {select : { participations:true } }, },
     orderBy: { createdAt: 'desc' },

  })

  return (

    <div className="max-w-4xl mx-auto">
      <Link href="/" className="text-slate-500 hover:text-white text-sm mb-6 inline-flex items-center gap-1 transition-colors"> Retour </Link>
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1"> Tous les défis </h1>
        </div>
      </div>

      {challenges.length === 0 ? (
        <div className="card text-center py-16">
            <p className="text-slate-400">Aucun défi pour l'instant.</p>
        </div>

      ) : (
        <div className="grid gap-4 md:grid-cols-2"> {challenges.map((c)=> (<ChallengeCard  key={c.id}id={c.id} title={c.title}description={c.description} authorName={c.author.name}   participationCount={c._count.participations} createdAt={c.createdAt.toISOString()}   /> ))} </div>
      )}

    </div>
  )
}
