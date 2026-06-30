'use client'
import{ useState} from 'react'
import{useRouter } from 'next/navigation'

export default function ParticipateForm({challengeId }: {challengeId: string }) {
  const router =useRouter()
  const [form,setForm]=useState({ studentId: '', text: '', link: '' })
  
  const [ loading,setLoading] =useState(false)
   const[error,setError] =useState('')
    const[ success,setSuccess]=useState(false)

  const handleSubmit= async (e: React.FormEvent) => { e.preventDefault(), setLoading(true), setError('')

    try {
      const res= await fetch(`/api/challenges/${challengeId}/participations`, { method: 'POST',  headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),  })
      const data =await res.json()

      if (!res.ok) throw new Error(data.error ||'Erreur')
       setSuccess(true)
       setForm({ studentId:'', text:'', link: '' })
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
      <div className="card success-msg-container">

        <p className="success-msg-text">Participation envoyée </p>
        <button onClick={() => setSuccess(false)} className="btn-secondary mt-15"> Participer à nouveau</button>
      </div>
    )

  }

  return (

    <div className="card">
      <h2 className="form-title">Participer à ce défi</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="label">Ton ID étudiant </label>
          <input className="input"placeholder="Colle ton ID depuis ton profil" value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}  required/>
          <p className="form-hint">Trouve ton ID sur la page de création de profil</p>
        </div>

        <div>
          <label className="label">Ta réponse et solution </label>
          <textarea  className="input textarea"   placeholder="Décris ta solution, ton approche, ce que tu as appris etc..."  value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })}  required  />
        </div>

        <div>
          <label className="label">Texte ou lien</label>
          <input className="input" placeholder="https://sekou.com/ton-repo"type="url" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
        </div>

        {error && <p className="form-error">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-100 mt-15">
          {loading ? 'Envoi...' : 'Envoyer ma participation'}
        </button>
      </form>

    </div>
  )
}
