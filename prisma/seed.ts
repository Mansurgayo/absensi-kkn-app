import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  try {
    // Check if admin already exists
    const adminExists = await prisma.user.findUnique({
      where: { email: "admin@kkn.com" },
    })

    if (adminExists) {
      console.log("Admin user already exists")
      return
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10)
    const admin = await prisma.user.create({
      data: {
        name: "Administrator KKN",
        email: "admin@kkn.com",
        password: hashedPassword,
        universitas: "Admin",
        nim: "000000",
        role: "ADMIN",
      },
    })

    console.log("Admin user created successfully:")
    console.log("Email: admin@kkn.com")
    console.log("Password: admin123")
    console.log("ID:", admin.id)
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
