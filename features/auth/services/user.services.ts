import { prisma } from "@/lib/prisma";

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: string, hashedPassword: string, salt: string) {
  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      salt,
    },
  });
}
