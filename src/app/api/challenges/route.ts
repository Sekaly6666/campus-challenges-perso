import {NextRequest,NextResponse } from 'next/server'
import  {prisma } from '@/lib/prisma'


export async function GET() {

  try {
    const challenges= await prisma.challenge.findMany( {
      include:{ author:true,_count: { select: { participations: true } }, },
       orderBy: {createdAt:'desc' } ,

    } )

    return NextResponse.json(challenges)
  } 
  
  catch {
    return NextResponse.json( { error: 'Erreur serveur' }, {status: 500 } )
  }

}


export async function POST(req: NextRequest) {

  try {
    const body=await req.json();
    const { title, description, authorId }= body;

    if(!title||!description||!authorId ) {
      return NextResponse.json(

        {error:'Titre, description et ID auteur est demandé' }, { status:400}

      );

    }


    const author=await prisma.student.findUnique({ where: { id: authorId } });

    if (!author) {
      return NextResponse.json({ error: 'Auteur non trouvé' },{ status: 404 });
    }

    const challenge=await prisma.challenge.create({ data: {title, description, authorId }, });
    return NextResponse.json(challenge, { status: 201 });

  } 
  
  catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }


}
