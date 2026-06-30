'use client';
import  { useState } from 'react';
import {useRouter } from 'next/navigation';

export default function ParticipatePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const challengeId = params.id;

  const [form, setForm] = useState({ studentId: '', text: '', link: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault();   setLoading(true);  setError('');

    try {
      const res= await fetch(`/api/challenges/${challengeId}/participations`, {
        method: 'POST',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });

      const data =await res.json();
      if (!res.ok)  throw new Error(data.error ||'Erreur');
      setSuccess(true);
      setForm({ studentId: '', text: '', link: ''} );
      router.refresh();
    }
    
    catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }

  };

  if (success) {

    return (
      <div>
        <p>Participation envoyée !</p>
        <button onClick={() => setSuccess(false)}>Participer à nouveau</button>
      </div>
    );

  }

  return (
    <div>
      <h2>Participer à ce défi</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="studentId">Ton ID étudiant *</label><br />
          <input id="studentId"  type="text" placeholder="Colle ton ID depuis ton profil" value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}  required/>
          <p>Trouve ton ID sur la page de création de profil</p>

        </div>

        <div>
          <label htmlFor="text">Ta réponse / solution </label><br />
          <textarea id="text" placeholder="Décris ta solution, ton approche, ce que tu as appris etc..." rows={5} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required/>
        </div>

        <div>
          <label htmlFor="link">Lien (GitHub, demo, etc.)</label><br />
          <input id="link"  type="url" placeholder="https://sekou.com/ton-repo"value={form.link}   onChange={(e) => setForm({ ...form, link: e.target.value })} />
        </div>


        {error && <p style={{ color: 'red' }}> {error}</p>}
        <button type="submit" disabled={loading}> { loading ? 'Envoi...' : 'Envoyer ma participation'} </button>

      </form>
    </div>
    
  );
}
