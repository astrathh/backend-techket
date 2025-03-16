import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);

    // Limpar as tabelas antes de rodar os testes
    await prisma.purchase.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    // Fechar a conexão com o banco de dados após os testes
    await prisma.$disconnect();
  });

  it('should create a user', async () => {
    const user = await service.create({
      email: 'test@example.com',
      password: '123456',
    });
    expect(user).toHaveProperty('email', 'test@example.com');
  });

  it('should login a user', async () => {
    const userData = {
      email: 'login@example.com',
      password: 'password123',
    };

    await service.create(userData);

    let user: { email: string } | null;
    try {
      user = await service.login(userData.email, userData.password);
    } catch {
      user = null;
    }

    expect(user).not.toBeNull();
    if (user) {
      expect(user.email).toBe(userData.email);
    }
  });

  it('should update a user', async () => {
    const userData = {
      email: 'update@example.com',
      password: 'password123',
    };

    const user = await service.create(userData);

    const updatedUser = await service.update(user.id, {
      email: 'updated@example.com',
    });

    expect(updatedUser.email).toBe('updated@example.com');
  });
});
