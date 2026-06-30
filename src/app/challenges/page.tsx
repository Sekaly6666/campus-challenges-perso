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

    <div className="page-container">

      <Link href="/" className="back-link"> Retour </Link>
      
      <div className="page-header">
        <div>
          <h1 className="page-title"> Tous les défis </h1>
        </div>
      </div>


      {challenges.length === 0? (

        <div className="empty-state">
            <p>Aucun défi pour l'instant </p>
        </div>

      ) : (
        <div className="challenges-grid"> {challenges.map((c)=> (<ChallengeCard  key={c.id}id={c.id} title={c.title}description={c.description} authorName={c.author.name}   participationCount={c._count.participations} createdAt={c.createdAt.toISOString()}   /> ))} </div>
      )}

    </div>
  )
}
