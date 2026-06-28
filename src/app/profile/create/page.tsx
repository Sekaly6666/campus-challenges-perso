'use client'
import { useState } from 'react'

export default function CreateProfilePage() {
  const [form, setForm] = useState({ name: '', email: '', bio: '' })
  const [loading, setLoading] =useState(false)

  const [error, setError] = useState('')
  const [created, setCreated] = useState<{ id: string; name: string } | null>(null)

  const handleSubmit= async (e: React.FormEvent) => { e.preventDefault() ;setLoading(true); setError('')

    try {
      const res= await fetch('/api/students', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form), })
      const data =await res.json()

      if (!res.ok) throw new Error(data.error || 'Erreur')
      setCreated(data)
    } 
    
    catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }

  }

  if (created) {

    return (
      <div className="max-w-xl mx-auto">
        <div className="card text-center py-10">

          <h2 className="text-xl font-bold text-white mb-2">Profil créé </h2>
          <p className="text-slate-400 mb-6">
            Bienvenue <span className="text-indigo-400">{created.name}</span>
          </p>
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 mb-6">
            <p className="text-xs text-slate-500 mb-1">Ton ID étudiant </p>
            <p className="font-mono text-indigo-400 text-sm break-all">{created.id}</p>
          </div>
          <p className="text-xs text-slate-500">
            Utilise cet ID pour créer des défis et participer
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1"> Créer mon profil</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label">Nom complet </label>
            <input className="input" placeholder="Jean Dupont" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>

          <div>
            <label className="label">E-mail </label>
            <input className="input"type="e-mail"placeholder="sekou@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required/>
          </div>

          <div>
            <label className="label">Bio</label>
            <textarea className="input min-h-[90px] resize-y" placeholder="Présente toi en quelques mots" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}/>
          </div>

          {error && <p className="text-red-400 text-sm bg-red-500/10 rounded-lg px-3 py-2">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Création' : 'Créer mon profil'}
          </button>
          
        </form>
      </div>
    </div>
  )
}
