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

    <div className="page-container">
      <Link href="/" className="back-link"> Retour </Link>
      <div className="page-header">

        <div>
          <h1 className="page-title">Profils Étudiants</h1>
          <p className="page-subtitle">Liste de tous les membres de la communauté</p>
        </div>
        <span className="badge-indigo">{students.length} profils</span>
      </div>

      <div className="profiles-grid">
        {students.map((student) => (
          <div key={student.id} className="profile-card">

            <div className="profile-card-content">

              <h2 className="profile-name">{student.name}</h2>
              <p className="profile-id">ID: {student.id}</p>
              {student.bio ? (
                <p className="profile-bio">{student.bio }</p>
              ) : ( <p className="profile-bio">Aucune bio </p>  )}
              
            </div>

            <div className="profile-card-footer">
              <span>{student._count.challenges} défis créés</span>
              <span>{student._count.participations} participations</span>
            </div>
          </div>

        ))}
      </div>
    </div>
  )
}
