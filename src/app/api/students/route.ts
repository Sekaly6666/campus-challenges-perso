import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const students=await prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(students)

  } 
  
  catch {
    return NextResponse.json({ error: 'Erreur serveur' },{ status: 500 })
  }

}

export async function POST(req: NextRequest) {

  try {
    const body=await req.json()
    const {name, email, bio }=body

    if (!name || !email) {
      return NextResponse.json({ error: 'Nom et email requis' }, { status: 400 })
    }

    const student=await prisma.student.create({
      data: { name, email, bio },
    })

    return NextResponse.json(student, { status: 201 })

  } 
  
  catch (err:unknown) {
    
    const msg=err instanceof Error && err.message.includes('Unique constraint') ? 'Cet email est déjà utilisé': 'Erreur serveur'
    return NextResponse.json({ error: msg }, { status: 500 })

  }
}
