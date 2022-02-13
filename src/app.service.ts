import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    const data = [
      {
        id: 1,
        name: 'rorn',
        age: '21',
        gender: '1',
      },
    ];
    return { data: data };
  }
}
