import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ParticipationsPage() {
  const participations = await prisma.participation.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      student: true,
      challenge: true,
    },
  })

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/" className="text-slate-500 hover:text-white text-sm mb-6 inline-flex items-center gap-1 transition-colors"> Retour</Link>
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Toutes les participations</h1>
        </div>
        <span className="badge bg-green-500/20 text-green-400">{participations.length} participations</span>
      </div>

      {participations.length === 0 ? (

        <div className="card text-center py-16">
          <p className="text-slate-400">Aucune participation pour l'instant</p>
        </div>

      ) : (

        <div className="space-y-4">
          {participations.map((p) => (
            <div key={p.id} className="card">
              <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{p.student.name}</span>
                  <span className="text-slate-500 text-sm">a participé à</span>
                  <Link href={`/challenges/${p.challengeId}`} className="text-indigo-400 hover:underline font-medium"> {p.challenge.title}</Link>
                </div>

                <span className="text-xs text-slate-500">
                  {new Date(p.createdAt).toLocaleDateString('fr-FR')}
                </span>

              </div>

              <p className="text-slate-300 text-sm mb-3">{p.text}</p>
              {p.link && (
                <a href={p.link} target="_blank"  rel="noopener noreferrer" className="text-xs text-indigo-400 hover:underline truncate inline-flex items-center gap-1 bg-indigo-500/10 px-2 py-1 rounded" > {p.link}</a> )}
            </div>

          ))}

        </div>
      )}

    </div>
  )
}
