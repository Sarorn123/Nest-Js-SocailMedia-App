import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './item.schema';
import { Model } from 'mongoose';
import { convert } from './dto/item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name)
    private itemModel: Model<Item>,
  ) {}

  async getAllItems(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  async getItem(id: string): Promise<Item> {
    return await this.itemModel.findById(id);
  }

  async addItem(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  async editItem(id: string, item: Item): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }

  async deleteItem(id: string): Promise<Item> {
    const item = await this.itemModel.findByIdAndRemove(id);
    if (!item) {
      throw new HttpException(
        { messsgae: 'Item Not Found!', status: false },
        HttpStatus.BAD_REQUEST,
      );
    }
    return item;
  }
}
