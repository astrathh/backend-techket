import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  // Endpoint para comprar um ingresso
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async purchase(
    @Body() createPurchaseDto: CreatePurchaseDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.purchaseService.purchase(
      req.user.id,
      createPurchaseDto.eventId,
    );
  }

  // Endpoint para listar histórico de compras
  @Get('history')
  @UseGuards(AuthGuard('jwt'))
  async getPurchasedTickets(@Request() req: { user: { id: number } }) {
    return this.purchaseService.getPurchasedTickets(req.user.id);
  }

  // Endpoint para adicionar ao carrinho
  @Post('cart')
  @UseGuards(AuthGuard('jwt'))
  async addToCart(
    @Body() createPurchaseDto: CreatePurchaseDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.purchaseService.addToCart(
      req.user.id,
      createPurchaseDto.eventId,
    );
  }

  // Endpoint para listar itens do carrinho
  @Get('cart')
  @UseGuards(AuthGuard('jwt'))
  async getCart(@Request() req: { user: { id: number } }) {
    return this.purchaseService.getCart(req.user.id);
  }
}
