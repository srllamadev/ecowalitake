import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { productId, message } = await request.json()

    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    const contact = await prisma.contact.create({
      data: {
        productId,
        senderId: session.user.id,
        receiverId: product.sellerId,
        message
      }
    })

    return NextResponse.json(
      { message: "Mensaje enviado exitosamente", contact },
      { status: 201 }
    )
  } catch (error) {
    console.error("Contact error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}