import {NextRequest,NextResponse } from 'next/server'
 import { prisma } from '@/lib/prisma'

export async function GET(_req: NextRequest,{ params }: { params: { id: string } }) {

  try {

    const challenge=await prisma.challenge.findUnique({where: { id: params.id },include:{
        author: true, participations: {
          include: {student: true },
            orderBy: { createdAt: 'desc' },
        },
      },

    });

    if (!challenge) {
      return NextResponse.json({ error: 'Défi non trouvé' }, {status: 404 });
    }
    return NextResponse.json(challenge);

  } 
  
  catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }

}


