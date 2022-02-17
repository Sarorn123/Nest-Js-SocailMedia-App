import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Item {
  @Prop()
  name: string;

  @Prop()
  stock: number;

  @Prop()
  color: string;

  @Prop()
  type: [String];

  @Prop()
  object_array: [
    {
      example: String;
      price: Number;
    },
  ];
}

export const ItemSchema = SchemaFactory.createForClass(Item);
