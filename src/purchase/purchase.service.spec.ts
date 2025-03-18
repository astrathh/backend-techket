import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseService } from './purchase.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('PurchaseService', () => {
  let service: PurchaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseService],
    }).compile();

    service = module.get<PurchaseService>(PurchaseService);

    // Limpar as tabelas antes de rodar os testes
    await prisma.purchase.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.user.deleteMany();
    await prisma.event.deleteMany();
  });

  afterAll(async () => {
    // Fechar a conexão com o banco de dados após os testes
    await prisma.$disconnect();
  });

  it('should add an item to the cart', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: '123456',
        firstName: 'Test',
        lastName: 'User',
        agreeToTerms: true,
      },
    });

    const event = await prisma.event.create({
      data: {
        title: 'Test Event',
        description: 'This is a test event',
        date: new Date(),
        location: 'Test Location',
        price: 100,
      },
    });

    const cartItem = await service.addToCart(user.id, event.id);
    expect(cartItem).toHaveProperty('userId', user.id);
    expect(cartItem).toHaveProperty('eventId', event.id);
  });

  it('should purchase a ticket', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: '123456',
        firstName: 'Test',
        lastName: 'User',
        agreeToTerms: true,
      },
    });

    const event = await prisma.event.create({
      data: {
        title: 'Test Event',
        description: 'This is a test event',
        date: new Date(),
        location: 'Test Location',
        price: 100,
      },
    });

    const purchase = await service.purchase(user.id, event.id);
    expect(purchase).toHaveProperty('userId', user.id);
    expect(purchase).toHaveProperty('eventId', event.id);
  });

  it('should get purchased tickets', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: '123456',
        firstName: 'Test',
        lastName: 'User',
        agreeToTerms: true,
      },
    });

    const event = await prisma.event.create({
      data: {
        title: 'Test Event',
        description: 'This is a test event',
        date: new Date(),
        location: 'Test Location',
        price: 100,
      },
    });

    await service.purchase(user.id, event.id);
    const tickets = await service.getPurchasedTickets(user.id);
    expect(tickets.length).toBe(1);
    expect(tickets[0]).toHaveProperty('eventId', event.id);
  });

  it('should get cart items', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: '123456',
        firstName: 'Test',
        lastName: 'User',
        agreeToTerms: true,
      },
    });

    const event = await prisma.event.create({
      data: {
        title: 'Test Event',
        description: 'This is a test event',
        date: new Date(),
        location: 'Test Location',
        price: 100,
      },
    });

    await service.addToCart(user.id, event.id);
    const cartItems = await service.getCart(user.id);
    expect(cartItems.length).toBe(1);
    expect(cartItems[0]).toHaveProperty('eventId', event.id);
  });
});
