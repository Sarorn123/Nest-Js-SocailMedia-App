import { ProductModule } from './product.module';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
export declare class ProductService {
    private photoRepository;
    constructor(photoRepository: Repository<Product>);
    getAllProducts(): Promise<ProductModule[]>;
}
