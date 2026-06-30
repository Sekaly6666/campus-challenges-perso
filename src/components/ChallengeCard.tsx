import Link from 'next/link'

interface Props { id: string,title: string,description: string, authorName: string,participationCount: number, createdAt: string}

export default function ChallengeCard({id, title,description, authorName, participationCount } : Props) {

  return (

    <Link href={`/challenges/${id}`}>

      <div className="challenge-card">
        <div className="challenge-header">
          <h3 className="challenge-card-title">
            {title}
          </h3>
        </div>

        <p className="challenge-card-desc">{description}</p>
        <div className="challenge-card-footer">
          <span>par&nbsp;<span className="challenge-card-author">{authorName}</span></span>
          <span>{participationCount} participation{participationCount !== 1 ? 's' : ''}</span>
        </div>

      </div>
    </Link>
  )
}
