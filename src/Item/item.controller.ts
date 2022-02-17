import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemDto } from './dto/item.dto';
import { Item } from './item.schema';
import { Public } from '../auth/route.protection';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('getAllItems')
  getAllItems(): Promise<Item[]> {
    return this.itemService.getAllItems();
  }

  @Get('getItem/:id')
  getItem(@Param('id') id): Promise<Item> {
    return this.itemService.getItem(id);
  }

  @Post('addItem')
  addItem(@Body() itemDto: ItemDto): Promise<Item> {
    return this.itemService.addItem(itemDto);
  }

  @Put('editItem/:id')
  editItem(@Body() itemDto: ItemDto, @Param('id') id): Promise<Item> {
    return this.itemService.editItem(id, itemDto);
  }

  @Delete('deleteItem/:id')
  deleteItem(@Param('id') id): Promise<Item> {
    return this.itemService.deleteItem(id);
  }
}
