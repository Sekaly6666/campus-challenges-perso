import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

import Link from 'next/link'

export const dynamic= 'force-dynamic'


export default async function ChallengePage({ params }: { params: { id: string } }) {

  const challenge = await prisma.challenge.findUnique({
    where: { id: params.id },
      include: { author: true,participations: {  include: { student: true },
       orderBy: { createdAt: 'desc'},
      },
    },

  })

  
  if (!challenge) notFound()

  return (

    <div className="max-w-2xl mx-auto">
      <Link href="/" className="text-slate-500 hover:text-white text-sm mb-6 inline-flex items-center gap-1 transition-colors"> Retour</Link>

  
      <div className="card mb-6">

        <div className="flex items-start justify-between gap-3 mb-3">
          <h1 className="text-2xl font-bold text-white">{challenge.title}</h1>
        </div>

        <p className="text-slate-300 leading-relaxed mb-4">{challenge.description}</p>
        <div className="flex items-center gap-4 text-xs text-slate-500 pt-3 border-t border-white/10">
          <span>Publié par <span className="text-slate-300">{challenge.author.name}</span> <span className="text-slate-500 font-mono text-[10px]">({challenge.author.id})</span></span>
          <span>{new Date(challenge.createdAt).toLocaleDateString('fr-FR')}</span>
          <span>{challenge.participations.length} participation{challenge.participations.length !== 1 ? 's' : ''}</span>
        </div>
      </div>


      {challenge.participations.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-white mb-4"> Participations ({challenge.participations.length})</h2>

          <div className="space-y-3">
            {challenge.participations.map((p) => (
              <div key={p.id} className="card">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-indigo-400">{p.student.name}</span>
                    <span className="text-xs text-slate-500 font-mono" title="ID de l'étudiant">({p.student.id})</span>
                  </div>

                  <span className="text-xs text-slate-500">
                    {new Date(p.createdAt).toLocaleDateString('fr-FR')}
                  </span>

                </div>

                <p className="text-slate-300 text-sm mb-2">{p.text}</p>
                {p.link && ( <a href={p.link}  target="_blank"  rel="noopener noreferrer" className="text-xs text-indigo-400 hover:underline truncate block" >  {p.link}</a>  )}
              </div>

            ))}
          </div>
        </div>
      )}
    </div>
  )
}
