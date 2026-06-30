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

    <div className="form-container">
      <div className="form-header">
         <h1 className="form-title">Créer un défi</h1>
        <p className="form-subtitle">Propose un défi</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="form-content">
          <div>
            <label className="label">Titre du défi </label>
            <input
              className="input" placeholder="Exemple: Lance moi un défi" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required/>
          </div>

          <div>
            <label className="label">Description </label>
            <textarea className="textarea" placeholder="Ex: explication de ce défi en quelque ligne..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required/>
          </div>



          <div>
            <label className="label">Ton ID étudiant </label>
            <input className="input" placeholder="Colle ton ID depuis ton profil" value={form.authorId}onChange={(e) => setForm({ ...form, authorId: e.target.value })} required />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary-full"> {loading ? 'Publication' : 'Publier le défi'} </button>
        </form>
      </div>
    </div>
  )
}
