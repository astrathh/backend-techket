import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [AuthModule, UsersModule, EventsModule, PurchaseModule],
})
export class AppModule {}
