import { PrismaClient } from '@prisma/client';
import { registerUser } from './users.service'; // Certifique-se de que este caminho está correto

const prisma = new PrismaClient();

describe('User Service', () => {
  beforeAll(async () => {
    // Limpar a tabela de usuários antes de rodar os testes
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    // Fechar a conexão com o banco de dados após os testes
    await prisma.$disconnect();
  });

  it('should register a new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
    };

    let user;
    try {
      user = await registerUser(userData);
    } catch (error) {
      user = null;
    }

    expect(user).not.toBeNull();
    if (user) {
      expect(user).toHaveProperty('id');
      expect(user.email).toBe(userData.email);
    }
  });
});
