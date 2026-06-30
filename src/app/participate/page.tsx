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
    <div className="form-container">
      <div className="form-header">
        <h1 className="form-title">Participer à un défi</h1>
        <p className="page-subtitle">Sélectionne un défi et propose ta solution</p>
      </div>

      <GlobalParticipateForm challenges={challenges} students={students} />
      
    </div>
  )
}
