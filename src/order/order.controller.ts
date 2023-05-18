import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Get, Param } from '@nestjs/common';
import { OrderDTO } from '../order/order.model';
import { AuthGuard } from '../auth/auth.guard';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) { }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    getOrderById(@Param('id') id: string) {
        return this.orderService.find(id);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post()
    create(@Body() order: OrderDTO, @Request() req: any) {
        let ob_order = {
            productId: order.productId,
            qty: order.qty,
            userId: req.user.userId
        }
        return this.orderService.createOrder(ob_order);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/cancel')
    cancel(@Body() order: any) {
        return this.orderService.cancelOrder(order);
    }



}
