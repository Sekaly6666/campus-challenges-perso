'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


export default function CreateChallengePage() {
  const router =useRouter()
  const [form, setForm] =useState({
    title: '', description: '', category: 'General', authorId: ''
  })

  const [loading, setLoading]= useState(false)
  const [error, setError] =useState('')

  const handleSubmit= async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); setError('')

    try {

      const res =await fetch('/api/challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),

      })

      const data =await res.json()
      if (!res.ok) throw new Error(data.error ||'Erreur')
      router.push(`/challenges/${data.id}`)

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue' )
      setLoading(false)
    }

  }



  return (

    <div className="max-w-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Créer un défi</h1>
        <p className="text-slate-400 text-sm">Propose un défi</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label">Titre du défi </label>
            <input
              className="input" placeholder="Exemple: Lance moi un défi" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required/>
          </div>

          <div>
            <label className="label">Description </label>
            <textarea className="input min-h-[120px] resize-y"   placeholder="Explique le défi en détail"  value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}  required />
          </div>



          <div>
            <label className="label">Ton ID étudiant </label>
            <input className="input" placeholder="Colle ton ID depuis ton profil" value={form.authorId}onChange={(e) => setForm({ ...form, authorId: e.target.value })} required />
          </div>

          {error && <p className="text-red-400 text-sm bg-red-500/10 rounded-lg px-3 py-2">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full"> {loading ? 'Publication' : 'Publier le défi'} </button>
        </form>
      </div>
    </div>
  )
}
