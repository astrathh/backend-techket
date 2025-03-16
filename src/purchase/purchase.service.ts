import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PurchaseService {
  async addToCart(userId: number, eventId: number) {
    const cartItem = await prisma.cart.create({
      data: {
        userId,
        eventId,
      },
    });
    return cartItem;
  }

  async purchase(userId: number, eventId: number) {
    const purchase = await prisma.purchase.create({
      data: {
        userId,
        eventId,
      },
    });
    return purchase;
  }

  async getPurchasedTickets(userId: number) {
    const tickets = await prisma.purchase.findMany({
      where: { userId },
      include: { event: true },
    });
    return tickets;
  }

  async getCart(userId: number) {
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: { event: true },
    });
    return cartItems;
  }
}
