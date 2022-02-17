import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema, Item } from './item.schema';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { JwtStrategy } from '../auth/jwt.stategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/route.protection';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  controllers: [ItemController],
  providers: [
    ItemService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class ItemModule {}
