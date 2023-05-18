import { BadRequestException, Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import * as bcrypt from 'bcrypt';
import { Encrypt } from '../func/encrypt';

@Injectable()
export class UsersService {
    users = JSON.parse(readFileSync(join(process.cwd(), './src/users/users.json')).toString());
    constructor() {
        // this.users = JSON.parse(readFileSync(join(process.cwd(), './src/users/users.json')).toString());
    }

    async findOne(username: any) {
        return this.users.find(user => user.username === username);
    }

    async createOne(user: any) {
        try {
            const fileData = JSON.parse(readFileSync(join(process.cwd(), './src/users/users.json')).toString());

            let find_user = this.users.find(u => u.username === user.username);
            if (find_user) {
                throw new BadRequestException('User already exists')
            }

            const EncryptPassword = await Encrypt.cryptPassword(user.password);

            let ob_user = {
                userId: await this.genId(),
                username: user.username,
                password: EncryptPassword
            }
            fileData.push(ob_user)

            writeFileSync(join(process.cwd(), './src/users/users.json'), JSON.stringify(fileData, null, 2));
            this.users = fileData
            return {
                statusCode: 200,
                message: 'created'
            };
        } catch (err) {
            throw err;
        }

    }

    async chkPassword(password, passwordHash) {
        return await Encrypt.comparePassword(password, passwordHash);
    }

    async genId() {
        if (this.users.length == 0) {
            return 1;
        } else {
            return await Math.max.apply(Math, this.users.map(u => u.userId)) + 1;
        }
    }

}