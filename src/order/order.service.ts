import { Injectable, NotFoundException } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
@Injectable()
export class OrderService {
    orders = JSON.parse(readFileSync(join(process.cwd(), './src/order/order.json')).toString());
    async find(id: any) {
        let find = this.orders.find((o: { orderId: any; }) => o.orderId == id)
        if (find) {
            return {
                statusCode: 200,
                message: 'succee',
                data: find
            };
        } else {
            throw new NotFoundException(`Order Id: ${id} Not found.`)
        }

    }

    async createOrder(order: any) {
        try {
            const fileData = JSON.parse(readFileSync(join(process.cwd(), './src/order/order.json')).toString());
            let ob_user = {
                orderId: await this.genId(),
                productId: order.productId,
                userId: order.userId,
                qty: order.qty,
                status: 'Open'
            }
            fileData.push(ob_user)

            writeFileSync(join(process.cwd(), './src/order/order.json'), JSON.stringify(fileData, null, 2));
            this.orders = fileData
            return {
                statusCode: 200,
                message: 'created'
            };
        } catch (err) {
            throw err;
        }

    }

    async genId() {
        if (this.orders.length == 0) {
            return 1;
        } else {
            return await Math.max.apply(Math, this.orders.map(o => o.orderId)) + 1;
        }

    }

    async cancelOrder(order: any) {
        try {
            let id = order.orderId ?? ""
            let data = this.orders;
            for (let i = 0; i < data.length; i++) {
                let orderId = data[i]['orderId'];
                if (orderId == id) {
                    data[i]['status'] = 'Cancel';
                }
            }
         
            writeFileSync(join(process.cwd(), './src/order/order.json'), JSON.stringify(data, null, 2));
            this.orders = data
            return {
                statusCode: 200,
                message: 'succee'
            };
        } catch (err) {
            throw err;
        }

    }

}
