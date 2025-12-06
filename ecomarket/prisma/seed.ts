import { prisma } from "../src/lib/prisma"
import bcrypt from "bcryptjs"

async function main() {
  console.log("🌱 Seeding database...")

  // Crear usuarios de prueba
  const hashedPassword = await bcrypt.hash("password123", 12)

  const admin1 = await prisma.user.upsert({
    where: { email: "admin1@example.com" },
    update: {},
    create: {
      name: "Admin Uno",
      email: "admin1@example.com",
      password: hashedPassword,
      role: "admin",
      businessName: "EcoCorp Admin",
      location: JSON.stringify({
        city: "Madrid",
        state: "Madrid",
        country: "España"
      }),
      phone: "+34 600 000 001"
    }
  })

  const admin2 = await prisma.user.upsert({
    where: { email: "admin2@example.com" },
    update: {},
    create: {
      name: "Admin Dos",
      email: "admin2@example.com",
      password: hashedPassword,
      role: "admin",
      businessName: "GreenTech Admin",
      location: JSON.stringify({
        city: "Barcelona",
        state: "Cataluña",
        country: "España"
      }),
      phone: "+34 600 000 002"
    }
  })

  const user1 = await prisma.user.upsert({
    where: { email: "user1@example.com" },
    update: {},
    create: {
      name: "Juan Pérez",
      email: "user1@example.com",
      password: hashedPassword,
      role: "business",
      businessName: "Reciclados Pérez SL",
      location: JSON.stringify({
        city: "Valencia",
        state: "Valencia",
        country: "España"
      }),
      phone: "+34 600 000 003"
    }
  })

  const user2 = await prisma.user.upsert({
    where: { email: "user2@example.com" },
    update: {},
    create: {
      name: "María García",
      email: "user2@example.com",
      password: hashedPassword,
      role: "business",
      businessName: "EcoMateriales García",
      location: JSON.stringify({
        city: "Sevilla",
        state: "Andalucía",
        country: "España"
      }),
      phone: "+34 600 000 004"
    }
  })

  console.log("✅ Usuarios creados:", { admin1: admin1.email, admin2: admin2.email, user1: user1.email, user2: user2.email })

  // Crear productos de prueba
  const products = [
    {
      title: "Cáscaras de Papa Orgánicas",
      description: "Cáscaras de papa frescas, ideales para compostaje industrial o alimentación animal. Producidas en finca ecológica certificada.",
      price: 0.50,
      quantity: 1000,
      unit: "kg",
      category: "organico",
      condition: "reciclable",
      images: JSON.stringify(["https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400"]),
      sellerId: user1.id,
      location: JSON.stringify({
        city: "Valencia",
        state: "Valencia",
        country: "España"
      })
    },
    {
      title: "Botellas PET Recicladas",
      description: "Botellas de plástico PET limpias y trituradas, listas para reprocesamiento. Separadas por colores.",
      price: 1.20,
      quantity: 500,
      unit: "kg",
      category: "plastico",
      condition: "reciclable",
      images: JSON.stringify(["https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=400"]),
      sellerId: user1.id,
      location: JSON.stringify({
        city: "Valencia",
        state: "Valencia",
        country: "España"
      })
    },
    {
      title: "Vidrio Molido Blanco",
      description: "Vidrio transparente molido, perfecto para fabricación de nuevos envases o materiales de construcción.",
      price: 0.80,
      quantity: 2000,
      unit: "kg",
      category: "vidrio",
      condition: "reciclable",
      images: JSON.stringify(["https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400"]),
      sellerId: user2.id,
      location: JSON.stringify({
        city: "Sevilla",
        state: "Andalucía",
        country: "España"
      })
    },
    {
      title: "Chatarra de Aluminio",
      description: "Mezcla de aluminio de diferentes calidades: latas, perfiles y chapas. Separado magnéticamente.",
      price: 2.50,
      quantity: 300,
      unit: "kg",
      category: "metal",
      condition: "reciclable",
      images: JSON.stringify(["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"]),
      sellerId: user2.id,
      location: JSON.stringify({
        city: "Sevilla",
        state: "Andalucía",
        country: "España"
      })
    },
    {
      title: "Papel y Cartón Industrial",
      description: "Papel y cartón de oficina usado, ideal para reciclaje. Libre de contaminantes.",
      price: 0.30,
      quantity: 1500,
      unit: "kg",
      category: "papel",
      condition: "reciclable",
      images: JSON.stringify(["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400"]),
      sellerId: user1.id,
      location: JSON.stringify({
        city: "Valencia",
        state: "Valencia",
        country: "España"
      })
    }
  ]

  for (const productData of products) {
    await prisma.product.create({
      data: productData
    })
  }

  console.log("✅ Productos de prueba creados")

  console.log("🎉 Seed completado exitosamente!")
  console.log("\n📋 Credenciales de prueba:")
  console.log("Admin1: admin1@example.com / password123")
  console.log("Admin2: admin2@example.com / password123")
  console.log("User1: user1@example.com / password123")
  console.log("User2: user2@example.com / password123")
}

main()
  .catch((e) => {
    console.error("❌ Error en el seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })