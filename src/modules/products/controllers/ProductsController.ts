import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';

export default class ProductController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listProducts = new ListProductService();

        const products = await listProducts.execute();

        return response.json(products);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showProduct = new ShowProductService();
        const product = await showProduct.execute({ id });

        return response.json(product);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        // const { name, price, quantity } = request.body;

        const createProduct = new CreateProductService();
        const product = await createProduct.execute({ ...request.body });

        return response.json(product);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const updateService = new UpdateProductService();
        const product = await updateService.execute({ id, ...request.body });
        return response.json(product);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const deleteProduct = new DeleteProductService();
        deleteProduct.execute({ id });
        return response.json([]);
    }
}
