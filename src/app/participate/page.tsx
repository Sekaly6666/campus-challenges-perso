import { prisma } from '@/lib/prisma'
import GlobalParticipateForm from './GlobalParticipateForm'

export const dynamic= 'force-dynamic'

export default async function ParticipatePage() {
    const challenges =await prisma.challenge.findMany({
    select: { id: true, title: true },
     orderBy: {createdAt: 'desc' },
  })

  const students= await prisma.student.findMany({
    select: { id:true, name: true },
    orderBy: {name: 'asc' },
  })

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Participer à un défi</h1>
        <p className="text-slate-400 text-sm">Sélectionne un défi et propose ta solution</p>
      </div>

      <GlobalParticipateForm challenges={challenges} students={students} />
      
    </div>
  )
}
