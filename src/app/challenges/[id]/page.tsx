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

    <div className="page-container">
      <Link href="/" className="back-link"> Retour</Link>

  
      <div className="challenge-detail-card">

        <div className="challenge-detail-header">
          <h1 className="challenge-detail-title">{challenge.title}</h1>
        </div>

        <p className="challenge-detail-desc">{challenge.description}</p>
        <div className="challenge-detail-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <div>
            <span>Publié par <span className="challenge-detail-author">{challenge.author.name} </span></span>
            <span style={{ margin: '0 10px' }}>-</span>
              <span>{new Date(challenge.createdAt).toLocaleDateString('fr-FR')}</span>
          </div>

          <div>
            <span style={{ fontWeight: 'bold', color: 'blue' }}>
                {challenge.participations.length} participation{challenge.participations.length !== 1 ? 's' : ''}
            </span>
          </div>

        </div>
      </div>

      {challenge.participations.length > 0 && (
        <div className="participations-section">
          <h2 className="section-title"> Participations ({challenge.participations.length})</h2>

          <div className="participations-list">
            {challenge.participations.map((p) => (
              <div key={p.id} className="participation-card">
                <div className="participation-header">
                  <div className="participation-author">
                    <span className="participation-author-name">{p.student.name}</span>
                  </div>

                  <span className="participation-date">
                    {new Date(p.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                  <div className="clear-both"></div>
                </div>

                <p className="participation-content">{p.text}</p>
                {p.link && ( <a href={p.link}  target="_blank"  rel="noopener noreferrer" className="participation-link-block" >{p.link}</a>  )}
              </div>

            ))}
          </div>
        </div>
      )}
    </div>
  )
}
