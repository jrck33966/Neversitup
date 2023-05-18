import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderDTO {
    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    @IsNumber()
    qty: number;

}
