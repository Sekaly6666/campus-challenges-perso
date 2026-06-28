'use client'
import { useState } from 'react'
import { useRouter} from 'next/navigation'

type Challenge={ id: string; title: string}

type Student= {id: string;  name: string }

export default function GlobalParticipateForm({ challenges, students }: { challenges: Challenge[], students: Student[] }) {
  const router= useRouter()
  const [form, setForm]= useState({ challengeId: '',studentId: '',text: '',link: '' })
   const [loading, setLoading]=useState(false)
  const [error, setError]= useState('')
    const [success, setSuccess ]= useState(false)

  const handleSubmit = async (e: React.FormEvent) => {  e.preventDefault(); setLoading(true); setError('')

    if (!form.challengeId) {

       setError('Selectionne un défi')
       setLoading(false)
      return

    }


    if (!form.studentId) {
        setError('Selectionne votre profil')
       setLoading(false)
      return
    }


    try {
      const res=await fetch(`/api/challenges/${form.challengeId}/participations`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form), })
      const data =await res.json()

      if (!res.ok) throw new Error(data.error ||'Erreur')
      setSuccess(true)
      setForm({ challengeId: '', studentId: '', text: '', link: '' })
      router.refresh()
    } 
    
    catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }

  }

  if (success) {
    return (
      <div className="card border-green-500/30 bg-green-500/5 text-center py-6">
        <p className="text-green-400 font-medium">Participation envoyée </p>
        <button onClick={() => setSuccess(false)} className="btn-secondary mt-3 text-sm">Faire une autre participation  </button>
      </div>

    )
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Choisis un défi </label>
          <select className="input" value={form.challengeId} onChange={(e) => setForm({ ...form, challengeId: e.target.value })}required>
            <option value="" disabled>Sélectionne un défi </option>
            {challenges.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>

        </div>

        <div>
          <label className="label">Ton profil étudiant </label>
          <select
            className="input" value={form.studentId}  onChange={(e) => setForm({ ...form, studentId: e.target.value })} required>
            <option value="" disabled>Sélectionne ton profil...</option>
            {students.map(s => (<option key={s.id} value={s.id}>{s.name}</option> ))}
          </select>
        </div>

        <div>
          <label className="label">Ta réponse et solution </label>
          <textarea className="input min-h-[100px] resize-y" placeholder="Décris ta solution" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })}  required   />
        </div>

        <div>
          <label className="label">Texte ou Lien </label>
          <input
            className="input" placeholder="https://sekou.com/ton-repo" type="url"  value={form.link}  onChange={(e) => setForm({ ...form, link: e.target.value })} />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full"> {loading ? 'Envoi' : 'Envoyer ma participation'}</button>

      </form>
      
    </div>
  )
}
