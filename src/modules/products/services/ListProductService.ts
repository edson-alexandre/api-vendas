import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsReposiroty';
import Product from '../typeorm/entities/Product';

class ListProductService {
    public async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductRepository);
        return await productsRepository.find();
    }
}

export default ListProductService;
