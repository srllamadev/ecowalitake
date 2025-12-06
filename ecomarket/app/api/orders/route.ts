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

    const orders = await prisma.order.findMany({
      where: {
        OR: [
          { buyerId: session.user.id },
          { sellerId: session.user.id }
        ]
      },
      include: {
        product: true,
        buyer: { select: { name: true, email: true } },
        seller: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Orders fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { productId, quantity, shippingAddress } = await request.json()

    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    if (product.status !== "available") {
      return NextResponse.json(
        { error: "Product not available" },
        { status: 400 }
      )
    }

    if (product.quantity < quantity) {
      return NextResponse.json(
        { error: "Insufficient quantity" },
        { status: 400 }
      )
    }

    const totalPrice = product.price * quantity

    const order = await prisma.order.create({
      data: {
        productId,
        buyerId: session.user.id,
        sellerId: product.sellerId,
        quantity,
        totalPrice,
        shippingAddress
      }
    })

    // Update product quantity
    await prisma.product.update({
      where: { id: productId },
      data: {
        quantity: product.quantity - quantity,
        status: product.quantity - quantity === 0 ? "sold" : "available"
      }
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}