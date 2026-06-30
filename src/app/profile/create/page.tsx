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
      <div className="form-container">
        <div className="success-msg-container">

          <h2 className="success-title">Profil créé </h2>
          <p className="success-subtitle">
            Bienvenue <span className="success-highlight">{created.name}</span>
          </p>
          <div className="id-display-box">
            <p className="id-display-label">Ton ID étudiant </p>
            <p className="id-display-value">{created.id}</p>
          </div>
          <p className="id-display-hint">
            Utilise cet ID pour créer des défis et participer
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h1 className="form-title"> Créer mon profil</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="form-content">
          <div>
            <label className="label">Nom complet </label>
            <input className="input" placeholder="Sekou Bamba" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>

          <div>
            <label className="label">E-mail </label>
            <input className="input" type="e-mail" placeholder="sekou@bamba.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required/>
          </div>

          <div>
            <label className="label">Bio</label>
            <textarea className="textarea" placeholder="Présente toi en quelques mots" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}/>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary-full">
            {loading ? 'Création' : 'Créer mon profil'}
          </button>
          
        </form>
      </div>
    </div>
  )
}
