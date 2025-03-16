import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async create(userData: { email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
      },
    });
    return user;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new Error('Invalid email or password');
  }

  async update(
    userId: number,
    updateData: { email?: string; password?: string },
  ) {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
    return user;
  }

  async delete(userId: number) {
    await prisma.user.delete({ where: { id: userId } });
  }
}
