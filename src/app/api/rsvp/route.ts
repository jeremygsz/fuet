import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const rsvps = await prisma.rsvp.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json({ success: true, data: rsvps });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Erreur serveur' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, mairie, afterMairie, houppa, petitDejeuner, comment } = body;

        if (!firstName || !lastName) {
            return NextResponse.json(
                { success: false, error: 'Nom et prénom requis' },
                { status: 400 }
            );
        }

        // Upsert : met à jour si existe déjà, sinon crée
        const rsvp = await prisma.rsvp.upsert({
            where: {
                firstName_lastName: {
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                },
            },
            update: {
                mairie: Number(mairie) || 0,
                afterMairie: Number(afterMairie) || 0,
                houppa: Number(houppa) || 0,
                petitDejeuner: Number(petitDejeuner) || 0,
                comment: comment?.trim() || null
            },
            create: {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                mairie: Number(mairie) || 0,
                afterMairie: Number(afterMairie) || 0,
                houppa: Number(houppa) || 0,
                petitDejeuner: Number(petitDejeuner) || 0,
                comment: comment?.trim() || null
            },
        });

        return NextResponse.json({ success: true, data: rsvp });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la sauvegarde' },
            { status: 500 }
        );
    }
}
