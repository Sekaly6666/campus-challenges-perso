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
    <div className="page-container">
      <Link href="/" className="back-link"> Retour</Link>
      
      <div className="page-header">
        <div>
          <h1 className="page-title">Toutes les participations</h1>
        </div>
      </div>

      {participations.length === 0 ? (

        <div className="empty-state">
          <p className="empty-state-text">Aucune participation pour l'instant</p>
        </div>

      ) : (

        <div className="participations-list">
          {participations.map((p) => (
            <div key={p.id} className="participation-card">
              <div className="participation-header">
                <div className="participation-author">
                  <span className="participation-name">{p.student.name}</span>
                  <span className="participation-text">a participé à</span>
                  <Link href={`/challenges/${p.challengeId}`} className="participation-link"> {p.challenge.title}</Link>
                </div>

                <span className="participation-date">
                  {new Date(p.createdAt).toLocaleDateString('fr-FR')}
                </span>

              </div>

              <p className="participation-content">{p.text}</p>
              {p.link && (
                <a href={p.link} target="_blank"  rel="noopener noreferrer" className="participation-link" > {p.link}</a> )}
            </div>

          ))}

        </div>
      )}

    </div>
  )
}
