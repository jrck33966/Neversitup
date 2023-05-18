import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '../auth/auth.guard';
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @UseGuards(AuthGuard)
    @Get()
    getProductAll() {
        return this.productService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    getProductById(@Param('id') id: string) {
        return this.productService.findById(id);
    }

}
