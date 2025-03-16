import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PurchaseService } from './purchase.service';

@Controller('purchase')
@UseGuards(AuthGuard('jwt'))
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post('add-to-cart')
  async addToCart(@Body() body: { userId: number; eventId: number }) {
    return this.purchaseService.addToCart(body.userId, body.eventId);
  }

  @Post('purchase')
  async purchase(@Body() body: { userId: number; eventId: number }) {
    return this.purchaseService.purchase(body.userId, body.eventId);
  }

  @Get('tickets/:userId')
  async getPurchasedTickets(@Param('userId') userId: number) {
    return this.purchaseService.getPurchasedTickets(userId);
  }

  @Get('cart/:userId')
  async getCart(@Param('userId') userId: number) {
    return this.purchaseService.getCart(userId);
  }
}
