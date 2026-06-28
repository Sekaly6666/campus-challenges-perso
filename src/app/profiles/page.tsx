import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic= 'force-dynamic'

export default async function ProfilesPage() {
  const students =await prisma.student.findMany({
    orderBy: {createdAt: 'desc' },
    include: {_count: {  select: { challenges: true, participations: true }, },
    },
    
  })


  return (

    <div className="max-w-4xl mx-auto">
      <Link href="/" className="text-slate-500 hover:text-white text-sm mb-6 inline-flex items-center gap-1 transition-colors"> Retour </Link>
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Profils Étudiants</h1>
          <p className="text-slate-400 text-sm">Liste de tous les membres de la communauté</p>
        </div>
        <span className="badge bg-indigo-500/20 text-indigo-400">{students.length} profils</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {students.map((student) => (
          <div key={student.id} className="card flex flex-col">

            <div className="flex-1">
              <h2 className="text-lg font-semibold text-white mb-1"> { student.name}</h2>
              <p className="text-xs text-slate-500 font-mono mb-3">ID: {student.id}</p>
              {student.bio ? (
                <p className="text-slate-300 text-sm mb-4 line-clamp-3">{student.bio }</p>
              ) : (
                <p className="text-slate-500 text-sm mb-4 italic">Aucune bio </p>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 pt-3 border-t border-white/10 mt-auto">
              <span>{student._count.challenges} défis créés</span>
              <span>{student._count.participations} participations</span>
            </div>
          </div>

        ))}
      </div>
    </div>
  )
}
