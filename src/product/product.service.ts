import { Injectable, NotFoundException } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ProductService {

    product = JSON.parse(readFileSync(join(process.cwd(), './src/product/product.json')).toString());

    async findAll() {
        return {
            statusCode: 200,
            message: 'succee',
            data: this.product
        }; 
    }

    async findById(id: any) {
        let find = this.product.products.items.find((it: { id: any; }) => it.id === id)
        if (find) {
            return {
                statusCode: 200,
                message: 'succee',
                data: find
            };
        } else {
            throw new NotFoundException(`Product Id: ${id} Not found.`)
        }
    }
}
