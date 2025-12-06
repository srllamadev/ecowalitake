import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const contacts = await prisma.contact.findMany({
      where: {
        receiverId: session.user.id
      },
      include: {
        sender: {
          select: { name: true, email: true }
        },
        product: {
          select: { title: true }
        }
      },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error("Contacts fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}