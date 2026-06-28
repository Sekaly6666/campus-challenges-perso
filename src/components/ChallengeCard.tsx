import Link from 'next/link'

interface Props { id: string,title: string,description: string, authorName: string,participationCount: number, createdAt: string}

export default function ChallengeCard({id, title,description, authorName, participationCount } : Props) {

  return (

    <Link href={`/challenges/${id}`}>

      <div className="card group cursor-pointer">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
            {title}
          </h3>
        </div>

        <p className="text-slate-400 text-sm line-clamp-2 mb-4">{description}</p>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>par <span className="text-slate-300">{authorName}</span></span>
          <span>{participationCount} participation{participationCount !== 1 ? 's' : ''}</span>
        </div>

      </div>
    </Link>
  )
}
