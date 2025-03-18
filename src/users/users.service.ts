import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async create(userData: CreateUserDto) {
    try {
      // Verificar se o usuário aceitou os termos
      if (!userData.agreeToTerms) {
        throw new BadRequestException(
          'Você deve aceitar os termos e condições para se registrar.',
        );
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          password: hashedPassword,
          firstName: userData.firstName,
          lastName: userData.lastName,
          agreeToTerms: userData.agreeToTerms,
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'P2002') {
        throw new ConflictException('O email já está em uso');
      }
      throw error;
    }
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
  async validateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }
}
