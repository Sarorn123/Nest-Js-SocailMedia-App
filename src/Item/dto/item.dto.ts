export class ItemDto {
  name: string;
  stock: number;
  color: string;
  type: [String];
  object_array: [
    {
      example: String;
      price: Number;
    },
  ];
}

export function convert(item) {
  return {
    id: item.id,
    name: item.name,
    color: item.color,
    stock: item.stock,
  };
}
