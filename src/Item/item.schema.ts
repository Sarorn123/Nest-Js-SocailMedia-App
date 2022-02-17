import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Item {
  @Prop()
  name: string;

  @Prop()
  stock: number;

  @Prop()
  color: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
