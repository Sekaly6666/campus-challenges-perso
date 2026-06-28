import { NextRequest, NextResponse } from 'next/server'
import {prisma } from '@/lib/prisma'

export async function GET(_req: NextRequest,{params }: { params: { id: string } }) {

  try {
    const participations=await prisma.participation.findMany ({
      where : {challengeId: params.id },
        include: { student: true },
      orderBy: { createdAt: 'desc'},

    })

    return NextResponse.json(participations)

  } 
  
  catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }

}

export async function POST(  req: NextRequest, { params }:{ params: { id: string } }) {

  try{ 

    const body=await req.json()
    const { studentId,text, link }= body

    if (!studentId|| !text) {
        return NextResponse.json({error: 'ID étudiant et texte est demandé' },{ status: 400 })
    }

    const participation=await prisma.participation.create({
      data: {text, link: link|| null, studentId, challengeId: params.id, },
        include : { student: true},
    })

    return NextResponse.json(participation, { status: 201 })

  } 
  
  catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }

}

