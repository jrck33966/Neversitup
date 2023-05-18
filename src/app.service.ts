import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  APP(): string {
    return 'Neversitup APP.';
  }
}
